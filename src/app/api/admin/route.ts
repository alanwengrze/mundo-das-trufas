import { auth } from "@/auth"
import { NextResponse } from "next/server"
 
export const GET = auth(function GET(req) {
  if(req.auth?.user.role !== "ADMIN") return NextResponse.json({ message: "Not authorized" }, { status: 403 })
  return NextResponse.json({ message: "Admin route" }, { status: 200 })
})