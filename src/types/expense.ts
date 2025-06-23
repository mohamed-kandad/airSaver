export interface Expense {
  id: number;
  desc: string;
  amount: number;
  trip_id: number;
  categorie_id: number;
  date: string;
  latitude: number;
  longitude: number;
}

export interface IExpense {
  id?: number;
  desc: string;
  amount: number;
  trip_id: number;
  categorie_id: number;
  date: string;
  latitude: number;
  longitude: number;
}
