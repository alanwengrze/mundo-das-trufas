import { CategoriesService } from "@/services/categories.service";
import { handleError } from "@/middlewares/error-handler";
import { AppError } from "@/errors/app-error";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  console.log(req);
  const id = (await params).id;
  const categoriesService = new CategoriesService();
  
  try {
  
    if (!id) {
      throw new AppError("id ausente");
    }

    await categoriesService.delete(id!);

    return NextResponse.json({ message: "Categoria removida com sucesso." }, { status: 200 });
  }catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  
  const id = (await params).id;
  const { name } = await request.json();
  const categoriesService = new CategoriesService();

  try {
    
    if (!id) {
      throw new AppError("id ausente");
    }

    await categoriesService.update(id, name);

    return NextResponse.json({ message: "Categoria atualizada com sucesso." }, { status: 200 });
  }catch (error) {
    return handleError(error);
  }
}