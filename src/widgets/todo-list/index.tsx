import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {addTask, getAllTasks, openDB, type TodoTask, updateTask} from "./lib.ts";
import styles from "./styles.module.css";
import type {Filter} from "@/shared/types";

type TodoListProps = {
    filter: Filter;
}

export const TodoList = ({filter}: TodoListProps) => {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState<TodoTask[]>([]);

    const dataBase = useRef<IDBDatabase | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            dataBase.current = await openDB();
            const loadedTasks = await getAllTasks(dataBase.current);
            setTasks(loadedTasks.toSorted((a, b) => b.id - a.id));
        };

        loadTasks();
    }, []);

    const handleAdd = async () => {
        const text = value.trim();
        if (!text) return;

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false,
        }
        if (!dataBase.current) return;

        await addTask(dataBase.current, newTask)
        setTasks(prev => [newTask, ...prev]);

        setValue('');
    }

    const handleToggle = async (id: number) => {
        const task = tasks.find(task => task.id === id);

        if (!task) return;
        const updated = {...task, completed: !task.completed};

        if (!dataBase.current) return;
        await updateTask(dataBase.current, updated);

        setTasks(prev => prev.map(task => task.id === id ? updated : task));
    }

    const visibleTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        return task.completed;
    });

    return (
        <>
            <div className={styles.form}>
                <input className={styles.input} value={value} onChange={e => setValue(e.target.value)}/>
                <button className={styles.button} onClick={handleAdd}>Добавить</button>
            </div>
            <ul className={styles.list}>
                {visibleTasks.map(task =>
                    <li className={styles.item} key={task.id}>
                        <span className={clsx(task.completed && styles.done)}>{task.text}</span>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                        />
                    </li>
                )}
            </ul>
        </>
    )
};
