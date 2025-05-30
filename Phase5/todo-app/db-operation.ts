import { startConnection } from "./db";

export async function getAllTodos() {
  const conn = await startConnection();
  const [rows] = await conn.execute(
    "SELECT * FROM todos ORDER BY created_at DESC"
  );
  await conn.end();
  return rows;
}
