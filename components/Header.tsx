import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

import { IconLogIn } from '@supabase/ui'
import { IconLogOut } from '@supabase/ui'
import { IconUser } from '@supabase/ui'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cart from './Cart'


export default function Header({}) {
  const router = useRouter()
  const session = useSession()
  const supabase = useSupabaseClient()
  

  return (
    
    <div style={{ padding: '10px' }}>
      <div className="col-12">
        <div className="inline-block">
          <div className="left">
          <span onClick={ () => router.push("/") } >
            <h1 style={{ cursor: 'pointer' }}>Mi Tienda</h1>
          </span>
          </div> 
       {!session ? (
          <div className="right item-count">
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <IconLogIn 
              style={{ cursor: 'pointer' }}
              onClick={ () => router.push("/login") }
            />
          </div>
        ) : (
          <div className="right item-count">
            <IconUser 
              style={{ cursor: 'pointer' }} 
              onClick={ () => router.push("/login") }
            />&nbsp;
            <IconLogOut 
            style={{ cursor: 'pointer' }} 
            onClick={() => supabase.auth.signOut()} 
            />
            &nbsp;
            &nbsp;
            
            <Cart />
            
          </div>
        )}
      </div>
      </div>
    </div>

  )
}