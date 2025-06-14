import {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';

export const runQuery = async (
  db: SQLiteDatabase,
  sql: string,
  params: any[] = [],
): Promise<ResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return true;
        },
      );
    });
  });
};
