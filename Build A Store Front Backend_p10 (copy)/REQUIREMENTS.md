
# API Endpoints

#### Products

- Index 
- Show
- Create [token required]


#### Users

- Index [token required]

- Show [token required]

- Create N[token required]


#### Orders

- Current Order by user (args: user id)[token required]

## Data Shapes

""Here tried to show in Tabular Forms""

#### Product

-  id: number
- name: string
- price: number

                                   Table "public.product"
 Column |         Type          | Collation | Nullable |               Default               
--------+-----------------------+-----------+----------+-------------------------------------
 id     | integer               |           | not null | nextval('product_id_seq'::regclass)
 name   | character varying(30) |           |          | 
 price  | integer               |           |          | 




#### User

- id
- first_Name
- last_ame
- user_name
- password


table
                                  Table "public.users"
   Column   |          Type          |                     Modifiers                      
------------+------------------------+----------------------------------------------------
 id         | integer                | not null default nextval('users_id_seq'::regclass)
 first_name | character varying(50)  | 
 last_name  | character varying(50)  | 
 user_name  | character varying(30)  | 
 password   | character varying(20) | 



#### Orders
- id:number
- quantity : number
- user_id : numbber
- status : string


                                    Table "public.orders"
  Column  |         Type          | Collation | Nullable |              Default               
----------+-----------------------+-----------+----------+------------------------------------
 id       | integer               |           | not null | nextval('orders_id_seq'::regclass)
 quantity | integer               |           |          | 
 user_id  | integer               |           |          | 
 status   | character varying(20) |           |          | 


#### Orders_product

- id: number
- order_id: number
- product_id: number

                              Table "public.orders_product"
   Column   |  Type   | Collation | Nullable |                  Default                   
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('orders_product_id_seq'::regclass)
 order_id   | integer |           |          | 
 product_id | integer |           |          | 

