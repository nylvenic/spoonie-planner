import { useContext, createContext, useState, useReducer } from "react";
import todoReducer from "../reducers/todoReducer";
import todoManager from "../models/TodoList/TodoListManager";
const TodoContext = createContext();
const initialState = {
    completed: [],
    todos: [],
    deleted: [],   
}

export const TodoProvider = ({children}) => {
    const [state, dispatch] = useReducer(todoReducer, initialState, initial => {
        initial.todos = [...todoManager.todos.memory];
        initial.completed = [...todoManager.completed.memory];
        initial.deleted = [...todoManager.deleted.memory];
        return initial;
    });

    const value = {
        state,
        dispatch
    }
    return <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
}

export const useTodos = () => useContext(TodoContext);