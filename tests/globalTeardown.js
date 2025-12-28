export default async function globalTeardown() {
  // Global teardown runs in a separate context
  // The Prisma connection is closed automatically by Jest's forceExit
  // No action needed here
}
