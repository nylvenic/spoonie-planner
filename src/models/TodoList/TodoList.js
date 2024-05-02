import Todo from "./Todo.js";

export default class TodoList {
    constructor() {
        this.memory = [];
    }

    get memorySortedByDate() {
        return this.memory.sort((todo1, todo2) => todo2.date - todo1.date);
    }

    add(todo) {
        if(todo instanceof Todo == false) throw new Error('Please provide an item of type Todo.');
        try {
            return this.findAndAction(todo.id, (todo, index) => {
                console.error('Item with this ID already exists!');
            })
        } catch(err) {
            this.memory = [...this.memory, todo];
            return {
                message: 'Successfully added todo.',
                todo,
            }
        }
    }

    findAndAction(id, cb) {
        if(!id) throw new Error('Id was not provided. Cannot perform operation.');
        const found = this.memory.find(todo => todo.id == id);
        if(!found) throw new Error('Todo not found.');
        const index = this.memory.indexOf(found);
        return cb(found, index);
    }

    remove(id) {
        return this.findAndAction(id, (todo, index) => {
            this.memory = this.memory.filter(todo => todo.id !== id);
            return {
                message: 'Successfully removed todo.',
                removed: todo
            }
        });
    }

    update(id, {text, date, cost, repeat}) {
        return this.findAndAction(id, (todo) => {
            todo.update({text, date, cost, repeat});
            return {
                message: 'Successfully updated todo.'
            }
        });
    }
}