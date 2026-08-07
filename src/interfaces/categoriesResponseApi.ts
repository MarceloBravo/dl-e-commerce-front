export interface CategoriesResponseApi {
  data: {
    name: string;
    slug: string;
    url: string;
  }[];
  ok: boolean;
  status: number;
}
