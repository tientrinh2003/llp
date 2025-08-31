import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

const prisma = new PrismaClient();

// GET /api/admin/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
// POST /api/admin/products
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = (formData.get("description") as string) || "";
    const stock = Number(formData.get("stock")) || 0;
    const categoryId = formData.get("categoryId") as string | undefined;

    // Xử lý ảnh
    const images: { url: string }[] = [];
    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${image.name}`;
      const uploadDir = path.join(process.cwd(), "public/products");
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      images.push({ url: `/products/${fileName}` });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
        images: {
          create: images,
        },
      },
      include: { images: true },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}