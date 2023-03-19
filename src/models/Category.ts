import { CustomResponse } from "./user";

export interface Category {
  _id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse extends CustomResponse {
  categories: Array<Category>;
  count: number;
}
