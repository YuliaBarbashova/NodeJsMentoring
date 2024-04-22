import { CartItemEntity } from "./cart.ts";

type ORDER_STATUS = "created" | "completed";

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
  id: string; // uuid
  userId: string;
  cartId: string;
  items: CartItemEntity[]; // products from CartEntity
  payment?: PaymentEntity;
  delivery?: DeliveryEntity;
  comments?: string;
  status: ORDER_STATUS;
  total: number;
}
