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
    const openRequest = indexedDB.open("tasks", 1);
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

        openRequest.onupgradeneeded = (event) => {
            const db = openRequest.result;
            const transaction = openRequest.transaction!;

            if (event.oldVersion < 1) {
                db.createObjectStore("tasks", { keyPath: "id" });
            }

            if (event.oldVersion < 2) {
                const store = transaction.objectStore("tasks");
                const request = store.getAll();
                request.onsuccess = () => {
                    request.result.forEach(task => {
                        store.put({ ...task, important: false });
                    });
                };
            }
        }
    })
};

const dbPromise = openDB();

export const getAllTasks = async () => {
    const db = await dbPromise;
    const transaction = db.transaction("tasks", "readonly");
    const tasksStore = transaction.objectStore("tasks");
    return promisify<TodoTask[]>(tasksStore.getAll());
};

export const addTask = async (task: TodoTask) => {
    const db = await dbPromise;
    const transaction = db.transaction("tasks", "readwrite");
    const tasksStore = transaction.objectStore("tasks");
    return promisify(tasksStore.add(task));
};

export const updateTask = async (task: TodoTask) => {
    const db = await dbPromise;
    const transaction = db.transaction("tasks", "readwrite");
    const tasksStore = transaction.objectStore("tasks");
    return promisify(tasksStore.put(task));
};
