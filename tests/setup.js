if (!process.env.DATABASE_URL) {
  const DB_HOST = process.env.DB_HOST || "localhost";
  const DB_PORT = process.env.DB_PORT || "5434";
  process.env.DATABASE_URL = `postgresql://postgres:postgres@${DB_HOST}:${DB_PORT}/notifications_db_test`;
}

process.env.JWT_SECRET = "TakeHomeChallengeYariTaftSecretTest";
process.env.NODE_ENV = "test";
process.env.PORT = "3002";
