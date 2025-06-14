export const create_migrations_table = {
  sql: `
        CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            migration_name TEXT NOT NULL
        );
    `,
  migration: 'migrations_create_migrations_table',
};
