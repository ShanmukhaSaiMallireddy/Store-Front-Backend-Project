import { createOrder, order, orderStore } from "../models/order";

import express,{NextFunction, Request,Response} from "express";

import jwt, { Secret } from "jsonwebtoken";

const secret_code=process.env.TOKEN_SECRET as Secret;

//Token check function
function tokenCheck(req:Request,res:Response,next:NextFunction){

    try{

        if(!req.headers.authorization){

            //Status code for invalid authentication
            res.status(401)

            res.json("Permision not granted")

            return false;
        }

        const temp:string=req.headers.authorization as string;
        
        const dec = jwt.verify(temp,secret_code)

        next();

    }catch(err){

        //Status code for invalid authentication
        res.status(401);

        res.json(`Token is invalid ${err}`)

        return false;
    }
}


const store=new orderStore();

const index=async (req:Request,res:Response)=>{

    try{

        const data=await store.index();

        res.json(data);

    }catch(err){

        res.json(err);
        
        //Status for Bad Request
        res.status(400);
    }
}


const create=async(req:Request,res:Response)=>{

    try{

        const data:createOrder={

            quantity: req.body.quantity,

            user_id: req.body.user_id,

            status: req.body.status,
        }

        const newOne=await store.create(data);

        res.json(newOne);

    }catch(err){

        //Status for Bad Request
        res.status(400);

        res.json(err);
    }
}

const show=async (req:Request,res:Response)=>{

    try{

        const param=req.params.id;

        const shower=await store.show(param);

        res.json(shower)

    }catch(err){

        //Status for Bad Request
        res.status(400)

        res.json(err);
    }
}

const OrderRouter=(app:express.Application)=>{

    app.get("/orders",tokenCheck,index);

    app.post("/orders",tokenCheck,create);

    app.get("/orders/:id",tokenCheck,show);

}

export default OrderRouter;