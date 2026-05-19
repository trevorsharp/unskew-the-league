import router from "@/router";

const port = Number(process.env["PORT"] ?? 3001);

Bun.serve({
  port,
  fetch: router.fetch,
  idleTimeout: 120,
});

console.log(`Unskew the League is up and running`);
