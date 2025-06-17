import { create_categories_table } from "./categories";
import { create_checklist_table } from "./checklist";
import { create_expenses_table } from "./expenses";
import { create_migrations_table } from "./migrations";
import { create_trips_table } from "./trips";

export const migrations = [
  create_migrations_table,
  create_trips_table,
  create_categories_table,
  create_expenses_table,
  create_checklist_table,
];
