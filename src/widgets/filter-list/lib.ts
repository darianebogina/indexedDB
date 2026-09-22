import type {Filter} from "@/shared/types";

export const options: {value: Filter, label: string}[] = [
    {value: 'all', label: 'Все'},
    {value: 'active', label: 'Активные'},
    {value: 'completed', label: 'Выполненные'},
];