import { NextResponse } from "next/server";
import { AppError } from "@/errors/app-error";

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }

  console.error("Erro inesperado no backend:", error);
  return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
}