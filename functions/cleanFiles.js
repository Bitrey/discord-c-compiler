const fs = require("fs");

const cleanFiles = async (fileName, tempFileSuffix, compiledFileSuffix) => {
    return new Promise((resolve, reject) => {
        const tempFilePath = fileName + tempFileSuffix;
        const compiledFilePath = fileName + compiledFileSuffix;
        const zipFilePath = fileName + ".zip";

        fs.unlink(tempFilePath, err => {
            if (err) reject(err);
            fs.unlink(compiledFilePath, err => {
                if (err) reject(err);
                fs.unlink(zipFilePath, err => {
                    if (err) reject(err);
                    resolve();
                });
            });
        });
    });
};

module.exports = cleanFiles;
