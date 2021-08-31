const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'standard_deviation',
	description: 'sd!',
	options: [
		{
			name: 'formula',
			description: 'Choose the formula. Use /help if unsure of what to choose',
			type: 'STRING',
			required: true,
			choices: [{value: "population standard deviation", name: 'Population SD Formula'}, {value: "sample standard deviation", name: 'Sample SD Formula'}]
		},

		{
			name: 'dataset',
			description: 'Separate each value with a comma, e.g: 49,123,4,1,591,23,35',
			type: 'STRING',
			required: true
		}
	],
    data: {
        name: 'standard_deviation',
        description: 'sd',
		options: [
			{
				name: 'formula',
				description: 'Choose the formula. Use /help if unsure of what to choose',
				type: 'STRING',
				required: true,
				choices: [{value: "population standard deviation", name: 'Population SD Formula'}, {value: "sample standard deviation", name: 'Sample SD Formula'}]
			},

			{
				name: 'dataset',
				description: 'Separate each value with a comma, e.g: 49,123,4,1,591,23,35',
				type: 'STRING',
				required: true
			}
		]
    },
	async execute(interaction) {
		const formula = interaction.options.getString('formula')
		const dataset = interaction.options.getString('dataset').split(',')
		var num_dataset = interaction.options.getString('dataset').split(',')

		

		for (let num = 0; num < dataset.length; num ++) {
			if (isNaN(dataset[num]) == true) {
				const errorNonNumberEmbed = new MessageEmbed()
					.setColor('RED')
					.setTitle('Error!')
					.setDescription('Invalid Dataset. Include only numbers')
					.setTimestamp()

				return interaction.reply({ embeds: [errorNonNumberEmbed] });
			} 
		}

		for (let num = 0; num < dataset.length; num ++) {
			num_dataset[num] = parseFloat(num_dataset[num])
		}

		const numbers_dataset = num_dataset

		if (formula == "population standard deviation") {
			var total_of_set = 0
			
			for (let num = 0; num < dataset.length; num ++) {
				
				total_of_set += num_dataset[num]

				
			}

			const mean = total_of_set/num_dataset.length
			
			var sum_of_WIP = 0
			
			for (let num = 0; num < dataset.length; num ++) {
				
				sum_of_WIP += Math.abs(num_dataset[num] - mean) ** 2 

			}

			const sum_of = sum_of_WIP

			const sd = Math.sqrt(sum_of/dataset.length)

			let answerEmbed = new MessageEmbed()
					.setColor('GREEN')
					.setTitle('Standard Deviation Calculated!')
					.addField('Formula Used', "Population", false)
					.addField('Dataset', `${dataset}`, false)
					.addField('Standard Deviation', `${sd}`, false)
					.addField('Dataset Length', `${dataset.length}`, false)
					.addField('Total of Dataset Values', `${total_of_set}`, false)
					.addField('Mean', `${mean}`, false)
					.setTimestamp()

			return interaction.reply({ embeds: [answerEmbed] });
		}
	},
};