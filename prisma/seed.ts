import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const demoUserID = "";
    const totalProducts = 50;

    await prisma.product.createMany({
        data: Array.from({ length: totalProducts }).map((_, index) => ({
            name: `Product ${index + 1}`,
            userID: demoUserID,
            price: parseFloat((Math.random() * 90 + 10).toFixed(2)),
            quantity: Math.floor(Math.random() * 20) + 1,
            lowStockThreshold: 5,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (index * 5)),
        })),
    });

    console.log("Seeding completed.");
    console.log(`Inserted ${totalProducts} products for demo user: ${demoUserID}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });