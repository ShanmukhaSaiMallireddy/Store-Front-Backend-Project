//Importing the database connection
import client from "../database";

export type order={

    id:Number;

    quantity:number;

    user_id:number;

    status:string;
}

export type createOrder={

    quantity:number;

    user_id:number;

    status:string;
}

//Running the query on database and then disconnecting from the database

export class orderStore{

    async index():Promise<order[]>{

        try{

            //Opening a database connection
            const connect=await client.connect();

            //Sql command
            const sql='SELECT * FROM Orders'

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release();

            return res.rows;

        }catch(err){

            throw new Error(`OOPS!! Error : ${err}`);
        }
    }


    async create(data:createOrder):Promise<order>{
        
        try{

            // "First line"
            // In store order create with the ",data
            console.log("In oders create")

            //Opening a database connection
            const connect=await client.connect();

            //Sql command
            const sql=`INSERT INTO Orders (quantity, user_id, status) VALUES (${data.quantity}, ${data.user_id}, '${data.status}') RETURNING *;`

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release();

            return res.rows[0];

        }catch(err){

            throw new Error(`OOPS!! Error : ${err}`);
        }
    }


    async show(id:string):Promise<order[]>{
        
        try{

            console.log("in oders show")

            //Opening a database connection
            const connect=await client.connect();

            //Sql command
            const sql=`SELECT * FROM Orders WHERE id=${id}`;

            //In order show with cmd=",sql
            const res=await connect.query(sql);

            // Closes the database connection
            // After running sql cmd res=",res.rows
            connect.release();

            return res.rows;

        }catch(err){

            throw new Error(`OOPS!! Error : ${err}`);
        }
    }


   async delete(id:string):Promise<order>{

       try{


            console.log("in oders delete")

            //Opening a database connection
            const connect=await client.connect();

            //Sql command
            const sql=`DELETE FROM Orders WHERE id=${id} RETURNING *`;

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release();

            return res.rows[0];

       }catch(err){

           throw new Error(`OOPS!! Error : ${err}`);
       }
   }
}