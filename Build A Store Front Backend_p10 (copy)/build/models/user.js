"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, POSTGRES_TEST, BCRYPT_PASSWORD, SALT_ROUNDS, } = process.env;
class UsersStore {
    async index() {
        try {
            console.log("in user index");
            //Opening a database connection
            const connect = await database_1.default.connect();
            const sql = 'SELECT * FROM Users';
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`OOPS!! Error : ${err}`);
        }
    }
    async show(id) {
        try {
            console.log("in users show");
            //Opening a database connection
            const connect = await database_1.default.connect();
            const sql = `SELECT * FROM Users WHERE id=${id}`;
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`OOPS!! Error :  ${err}`);
        }
    }
    async create(data) {
        try {
            console.log("in users create");
            const hash = bcrypt_1.default.hashSync(data.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            //Opening a database connection
            const connect = await database_1.default.connect();
            const sql = `INSERT INTO Users (first_name, last_name, user_name, password) VALUES ('${data.first_name}', '${data.last_name}', '${data.user_name}', '${hash}') RETURNING *;`;
            // In user create with, sql
            const res = await connect.query(sql);
            // Closes the database connection
            // After ruuning sql command res=",res.rows[0]
            connect.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`OOPS!! Error : ${err}`);
        }
    }
    async delete(id) {
        try {
            console.log("in users delete");
            //Opening a database connection
            const connect = await database_1.default.connect();
            const sql = `DELETE FROM Users WHERE id=${id}`;
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            return true;
        }
        catch (err) {
            throw new Error(`OOPS Error!! :  ${err}`);
        }
    }
    async authenticate(user_name, password) {
        try {
            //Opening a database connection
            // In users authenticate
            const connect = await database_1.default.connect();
            const sql = `SELECT * FROM Users WHERE user_name='${user_name}'`;
            const res = await connect.query(sql);
            // Closes the database connection
            connect.release();
            const selectedLength = res.rows.length;
            // Authenticate res=",res.rows,"len=",selectedLength
            if (selectedLength > 0) {
                const ans = res.rows[0];
                const flag = bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, ans.password);
                if (flag) {
                    //If flag
                    return ans;
                }
            }
            // Returning null
            return null;
        }
        catch (err) {
            throw new Error(`OOPS!! Error :  ${err}`);
        }
    }
}
exports.UsersStore = UsersStore;
