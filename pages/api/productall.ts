import type { NextApiRequest, NextApiResponse } from "next";

export interface Product{
  id:number;
  img:string;
  descripcion:string;
  name:string;
  price:number;
  stock:number;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const data:Product[] = [
    {id:1,name:"Telefono Apple",price:185,stock:10,descripcion:"Sin descripcion",img:"https://i.imgur.com/sPxEkEI.jpg"},
    {id:2,name:"Telefono Sansung",price:550,stock:10,descripcion:"Sin descripcion",img:"https://i.imgur.com/x1IZjjy.jpg"},
    {id:3,name:"Telefono LG",price:750,stock:10,descripcion:"Sin descripcion",img:"https://i.imgur.com/ruU04I6.jpg"},
    {id:4,name:"Telefono Nokia",price:350,stock:10,descripcion:"Sin descripcion",img:"https://i.imgur.com/Jv8IWKQ.jpg"},
    {id:5,name:"Telefono Huawei",price:250,stock:10,descripcion:"Sin descripcion",img:"https://i.imgur.com/MpLejRu.jpg"},
    {id:6,name:"Telefono Motorola",price:630,stock:10,descripcion:"Sin descripcion",img:"https://i.imgur.com/S3Umfmb.jpg"},
    {id:7,name:"Telefono Philco",price:960,stock:10,descripcion:"Sin descripcion",img:"https://i.imgur.com/SZmPJ7W.jpg"},
   ]

  res.send(data)

}
