import clsx from "clsx";
import styles from "./styles.module.css";
import type {TodoTask} from "@/shared/types";

type TaskItemProps = {
    task: TodoTask;
    onToggle: (id: number) => void;
}

export const TaskItem = ({task, onToggle}: TaskItemProps) => {
    return (
        <li className={styles.item}>
            <span className={clsx(task.completed && styles.done)}>{task.text}</span>
            <input
                className={styles.checkbox}
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
        </li>
    )
};
