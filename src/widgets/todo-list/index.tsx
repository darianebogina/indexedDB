import {useEffect, useRef} from "react";
import styles from "./styles.module.css";
import type {Filter} from "@/shared/types";
import {TaskItem, useTasks} from "@/entities/task";
import {AddTask, type AddTaskHandle} from "@/features/add-task";
import {filterTasks} from "@/features/filter-list";

type TodoListProps = {
    filter: Filter;
}

export const TodoList = ({filter}: TodoListProps) => {
    const {tasks, add, toggle, toggleImportant} = useTasks();
    const addTaskRef = useRef<AddTaskHandle>(null);

    useEffect(() => {
        addTaskRef.current?.focus();
    }, []);

    const visibleTasks = filterTasks(tasks, filter);

    return (
        <>
            <div className={styles.toolbar}>
                <AddTask ref={addTaskRef} onAdd={add}/>
                <button className={styles.clear} type="button" onClick={() => addTaskRef.current?.clear()}>Очистить
                </button>
            </div>
            <ul className={styles.list}>
                {visibleTasks.map(task =>
                    <TaskItem key={task.id} task={task} onToggle={toggle} /*onToggleImportant={toggleImportant}*//>
                )}
            </ul>
        </>
    )
};
