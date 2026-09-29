import type {Filter, TodoTask} from "@/shared/types";

export const options: {value: Filter, label: string}[] = [
    {value: 'all', label: 'Все'},
    {value: 'active', label: 'Активные'},
    {value: 'completed', label: 'Выполненные'},
];

export const filterTasks = (tasks: TodoTask[], filter: Filter) => {
    return tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        return task.completed;
    });
};
