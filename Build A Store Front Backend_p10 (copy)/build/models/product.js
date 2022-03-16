"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
//Importing the database connection
const database_1 = __importDefault(require("../database"));
//CRUD actions
class productStore {
    async index() {
        try {
            //Opening a database connection
            const connect = await database_1.default.connect();
            //Sql command
            const sql = 'SELECT * FROM Product';
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            // Returning the rows contained in the result from database query
            return res.rows;
        }
        catch (err) {
            throw new Error(`OOPS!! Error : ${err}`);
        }
    }
    async create(data) {
        try {
            //Opening a database connection
            const connect = await database_1.default.connect();
            //Sql command
            const sql = `INSERT INTO Product (name, price) VALUES ('${data.name}', '${data.price}')  RETURNING *`;
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`OOPS!! Could not add :: ${err}`);
        }
    }
    async show(id) {
        try {
            //Opening a database connection
            const connect = await database_1.default.connect();
            //Sql command
            const sql = `SELECT * FROM Product WHERE id=${id}`;
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`OOPS!! Error :: ${err}`);
        }
    }
    async delete(id) {
        try {
            //Opening a database connection
            const connect = await database_1.default.connect();
            //Sql command
            const sql = `DELETE FROM Product WHERE id=${id}`;
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`Could not delete!! Please check ${id}. Error is : ${err}`);
        }
    }
}
exports.productStore = productStore;
