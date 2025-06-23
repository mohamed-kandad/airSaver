export const alter_expenses_add_longitude = {
  sql: `
    ALTER TABLE expenses ADD COLUMN longitude REAL;
  `,
  migration: "migrations_add_longitude_to_expenses",
};
