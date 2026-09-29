# IndexedDB Todo List

Небольшое приложение-список задач на React + TypeScript, которое хранит данные локально в браузере через **IndexedDB** (без бэкенда).

## Возможности

- Добавление задач
- Отметка задач как выполненных
- Фильтрация списка: все / активные / выполненные
- Данные сохраняются в IndexedDB и не пропадают при перезагрузке страницы

## Стек

- React 19 + TypeScript
- Vite
- IndexedDB (нативный браузерный API)
- ESLint

## Структура проекта

```
src/
├── app/                # инициализация приложения, глобальные стили
├── pages/              # страницы (main-page)
├── widgets/
│   └── todo-list/      # список задач: собирает форму, фильтр и задачи
├── features/
│   ├── add-task/       # форма добавления задачи
│   └── filter-list/    # переключатель фильтров + фильтрация задач
├── entities/
│   └── task/           # задача: UI элемента, хук useTasks, работа с IndexedDB
└── shared/types/       # общие типы (Filter, TodoTask)
```

## Запуск

```bash
pnpm install
pnpm dev
```

Другие команды:

```bash
pnpm build    # сборка production-версии
pnpm preview  # предпросмотр production-сборки
pnpm lint     # проверка линтером
```
