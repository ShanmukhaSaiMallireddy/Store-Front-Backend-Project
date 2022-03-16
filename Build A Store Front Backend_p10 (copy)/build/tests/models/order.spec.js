"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const store = new order_1.orderStore();
const test1 = {
    quantity: 4,
    user_id: 1,
    status: "active",
};
describe("order table ", () => {
    let newOne;
    beforeAll(async () => {
        newOne = await store.create(test1);
    });
    describe("check declararion", () => {
        it("check create", () => {
            expect(store.create).toBeDefined();
        });
        it("check show", () => {
            expect(store.index).toBeDefined();
        });
        it("check show", () => {
            expect(store.show).toBeDefined();
        });
    });
    describe("check working", () => {
        it("check create", async () => {
            const data = {
                quantity: newOne.quantity,
                user_id: newOne.user_id,
                status: newOne.status,
            };
            expect(data.status).toEqual(test1.status);
        });
        it("check index", async () => {
            const temp = await store.index();
            const test1 = {
                quantity: 4,
                user_id: 1,
                status: "active",
            };
            expect(temp[0].quantity).toEqual(test1.quantity);
        });
        it("check show", async () => {
            const temp = await store.show("1");
            if (temp) {
                expect(temp[0].user_id).toEqual(test1.user_id);
            }
        });
    });
});
