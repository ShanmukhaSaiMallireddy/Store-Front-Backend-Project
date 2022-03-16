import express,{NextFunction, Request,Response} from "express";

import { UsersStore,User } from "../models/user";

import jwt, { Secret } from "jsonwebtoken";

const store=new UsersStore();

const secret_code=process.env.TOKEN_SECRET as Secret;


const index=async(req:Request,res:Response)=>{

    try{

        const shower=await store.index();
        
        res.json(shower);

    }catch(err){

        //Status for Bad Request
        res.status(400)

        res.json(err)
    }
}

const show=async(req:Request,res:Response)=>{

    try{
        console.log("Show with the id in handler user ",req.params.id);

        const shower=await store.show(req.params.id);

        res.json(shower)

    }catch(err){

        //Status for Bad Request
        res.status(400)

        res.json(err)
    }
    
}

const create=async(req:Request,res:Response)=>{

    try{

        const user:User={

            first_name:req.body.first_name,

            last_name:req.body.last_name,

            user_name:req.body.user_name,

            password:req.body.password
        }

        // user
        let newOne=await store.create(user);

        // newOne.password
        const expass=newOne.password

        const user_token =jwt.sign({expass},secret_code);

        // Returning user_token
        res.json(user_token);

    }catch(err){

        res.json(err)

        //Status for Bad Request
        res.status(400)
    }
}


const remove=async(req:Request,res:Response)=>{

    try{
        
        const removed=await store.delete(req.body.id);

        res.json(removed);

    }catch(err){

        //Status for Bad Request
        res.status(400)

        res.json(err)

    }

    
}

const authenticator=async(req:Request,res:Response)=>{

    try{

        const usrnm=req.body.user_name;

        const pswrd=req.body.password as string;

        const checked=await store.authenticate(usrnm,pswrd);

        // "checked=",checked
        if(checked==null){

            //If null
            //Status for Bad Request
            res.status(400);

            res.send("invalid credentials");
        }
        else{

            const newOneData =jwt.sign({checked},secret_code);

            res.json(newOneData);
        }
    }catch(err){

        res.json(err)

        //Status for Bad Request
        res.status(400)
    }
}

function tokenCheck(req:Request,res:Response,next:NextFunction){

    try{

        console.log("Token check");

        if(!req.headers.authorization){

            //Status code for invalid authentication
            res.status(401)

            res.json("Permision not granted")

            return false;
        }

        const temp:string=req.headers.authorization as string;
        
        const dec=jwt.verify(temp,secret_code)

        next();

    }catch(err){

        //Status code for invalid authentication
        res.status(401);

        res.json(`invalid token ${err}`)

        return false;
    }
}

const userRouter=(app:express.Application)=>{

    app.get("/users",tokenCheck,index);

    app.post("/users",create);

    app.get("/users/:id",tokenCheck,show);
    
    app.post("/users/authenticate",authenticator);
}

export default userRouter;