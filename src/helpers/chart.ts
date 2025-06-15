import { categories } from "./utils";

type Expense = {
  amount: number;
  categorie_id: number;
};

export type OutputItem = {
  color: string;
  category_name: string;
  totalExpense: number;
};

// Generate a category map for fast access
const categoryMap: Record<number, { name: string }> = {};
categories.forEach((cat) => {
  categoryMap[Number(cat.id)] = {
    name: cat.name,
  };
});

// Optional color palette
const categoryColors: Record<number, string> = {
  1: "0DE2B8",
  2: "52D96C",
  3: "FFA500",
  4: "A186F7",
  5: "0AA0F7",
  6: "FF6B6B",
  7: "FFD93D",
  8: "CCCCCC",
  9: "3333FF",
  10: "00B894",
};

export const prepareChartData = (expenses: Expense[]): OutputItem[] => {
  const grouped: Record<number, number> = {};

  for (const item of expenses) {
    grouped[item.categorie_id] =
      (grouped[item.categorie_id] || 0) + item.amount;
  }

  return Object.entries(grouped).map(([id, total]) => {
    const catId = Number(id);
    const category = categoryMap[catId];
    const color = categoryColors[catId] || "#ccc";

    return {
      category_name: category?.name || "Unknown",
      color,
      totalExpense: total,
    };
  });
};

type ChartSegment = {
  value: number;
  categorie_id: number;
  color: string;
};

export const groupExpensesForChart = (expenses: Expense[]): ChartSegment[] => {
  const grouped: Record<number, number> = {};

  for (const item of expenses) {
    grouped[item.categorie_id] =
      (grouped[item.categorie_id] || 0) + item.amount;
  }

  return Object.entries(grouped).map(([id, total]) => {
    const catId = Number(id);
    return {
      categorie_id: catId,
      value: total,
      color: categoryColors[catId] || "#ccc",
    };
  });
};
