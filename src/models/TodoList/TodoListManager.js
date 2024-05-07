import TodoList from "./TodoList";
import CONSTANTS from "../utils/CONSTANTS";
import Cookies from "js-cookie";
class TodoListManager {
    constructor() {
        this.todos = new TodoList();
        this.deleted = new TodoList();
        this.completed = new TodoList();
    }

    async completeTodo({id, newStatus}) {
        const response = await fetch(`${CONSTANTS.backend_url}/todos/${id}/complete`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newStatus
            })
        });
        return response;
    }

    uncompleteTodo(id) {
        const {removed} = this.completed.remove(id);
        removed.completed = false;
        this.todos.add(removed);
        return removed;
    }

    deleteTodo(id) {
        const {removed} = this.todos.remove(id);
        this.deleted.add(removed);
        return removed;
    }

    async getAll(status) {
        let statusString='';
        if(status == 'deleted') {
            statusString = '?status=deleted';
        } else if(status == 'completed') {
            statusString = '?status=completed';
        }
        const response = await fetch(`${CONSTANTS.backend_url}/todos${statusString}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt')}`
            }
        });
        const {todos} = await response.json(); 
        return todos;
    }

    async createTodo(todo) {
        const response = await fetch(`${CONSTANTS.backend_url}/todos/quick-create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        return response;
    }
}

export default new TodoListManager();