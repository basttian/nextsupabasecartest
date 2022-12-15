import { IconShoppingCart } from '@supabase/ui'
import { Badge } from "@supabase/ui";
import Link from 'next/link'
import { useGlobalContext } from './MyCartContext'


export default function Cart(){
  const { cesta } = useGlobalContext()
  return (
    <>
      <span className="icon-badge-group">
          <div className="icon-badge-container">
          <Link href="/cesta"><span>
            <IconShoppingCart size={22}
              style={{ cursor: 'pointer' }}
            /></span>
          </Link>
            <div className="icon-badge">
             <Badge size="large">{`${cesta}`}</Badge>
            </div>
          </div>
      </span>
    </>
  );

}
