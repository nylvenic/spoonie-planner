import { useContext, createContext, useState, useCallback } from "react";
import todoManager from "../models/TodoList/TodoListManager";
import Todo from "../models/TodoList/Todo";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [completed, setCompleted] = useState([]);

    const fetchTodos = useCallback(async () => {
        const result = await todoManager.getAll();
        setTodos(result);
    }, []);

    const fetchDeleted = useCallback(async () => {
        const result = await todoManager.getAll('deleted');
        setDeleted(result);
    }, []);

    const fetchCompleted = useCallback(async () => {
        const result = await todoManager.getAll('completed');
        setCompleted(result);
    }, []);

    const alterCompleteStatus = useCallback(async ({ id, newStatus }) => {
        await todoManager.alterCompleteStatus({ id, newStatus });
        await fetchTodos();
        await fetchCompleted();
    }, [fetchTodos, fetchCompleted]);

    const create = useCallback(async (data) => {
        const todo = new Todo(data);
        await todoManager.createTodo(todo);
        await fetchTodos();
    }, [fetchTodos]);

    const update = useCallback(async ({ data, id }) => {
        const todo = new Todo(data);
        console.log(data);
        await todoManager.updateTodo({ data: todo, id });
        await fetchTodos();
    }, [fetchTodos]);

    const value = {
        fetchTodos,
        fetchDeleted,
        fetchCompleted,
        create,
        update,
        alterCompleteStatus,
        todos,
        deleted,
        completed,
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => useContext(TodoContext);
