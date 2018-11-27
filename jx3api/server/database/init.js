const mongoose = require("mongoose");
const db = "mongodb://localhost/ceshi";
const glob = require("glob");

const {
    resolve
} = require("path");

mongoose.Promise = global.Promise;

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, "./schema", "**/*.js")).forEach( (i)=> require(i) )
}

exports.connect = () => {
    if (process.env.NODE_ENV !== "production") {
        mongoose.set("debug", true)
    };
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true 
    })
    mongoose.connection.on("disconnected", () => {
        mongoose.connect(db, {
            useNewUrlParser: true
        })
    });
    mongoose.connection.on("error", (err) => {
        console.log(err)
    });
    mongoose.connection.once("open", () => {

        console.log("MongoDB Connected successfully!")
    })
}