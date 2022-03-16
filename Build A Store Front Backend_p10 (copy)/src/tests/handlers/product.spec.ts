import { productStore } from "../../models/product";

import supertest from "supertest";

import app from "../../server";


const store=new productStore();

const temp=supertest(app);

describe("check api for product",()=>{

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

    it("check create product api",async ()=>{

        const ans=await temp.post("/product").set("Authorization",token).send({

           name:"laptop",

           price:99999
           
        })

        expect(ans.status).toBe(200)
    })

   

    it("check product index",async()=>{

        const ans=await temp.get("/product")

        expect(ans.status).toBe(200)
    })

    it("check show api",async()=>{

        const ans=await temp.get("/product/1")

        //product show with id =1 ,ans.body
        expect(ans.status).toBe(200)
    })
})
