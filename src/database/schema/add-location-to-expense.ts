export const alter_expenses_add_latitude = {
  sql: `
    ALTER TABLE expenses ADD COLUMN latitude REAL;
  `,
  migration: "migrations_add_latitude_to_expenses",
};
