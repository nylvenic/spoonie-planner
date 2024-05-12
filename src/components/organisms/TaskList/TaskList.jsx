import React, { useEffect } from "react";
import Page from "../../molecules/Page/Page";
import TodoItem from "../../molecules/TodoItem/TodoItem";
import './TaskList.css';
import { useTodos } from "../../../contexts/TodoContext";
import CONSTANTS from "../../../models/utils/CONSTANTS";

export default function TaskList({ type = CONSTANTS.TODO_TYPE.TODO }) {
    const { todos, deleted, completed, fetchTodos, fetchDeleted, fetchCompleted } = useTodos();

    useEffect(() => {
        switch (type) {
            case CONSTANTS.TODO_TYPE.TODO:
                fetchTodos();
                break;
            case CONSTANTS.TODO_TYPE.COMPLETED:
                fetchCompleted();
                break;
            case CONSTANTS.TODO_TYPE.DELETED:
                fetchDeleted();
                break;
            default:
                fetchTodos();
        }
    }, [type, fetchTodos, fetchCompleted, fetchDeleted]);

    const src = {
        [CONSTANTS.TODO_TYPE.TODO]: todos,
        [CONSTANTS.TODO_TYPE.COMPLETED]: completed,
        [CONSTANTS.TODO_TYPE.DELETED]: deleted
    }[type] || [];

    const msg = {
        [CONSTANTS.TODO_TYPE.TODO]: 'No tasks for today.',
        [CONSTANTS.TODO_TYPE.COMPLETED]: 'Nothing completed yet.',
        [CONSTANTS.TODO_TYPE.DELETED]: 'No deleted tasks.'
    }[type];

    const title = {
        [CONSTANTS.TODO_TYPE.TODO]: 'Today\'s Tasks',
        [CONSTANTS.TODO_TYPE.COMPLETED]: 'Completed Tasks',
        [CONSTANTS.TODO_TYPE.DELETED]: 'Deleted Tasks'
    }[type];

    return src.length > 0 ? (
        <Page title={title}>
            {src.map(todo => (
                <TodoItem key={todo.id} type={type} todo={todo} />
            ))}
        </Page>
    ) : (
        <div className="empty-todo">
            <p>{msg}</p>
        </div>
    );
}
