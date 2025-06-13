export interface Trip {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  budget: number;
}

export interface ITrip {
  id?: number;
  name: string;
  start_date: string;
  end_date: string;
  budget: number;
}
