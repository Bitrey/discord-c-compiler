const Discord = require("discord.js");
const fs = require("fs");

const newFileEmbed = filePath => {
    return new Discord.MessageEmbed()
        .setColor("#47eb2d")
        .setTitle("Successfully compiled!")
        .setAuthor("Bitrey C Compiler", "https://i.imgur.com/z8vLrsL.png")
        .setDescription(
            "Your file has been successfully compiled!" +
                "You can download both your code as a file and its compiled version."
        )
        .setThumbnail("https://i.imgur.com/7fdXs1R.png")
        .attachFiles(filePath)
        .setTimestamp()
        .setFooter("Happy days!");
};

const saveSuccessToFile = (filePath, successLogsFileName) => {
    return new Promise((resolve, reject) => {
        const saveFormat =
            `${new Date()} - ${filePath}` + "\n" + "*".repeat(16);
        fs.appendFile(successLogsFileName, saveFormat, err => {
            if (err) reject(err);
            resolve();
        });
    });
};

const handleSuccess = async (message, filePath, successLogsFileName) => {
    await saveSuccessToFile(filePath, successLogsFileName);
    await message.channel.send(newFileEmbed(filePath));
};

module.exports = handleSuccess;
