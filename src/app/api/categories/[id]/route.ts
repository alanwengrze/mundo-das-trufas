import { CategoriesService } from "@/services/categories.service";
import { handleError } from "@/middlewares/error-handler";
import { AppError } from "@/errors/app-error";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const categoriesService = new CategoriesService();

    if (!id) {
      throw new AppError("id ausente");
    }

    await categoriesService.delete(id!);

    return NextResponse.json({ message: "Categoria removida com sucesso." }, { status: 200 });
  }catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    const { name } = await request.json();
    const categoriesService = new CategoriesService();

    if (!id) {
      throw new AppError("id ausente");
    }

    await categoriesService.update(id, name);

    return NextResponse.json({ message: "Categoria atualizada com sucesso." }, { status: 200 });
  }catch (error) {
    return handleError(error);
  }
}