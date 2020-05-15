const { exec } = require("child_process");
const path = require("path");
const chalk = require("chalk");

const compile = (fileName, tempFileSuffix, compiledFileSuffix) => {
    return new Promise((resolve, reject) => {
        const input = fileName + tempFileSuffix;
        const output = fileName + compiledFileSuffix;
        exec(
            `x86_64-w64-mingw32-gcc ${input} -o ${output} && zip -q ${fileName}.zip ${output} ${input}`,
            (err, stdout, stderr) => {
                if (err) {
                    // If stderr is not empty, we'll assume it's a syntax error
                    if (stderr) {
                        reject({ syntaxError: true, stderr });
                    }
                    chalk.red("Error while executing gcc command!");
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};

module.exports = compile;
