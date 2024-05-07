import Page from "../../molecules/Page/Page";
import TodoItem from "../../molecules/TodoItem/TodoItem";
import './TaskList.css';
import { useTodos } from "../../../contexts/TodoContext";
import { useEffect } from "react";
export default function TaskList({type="todo"}) {
    const {todos, deleted, completed, fetchTodos, fetchDeleted, fetchCompleted} = useTodos();
    useEffect(() => {
        switch (type) {
            case 'todo':
                fetchTodos();
                break;
            case 'complete':
                fetchCompleted();
                break;
            case 'delete':
                fetchDeleted();
                break;
            default:
                fetchTodos();
        }
    }, [type, fetchTodos, fetchCompleted, fetchDeleted]);

    const src = {
        'todo': todos,
        'complete': completed,
        'delete': deleted
    }[type] || [];

    const msg = {
        'todo': 'No tasks for today.',
        'complete': 'Nothing completed yet.',
        'delete': 'No deleted tasks.'
    }[type];

    return src.length > 0 ? <Page title={`Today`}>
        {src.map(todo => <TodoItem key={todo.id} type={type} todo={todo}></TodoItem>)}
    </Page> : <div className="empty-todo">
        <p>{msg}</p>
    </div>
}