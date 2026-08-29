import { openDB } from 'idb';

const DB_NAME = 'VoiceAssistantDB';
const STORE_NAME = 'audioQueue';

async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp');
      }
    },
  });
}

export async function addAudioToQueue(audioBlob) {
  const db = await initDB();
  return db.add(STORE_NAME, {
    audio: audioBlob,
    timestamp: Date.now(),
    status: 'pending'
  });
}

export async function getPendingAudio() {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const index = tx.store.index('timestamp');
  return index.getAll();
}

export async function deleteAudioFromQueue(id) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}

export async function syncQueue(syncFunction) {
  const items = await getPendingAudio();
  for (const item of items) {
    try {
      await syncFunction(item.audio);
      await deleteAudioFromQueue(item.id);
      console.log('Successfully synced offline audio item:', item.id);
    } catch (error) {
      console.error('Failed to sync offline audio item, will retry later:', item.id, error);
      // Stop syncing on first error assuming network is still down
      break; 
    }
  }
}
