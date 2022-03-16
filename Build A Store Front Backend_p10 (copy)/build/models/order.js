"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
//Importing the database connection
const database_1 = __importDefault(require("../database"));
//Running the query on database and then disconnecting from the database
class orderStore {
    async index() {
        try {
            //Opening a database connection
            const connect = await database_1.default.connect();
            //Sql command
            const sql = 'SELECT * FROM Orders';
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`OOPS!! Error : ${err}`);
        }
    }
    async create(data) {
        try {
            // "First line"
            // In store order create with the ",data
            console.log("In oders create");
            //Opening a database connection
            const connect = await database_1.default.connect();
            //Sql command
            const sql = `INSERT INTO Orders (quantity, user_id, status) VALUES (${data.quantity}, ${data.user_id}, '${data.status}') RETURNING *;`;
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`OOPS!! Error : ${err}`);
        }
    }
    async show(id) {
        try {
            console.log("in oders show");
            //Opening a database connection
            const connect = await database_1.default.connect();
            //Sql command
            const sql = `SELECT * FROM Orders WHERE id=${id}`;
            //In order show with cmd=",sql
            const res = await connect.query(sql);
            // Closes the database connection
            // After running sql cmd res=",res.rows
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`OOPS!! Error : ${err}`);
        }
    }
    async delete(id) {
        try {
            console.log("in oders delete");
            //Opening a database connection
            const connect = await database_1.default.connect();
            //Sql command
            const sql = `DELETE FROM Orders WHERE id=${id} RETURNING *`;
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`OOPS!! Error : ${err}`);
        }
    }
}
exports.orderStore = orderStore;
