import { Client } from 'pg'

const client = new Client({
    connectionString: "postgresql://postgres:Adirav%402000@localhost/postgres"
})


const insertUsersTable = async () => {
    try {
       await client.connect();
         const insertquery = 'INSERT INTO users (username,email, password) VALUES ($1, $2, $3)';
        const values = ['srv', 'singhsaurav8418@gmal.com', 'abcd'];
        const res = await client.query(insertquery, values);
        console.log(res);
    
    } catch (err) {
        console.log('Error during the insertion:', err);
    } finally {
        await client.end();
    }
}

insertUsersTable();