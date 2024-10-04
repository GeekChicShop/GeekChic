export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string[];
  options: string[];
  productQuantity: string[];
  createdAt?: string;
}

export interface PayProduct extends AddProduct {
  id: string;
  quantity: number;
}

export interface ProductComments extends Product {
  comments: Comment[];
}

export interface AddProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string;
  productQuantity: string;
  createdAt?: string;
}

export interface OrderProduct {
  title: string;
  description: string;
  price: string;
  image: string;
  options: string[];
  quantity: number;
}

export interface GetOrderDetails {
  ordersId?: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  createdAt?: string;
  items: OrderProduct[];
}

export interface OrderDetails {
  ordersId?: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  createdAt?: string;
}

export interface Comment {
  id: string;
  text: string;
  rank: number;
  createdAt: string;
  uid: string;
  userPhoto: string;
  displayName: string;
}

export interface CartProducts {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string[];
  options: string;
  quantity: number;
  productQuantity: string;
  createdAt?: string;
}
