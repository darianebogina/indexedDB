import {type Ref, type SubmitEvent, useImperativeHandle, useRef, useState} from "react";
import styles from "./styles.module.css";
import type {AddTaskHandle} from "../lib.ts";

type AddTaskProps = {
    onAdd: (text: string) => Promise<void>;
    ref?: Ref<AddTaskHandle>;
}

export const AddTask = ({onAdd, ref}: AddTaskProps) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        clear: () => {
            setValue('');
            inputRef.current?.focus();
        },
    }), []);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const text = value.trim();
        if (!text) return;

        await onAdd(text);
        setValue('');
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input ref={inputRef} className={styles.input} value={value} onChange={e => setValue(e.target.value)}/>
            <button className={styles.button}>Добавить</button>
        </form>
    )
};
