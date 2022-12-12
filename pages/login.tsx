import type { NextPage } from 'next'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

import Layout from "../components/Layout"

const Login: NextPage = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <>
    <Layout>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <div className="row">
          <div className="col-6">
            <h1 className="header">Supabase Auth + Storage + Shopping cart</h1>
            <p className="">
            Experimente nuestra autenticación y almacenamiento a través de un ejemplo simple de administración de perfiles. Crear un perfil de usuario y cargue una imagen de avatar. Agregue productos al carrito Rápido, sencillo.
            </p>
          </div>
          <div className="col-6 auth-widget">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
          </div>
        </div>
      ) : (
        <>
          <h3>Account</h3>
          <Account session={session} />
        </>
      )}
    </div>
    </Layout>
    </>
  )
}

export default Login
