"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://postgres:Adirav%402000@localhost/postgres"
});
const insertUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const insertquery = 'INSERT INTO users (username,email, password) VALUES ($1, $2, $3)';
        const values = ['srv', 'singhsaurav8418@gmal.com', 'abcd'];
        const res = yield client.query(insertquery, values);
        console.log(res);
    }
    catch (err) {
        console.log('Error during the insertion:', err);
    }
    finally {
        yield client.end();
    }
});
insertUsersTable();
