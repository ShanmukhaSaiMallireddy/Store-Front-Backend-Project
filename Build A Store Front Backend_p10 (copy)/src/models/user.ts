import bcrypt from "bcrypt";
import client from "../database";
import dotenv from "dotenv";

dotenv.config()

const {

    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
    POSTGRES_TEST,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,

}=process.env;

export type User={

    first_name:string;

    last_name:string;

    user_name:string

    password:string;

}

export type newUser={

    id:number,

    first_name:string,

    last_name:string,

    user_name:string,

    password:string;

}


export type showUser={

    id:number,

    first_name:string,

    last_name:string,

    user_name:string
}

export class UsersStore{

    async index():Promise<showUser[]>{

        try{

            console.log("in user index")

            //Opening a database connection
            const connect=await client.connect();

            const sql='SELECT * FROM Users'

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release();

            return res.rows;

        }catch(err){

            throw new Error(`OOPS!! Error : ${err}`);
        }
    }

    

    async show(id:string):Promise<showUser>{

        try{

            console.log("in users show")

            //Opening a database connection
            const connect=await client.connect();

            const sql=`SELECT * FROM Users WHERE id=${id}`;

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release();

            return res.rows[0];

        }catch(err){

            throw new Error(`OOPS!! Error :  ${err}`);
        }
    }


    async create(data:User):Promise<newUser>{

        try{

            console.log("in users create")

            const hash=bcrypt.hashSync(data.password+BCRYPT_PASSWORD,parseInt(SALT_ROUNDS as string))

            //Opening a database connection
            const connect=await client.connect();

            const sql=`INSERT INTO Users (first_name, last_name, user_name, password) VALUES ('${data.first_name}', '${data.last_name}', '${data.user_name}', '${hash}') RETURNING *;`

            // In user create with, sql
            const res=await connect.query(sql);

            // Closes the database connection
            // After ruuning sql command res=",res.rows[0]
            connect.release();

            return res.rows[0];

        }catch(err){
            
            throw new Error(`OOPS!! Error : ${err}`);
        }
    }


    async delete(id:string):Promise<boolean>{

        try{

            console.log("in users delete")

            //Opening a database connection
             const connect=await client.connect();

             const sql=`DELETE FROM Users WHERE id=${id}`;

             const res=await connect.query(sql);

             // Closes the database connection
             connect.release();

             return true;

        }catch(err){

            throw new Error(`OOPS Error!! :  ${err}`);
        }
    }

    async authenticate(user_name:string, password:string):Promise<User|null>{
        try{

         
            //Opening a database connection
            // In users authenticate
            const connect=await client.connect();

            const sql=`SELECT * FROM Users WHERE user_name='${user_name}'`;

            const res=await connect.query(sql);

            // Closes the database connection
            connect.release();

            const selectedLength=res.rows.length;

            // Authenticate res=",res.rows,"len=",selectedLength
            if(selectedLength>0){

                const ans=res.rows[0]

                const flag=bcrypt.compareSync(password+BCRYPT_PASSWORD,ans.password)

                if(flag)
                {
                    //If flag
                    return ans;
                }
            }

            // Returning null
            return null;

        }catch(err){

            throw new Error(`OOPS!! Error :  ${err}`)
        }
    }
}