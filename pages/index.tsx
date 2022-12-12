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
            <h1 className="header">Supabase Auth + Storage</h1>
            <p className="">
              Experience our Auth and Storage through a simple profile management example. Create a
              user profile and upload an avatar image. Fast, simple, secure.
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