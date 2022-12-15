import '../styles/globals.css'
import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import {MyCartContext} from '../components/MyCartContext'
import { useGlobalContext } from '../components/MyCartContext'

function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  const { shoppingCart } = useGlobalContext()
  const [cesta, setCestaContent ]  = useState(0)
  const [xProducto, setXProducto] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [qti, setQti] = useState([])

  useEffect(()=>{
    setLoading(true)
    fetch('./api/productall')
      .then((res) => res.json())
      .then((data) => {
        const addproductsobjqti = data.map(
          (objs) => { objs['quantity'] = 0; return objs
        })
        setXProducto(addproductsobjqti)
        setLoading(false)
    });
  },[])


  const setCesta = (idproduct:number) => {
        const existe = shoppingCart.find(p => p.id === idproduct)
        if (existe) {
          existe.quantity++
          existe.totalproductprice = existe.price * existe.quantity
        }else{
          let found = xProducto.find(({ id }) => id === idproduct)
          found.quantity = 1
          found.totalproductprice = found.price * found.quantity
          shoppingCart.push(found)
        }
        setCestaContent(shoppingCart.length)
        //Object.assign(data, shoppingCart)
        //setXProducto(data)
        setQti(xProducto.map(el=>el.quantity))
  }


  const delCesta = (indexproductcart, idproduct) => {
    shoppingCart.splice(indexproductcart,1);
    setCestaContent(shoppingCart.length)
    let found = xProducto.find(p => p.id === idproduct)
    found.quantity = 0
  }

  return (
    <MyCartContext.Provider value= {
      {
        cesta,
        setCesta,
        shoppingCart,
        delCesta,
        xProducto,
        isLoading,
        qti,
      }
    }>
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
    </MyCartContext.Provider>
  )
}

export default App
