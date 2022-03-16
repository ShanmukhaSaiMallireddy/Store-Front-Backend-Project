"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const store = new product_1.productStore();
const temp = (0, supertest_1.default)(server_1.default);
describe("check api for product", () => {
    let token;
    beforeAll(async () => {
        const ans = await temp.post("/users").set({
            'Content-type': 'application/json',
        }).send({
            user_name: "sample_user",
            first_name: "shanmukh",
            last_name: "sai",
            password: "password123"
        });
        token = ans.body;
    });
    it("check create product api", async () => {
        const ans = await temp.post("/product").set("Authorization", token).send({
            name: "laptop",
            price: 99999
        });
        expect(ans.status).toBe(200);
    });
    it("check product index", async () => {
        const ans = await temp.get("/product");
        expect(ans.status).toBe(200);
    });
    it("check show api", async () => {
        const ans = await temp.get("/product/1");
        //product show with id =1 ,ans.body
        expect(ans.status).toBe(200);
    });
});
