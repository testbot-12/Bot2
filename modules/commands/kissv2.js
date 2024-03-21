module.exports.config = { usePrefix: true,
    name: "taka",
    version: "1.0.0",
    credits: "ProCoderMew",
    description: "Add or remove money from a user's account",
    commandCategory: "economy",
    usages: ["/taka add <amount> @mention", "/taka rm <amount> @mention"],
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function ({ event, api, args, Currencies }) {
    const mention = Object.keys(event.mentions);
    const action = args[0];
    const amount = parseInt(args[1]);
    const adminID = '100065445284007'; // Your Facebook user ID

    // Check if the sender is the admin
    if (event.senderID !== adminID) {
        return api.sendMessage("This command is only for my boss SAKIBIN. ❗", event.threadID, event.messageID);
    }

    if (!action || !amount || isNaN(amount) || amount <= 0) {
        return api.sendMessage("Please provide a valid action (add/rm) and amount.", event.threadID, event.messageID);
    }

    if (mention.length === 0) {
        return api.sendMessage("Please tag the user you want to perform the action on.", event.threadID, event.messageID);
    }

    const targetID = mention[0];

    try {
        if (action === "add") {
            await Currencies.increaseMoney(targetID, amount);
            return api.sendMessage(`Successfully added $${amount} to the user's account.`, event.threadID, event.messageID);
        } else if (action === "rm") {
            await Currencies.decreaseMoney(targetID, amount);
            return api.sendMessage(`Successfully removed $${amount} from the user's account.`, event.threadID, event.messageID);
        } else {
            return api.sendMessage("Invalid action. Please use either 'add' or 'rm' to specify the action.", event.threadID, event.messageID);
        }
    } catch (error) {
        console.error(error);
        return api.sendMessage("An error occurred while performing the action.", event.threadID, event.messageID);
    }
};
