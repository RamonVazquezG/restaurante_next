import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "../app/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.info("Seeding database with categories and products...");
    try {
        // Seed categories first
        const categoriesResult = await prisma.category.createMany({
            data: categories,
            skipDuplicates: true,
        });
        console.info(`Categories inserted: ${categoriesResult.count}`);

        // Then products
        const productsResult = await prisma.product.createMany({
            data: products,
            skipDuplicates: true,
        });
        console.info(`Products inserted: ${productsResult.count}`);
    } catch (error) {
        console.error("Seed failed:", error);
        throw error;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    });
