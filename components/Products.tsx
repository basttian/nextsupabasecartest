import { useSession } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
import { useGlobalContext } from './MyCartContext'
import { Badge } from '@supabase/ui';

export default function Products() {

  const { setCesta, xProducto, isLoading, qti } = useGlobalContext()

  /*useEffect(()=>{
    console.log(qti)
  },[xProducto])*/

  const session = useSession()
  if (isLoading) return <p>Loading...</p>
  if (!xProducto) return <p>No product found...</p>
  return (
    <>
      <div className="row">
          <div className="col-12">
          <h1>Productos</h1>
          </div>
      </div>
      <div className="row">
      {xProducto.map((value,index) =>
        <div key={index} className="col-4">
        <div className="card">
          <img className="product" src={value.img} />
          <br/>
          {value.descripcion}
          <br/>
          {value.name}
          <br/>
          ${value.price}
          <br/>
          {!session ? (
             <></>
            ) : (
          <button
            className="button block"
            onClick={() => setCesta(value.id) }
            >{ 'Añadir a la cesta' }
            &nbsp;
            <Badge size="small" color="pink">
              {/*qti[index] pintamos toda la casa... wtf*/}
              { value.quantity }
            </Badge>
          </button>
          )}
        </div>
        </div>
      )}
      </div>
    </>
  )
}
