import styles from "./styles.module.css";
import type {Filter} from "@/shared/types";
import {TaskItem, useTasks} from "@/entities/task";
import {AddTask} from "@/features/add-task";
import {filterTasks} from "@/features/filter-list";

type TodoListProps = {
    filter: Filter;
}

export const TodoList = ({filter}: TodoListProps) => {
    const {tasks, add, toggle, toggleImportant} = useTasks();

    const visibleTasks = filterTasks(tasks, filter);

    return (
        <>
            <AddTask onAdd={add}/>
            <ul className={styles.list}>
                {visibleTasks.map(task =>
                    <TaskItem key={task.id} task={task} onToggle={toggle} onToggleImportant={toggleImportant}/>
                )}
            </ul>
        </>
    )
};
