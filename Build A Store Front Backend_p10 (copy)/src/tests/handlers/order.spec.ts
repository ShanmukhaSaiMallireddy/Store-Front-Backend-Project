import { orderStore } from "../../models/order";

import supertest from "supertest";

import app from "../../server";

import { Request } from "express";


const store=new orderStore();

const temp=supertest(app);

describe("check api for orders",()=>{

    let token:string;

    beforeAll(async()=>{

       const ans=await temp.post("/users").set({

            'Content-type': 'application/json',

        }).send({

            user_name:"sample_user",

            first_name:"shanmukh",

            last_name:"sai",

            password:"password123"
        })

        token=ans.body;
    })
    it("check create order api",async ()=>{

        const ans=await temp.post("/orders").set("Authorization",token).send({

            user_id:1,

            quantity:4,

            status:"active"

        })

        expect(ans.status).toBe(200)
    })


    it("check order index",async()=>{

        const oerderIndex=await temp.get("/orders")

        console.log("Ordr index api is : ",oerderIndex.body)

        expect(oerderIndex.status).toBe(200)
    })

    it("check show api",async()=>{

        const ordrshow=await temp.get("/orders/55")

        console.log(ordrshow.body)

        expect(ordrshow.body.length).toEqual(0)

        expect(ordrshow.status).toBe(200)
    })

    
})
