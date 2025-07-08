import { runQuery } from "@/helpers/excuteSql";
import { Checklist, IChecklist } from "@/types/checklist";
import { connectToDatabase } from "..";

export class ChecklistModel {
  static async create(item: IChecklist): Promise<number> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `INSERT INTO checklist (name, trip_id, is_selected) VALUES (?, ?, ?);`,
        [item.name, item.trip_id, item.is_selected ? 1 : 0]
      );
      return result.insertId!;
    } catch (error) {
      console.error("ChecklistModel.create error:", error);
      throw error;
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      const db = await connectToDatabase();
      await runQuery(db, `DELETE FROM checklist WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("ChecklistModel.delete error:", error);
      throw error;
    }
  }

  static async updateSelected(id: number, is_selected: boolean): Promise<void> {
    try {
      const db = await connectToDatabase();
      await runQuery(db, `UPDATE checklist SET is_selected = ? WHERE id = ?;`, [
        is_selected ? 1 : 0,
        id,
      ]);
    } catch (error) {
      console.error("ChecklistModel.updateSelected error:", error);
      throw error;
    }
  }

  static async getByTripId(trip_id: number): Promise<Checklist[]> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `SELECT * FROM checklist WHERE trip_id = ?;`,
        [trip_id]
      );

      const checklist: Checklist[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        checklist.push(result.rows.item(i));
      }

      return checklist;
    } catch (error) {
      console.error("ChecklistModel.getByTripId error:", error);
      throw error;
    }
  }
}
