import request from "superagent";

import supertest from "supertest";

import { UsersStore } from "../../models/user";

import app from "../../server";



const store = new UsersStore();

const temp=supertest(app);

describe("check user handler api",()=>{

    //In the user handler
    let ans:request.Response;

    let token:string;
    
    beforeAll(async()=>{

        ans=await temp.post("/users").set({

            'Content-type': 'application/json',

        }).send({

            first_name:"shanmukh",

            last_name:"sai",

            user_name:"dev_user",

            password:"password123"
        })
        
        token=ans.body;
    })
    it("check  user hanlder api create",async()=>{
 
        expect(ans.status).toBe(200)

        console.log("answer : ",ans.body);

        
    })

    it("check user handler api index",async()=>{

        console.log("main token is : ",token)

        const ans=await temp.get("/users").set("Authorization",token);

        console.log("In user get the user with the token",ans.body)

        expect(ans.status).toBe(200)
    })

  
    it("check users handler show",async()=>{

        console.log("main token is : ",token)

        const ans=await temp.get("/users/1").set("Authorization",token);

        console.log("In user get the user with the token",ans.body)

        expect(ans.status).toBe(200)
    })

    it("check user handler api authenticator", async()=>{

        const ans = await temp.post("/users/authenticate").set({

            'Content-type': 'application/json',
            
        }).send({

            user_name:"dev_user",

            password:"password123"
        })

        expect(ans.status).toBe(200);
    })
    
})