import type { Product } from "../models/Product";

export interface ProductResponseApi {
    limit: number;
    skip: number;
    total: number;
    products: Product[];
    ok: boolean;
    status: number;
}