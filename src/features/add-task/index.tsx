import {useState} from "react";
import styles from "./styles.module.css";

type AddTaskProps = {
    onAdd: (text: string) => Promise<void>;
}

export const AddTask = ({onAdd}: AddTaskProps) => {
    const [value, setValue] = useState('');

    const handleAdd = async () => {
        const text = value.trim();
        if (!text) return;

        await onAdd(text);
        setValue('');
    }

    return (
        <div className={styles.form}>
            <input className={styles.input} value={value} onChange={e => setValue(e.target.value)}/>
            <button className={styles.button} onClick={handleAdd}>Добавить</button>
        </div>
    )
};
