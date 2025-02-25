import { Prisma, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

function getRandomFutureDate() {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() + 10);
  const endDate = new Date();
  endDate.setDate(today.getDate() + 365);

  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  const randomTime = Math.random() * (endTime - startTime) + startTime;
  return new Date(randomTime);
}

// A `main` function so that we can use async/await
async function main() {
  await clear();

  // Seed the database with users and posts
  const user1 = await prisma.user.create({
    data: {
      email: "user@gmail.com",
      password: "12345",
      name: "Test",
    },
  });
  console.log(`Created user: ${user1.name}`);

  const vendorNames = [
    "Amazon",
    "eBay",
    "Etsy",
    "Walmart",
    "AliExpress",
    "Newegg",
    "Best Buy",
    "Target",
    "Shopify",
    "Zappos",
  ];
  const invoices: Prisma.InvoiceCreateInput[] = [];
  for (let i = 0; i < 100; i++) {
    const vendorName =
      vendorNames[Math.floor(Math.random() * vendorNames.length)];
    const amount = Math.round(Math.random() * 5000 * 100) / 100;
    const dueDate = getRandomFutureDate();
    const description = `Item priced at ${amount} baught from ${vendorName} on ${dueDate.toUTCString()}`;
    const invoice = await prisma.invoice.create({
      data: {
        vendor_name: vendorName,
        amount,
        due_date: dueDate,
        description,
        user_id: user1.id,
        paid: Math.random() < 0.5,
      },
    });
    invoices.push(invoice);
  }
  console.log(`Created ${invoices.length} invoices.`);
}

async function clear() {
  await prisma.user.deleteMany({});
  await prisma.invoice.deleteMany({});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
