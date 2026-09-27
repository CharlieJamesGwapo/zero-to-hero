export type Product = { id: string; priceCents: number; active: boolean };
export type CartLine = { productId: string; quantity: number };

export function calculateTotal(
  lines: CartLine[],
  catalog: Map<string, Product>,
): number {
  let total = 0;
  for (const line of lines) {
    const product = catalog.get(line.productId);
    if (!product?.active) throw new Error("Product unavailable");
    if (
      !Number.isInteger(line.quantity) ||
      line.quantity < 1 ||
      line.quantity > 99
    )
      throw new Error("Invalid quantity");
    if (!Number.isInteger(product.priceCents) || product.priceCents < 0)
      throw new Error("Invalid catalog price");
    total += product.priceCents * line.quantity;
  }
  if (!Number.isSafeInteger(total))
    throw new Error("Order total exceeds safe range");
  return total;
}

// A server checkout route should load products from its own catalog, call
// calculateTotal, then create a hosted payment session in test mode.
