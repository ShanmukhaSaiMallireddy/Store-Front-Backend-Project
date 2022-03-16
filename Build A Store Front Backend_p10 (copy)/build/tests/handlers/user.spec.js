"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../../models/user");
const server_1 = __importDefault(require("../../server"));
const store = new user_1.UsersStore();
const temp = (0, supertest_1.default)(server_1.default);
describe("check user handler api", () => {
    //In the user handler
    let ans;
    let token;
    beforeAll(async () => {
        ans = await temp.post("/users").set({
            'Content-type': 'application/json',
        }).send({
            first_name: "shanmukh",
            last_name: "sai",
            user_name: "dev_user",
            password: "password123"
        });
        token = ans.body;
    });
    it("check  user hanlder api create", async () => {
        expect(ans.status).toBe(200);
        console.log("answer : ", ans.body);
    });
    it("check user handler api index", async () => {
        console.log("main token is : ", token);
        const ans = await temp.get("/users").set("Authorization", token);
        console.log("In user get the user with the token", ans.body);
        expect(ans.status).toBe(200);
    });
    it("check users handler show", async () => {
        console.log("main token is : ", token);
        const ans = await temp.get("/users/1").set("Authorization", token);
        console.log("In user get the user with the token", ans.body);
        expect(ans.status).toBe(200);
    });
    it("check user handler api authenticator", async () => {
        const ans = await temp.post("/users/authenticate").set({
            'Content-type': 'application/json',
        }).send({
            user_name: "dev_user",
            password: "password123"
        });
        expect(ans.status).toBe(200);
    });
});
