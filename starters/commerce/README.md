# Commerce starter

`order.ts` is a pure order-calculation scaffold. It accepts only product IDs and quantities from a cart. Prices come from the server-owned catalog, not from browser values. Add a database, hosted payment provider, verified webhooks, and idempotent order updates before building a real checkout.

This starter does not take payments or claim that an order is paid. Use the [project brief](../../src/lib/projects.ts) to test failed and duplicate payment events.
