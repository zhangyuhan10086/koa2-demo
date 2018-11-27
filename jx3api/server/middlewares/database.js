const mongoose = require("mongoose");
const db = "mongodb://localhost/ceshi";
const glob = require("glob");
import config from "../../config"
import {
    join
} from "path"

const {
    resolve
} = require("path");

mongoose.Promise = global.Promise;

glob.sync(join(__dirname, "../database/schema", "**/*.js")).forEach((i) => require(i))

export const database = app => {
    const {
        db
    } = config;
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