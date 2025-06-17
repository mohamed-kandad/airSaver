export type Checklist = {
  id: number;
  name: string;
  trip_id: number;
  is_selected: boolean;
};

export type IChecklist = {
  name: string;
  trip_id: number;
  is_selected: boolean;
};
