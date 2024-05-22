import Spoon from "../../atoms/Icon/Spoon";
import './TodoItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat} from '@fortawesome/free-solid-svg-icons';
import {Checkbox} from "@mui/material";
import dayjs from "dayjs";
import { useTodos } from "../../../contexts/TodoContext";
import { useSpoonContext } from "../../../contexts/SpoonContext";
import IconToggler from "../IconToggler/IconToggler";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import CONSTANTS from "../../../models/utils/CONSTANTS";
import mapType from "../../../models/utils/mapType";
export default function TodoItem({todo, type}) {
    const {alterCompleteStatus} = useTodos();
    const {modifySpoons} = useSpoonContext();
    const {userData} = useAuth();
    const navigate = useNavigate();
    let btn;

    const gotoTodo = (e) => {
        e.stopPropagation();
        navigate(`/todos/${todo.id}?page=${mapType(type)}&type=${type}`);
    }

    async function buttonAction(e, type) {
        e.stopPropagation();

        if (type == CONSTANTS.TODO_TYPE.INBOX || type == CONSTANTS.TODO_TYPE.TODAY) {
            await alterCompleteStatus({id:todo.id, newStatus:true});
            await modifySpoons({cost:todo.cost, replenish:todo.replenish, maxSpoons: userData.maxSpoons})
        } else if (type == CONSTANTS.TODO_TYPE.DELETED) {
        } else if (type == CONSTANTS.TODO_TYPE.COMPLETED) {
            await alterCompleteStatus({id:todo.id, newStatus:false});
            await modifySpoons({cost:todo.cost, replenish:!(todo.replenish), maxSpoons: userData.maxSpoons})
        }
    }

    if(type == CONSTANTS.TODO_TYPE.TODAY || type == CONSTANTS.TODO_TYPE.INBOX || type == CONSTANTS.TODO_TYPE.COMPLETED) {
        let ariaText;

        if(type == CONSTANTS.TODO_TYPE.TODAY || type == CONSTANTS.TODO_TYPE.INBOX) {
            ariaText = 'Mark the todo as complete';
        } else if(type == CONSTANTS.TODO_TYPE.COMPLETED) {
            ariaText = 'Mark the todo as uncomplete.';
        } else {
            ariaText = 'This button does nothing.';
        }

        btn = <IconToggler
        data-testid="check"
        aria-label={ariaText}
        onClick={(e) => buttonAction(e, type)}
        small={true}
        square={true}
        className="mark-complete">
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </IconToggler>
    } else if (type == CONSTANTS.TODO_TYPE.DELETED) {
        btn = <IconToggler
        data-testid="xmark"
        small={true}
        square={true}
        className="mark-complete">
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </IconToggler>
    } else {
        btn = null;
    }

    return <div className="todo-item" data-testid="todo-item" aria-label="Displays all todo data on the screen" role="button" tabIndex="0" onClick={gotoTodo}>
        {btn}
        <p className="todo-text">{todo.text}</p>
        <div className="todo-meta">
            <div className="spoons-cost">
                {todo.replenish ? <span data-testid="Replenish" aria-label="Replenishes Spoons" className="replenish-indicator">+</span> : ''}
                {todo.cost > 3 
                ? <span data-testid="greater-than-3"><Spoon></Spoon><sup>{todo.cost}x</sup></span> : 
                [...Array(todo.cost).keys()].map(spoons => <Spoon data-testid="spoon" key={spoons}></Spoon>)}
            </div>
            <span className="divider">•</span>
            <p className="date">{dayjs(todo.date * 1000).format('MMM D, YYYY h:mm A')}</p>
            {todo.repeat ? <FontAwesomeIcon title="Repeats" data-testid="Repeats" icon={faRepeat}></FontAwesomeIcon> : ''}
        </div>
    </div>
}