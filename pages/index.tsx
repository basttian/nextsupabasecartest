import type { NextPage } from 'next'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import Layout from "../components/Layout"
import Products from '../components/Products'

const Home: NextPage = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  return (
    <>
    <Layout >
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <div className="row">
          <div className="col-6">
            <h1 className="header">Supabase Auth + Storage + Shopping cart</h1>
          </div>
          <div className="col-6">
            <br/>
            <p>
            Experimente nuestra autenticación y almacenamiento a través de un ejemplo simple de administración de perfiles. Crear un perfil de usuario y cargue una imagen de avatar. Agregue productos al carrito Rápido, sencillo.
            </p>
          </div>
        </div>
      ) : (
        <>
        </>
      )}
      <Products />
      <br/><br/><br/><br/><br/>
    </div>
    </Layout>
  </>
  )
}

export default Home
