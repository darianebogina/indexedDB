import clsx from "clsx";
import styles from "./styles.module.css";
import type {Filter} from "@/shared/types";
import {options} from "../lib.ts";

type FilterListProps = {
    filter: Filter;
    onFilterChange: (filter: Filter) => void;
}

export const FilterList = ({filter, onFilterChange}: FilterListProps) => {
    return (
        <div className={styles.filters}>
            {options.map(option => (
                <button
                    key={option.value}
                    className={clsx(styles.filterButton, filter === option.value && styles.active)}
                    onClick={() => onFilterChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
};
