import { createContext, useContext } from "react"
export type GlobalContent = {
  cesta: number
  shoppingCart:Array<any>
  setCesta:(c:number) => void
  delCesta:(c:number) => void
}
export const MyCartContext = createContext<GlobalContent>({
cesta: 0,
shoppingCart:[],
setCesta: () => {},
delCesta: () => {},
})
export const useGlobalContext = () => useContext(MyCartContext)
