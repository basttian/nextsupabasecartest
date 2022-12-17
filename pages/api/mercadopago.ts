// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from "next";
import { NextRouter } from 'next/router'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  router: NextRouter
) {

  if (req.method === "POST") {
    // SDK de Mercado Pago
    const mercadopago = require("mercadopago");

    // Agrega credenciales
    mercadopago.configure({
      sandbox: true,
      access_token: process.env.MP_ACCESS_TOKEN,
    });

    const orderData = req.body.map(el => el)

    let preference = {
      items:orderData,
      /*payer: {
        name: "Diego Sebastian",
        surname: "Jofre",
        email: "sebastianjof@gmail.com",
        date_created: "2022-12-17T09:32:41.425-04:00",
        phone: {
          area_code: "2664",
          number: "44x03xx0"
        },
        identification: {
          type: "DNI",
          number: "26x5x8x5"
        },
        address: {
          street_name: "Almirante Brown",
          street_number: "1043",
          zip_code: "5700"
        }
      },*/
      back_urls: {
        "success": `${process.env.NEXT_URL}/feedback`,
        "failure": `${process.env.NEXT_URL}/feedback`,
        "pending": `${process.env.NEXT_URL}/feedback`
      },
      auto_return: "approved",
    };

    try {
      await mercadopago.preferences.create(preference)
        .then(function (response) {
          res.json({
            id: response.body.id
          });
        }).catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      res.send({
         error: err,
      })
    }

    router.push({
      pathname: '/feedback/[pid]',
      query: {
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
      },
    })


  }else {
    // Handle any other HTTP method
  }
}
