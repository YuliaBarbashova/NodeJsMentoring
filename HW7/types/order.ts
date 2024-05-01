import { CartItemEntity } from "./cart.ts";

export interface DeliveryEntity {
  type?: string;
  address?: string;
}

export interface PaymentEntity {
  type?: string;
  address?: string;
  creditCard?: string;
}

export interface OrderEntity {
  _id: string; // uuid
  userId: string;
  cartId: string;
  items: CartItemEntity[]; // products from CartEntity
  payment?: PaymentEntity;
  delivery?: DeliveryEntity;
  comments?: string;
  status: string;
  total: number;
}
