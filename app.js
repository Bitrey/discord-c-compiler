require(`dotenv`).config();
const mongoose = require("mongoose");
const Discord = require(`discord.js`);
const client = new Discord.Client();

const botClientId = process.env.BOT_CLIENT_ID;
const testServerName = "Bitrey Bot Testing";

// MONGOOSE SETUP
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URI, function () {
    console.log("Database connesso!");
});

client.on(`message`, message => {
    const msg = message.content.toLowerCase();
});

client.on(`ready`, () => {
    console.log(`C compiler bot logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
