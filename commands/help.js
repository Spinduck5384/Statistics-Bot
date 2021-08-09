module.exports = {
    name: 'help',
    description: 'test',
    data: {
        name: 'help',
        description: 'Replies with helping!',
    },
    async execute(interaction) {
        return interaction.reply("helping")
    },
};