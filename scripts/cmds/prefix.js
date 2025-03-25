const fs = require("fs-extra");
const { utils } = global;

module.exports = {
	config: {
		name: "prefix",
		version: "1.5",
		author: "  ",
		countDown: 5,
		role: 0,
		description: "             (  )",
		category: " ",
		guide: {
			en: 
				"\n"
				+ " {pn} <new prefix>:       \n"
				+ "\n"
				+ " :\n"
				+ " {pn} #\n"
				+ "\n"
				+ " {pn} <new prefix> -g:        (  )\n"
				+ "\n"
				+ " :\n"
				+ " {pn} # -g\n"
				+ "\n"
				+ " {pn} reset:       \n"
				+ ""
		}
	},

	langs: {
		en: {
			reset: 
				"\n"
				+ "       : %1\n"
				+ "",
			onlyAdmin: 
				"\n"
				+ "       !\n"
				+ "",
			confirmGlobal: 
				"\n"
				+ "           .\n"
				+ "",
			confirmThisThread: 
				"\n"
				+ "              .\n"
				+ "",
			successGlobal: 
				"\n"
				+ "      : %1\n"
				+ "",
			successThisThread: 
				"\n"
				+ "       : %1\n"
				+ "",
			myPrefix: 
			 "Ä[       ]Ä"
				+ ""
				+ " : %1\n"
				+ "  : %2\n"
				+ " : %3\n"
				+ "\n"
				+ ""
				+ ""
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0]) return message.SyntaxError();

		if (args[0] === "reset") {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const formSet = {
			commandName,
			author: event.senderID,
			newPrefix,
			setGlobal: args[1] === "-g"
		};

		if (formSet.setGlobal && role < 2) {
			return message.reply(getLang("onlyAdmin"));
		}

		const confirmMessage = formSet.setGlobal ? getLang("confirmGlobal") : getLang("confirmThisThread");
		return message.reply(confirmMessage, (err, info) => {
			formSet.messageID = info.messageID;
			global.GoatBot.onReaction.set(info.messageID, formSet);
		});
	},

	onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
		const { author, newPrefix, setGlobal } = Reaction;
		if (event.userID !== author) return;

		if (setGlobal) {
			global.GoatBot.config.prefix = newPrefix;
			fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
			return message.reply(getLang("successGlobal", newPrefix));
		}

		await threadsData.set(event.threadID, newPrefix, "data.prefix");
		return message.reply(getLang("successThisThread", newPrefix));
	},

	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "prefix") {
			const serverTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }); //  
			
			return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID), serverTime));
		}
	}
};
