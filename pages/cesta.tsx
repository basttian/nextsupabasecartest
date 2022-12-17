// @ts-nocheck
import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Layout from "../components/Layout"
import { IconTrash2 } from '@supabase/ui'
import { Button } from '@supabase/ui'
import { useGlobalContext } from '../components/MyCartContext'

const Cesta: NextPage = () => {

  const { shoppingCart, delCesta } = useGlobalContext()

  const [trigger, setTrigger] = useState([])
  const [precioFinalProducto, setFinalPrice] = useState([])

  useEffect(() => {
    const existe:any = shoppingCart.find(p => p.id === trigger[0])
    if(existe){
      existe.quantity = 0
      existe.quantity += isNaN(trigger[1])?1:trigger[1]
      existe.totalproductprice = existe.price * existe.quantity
    }
    setFinalPrice(shoppingCart.map((el,i) => el.totalproductprice))
  }, [trigger]);

  /*Mapeo nuevamente cuando eliminado un producto de la cesta*/
  useEffect(() => {
    setFinalPrice(shoppingCart.map((el,i) => el.totalproductprice))
  }, [delCesta])


  /*Precio total*/
  const priceTot:any = shoppingCart.map((s) => s.totalproductprice);
  const sumTotal:number = priceTot.reduce((a:number, b:number) => a + b,0);


  const initializeMercadoPagopay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };


  const makePayment = async () => {
    const res = await initializeMercadoPagopay();

    if (!res) {
      alert("Mercado Pago SDK, fallo al cargar");
      return;
    }

    let mp: any = {}
    mp = new MercadoPago( process.env.MP_PUBLIC_KEY , {
      locale: 'es-AR'
    });

    let shopProduct = shoppingCart.map(el=>(
      {
        id:el.id,
        title: el.name,
        unit_price: el.price,
        quantity: el.quantity,
      }
    ))

    await fetch("/api/mercadopago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopProduct),
    }).then(function (response) {
      return response.json();
    }).then(function (preferenceid) {
      console.log(preferenceid.id)
      mp.checkout({
        preference: {
          id: preferenceid.id,
        },
        theme: {
          elementsColor: '#3FCF8E',
          headerColor: '#3FCF8E',
        },
        autoOpen: true,
      });
    })
    .catch(function () {
      alert("Error inesperado, aguarde unos momentos, si el error persiste que Dios lo ayude...\nAtte me-li mporta un..");
    });
  }

  return (
    <>
    <Layout>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
   	<h1>Cesta de productos</h1>
    {/* Verificamos si hay productos en la cesta de productos :P */}
    {shoppingCart.length === 0 ? (
    <p>No hay productos en el cesta de compras..</p>
    ):(
    <div>
    <table width="100%">
    <thead>
    <tr>
      <th>Producto</th>
      <th>Cantidad</th>
      <th>Precio Unitario</th>
      <th>Total $</th>
      <th>x</th>
    </tr>
    </thead>
    <tbody>
      {shoppingCart.map((element, index) => {
        return(
          <tr key={index}>
            <td className="td-table-l">{element.name}</td>
            <td className="td-table-c">
              <input
                type="number"
                pattern="[1-10]{10}"
                min={1}
                max={element.stock}
                step={1}
                className="input"
                value={element.quantity}
                onChange={(e)=> setTrigger([element.id, parseInt(e.target.value)]) }
                />
             </td>
            <td className="td-table-c" > ${ element.price  } </td>
            <td className="td-table-c" > ${ precioFinalProducto[index] }</td>
            <td className="td-table-c" >
              <IconTrash2
                style={{ cursor: 'pointer' }}
                onClick={ () => delCesta(index, element.id) }
              />
            </td>
          </tr>
      )})
      }
    </tbody>
    <tfoot>
      <tr>
        <td colSpan={4}><h2 className="right p-10p"> ${ typeof sumTotal.toFixed(2) === "string" && !Number.isNaN( sumTotal ) ? sumTotal.toFixed(2) : "-" } </h2></td>
      </tr>
    </tfoot>
    </table>
    <br/>
      <Button block onClick={()=>
        makePayment()
      }>Pagar</Button>
    <br/><br/><br/>
    </div>

    )}

    </div>
    </Layout>
  </>
  )
}
export default Cesta
