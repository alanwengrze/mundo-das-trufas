import { prisma } from "@/lib/prisma";

async function main() {
  // Criar usuários
  const user1 = await prisma.user.create({
    data: {
      id: 'user-id-1',
      name: 'John Doe',
      email: 'john@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'user-id-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
  });

  // Criar produtos
  const product1 = await prisma.product.create({
    data: {
      id: 'product-id-1',
      name: 'Chocolate Cake',
      description: 'Delicious chocolate cake',
      price: 25.0,
      category: 'Dessert',
      quantityInStock: 50,
      currency: 'brl',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      id: 'product-id-2',
      name: 'Vanilla Cake',
      description: 'Tasty vanilla cake',
      price: 20.0,
      category: 'Dessert',
      quantityInStock: 30,
      currency: 'brl',
    },
  });

  const product3 = await prisma.product.create({
    data: {
      id: 'product-id-3',
      name: 'Cupcakes',
      description: 'Yummy cupcakes',
      price: 15.0,
      category: 'Dessert',
      quantityInStock: 100,
      currency: 'brl',
    },
  });

  // Criar carrinhos
  const cart1 = await prisma.cart.create({
    data: {
      userId: user1.id,
      sessionId: 'session-id-1',
    },
  });

  const cart2 = await prisma.cart.create({
    data: {
      userId: user2.id,
      sessionId: 'session-id-2',
    },
  });

  // Criar itens no carrinho
  await prisma.itemCart.create({
    data: {
      quantity: 2,
      productId: product1.id,
      cartId: cart1.id,
    },
  });

  await prisma.itemCart.create({
    data: {
      quantity: 1,
      productId: product2.id,
      cartId: cart1.id,
    },
  });

  await prisma.itemCart.create({
    data: {
      quantity: 3,
      productId: product3.id,
      cartId: cart2.id,
    },
  });

  // Criar pedidos
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      cartId: cart1.id,
      amount: 70.0, // Total do pedido (2x25 + 1x20)
      status: 'PENDING',
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      cartId: cart2.id,
      amount: 75.0, // Total do pedido (3x15)
      status: 'PENDING',
    },
  });

  // Criar itens no pedido
  await prisma.itemOrder.create({
    data: {
      quantity: 2,
      productId: product1.id,
      orderId: order1.id,
    },
  });

  await prisma.itemOrder.create({
    data: {
      quantity: 1,
      productId: product2.id,
      orderId: order1.id,
    },
  });

  await prisma.itemOrder.create({
    data: {
      quantity: 3,
      productId: product3.id,
      orderId: order2.id,
    },
  });

  // Criar pagamentos
  const payment1 = await prisma.payment.create({
    data: {
      orderId: order1.id,
      status: 'COMPLETED',
      type: 'CREDIT_CARD',
      amount: 70.0,
      stripeId: 'stripe-id-1',
      metadata: {
        payment_method: 'Visa',
      },
    },
  });

  const payment2 = await prisma.payment.create({
    data: {
      orderId: order2.id,
      status: 'PENDING',
      type: 'CREDIT_CARD',
      amount: 75.0,
      stripeId: 'stripe-id-2',
      metadata: {
        payment_method: 'MasterCard',
      },
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
