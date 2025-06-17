export const create_checklist_table = {
  sql: `
        CREATE TABLE IF NOT EXISTS checklist (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            trip_id INTEGER NOT NULL,
            is_selected INTEGER NOT NULL DEFAULT 0,
            FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
        );
    `,
  migration: "migrations_create_checklist_table",
};
