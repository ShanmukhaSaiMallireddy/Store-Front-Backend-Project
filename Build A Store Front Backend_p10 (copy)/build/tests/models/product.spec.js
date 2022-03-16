"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const store = new product_1.productStore();
const test1 = {
    name: "laptop",
    price: 99999
};
describe("check product", () => {
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
    let newOne;
    beforeAll(async () => {
        newOne = await store.create(test1);
    });
    describe("check working", () => {
        it("check create", () => {
            expect(newOne.price).toEqual(99999);
        });
        it("check index", async () => {
            const data = await store.index();
            expect(data[0].name).toEqual("laptop");
        });
        it("check show", async () => {
            const data = await store.show("1");
            expect(data[0].price).toEqual(99999);
        });
    });
});
