import {connectToDatabase} from '..';
import {runQuery} from '../../helpers/excuteSql';
import {Logger} from '../../helpers/logger';
import {Trip} from '../../types/trip';

export interface ITrip {
  id?: number;
  name: string;
  start_date: string;
  end_date: string;
  budget: number;
}

export class TripModel {
  static async getAll(): Promise<Trip[]> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `SELECT * FROM trips ORDER BY start_date DESC;`,
      );

      const trips: Trip[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        trips.push(result.rows.item(i));
      }

      return trips;
    } catch (error) {
      Logger.error('TripModel.getAll error:', error);
      throw error;
    }
  }

  static async getById(id: number): Promise<Trip | null> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(db, `SELECT * FROM trips WHERE id = ?;`, [
        id,
      ]);

      return result.rows.length > 0 ? result.rows.item(0) : null;
    } catch (error) {
      Logger.error(`TripModel.getById error (id: ${id}):`, error);
      throw error;
    }
  }

  static async updateById(id: number, trip: Trip): Promise<boolean> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `UPDATE trips SET name = ?, start_date = ?, end_date = ?, budget = ? WHERE id = ?;`,
        [trip.name, trip.start_date, trip.end_date, trip.budget, id],
      );

      return result.rowsAffected > 0;
    } catch (error) {
      Logger.error(`TripModel.updateById error (id: ${id}):`, error);
      throw error;
    }
  }

  static async deleteById(id: number): Promise<boolean> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(db, `DELETE FROM trips WHERE id = ?;`, [
        id,
      ]);

      return result.rowsAffected > 0;
    } catch (error) {
      Logger.error(`TripModel.deleteById error (id: ${id}):`, error);
      throw error;
    }
  }

  static async create(trip: ITrip): Promise<number> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `INSERT INTO trips (name, start_date, end_date, budget) VALUES (?, ?, ?, ?);`,
        [trip.name, trip.start_date, trip.end_date, trip.budget],
      );

      return result.insertId!;
    } catch (error) {
      Logger.error('TripModel.create error:', error);
      throw error;
    }
  }

  static async getActiveTrips(): Promise<Trip[]> {
    try {
      const db = await connectToDatabase();

      // Get current date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];

      const result = await runQuery(
        db,
        `SELECT * FROM trips WHERE date(?) BETWEEN date(start_date) AND date(end_date);`,
        [today],
      );

      const trips: Trip[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        trips.push(result.rows.item(i));
      }

      return trips;
    } catch (error) {
      Logger.error(`Failed to get active trips`, error);
      throw error;
    }
  }
}
