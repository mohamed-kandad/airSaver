export const alter_expenses_add_location = {
  sql: `
    ALTER TABLE expenses ADD COLUMN latitude REAL;
    ALTER TABLE expenses ADD COLUMN longitude REAL;
  `,
  migration: "migrations_add_location_to_expenses",
};
