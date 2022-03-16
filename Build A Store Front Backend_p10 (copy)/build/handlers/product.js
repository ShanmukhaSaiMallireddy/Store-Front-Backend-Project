"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new product_1.productStore();
const secret_code = process.env.TOKEN_SECRET;
//Token check function
function tokenCheck(req, res, next) {
    try {
        //Token check
        if (!req.headers.authorization) {
            //Status code for invalid authentication
            res.status(401);
            res.json("Permision is not granted");
            return false;
        }
        const temp = req.headers.authorization;
        const dec = jsonwebtoken_1.default.verify(temp, secret_code);
        next();
    }
    catch (err) {
        //Status code for invalid authentication
        res.status(401);
        res.json(`invlid token ${err}`);
        return false;
    }
}
const create = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            price: req.body.price
        };
        const nowOne = await store.create(data);
        res.json(nowOne);
    }
    catch (err) {
        res.json(err);
        //Status for Bad Request
        res.status(400);
    }
};
const show = async (req, res) => {
    try {
        const temp = req.params.id;
        const shower = await store.show(temp);
        res.json(shower);
    }
    catch (err) {
        //Status for Bad Request
        res.status(400);
        res.json(err);
    }
};
const index = async (req, res) => {
    try {
        const data = store.index();
        res.json(data);
    }
    catch (err) {
        res.json(err);
        //Status for Bad Request
        res.status(400);
    }
};
const productRouter = (app) => {
    app.get("/product/:id", show);
    app.post("/product", tokenCheck, create);
    app.get("/product", index);
};
exports.default = productRouter;
