import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ unwrap
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, images: true },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ unwrap
  try {
    const body = await req.json();
    const { name, description, price, stock, categoryId, images } = body;

    if (!name || !price || !Array.isArray(images)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        ...(categoryId ? { categoryId } : {}), // ✅ tránh null categoryId
        images: {
          deleteMany: {},
          create: images.map((img: { url: string; altText?: string }) => ({
            url: img.url,
            altText: img.altText || null,
          })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}
