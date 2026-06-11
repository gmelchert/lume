"use server";

import { del, put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./db";
import { products } from "./schema";
import { SESSION_COOKIE, sessionToken } from "./session";

export async function login(formData: FormData) {
  if (formData.get("password") !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }
  (await cookies()).set(SESSION_COOKIE, await sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

function productFields(formData: FormData) {
  return {
    category: formData.get("category") as "ring" | "bracelet",
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    material: formData.get("material") as string,
    sortOrder: Number(formData.get("sortOrder")),
  };
}

async function uploadImage(file: File) {
  const blob = await put(`products/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

export async function createProduct(formData: FormData) {
  const image = formData.get("image") as File;
  await db.insert(products).values({
    ...productFields(formData),
    imageUrl: await uploadImage(image),
  });
  revalidatePath("/");
  redirect("/admin");
}

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"));
  const image = formData.get("image") as File;
  const values: Partial<typeof products.$inferInsert> = productFields(formData);
  if (image.size > 0) {
    const [old] = await db.select().from(products).where(eq(products.id, id));
    await del(old.imageUrl);
    values.imageUrl = await uploadImage(image);
  }
  await db.update(products).set(values).where(eq(products.id, id));
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteProduct(id: number) {
  const [row] = await db.delete(products).where(eq(products.id, id)).returning();
  await del(row.imageUrl);
  revalidatePath("/");
}
