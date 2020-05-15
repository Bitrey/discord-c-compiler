const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");

const newErrorEmbed = err => {
    return new Discord.MessageEmbed()
        .setColor("#ed473b")
        .setTitle("New error (click to report)")
        .setAuthor("Bitrey C Compiler", "https://i.imgur.com/z8vLrsL.png")
        .setDescription(
            "An error occurred while compiling your C code." +
                "\nPlease check below for more details." +
                "\nIf you believe this is an error, please report it by clicking on the link above."
        )
        .setURL("https://github.com/Bitrey/discord-c-compiler/issues")
        .setThumbnail(
            "https://i.imgur.com/K6q6YDf.png",
            "https://github.com/Bitrey/discord-c-compiler/issues"
        )
        .addFields({
            name: "Error text",
            value: err.syntaxError
                ? err.stderr
                : util.inspect(err, { showHidden: false, depth: null })
        })
        .setTimestamp()
        .setFooter("Good luck fixing that!", "https://i.imgur.com/7DWKPzq.png");
};

const saveErrorToFile = (errStr, errorLogsFileName) => {
    fs.appendFile(
        errorLogsFileName,
        errStr.toString() + "\n".repeat(3) + "*".repeat(16) + "\n",
        err => {
            if (err) throw err;
        }
    );
};

const handleError = (msgObj, err, errorLogsFileName) => {
    // Check if error is JSON (gcc errors are JSON stringified)
    if (err.syntaxError) {
        msgObj.channel.send(newErrorEmbed(err));
    } else {
        saveErrorToFile(err, errorLogsFileName);
        msgObj.channel.send(newErrorEmbed(err));
        console.error(err);
    }
};

module.exports = handleError;
