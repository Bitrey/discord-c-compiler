// Libraries
require(`dotenv`).config();
const Discord = require(`discord.js`);
const client = new Discord.Client();
// const path = require("path");

// Functions
const handleCompileCommand = require("./functions/handleCompileCommand");
const createTempFile = require("./functions/createTempFile");
const compileCode = require("./functions/compileCode");
const cleanFiles = require("./functions/cleanFiles");
const handleSuccess = require("./functions/handleSuccess");
const handleError = require("./functions/handleError");

// Options
const prefix = "!";
const tempFolder = "tempFiles";
const compileCommand = `${prefix}compile `;
const tempFileSuffix = ".c";
const compiledFileSuffix = "-compiled.exe";
const botClientId = "710816057925042178";
const testMode = true;
const testServerName = "Bitrey Bot Testing";
const successLogsFileName = "success.log";
const errorLogsFileName = "error.log";

client.on(`message`, async message => {
    // Save the message object in memory for async operations
    const msgObj = message;

    if (testMode && msgObj.guild.name !== testServerName) {
        return false;
    }

    const msg = msgObj.content.toLowerCase();

    if (msg.startsWith(compileCommand) && msgObj.author.id !== botClientId) {
        try {
            // Extract the code from the typed message
            const code = await handleCompileCommand(msgObj, compileCommand);

            // Create a temp file to be compiled
            const fileName = await createTempFile(
                code,
                tempFolder,
                tempFileSuffix
            );

            // Compile the code
            await compileCode(
                fileName,
                tempFolder,
                tempFileSuffix,
                compiledFileSuffix
            );

            // Send the compiled file to the user
            await handleSuccess(
                message,
                fileName + compiledFileSuffix,
                successLogsFileName
            );

            // Delete files after they've been uploaded
            cleanFiles(fileName, tempFileSuffix, compiledFileSuffix);
        } catch (err) {
            handleError(msgObj, err, errorLogsFileName);
        }
    }
});

client.on(`ready`, () => {
    console.log(`C compiler bot logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
