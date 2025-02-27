import { AppError } from "@/errors/app-error";
import { CategoriesRepository } from "@/repositories/categories.repository";

export class CategoriesService {
  private categoriesRepository = new CategoriesRepository()
  constructor(categoriesRepository?: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository || new CategoriesRepository();
  }

  async findByName(name: string) {
    const normalizedName = name.toLowerCase() 
      .trim() 
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); 
        
    const category = await this.categoriesRepository.findByName(normalizedName);
    return category;
  }

  async findAll() {
    return this.categoriesRepository.findAll();
  }

  async create(name: string) {

    if (!name || name === "") {
      throw new AppError("Digite uma categoria.");
    };

    const categoryExists = await this.findByName(name);

    if (categoryExists) {
      throw new AppError("Essa categoria já existe.");
    };

    return this.categoriesRepository.create(name);
  }

  async delete(id: string) {
    return this.categoriesRepository.delete(id);
  }

  async update(id: string, name: string) {
    return this.categoriesRepository.update(id, name);
  }
}