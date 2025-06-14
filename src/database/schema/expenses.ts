export const create_expenses_table = {
  sql: `
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            desc TEXT NOT NULL,
            amount INTEGER NOT NULL,
            trip_id INTEGER NOT NULL,
            categorie_id INTEGER NOT NULL,
            FOREIGN KEY (trip_id) REFERENCES trips (id),
            FOREIGN KEY (categorie_id) REFERENCES categories (id)
        );
    `,
  migration: 'migrations_create_expenses_table',
};
