import { prisma } from "@/lib/prisma";

export class CategoriesRepository {

  async findByName(name: string) {
    const category = await prisma.category.findFirst({ where: { name } });
    return category
  }

  async findById(id: string){
    const category = await prisma.category.findUnique({
      where: { id }
    });
    return category
  }

  async findAll() {
    const categories = await prisma.category.findMany();
    return categories
  }

  async create(name: string) {
    const category = await prisma.category.create({ data: { name } });
    return category
  }

  async delete(id: string) {
    const category = await prisma.category.delete({ where: { id } });
    return category
  }

  async update(id: string, name: string) {
    const category = await prisma.category.update({ where: { id }, data: { name } });
    return category
  }
}