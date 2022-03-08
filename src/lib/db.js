import Dexie from 'dexie';

export const db = new Dexie('reader');

db.version(1).stores({
  books: '++id, name, author, fileName, readPosition',
});

db.open();
