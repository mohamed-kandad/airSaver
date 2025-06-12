import {connectToDatabase} from '../';
import {runQuery} from '../../helpers/excuteSql';
import {Expense, IExpense} from '../../types/expense';

export class ExpenseModel {
  static async create(expense: IExpense): Promise<number> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `INSERT INTO expenses (desc, amount, trip_id, categorie_id) VALUES (?, ?, ?, ?);`,
        [expense.desc, expense.amount, expense.trip_id, expense.categorie_id],
      );
      return result.insertId!;
    } catch (error) {
      console.error('ExpenseModel.create error:', error);
      throw error;
    }
  }

  static async getById(id: number): Promise<Expense | null> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `SELECT * FROM expenses WHERE id = ?;`,
        [id],
      );

      return result.rows.length > 0 ? result.rows.item(0) : null;
    } catch (error) {
      console.error('ExpenseModel.getById error:', error);
      throw error;
    }
  }

  static async getAll(): Promise<Expense[]> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `SELECT * FROM expenses ORDER BY id DESC;`,
      );

      const expenses: Expense[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        expenses.push(result.rows.item(i));
      }

      return expenses;
    } catch (error) {
      console.error('ExpenseModel.getAll error:', error);
      throw error;
    }
  }

  static async update(id: number, expense: IExpense): Promise<boolean> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `UPDATE expenses SET desc = ?, amount = ?, trip_id = ?, categorie_id = ? WHERE id = ?;`,
        [
          expense.desc,
          expense.amount,
          expense.trip_id,
          expense.categorie_id,
          id,
        ],
      );

      return result.rowsAffected > 0;
    } catch (error) {
      console.error('ExpenseModel.update error:', error);
      throw error;
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(db, `DELETE FROM expenses WHERE id = ?;`, [
        id,
      ]);

      return result.rowsAffected > 0;
    } catch (error) {
      console.error('ExpenseModel.delete error:', error);
      throw error;
    }
  }

  static async getByTripId(trip_id: number): Promise<Expense[] | null> {
    try {
      const db = await connectToDatabase();
      const result = await runQuery(
        db,
        `SELECT * FROM expenses WHERE trip_id = ? ORDER BY id DESC;`,
        [trip_id],
      );

      const expenses: Expense[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        expenses.push(result.rows.item(i));
      }

      return expenses;
    } catch (error) {
      console.error('ExpenseModel.getByTripId error:', error);
      throw error;
    }
  }
}
