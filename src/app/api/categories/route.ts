import { NextResponse, NextRequest } from "next/server";
import { handleError } from "@/middlewares/error-handler";
import { CategoriesService } from "@/services/categories.service";
export async function GET() {
  const categoriesService = new CategoriesService();
  try {
    const categories = await categoriesService.findAll();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  const categoriesService = new CategoriesService();

  try {
    const category = await categoriesService.create(name);

    return NextResponse.json(category, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 500 });
  }
}