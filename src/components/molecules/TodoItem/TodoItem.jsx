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
export default function TodoItem({todo, type}) {
    const {alterCompleteStatus} = useTodos();
    const {modifySpoons} = useSpoonContext();
    const {userData} = useAuth();
    const navigate = useNavigate();
    let btn;

    function mapType(type) {
        let editMode;
        switch(type) {
            case CONSTANTS.TODO_TYPE.COMPLETED: {
                editMode = CONSTANTS.EDIT_MODE.UPDATE;
                break;
            }
            case CONSTANTS.TODO_TYPE.DELETED: {
                editMode = CONSTANTS.EDIT_MODE.DELETE;
                break;
            }
            case CONSTANTS.TODO_TYPE.INBOX: {
                editMode = CONSTANTS.EDIT_MODE.UPDATE;
                break;
            }
            case CONSTANTS.TODO_TYPE.TODAY: {
                editMode = CONSTANTS.EDIT_MODE.UPDATE;
                break;
            }
        }
        return editMode;
    }

    function gotoTodo(e) {
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

    if(type == CONSTANTS.TODO_TYPE.TODAY || type == CONSTANTS.TODO_TYPE.INBOX) {
        btn = <Checkbox 
        value={false} 
        onClick={(e) => buttonAction(e, type)}
        className="mark-complete"></Checkbox>
    } else if (type == CONSTANTS.TODO_TYPE.DELETED) {
        btn = <IconToggler
        small={true}
        square={true}
        className="mark-complete">
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </IconToggler>
    } else if (type == CONSTANTS.TODO_TYPE.COMPLETED) {
        btn = <IconToggler
        onClick={(e) => buttonAction(e, type)}
        small={true}
        square={true}
        className="mark-complete">
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </IconToggler>
    } else {
        btn = null;
    }

    return <div className="todo-item" data-testid="todo-item" onClick={gotoTodo}>
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
            <p className="date">{dayjs(todo.date * 1000).format('MMM D, YYYY h:mm A')}</p>
            {todo.repeat ? <FontAwesomeIcon icon={faRepeat}></FontAwesomeIcon> : ''}
        </div>
    </div>
}