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

  const setCesta = (product:number) => {
      fetch('./api/productall')
        .then((res) => res.json())
        .then((data) => {
        const found = data.find(({ id }) => id === product)
          found.quantity = 1
          found.totalproductprice = found.price * found.quantity
        const existe = shoppingCart.find(p => p.id === product)
        if (existe) {
          existe.quantity++
          existe.totalproductprice = existe.price * existe.quantity
        }else{
          shoppingCart.push(found)
        }
        setCestaContent(shoppingCart.length)
      });
    }

  const delCesta = (product:number) => {
    shoppingCart.splice(product,1);
    setCestaContent(shoppingCart.length)
  }


  return (
    <MyCartContext.Provider value= {
      {
      cesta,
      setCesta,
      shoppingCart,
      delCesta,
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
