const handleCompileCommand = async (message, compileCommand) => {
    // Togliamo la parte !compile dal codice
    const command = message.content.split(compileCommand);

    command.shift();

    return command.join(compileCommand);
};

module.exports = handleCompileCommand;
