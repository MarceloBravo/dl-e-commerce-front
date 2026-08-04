import type { dimensions } from "../interfaces/dimensions";
import type { MedaData } from "../interfaces/metaData";
import type { reviews } from "../interfaces/reviews";

export class Product {
  "id": number;
  "title": string;
  "description": string;
  "category": string;
  "price": number;
  "discountPercentage": number;
  "rating": number;
  "stock": number;
  "tags": string[];
  "brand": string;
  "sku": string;
  "weight": number;
  "dimensions": dimensions;
  "warrantyInformation": string;
  "shippingInformation": string;
  "availabilityStatus": string;
  "reviews": reviews[];
  "returnPolicy": string;
  "minimumOrderQuantity": number;
  "meta": MedaData;
  "thumbnail": string;
  "images": string[];
}