"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const store = new order_1.orderStore();
const temp = (0, supertest_1.default)(server_1.default);
describe("check api for orders", () => {
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
    it("check create order api", async () => {
        const ans = await temp.post("/orders").set("Authorization", token).send({
            user_id: 1,
            quantity: 4,
            status: "active"
        });
        expect(ans.status).toBe(200);
    });
    it("check order index", async () => {
        const oerderIndex = await temp.get("/orders");
        console.log("Ordr index api is : ", oerderIndex.body);
        expect(oerderIndex.status).toBe(200);
    });
    it("check show api", async () => {
        const ordrshow = await temp.get("/orders/55");
        console.log(ordrshow.body);
        expect(ordrshow.body.length).toEqual(0);
        expect(ordrshow.status).toBe(200);
    });
});
