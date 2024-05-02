import Page from "../../molecules/Page/Page";
import TodoItem from "../../molecules/TodoItem/TodoItem";
import './TaskList.css';
import { useTodos } from "../../../contexts/TodoContext";
export default function TaskList() {
    const {state, dispatch} = useTodos();
    return state.todos.length > 0 ? <Page title={`Today`}>
        {state.todos.map(todo => <TodoItem key={todo.id} todo={todo}></TodoItem>)}
    </Page> : <div className="empty-todo">
        <p>No tasks for today.</p>
        <p>Enjoy your break!</p>
    </div>
}