import todoManager from "../models/TodoList/TodoListManager";
import Todo from "../models/TodoList/Todo";
export default function(state, action) {
    switch(action.type) {
        case 'CREATE_TODO':
            try {
                const {text, cost, date, repeat, replenish, id} = action.payload;
                const todo = new Todo({text, cost, date, repeat, replenish, id});
                todoManager.createTodo(todo);
            } catch(err) {
                console.log(`Invalid operation spotted. Returning state...`, err);
            }

            return {
                ...state,
                todos: [...todoManager.todos.memory],
                completed: [...todoManager.completed.memory]
            }
        case 'COMPLETE_TODO':
            try {
                const {id} = action.payload;
                todoManager.completeTodo(id);
            } catch(err) {
                console.log(`Invalid operation spotted. Returning state...`, err);
            }

            return {
                ...state,
                todos: [...todoManager.todos.memory],
                completed: [...todoManager.completed.memory]
            }
        default:
            throw new Error(`Unrecognized type: ${action.type}`); 
    }
}