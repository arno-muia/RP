/**
 * Push Prisma schema to Turso.
 * Run: npm run db:push:turso
 */
import { execSync } from "child_process";

async function main() {
  const tursoUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  if (!tursoUrl?.startsWith("libsql://")) {
    console.error("Set TURSO_DATABASE_URL to a libsql:// URL");
    process.exit(1);
  }

  const dbName = process.env.TURSO_DB_NAME || "rpwebsite";
  console.log(`Generating SQL and applying to Turso (${dbName})...`);

  execSync(
    `npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script | turso db shell ${dbName}`,
    { stdio: "inherit", cwd: process.cwd() },
  );

  console.log("✅ Turso schema push complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
