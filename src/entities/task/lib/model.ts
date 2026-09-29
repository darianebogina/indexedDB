import {useEffect, useState} from "react";
import {addTask, getAllTasks, updateTask} from "./api.ts";
import type {TodoTask} from "@/shared/types";

export const useTasks = () => {
    const [tasks, setTasks] = useState<TodoTask[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
            const loadedTasks = await getAllTasks();
            setTasks(loadedTasks.toSorted((a, b) => b.id - a.id));
        };

        loadTasks().catch(console.error);
    }, []);

    const add = async (text: string) => {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false,
            // important: false,
        }

        await addTask(newTask);
        setTasks(prev => [newTask, ...prev]);
    }

    const toggle = async (id: number) => {
        const task = tasks.find(task => task.id === id);
        if (!task) return;

        const updated = {...task, completed: !task.completed};
        await updateTask(updated);

        setTasks(prev => prev.map(task => task.id === id ? updated : task));
    }

    // const toggleImportant = async (id: number) => {
    //     const task = tasks.find(task => task.id === id);
    //     if (!task) return;
    //
    //     const updated = {...task, important: !task.important};
    //     await updateTask(updated);
    //
    //     setTasks(prev => prev.map(task => task.id === id ? updated : task));
    // }

    return {tasks, add, toggle, /*toggleImportant*/};
};
