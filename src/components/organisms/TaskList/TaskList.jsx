import Page from "../../molecules/Page/Page";
import TodoItem from "../../molecules/TodoItem/TodoItem";
import './TaskList.css';
import { useTodos } from "../../../contexts/TodoContext";
export default function TaskList({type="todo"}) {
    const {state, dispatch} = useTodos();
    let src;
    let msg;

    if(type == 'todo') {
        src = state.todos;
        msg = 'No tasks for today.';
    } else if(type == 'complete') {
        src = state.completed;
        msg = 'Nothing completed yet.';
    } else if(type == 'delete') {
        src = state.deleted;
        msg = 'No deleted tasks.'
    }

    return src.length > 0 ? <Page title={`Today`}>
        {src.map(todo => <TodoItem key={todo.id} type={type} todo={todo}></TodoItem>)}
    </Page> : <div className="empty-todo">
        <p>{msg}</p>
    </div>
}