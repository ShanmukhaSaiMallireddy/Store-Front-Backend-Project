import { json } from "body-parser";

import { createProduct, product, productStore } from "../models/product";

import express,{NextFunction, Request,Response} from "express";

import jwt, { Secret } from "jsonwebtoken";


const store=new productStore();

const secret_code=process.env.TOKEN_SECRET as Secret;

//Token check function
function tokenCheck(req:Request,res:Response,next:NextFunction){

    try{

        //Token check
        if(!req.headers.authorization){

            //Status code for invalid authentication
            res.status(401)

            res.json("Permision is not granted")

            return false;
        }

        const temp:string=req.headers.authorization as string;
        
        const dec=jwt.verify(temp,secret_code)

        next();

    }catch(err){

        //Status code for invalid authentication
        res.status(401);

        res.json(`invlid token ${err}`)

        return false;
    }
}




const create=async(req:Request,res:Response)=>{

    try{

        const data:createProduct={

            name:req.body.name,

            price:req.body.price
        }

        const nowOne=await store.create(data);

        res.json(nowOne);

    }catch(err){

        res.json(err)

        //Status for Bad Request
        res.status(400);
    }
}

const show=async (req:Request,res:Response)=>{

    try{

        const temp=req.params.id;

        const shower=await store.show(temp);

        res.json(shower);

    }catch(err){

        //Status for Bad Request
        res.status(400)

        res.json(err)
    }
}

const index=async (req:Request,res:Response)=>{

    try{

        const data=store.index()

        res.json(data);

    }catch(err){

        res.json(err)

        //Status for Bad Request
        res.status(400)
    }
}

const productRouter=(app:express.Application)=>{

    app.get("/product/:id",show);

    app.post("/product",tokenCheck,create);

    app.get("/product",index)
}

export default productRouter;