const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");

const newErrorEmbed = err => {
    return new Discord.MessageEmbed()
        .setColor("#ed473b")
        .setTitle("Error")
        .setAuthor("Bitrey C Compiler", "https://i.imgur.com/z8vLrsL.png")
        .setDescription(
            "An error occurred while compiling your C code." +
                "\nPlease check below for more details." +
                "\nIf you believe this is an error, please report it by clicking on the error icon"
        )
        .setThumbnail("https://i.imgur.com/K6q6YDf.png")
        .addFields(
            {
                name: "Error object",
                value: util.inspect(err, { showHidden: false, depth: null })
            },
            {
                name: "JSON stringified",
                value: JSON.stringify(err, null, 4)
            }
        )
        .setTimestamp()
        .setFooter("Good luck fixing that!", "https://i.imgur.com/7DWKPzq.png");
};

const saveErrorToFile = (errStr, errorLogsFileName) => {
    fs.appendFile(
        errorLogsFileName,
        errStr.toString() + "\n" + "*".repeat(16),
        err => {
            if (err) throw err;
        }
    );
};

const handleError = (msgObj, err, errorLogsFileName) => {
    // Check if error is JSON (gcc errors are JSON stringified)
    if (err.syntaxError) {
        msgObj.channel.send(newErrorEmbed(util.format(err.stderr)));
    } else {
        saveErrorToFile(err, errorLogsFileName);
        msgObj.channel.send(newErrorEmbed(err));
        console.error(err);
    }
};

module.exports = handleError;
