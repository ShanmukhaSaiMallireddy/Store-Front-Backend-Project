"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UsersStore();
const secret_code = process.env.TOKEN_SECRET;
const index = async (req, res) => {
    try {
        const shower = await store.index();
        res.json(shower);
    }
    catch (err) {
        //Status for Bad Request
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        console.log("Show with the id in handler user ", req.params.id);
        const shower = await store.show(req.params.id);
        res.json(shower);
    }
    catch (err) {
        //Status for Bad Request
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: req.body.password
        };
        // user
        let newOne = await store.create(user);
        // newOne.password
        const expass = newOne.password;
        const user_token = jsonwebtoken_1.default.sign({ expass }, secret_code);
        // Returning user_token
        res.json(user_token);
    }
    catch (err) {
        res.json(err);
        //Status for Bad Request
        res.status(400);
    }
};
const remove = async (req, res) => {
    try {
        const removed = await store.delete(req.body.id);
        res.json(removed);
    }
    catch (err) {
        //Status for Bad Request
        res.status(400);
        res.json(err);
    }
};
const authenticator = async (req, res) => {
    try {
        const usrnm = req.body.user_name;
        const pswrd = req.body.password;
        const checked = await store.authenticate(usrnm, pswrd);
        // "checked=",checked
        if (checked == null) {
            //If null
            //Status for Bad Request
            res.status(400);
            res.send("invalid credentials");
        }
        else {
            const newOneData = jsonwebtoken_1.default.sign({ checked }, secret_code);
            res.json(newOneData);
        }
    }
    catch (err) {
        res.json(err);
        //Status for Bad Request
        res.status(400);
    }
};
function tokenCheck(req, res, next) {
    try {
        console.log("Token check");
        if (!req.headers.authorization) {
            //Status code for invalid authentication
            res.status(401);
            res.json("Permision not granted");
            return false;
        }
        const temp = req.headers.authorization;
        const dec = jsonwebtoken_1.default.verify(temp, secret_code);
        next();
    }
    catch (err) {
        //Status code for invalid authentication
        res.status(401);
        res.json(`invalid token ${err}`);
        return false;
    }
}
const userRouter = (app) => {
    app.get("/users", tokenCheck, index);
    app.post("/users", create);
    app.get("/users/:id", tokenCheck, show);
    app.post("/users/authenticate", authenticator);
};
exports.default = userRouter;
