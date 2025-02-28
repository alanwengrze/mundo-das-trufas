"use client"

import { Input } from "./ui/input"
import swr from "swr"
export function InputFindByName() {
  return(
    <Input 
        className=" lg:w-1/2 my-4" 
        placeholder="Busque por um produto"
        type="search"
        name="search" 
      />
  )
}