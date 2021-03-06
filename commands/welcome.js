// You want me turned on or off?
exports.run = (client, message, args, Discord, connection) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.length === 1) {
            message.channel.send('Usage: //welcome on\nOr: //welcome off');
        } else {
            client.checkServer(message.guild.id, message.guild.name, message.guild.iconURL, () => {
                if (args[1].toLowerCase() === 'on') {
                    connection.query("UPDATE `Servers` SET `Welcome` = 1 WHERE `ServerID` = '" + message.guild.id + "'", (error, results, fields) => {
                        if (error) {
                            throw new Error(error);
                        }

                        message.channel.send('Successfully turned on welcome messages.');
                    });
                } else
                if (args[1].toLowerCase() === 'off') {
                    connection.query("UPDATE `Servers` SET `Welcome` = 0 WHERE `ServerID` = '" + message.guild.id + "'", (error, results, fields) => {
                        if (error) {
                            throw new Error(error);
                        }

                        message.channel.send('Successfully turned off welcome messages.');
                    });
                } else {
                    message.channel.send('Usage: //welcome on\nOr: //welcome off');
                }
            });
        }
    } else {
        message.channel.send('This command is restricted to server admins.');
    }
};

exports.conf = {
    name: 'welcome',
    category: 'Miscelaneous',
    description: 'Flip me on flip me off',
    usage: 'welcome',
    aliases: [],
};
