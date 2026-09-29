import clsx from "clsx";
import styles from "./styles.module.css";
import type {TodoTask} from "@/shared/types";

type TaskItemProps = {
    task: TodoTask;
    onToggle: (id: number) => void;
    // onToggleImportant: (id: number) => void;
}

export const TaskItem = ({task, onToggle, onToggleImportant}: TaskItemProps) => {
    return (
        <li className={styles.item}>
            <span className={clsx(task.completed && styles.done)}>{task.text}</span>
            <div className={styles.features}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                {/*<button onClick={() => onToggleImportant(task.id)} className={styles.buttonStar}>*/}
                {/*    {task.important ? '★' : '☆'}*/}
                {/*</button>*/}
            </div>
        </li>
    )
};
