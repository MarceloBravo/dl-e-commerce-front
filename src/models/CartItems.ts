import { Product } from './Product';

export class CartItems {
    public product: Product | null = null;
    public quantity: number = 0;
    public subtotal: number = 0;
}