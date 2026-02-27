const BASE_URL = "https://dummyjson.com";
const PRODUCTS_PER_PAGE = 20;

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: { createdAt: string; updatedAt: string; barcode: string; qrCode: string };
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export type SortOrder = "asc" | "desc";

const fetchOptions: RequestInit = {
  next: { revalidate: 60 },
};

export async function getProducts(
  page = 1,
  sort: SortOrder = "asc",
  category?: string,
): Promise<ProductsResponse> {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const base = category
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    : `${BASE_URL}/products`;
  const url = `${base}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}&sortBy=price&order=${sort}`;

  const res = await fetch(url, fetchOptions);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, fetchOptions);
  if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, fetchOptions);
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  return res.json();
}

export async function getAllProductIds(): Promise<number[]> {
  const res = await fetch(`${BASE_URL}/products?limit=0&select=id`, fetchOptions);
  if (!res.ok) throw new Error(`Failed to fetch product IDs: ${res.status}`);
  const data: ProductsResponse = await res.json();
  return data.products.map((p) => p.id);
}
