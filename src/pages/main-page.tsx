import {useState} from "react";
import {TodoList} from "@/widgets/todo-list";
import {FilterList} from "@/widgets/filter-list";
import type {Filter} from "@/shared/types";

export const MainPage = () => {
    const [filter, setFilter] = useState<Filter>('all');

    return (
        <>
            <h2>Список задач</h2>
            <FilterList filter={filter} onFilterChange={setFilter} />
            <TodoList filter={filter} />
        </>
    )
}
