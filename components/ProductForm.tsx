"use client";

import React, { useState, useEffect, FormEvent } from "react";

type Category = { id: string; name: string };

type ProductFormProps = {
  initialData?: {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    description?: string;
    categoryId?: string;
    images?: { url: string; altText?: string }[];
  };
  onSubmit: (data: any) => Promise<void>;
  submitLabel: string;
};

export default function ProductForm({ initialData, onSubmit, submitLabel }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [stock, setStock] = useState(initialData?.stock?.toString() || "0");
  const [description, setDescription] = useState(initialData?.description || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData?.images?.map((img) => img.url) || [""]
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoadingCategories(true);
    try {
      const res = await fetch("/api/categories", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Failed to load categories" });
    } finally {
      setLoadingCategories(false);
    }
  }

  async function handleAddCategory() {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (!res.ok) throw new Error("Failed to create category");
      const newCat = await res.json();
      setCategories((prev) => [newCat, ...prev]);
      setCategoryId(newCat.id);
      setNewCategoryName("");
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Could not add category" });
    }
  }

  function handleUrlChange(index: number, value: string) {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  }

  function addUrlField() {
    setImageUrls((prev) => [...prev, ""]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!name.trim()) {
      setStatus({ type: "error", text: "Name is required." });
      return;
    }
    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setStatus({ type: "error", text: "Price must be a non-negative number." });
      return;
    }
    const parsedStock = Number(stock);
    if (Number.isNaN(parsedStock) || parsedStock < 0) {
      setStatus({ type: "error", text: "Stock must be a non-negative number." });
      return;
    }

    if (!categoryId) {
      setStatus({ type: "error", text: "Please select a category." });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        price: parsedPrice,
        stock: parsedStock,
        description,
        categoryId,
        images: imageUrls.filter((url) => url.trim()).map((url) => ({ url })),
      };

      await onSubmit(payload);
      setStatus({ type: "success", text: "Success!" });
    } catch (err) {
      setStatus({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Details</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="0"
          required
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={loadingCategories}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3"
        >
          {loadingCategories ? (
            <option>Loading...</option>
          ) : (
            <>
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </>
          )}
        </select>

        {/* Add Category Inline */}
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category name"
            className="flex-1 rounded-lg border-gray-300 shadow-sm p-2"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
          rows={4}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3"
        />
      </div>

      {/* Image URLs */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Image URLs:</p>
        {imageUrls.map((url, index) => (
          <input
            key={index}
            type="text"
            value={url}
            onChange={(e) => handleUrlChange(index, e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="mb-2 block w-full rounded-lg border-gray-300 shadow-sm p-3"
          />
        ))}
        <button
          type="button"
          onClick={addUrlField}
          className="text-indigo-600 text-sm hover:underline mt-1"
        >
          + Add another URL
        </button>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Processing..." : submitLabel}
        </button>
      </div>

      {/* Status */}
      {status && (
        <div
          className={`mt-2 text-center font-medium ${
            status.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {status.text}
        </div>
      )}
    </form>
  );
}
