import { createContext, useContext } from "react"
export type GlobalContent = {
  cesta: number
  shoppingCart:Array<any>
  setCesta:(c:number) => void
  delCesta:(a:number,b:number) => void
  xProducto:Array<any>
  isLoading:boolean
  qti:Array<any>

}
export const MyCartContext = createContext<GlobalContent>({
cesta: 0,
shoppingCart:[],
setCesta: () => {},
delCesta: () => {},
xProducto:[],
isLoading:false,
qti:[],

})
export const useGlobalContext = () => useContext(MyCartContext)
