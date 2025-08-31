"use client";

import { use, useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";

type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  images?: { url: string; altText?: string }[];
};

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap Promise

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleUpdateProduct(data: any) {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update product");
  }

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: 16 }}>
      <h1>Edit Product</h1>
      <ProductForm
        initialData={{
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          images: product.images,
        }}
        onSubmit={handleUpdateProduct}
        submitLabel="Update product"
      />
    </div>
  );
}
