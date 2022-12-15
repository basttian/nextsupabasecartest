import type { NextApiRequest, NextApiResponse } from "next";

export type GlobalProduct = {
  id:number
  img:string
  descripcion:string
  name:string
  price:number
  stock:number
}

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
    {id:1,name:"Producto A",price:185,stock:10,descripcion:"Descripcion producto A",img:"https://i.imgur.com/sPxEkEI.jpg"},
    {id:2,name:"Producto B",price:550,stock:10,descripcion:"Descripcion producto B",img:"https://i.imgur.com/x1IZjjy.jpg"},
    {id:3,name:"Producto C",price:750,stock:10,descripcion:"Descripcion producto C",img:"https://i.imgur.com/ruU04I6.jpg"},
    {id:4,name:"Producto D",price:350,stock:10,descripcion:"Descripcion producto D",img:"https://i.imgur.com/Jv8IWKQ.jpg"},
    {id:5,name:"Producto E",price:250,stock:10,descripcion:"Descripcion producto E",img:"https://i.imgur.com/MpLejRu.jpg"},
    {id:6,name:"Producto F",price:630,stock:10,descripcion:"Descripcion producto F",img:"https://i.imgur.com/S3Umfmb.jpg"},
    {id:7,name:"Producto G",price:960,stock:10,descripcion:"Descripcion producto G",img:"https://i.imgur.com/SZmPJ7W.jpg"},
   ]

  res.send(data)

}
