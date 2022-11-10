export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
  message?: string;
};

export type ProductList = Product[];

export async function getProductList(): Promise<ProductList> {
  const result = await fetch('https://dummyjson.com/products?limit=100');
  const json = await result.json();
  const data: ProductList = json.products;
  return data;
}

export async function getProductDetail(id: string): Promise<Product> {
  const result = await fetch(`https://dummyjson.com/products/${id}`);
  const json: Product = await result.json();
  return json;
}
