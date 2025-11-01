"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { z } from "zod";
import {prisma} from "../prisma";

const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().nonnegative("Price must not be negative"),
    quantity: z.coerce.number().int().min(0, "Quantity must not be negative"),
    sku: z.string().optional(),
    lowStockThreshold: z.coerce.number().int().min(0).optional()
});

export async function deleteProduct(formData: FormData) {
    const user = await getCurrentUser();
    
    const id = String(formData.get("id") || "");

    await prisma.product.deleteMany({
        where: {
            id: id,
            userID: user.id
        }
    });
}

export async function createProduct(formData:FormData) {
    const user = await getCurrentUser();

    const parsed = ProductSchema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        quantity: formData.get("quantity"),
        sku: formData.get("sku"),
        lowStockThreshold: formData.get("lowStockThreshold") 
    });

    if(!parsed.success){
        throw new Error("Add Product Form validation failed!")
    }
    try {
        await prisma.product.create({
            data: {...parsed.data, userID: user.id}
        });
        redirect("/inventory")

    } catch(error) {
        throw new Error("Failed to create new Product")
    }

}