export const create_trips_table = {
  sql: `
        CREATE TABLE IF NOT EXISTS trips (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL,
            budget INTEGER NOT NULL
        );
    `,
  migration: 'migrations_create_trips_table',
};
