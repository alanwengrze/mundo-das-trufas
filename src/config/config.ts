import { env } from "process"

export const config = {
  stripe : {
    publicKey: env.STRIPE_PUBLIC_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY
  }
}