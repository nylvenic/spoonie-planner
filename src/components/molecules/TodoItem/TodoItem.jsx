import Spoon from "../../atoms/Icon/Spoon";
import { Button } from "@mui/material";
import './TodoItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat} from '@fortawesome/free-solid-svg-icons';
import {Checkbox} from "@mui/material";
import dayjs from "dayjs";
import { useTodos } from "../../../contexts/TodoContext";
import { useSpoonContext } from "../../../contexts/SpoonContext";
import IconToggler from "../IconToggler/IconToggler";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
export default function TodoItem({todo, type}) {
    const {modifySpoons} = useSpoonContext();
    const {state, dispatch} = useTodos();
    let btn;

    if(type == 'todo') {
        btn = <Checkbox value={false} onClick={(e) => {
            modifySpoons(todo.cost, todo.replenish);
            dispatch({
                type: 'COMPLETE_TODO', payload: {
                    id: todo.id,
                }
            });
            }
        } className="mark-complete"></Checkbox>
    } else if (type == 'delete') {
        btn = <IconToggler
        small={true}
        square={true}
        className="mark-complete">
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </IconToggler>
    } else if (type == 'complete') {
        btn = <IconToggler
        onClick={e => {
            modifySpoons((-1*todo.cost), todo.replenish);
            dispatch({
                type: 'UNCOMPLETE_TODO', payload: {
                    id: todo.id,
                }
            });
        }}
        small={true}
        square={true}
        className="mark-complete">
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </IconToggler>
    } else {
        btn = null;
    }

    return <div className="todo-item">
        {btn}
        <p className="todo-text">{todo.text}</p>
        <div className="todo-meta">
            <div className="spoons-cost">
                {todo.replenish ? <span className="replenish-indicator">+</span> : ''}
                {todo.cost > 3 
                ? <><Spoon></Spoon><sup>{todo.cost}x</sup></> : 
                [...Array(todo.cost).keys()].map(spoons => <Spoon key={spoons}></Spoon>)}
            </div>
            <span className="divider">•</span>
            <p className="date">{dayjs(todo.date).format('LT')}</p>
            {todo.repeat ? <FontAwesomeIcon icon={faRepeat}></FontAwesomeIcon> : ''}
        </div>
    </div>
}