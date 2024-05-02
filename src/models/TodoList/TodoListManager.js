import TodoList from "./TodoList";

class TodoListManager {
    constructor() {
        this.todos = new TodoList();
        this.deleted = new TodoList();
        this.completed = new TodoList();
    }

    completeTodo(id) {
        const {removed} = this.todos.remove(id);
        removed.completed = true;
        this.completed.add(removed);
        return removed;
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

    createTodo(todo) {
        this.todos.add(todo);
    }
}

export default new TodoListManager();