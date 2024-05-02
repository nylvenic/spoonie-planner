import './SpoonMeterController.js';
import '../TodoList/TodoList.js'

class User {
    constructor({name, password}) {
        this.name = name;
        this.password = password;
        this.spoons = new SpoonMeter();
        this.todos = new TodoList();
        this.completed = new TodoList();
        this.deleted = new TodoList();
    }
}