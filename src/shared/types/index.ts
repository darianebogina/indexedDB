export type Filter = 'all' | 'active' | 'completed';

export type TodoTask = {
    id: number;
    text: string;
    completed: boolean;
    // important: boolean;
}
