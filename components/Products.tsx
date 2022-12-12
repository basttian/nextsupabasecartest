import { useSession } from '@supabase/auth-helpers-react'
import { useState, useEffect} from 'react';
import { useGlobalContext } from './MyCartContext'

export default function Products() {

  const [isLoading, setLoading] = useState(false)
  const [productos, setProductos] = useState<Array<any>>([{}])

  const { shoppingCart, setCesta } = useGlobalContext()

  useEffect(() => {
    setLoading(true)
      fetch('./api/productall')
        .then((res) => res.json())
        .then((data) => {
          setProductos(data)
          setLoading(false)
      });
  },[])

  const session = useSession()
  if (isLoading) return <p>Loading...</p>
  if (!productos) return <p>No product found...</p>
  return (
    <>
      <div className="row">
          <div className="col-12">
          <h1>Productos</h1>
          </div>
      </div>
      <div className="row">
      {productos.map((value,index) =>
        <div key={index} className="col-4">
        <div className="card">
          <img className="product" src={value.img} />
          <br/>
          {value.descripcion}
          <br/>
          {value.name}
          <br/>
          {value.price}
          <br/>
          {!session ? (
             <></>
            ) : (
          <button
            key={value.id}
            className="button block"
            onClick={ () => setCesta(value.id) }

            >{ 'Agregar a la cesta' }</button>
          )}

        </div>
        </div>
      )}
      </div>
    </>
  )
}
