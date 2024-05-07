import { useContext, createContext, useState, useCallback } from "react";
import todoManager from "../models/TodoList/TodoListManager";
import Todo from "../models/TodoList/Todo";
const TodoContext = createContext();

export const TodoProvider = ({children}) => {
    const [todos, setTodos] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [completed, setCompleted] = useState([]);

    const fetchTodos = useCallback(async () => {
        const result = await todoManager.getAll();
        setTodos(result);
    }, []);

    const fetchDeleted = useCallback(async() => {
        const result = await todoManager.getAll('deleted');
        setDeleted(result);
    }, []);

    const fetchCompleted = useCallback(async() => {
        const result = await todoManager.getAll('completed');
        setCompleted(result);
    }, []);


    const alterCompleteStatus = useCallback(async function({id, newStatus}) {
        const result = await todoManager.completeTodo({id, newStatus});
        await fetchTodos();
        await fetchCompleted();
    });

    const quickCreate = useCallback(async({text, date, cost, repeat, replenish}) => {
        const todo = new Todo({text, date, cost, repeat, replenish});
        await todoManager.createTodo(todo);
        await fetchTodos();
    }, []);

    const value = {
        fetchTodos,
        fetchDeleted,
        fetchCompleted,
        quickCreate,
        alterCompleteStatus,
        todos,
        deleted,
        completed
    }

    return <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
}

export const useTodos = () => useContext(TodoContext);