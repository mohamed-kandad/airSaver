import {SQLiteDatabase} from 'react-native-sqlite-storage';

export const getAllTrips = (db: SQLiteDatabase) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM trips ORDER BY start_date DESC;`,
        [],
        (_, {rows}) => {
          const trips = [];
          for (let i = 0; i < rows.length; i++) {
            trips.push(rows.item(i));
          }
          resolve(trips);
        },
        (_, error) => reject(error),
      );
    });
  });
};

export const getTripById = (db: SQLiteDatabase, id: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM trips WHERE id = ?;`,
        [id],
        (_, {rows}) => resolve(rows.length > 0 ? rows.item(0) : null),
        (_, error) => reject(error),
      );
    });
  });
};

export const updateTripById = (
  db: SQLiteDatabase,
  id: number,
  {
    name,
    start_date,
    end_date,
    budget,
  }: {name: string; start_date: string; end_date: string; budget: number},
) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE trips SET name = ?, start_date = ?, end_date = ?, budget = ? WHERE id = ?;`,
        [name, start_date, end_date, budget, id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error),
      );
    });
  });
};

export const deleteTripById = (db: SQLiteDatabase, id: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM trips WHERE id = ?;`,
        [id],
        (_, result) => resolve(result.rowsAffected > 0),
        (_, error) => reject(error),
      );
    });
  });
};
