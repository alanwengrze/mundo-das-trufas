import { config } from "@/config/config";
import Stripe from "stripe";

export const stripe = new Stripe(config.stripe.secretKey!, {
  apiVersion:"2024-12-18.acacia",
  appInfo: {
    name: "Mundo das Trufas",
  }
})