const DATABASE_NAME = 'twitter-clone-media'
const STORE_NAME = 'media'

interface LocalMediaRecord {
  id: string
  blob: Blob
}

let databasePromise: Promise<IDBDatabase> | null = null

function openDatabase() {
  if (!databasePromise) {
    databasePromise = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(DATABASE_NAME, 1)

      request.onupgradeneeded = () => {
        request.result.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
      request.onsuccess = () => {
        const database = request.result
        database.onversionchange = () => {
          database.close()
          databasePromise = null
        }
        resolve(database)
      }
      request.onerror = () => reject(request.error ?? new Error('Unable to open local media storage.'))
      request.onblocked = () => reject(new Error('Local media storage is blocked by another browser tab.'))
    }).catch((error: unknown) => {
      databasePromise = null
      throw error
    })
  }

  return databasePromise
}

export async function saveLocalMedia(file: File) {
  const database = await openDatabase()
  const id = crypto.randomUUID()
  const transaction = database.transaction(STORE_NAME, 'readwrite')
  transaction.objectStore(STORE_NAME).add({ id, blob: file } satisfies LocalMediaRecord)

  await new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error ?? new Error('Unable to save media on this device.'))
    transaction.onabort = () => reject(transaction.error ?? new Error('Saving media on this device was interrupted.'))
  })

  return id
}

export async function getLocalMediaUrl(id: string) {
  const database = await openDatabase()
  const transaction = database.transaction(STORE_NAME, 'readonly')
  const request = transaction.objectStore(STORE_NAME).get(id) as IDBRequest<LocalMediaRecord | undefined>

  const record = await new Promise<LocalMediaRecord | undefined>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('Unable to read media from this device.'))
  })

  return record ? URL.createObjectURL(record.blob) : null
}

export async function deleteLocalMedia(id: string) {
  const database = await openDatabase()
  const transaction = database.transaction(STORE_NAME, 'readwrite')
  transaction.objectStore(STORE_NAME).delete(id)

  await new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error ?? new Error('Unable to remove unsaved media from this device.'))
    transaction.onabort = () => reject(transaction.error ?? new Error('Removing unsaved media was interrupted.'))
  })
}
