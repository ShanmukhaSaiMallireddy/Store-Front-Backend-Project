//Importing the database connection
import client from "../database";

export type product={

    id:Number;

    name:string;

    price:number
}

export type createProduct={

    name:string;

    price:number
}



//CRUD actions
export class productStore{

    async index(): Promise<product[]> {

        try{
            
            //Opening a database connection
            const connect=await client.connect(); 

            //Sql command
            const sql='SELECT * FROM Product' 

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release(); 

            // Returning the rows contained in the result from database query
            return res.rows; 

        }catch(err){

            throw new Error(`OOPS!! Error : ${err}`);
        }
    }

  
    
    async create(data:createProduct):Promise<product>{

        try{

            //Opening a database connection
            const connect=await client.connect();

            //Sql command
            const sql=`INSERT INTO Product (name, price) VALUES ('${data.name}', '${data.price}')  RETURNING *`

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release();

            return res.rows[0];

        }catch(err){

            throw new Error(`OOPS!! Could not add :: ${err}`);
        }
    }

    async show(id:string):Promise<product[]>{

        try{
            
            //Opening a database connection
            const connect=await client.connect();

            //Sql command
            const sql=`SELECT * FROM Product WHERE id=${id}`;

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release();

            return res.rows;

        }catch(err){

            throw new Error(`OOPS!! Error :: ${err}`);
        }
    }

   async delete(id:string):Promise<product[]>{

       try{

            //Opening a database connection
            const connect=await client.connect();

            //Sql command
            const sql=`DELETE FROM Product WHERE id=${id}`;

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release();

            return res.rows;

       }catch(err){

           throw new Error(`Could not delete!! Please check ${id}. Error is : ${err}`);
       }
   }
}