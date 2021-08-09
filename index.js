const fs = require('fs');
const { Client, Collection, Intents} = require('discord.js');


const { token } = require('./config.json')
const { guild_id } = require('./config.json')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

client.once('ready', () => {
	console.log('Ready');

});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			let data = command.data;
			const guild_commands = await client.guilds.cache.get(guild_id)?.commands.create(data);
			console.log(`created ${command.data.name}`);
		}

		/*Obtaining command info*/
		// console.log(await client.application.commands.fetch()) global commands
		// console.log(await client.guilds.cache.get(guild_id)?.commands.fetch()) guild commands

		/*Deleting Commands*/
		//await client.application.commands.delete("id") global commands
		//await client.guilds.cache.get(guild_id)?.commands.delete("id") guild commands

	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}


});





client.login(token);