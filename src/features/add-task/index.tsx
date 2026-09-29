import {type SubmitEvent, useState} from "react";
import styles from "./styles.module.css";

type AddTaskProps = {
    onAdd: (text: string) => Promise<void>;
}

export const AddTask = ({onAdd}: AddTaskProps) => {
    const [value, setValue] = useState('');

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const text = value.trim();
        if (!text) return;

        await onAdd(text);
        setValue('');
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input className={styles.input} value={value} onChange={e => setValue(e.target.value)}/>
            <button className={styles.button}>Добавить</button>
        </form>
    )
};
