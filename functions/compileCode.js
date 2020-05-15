const { exec } = require("child_process");
const path = require("path");
const chalk = require("chalk");

const compile = (fileName, tempFileSuffix, compiledFileSuffix) => {
    return new Promise((resolve, reject) => {
        exec(
            `x86_64-w64-mingw32-gcc ${fileName}${tempFileSuffix} -o ${fileName}${compiledFileSuffix}`,
            (err, stdout, stderr) => {
                if (err) {
                    // If stderr is not empty, we'll assume it's a syntax error
                    if (stderr) {
                        reject({ syntaxError: true, stderr });
                    }
                    chalk.red("Error while executing gcc command!");
                    reject(err);
                } else {
                    const outputPath = path.join(
                        __dirname,
                        fileName + compiledFileSuffix
                    );
                    console.log(outputPath);
                    resolve({ output: outputPath, stdout, stderr });
                }
            }
        );
    });
};

module.exports = compile;
