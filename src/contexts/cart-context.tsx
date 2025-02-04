import { useContext, createContext, useEffect, useState } from "react";
import { ItemCartType } from "@/schemas/itemCart.schema";
interface CartContextType {
  cart: ItemCartType[];
  setCart: any;
}

export const CartContext = createContext({} as CartContextType);