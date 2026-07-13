import { createClient, type Client } from '@libsql/client'

let client: Client | null = null
let schemaReady: Promise<void> | null = null

function getClient(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL ?? 'file:./nimbus-local.db'
    const authToken = process.env.TURSO_AUTH_TOKEN
    client = authToken ? createClient({ url, authToken }) : createClient({ url })
  }
  return client
}

async function ensureSchema(db: Client): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS tests (
      id TEXT PRIMARY KEY,
      employer_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      data TEXT NOT NULL
    )
  `)
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_tests_employer ON tests(employer_id)`)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      test_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      data TEXT NOT NULL
    )
  `)
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_submissions_test ON submissions(test_id)`)
}

export async function getDb(): Promise<Client> {
  const db = getClient()
  if (!schemaReady) schemaReady = ensureSchema(db)
  await schemaReady
  return db
}
