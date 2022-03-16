"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_code = process.env.TOKEN_SECRET;
//Token check function
function tokenCheck(req, res, next) {
    try {
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
        res.json(`Token is invalid ${err}`);
        return false;
    }
}
const store = new order_1.orderStore();
const index = async (req, res) => {
    try {
        const data = await store.index();
        res.json(data);
    }
    catch (err) {
        res.json(err);
        //Status for Bad Request
        res.status(400);
    }
};
const create = async (req, res) => {
    try {
        const data = {
            quantity: req.body.quantity,
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const newOne = await store.create(data);
        res.json(newOne);
    }
    catch (err) {
        //Status for Bad Request
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const param = req.params.id;
        const shower = await store.show(param);
        res.json(shower);
    }
    catch (err) {
        //Status for Bad Request
        res.status(400);
        res.json(err);
    }
};
const OrderRouter = (app) => {
    app.get("/orders", index);
    app.post("/orders", tokenCheck, create);
    app.get("/orders/:id", show);
};
exports.default = OrderRouter;
