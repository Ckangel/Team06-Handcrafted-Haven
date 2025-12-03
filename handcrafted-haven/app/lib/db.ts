import postgres from "postgres";

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL;

if (!connectionString) {
  throw new Error("❌ Nenhuma variável de conexão POSTGRES encontrada");
}

export const sql = postgres(connectionString, {
  ssl: "require",
});
console.log("📌 USING DATABASE:", connectionString);