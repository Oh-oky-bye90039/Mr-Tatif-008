module.exports = {
  config: {
    name: "botnick",
    aliases: ["botname"],
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Change nickname of the bot in all group chats"
    },
    longDescription: {
      en: "Change nickname of the bot in all group chats"
    },
    category: "OWNER",
    guide: {
      en: "{pn} <new nickname>"
    },
    envConfig: {
      delayPerGroup: 250
    }
  },

  langs: {
    en: {
      missingNickname: "Please enter the new nickname for the bot",
      changingNickname: "Start changing bot nickname to '%1' in %2 group chats",
      errorChangingNickname: "An error occurred while changing nickname in %1 groups:\n%2",
      successMessage: "✅ Successfully changed nickname in all group chats to '%1'",
      sendingNotification: "Sending notification to %1 group chats."
    }
  },
