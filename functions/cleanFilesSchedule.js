const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");

// Clean files in temp folder every hour
const cleanFilesSchedule = directory => {
    schedule.scheduleJob("00 * * * *", () => {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });
    });
};

module.exports = cleanFilesSchedule;
