import SQLite, {
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Logger} from '../helpers/logger';
import {create_migrations_table} from './schema/migrations';
import {migrations} from './schema';

SQLite.enablePromise(true);

// Open database
export const connectToDatabase = async () => {
  console.log('Connecting to database...');
  try {
    const db = await SQLite.openDatabase(
      {name: 'airsaver.db', location: 'default'},
      () => {
        console.log('Database opened successfully');
      },
      error => {
        console.error('Database connection error:', error);
        throw Error('Could not connect to database');
      },
    );
    return db;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
};

const checkIfTableMigrationExists = async (db: SQLiteDatabase) => {
  let exists = false;

  await db.transaction(tx => {
    tx.executeSql(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?;`,
      ['migrations'],
      (tx, results) => {
        if (results.rows.length > 0) {
          exists = true;
        }
      },
    );
  });

  return exists;
};

export const initializeDataBase = async () => {
  const db = await connectToDatabase();

  const isTableMigrationExists = await checkIfTableMigrationExists(db);
  try {
    if (!isTableMigrationExists) {
      await new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(create_migrations_table.sql);
          },
          error => reject(error),
        );
      });
    }
  } catch (error) {
    console.error('s', error);
  }

  let excutedMigarations = new Set<string>();
  try {
    await db.transaction(tx => {
      tx.executeSql(
        'SELECT migration_name FROM migrations',
        [],
        (tx, result) => {
          for (let i = 0; i < result.rows.length; i++) {
            excutedMigarations.add(result.rows.item(i).migration_name);
            excutedMigarations = excutedMigarations;
          }
        },
        error => {
          console.error('Error fetching migrations:', error);
        },
      );
    });
  } catch (error) {
    console.error('Error fetching migrations:-', error);
  }

  let isRunMigrations = false;

  for (const migration of migrations) {
    try {
      if (!excutedMigarations.has(migration.migration)) {
        await db.transaction(tx => {
          tx.executeSql(migration.sql);
          tx.executeSql(`INSERT INTO migrations (migration_name) VALUES (?)`, [
            migration.migration,
          ]);

          console.log(
            `${`Migrated ${migration.migration} table successfully`.padEnd(
              100,
              '.',
            )} \x1b[44m INFO \x1b[0m`,
          );

          isRunMigrations = true;
        });
      }
    } catch (error) {
      console.error(`Error running migration ${migration.migration}:`, error);
    }
  }

  if (!isRunMigrations) {
    console.log(
      `${`Nothing to migrate`.padEnd(100, '.')} \x1b[44m INFO \x1b[0m`,
    );
  }
};
