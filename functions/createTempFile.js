const cryptoRandomString = require("crypto-random-string");
const fs = require("fs");

const createTempFile = (code, tempFolder, tempFileSuffix) => {
    return new Promise((resolve, reject) => {
        const str = cryptoRandomString({ length: 10 });
        const date = Date.parse(new Date());
        const fileName = `${tempFolder}/${date}_${str}`;
        fs.writeFile(fileName + tempFileSuffix, code, err => {
            if (err) reject(Error(err));
        });
        resolve(fileName);
    });
};

module.exports = createTempFile;
