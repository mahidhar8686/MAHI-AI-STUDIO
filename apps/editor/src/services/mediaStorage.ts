const DB_NAME = "mahi-ai-studio-media";
const DB_VERSION = 1;
const STORE_NAME = "mediaBlobs";

let dbInstance: IDBDatabase | null = null;

function getDb(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(request.result);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "mediaId" });
      }
    };
  });
}

export interface MediaMeta {
  name: string;
  type: string;
  size: number;
  createdAt: string;
}

export interface MediaRecord {
  mediaId: string;
  blob: Blob;
  name: string;
  type: string;
  size: number;
  createdAt: string;
}

export async function saveMedia(
  mediaId: string,
  blob: Blob,
  meta: MediaMeta
): Promise<void> {
  try {
    const db = await getDb();
    const record: MediaRecord = {
      mediaId,
      blob,
      name: meta.name,
      type: meta.type,
      size: meta.size,
      createdAt: meta.createdAt,
    };

    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (error) {
    console.warn("Failed to save media to IndexedDB:", error);
    throw error;
  }
}

export async function loadMedia(
  mediaId: string
): Promise<{ blob: Blob; meta: MediaMeta } | null> {
  try {
    const db = await getDb();

    const record = await new Promise<MediaRecord | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(mediaId);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });

    if (!record) return null;

    return {
      blob: record.blob,
      meta: {
        name: record.name,
        type: record.type,
        size: record.size,
        createdAt: record.createdAt,
      },
    };
  } catch (error) {
    console.warn("Failed to load media from IndexedDB:", error);
    return null;
  }
}

export async function deleteMedia(mediaId: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const db = await getDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(mediaId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
    return { ok: true };
  } catch (error) {
    console.warn("Failed to delete media from IndexedDB:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown IndexedDB error",
    };
  }
}

export async function listMedia(): Promise<string[]> {
  try {
    const db = await getDb();
    const ids = await new Promise<string[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAllKeys();
      req.onsuccess = () => resolve(req.result as string[]);
      req.onerror = () => reject(req.error);
    });
    return ids;
  } catch (error) {
    console.warn("Failed to list media from IndexedDB:", error);
    return [];
  }
}

let unavailable = false;

export function isMediaStorageUnavailable(): boolean {
  return unavailable;
}

export async function ensureDatabase(): Promise<boolean> {
  try {
    await getDb();
    unavailable = false;
    return true;
  } catch {
    unavailable = true;
    return false;
  }
}