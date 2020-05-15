const Discord = require("discord.js");
const fs = require("fs");

const newFileEmbed = files => {
    return new Discord.MessageEmbed()
        .setColor("#47eb2d")
        .setTitle("Successfully compiled!")
        .setAuthor("Bitrey C Compiler", "https://i.imgur.com/z8vLrsL.png")
        .setDescription(
            "Your file has been successfully compiled!" +
                "\nYou can find both your code and its compiled version inside the .zip file." +
                "\nNote: it might get flagged as a virus because it's not signed, but it's safe."
        )
        .setThumbnail("https://i.imgur.com/7fdXs1R.png")
        .attachFiles(files)
        .setTimestamp()
        .setFooter("Happy days!");
};

const saveSuccessToFile = (filePath, successLogsFileName) => {
    return new Promise((resolve, reject) => {
        const saveFormat =
            `${new Date()} - ${filePath}` +
            "\n".repeat(3) +
            "*".repeat(16) +
            "\n";
        fs.appendFile(successLogsFileName, saveFormat, err => {
            if (err) reject(err);
            resolve();
        });
    });
};

const handleSuccess = async (
    message,
    filePath,
    tempFileSuffix,
    successLogsFileName
) => {
    const tempFile = filePath + tempFileSuffix;
    const zipFile = filePath + ".zip";
    await saveSuccessToFile(zipFile, successLogsFileName);
    await message.channel.send(newFileEmbed([zipFile]));
};

module.exports = handleSuccess;
