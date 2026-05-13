// prisma/seed.ts
import { categories } from "./data/categories";
import { products } from "./data/products";
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient(
    { adapter } as ConstructorParameters<typeof PrismaClient>[0]
);
async function main() {
    console.info("Seeding database...");
    try {
        // 1. Insertar categorias primero (porque Product las referencia)
        const catResult = await prisma.category.createMany({
            data: categories,
            skipDuplicates: true,
        });
        console.info(`Categorias insertadas: ${catResult.count}`);
        // 2. Luego insertar productos
        const prodResult = await prisma.product.createMany({
            data: products,
            skipDuplicates: true,
        });
        console.info(`Productos insertados: ${prodResult.count}`);
    } catch (error) {
        console.error("Seed fallido:", error);
        throw error;
    }
}
main()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });