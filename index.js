const { evaluate } = require("mathjs");
const { Plugin } = require("powercord/entities");

class Calculator extends Plugin {
	startPlugin() {
		powercord.api.commands.registerCommand({
			command: "calc",
			description: "Calculate your query",
			usage: "{query} your query here!",
			executor: (args) => ({
				send: false,
				result: this.doMath(args.join(" ")),
			}),
		});
	}

	doMath(query) {
		if (!query) {
			return "You didn't provide any query!";
		}

		return {
			type: "rich",
			fields: [
				{
					name: "Input:",
					value: query,
					inline: true,
				},
				{
					name: "Output:",
					value: evaluate(query).toString(),
					inline: true,
				},
			],
			color: 0x4cb2c2,
		};
	}

	pluginWillUnload() {
		powercord.api.commands.unregisterCommand("calc");
	}
}

module.exports = Calculator;
