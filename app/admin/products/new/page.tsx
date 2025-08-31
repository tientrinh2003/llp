"use client";

import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  async function handleCreateProduct(form: FormData) {
    const res = await fetch("/api/admin/products", {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error("Failed to create product");
  }

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: 16 }}>
      <h1>New Product</h1>
      <ProductForm onSubmit={handleCreateProduct} submitLabel="Create product" />
    </div>
  );
}
