export const create_categories_table = {
  sql: `
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL
        );
    `,
  migration: 'migrations_create_categories_table',
};
