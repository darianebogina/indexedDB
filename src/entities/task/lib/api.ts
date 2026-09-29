import type {TodoTask} from "@/shared/types";

const promisify = <T>(request: IDBRequest<T>) => {
    return new Promise<T>((resolve, reject) => {
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(request.error);
        };
    })
};

const openDB = () => {
    const openRequest = indexedDB.open("tasks", 4);
    return new Promise<IDBDatabase>((resolve, reject) => {

        openRequest.onsuccess = () => {
            const db = openRequest.result;
            db.onversionchange = () => {
                db.close();
                alert("На странице произошли изменения. Перезагрузите страницу")
            };
            resolve(db);
        };
        openRequest.onerror = () => {
            reject(openRequest.error);
        };

        openRequest.onupgradeneeded = () => {
            const db = openRequest.result;
            if (!db.objectStoreNames.contains("tasks")) {
                db.createObjectStore("tasks", { keyPath: "id" });
            }
        }
    })
};



let dbPromise: Promise<IDBDatabase> | null = null;

const getDB = () => {
    dbPromise ??= openDB();
    return dbPromise;
};

export const getAllTasks = async () => {
    const db = await getDB();
    const transaction = db.transaction("tasks", "readonly");
    const tasksStore = transaction.objectStore("tasks");
    return promisify<TodoTask[]>(tasksStore.getAll());
};

export const addTask = async (task: TodoTask) => {
    const db = await getDB();
    const transaction = db.transaction("tasks", "readwrite");
    const tasksStore = transaction.objectStore("tasks");
    return promisify(tasksStore.add(task));
};

export const updateTask = async (task: TodoTask) => {
    const db = await getDB();
    const transaction = db.transaction("tasks", "readwrite");
    const tasksStore = transaction.objectStore("tasks");
    return promisify(tasksStore.put(task));
};
