import './AddTodoFields.css';
import { TextField, FormControlLabel, Switch } from "@mui/material";
import SpoonSelect from '../../molecules/SpoonSelect/SpoonSelect';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useTodos } from '../../../contexts/TodoContext';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../../../models/utils/CONSTANTS';
import MessageBox from '../../molecules/MessageBox/MessageBox';
import { useSpoonContext } from '../../../contexts/SpoonContext';
import { useAuth } from '../../../contexts/AuthContext';

export default function AddTodoFields({ todo, modal = false, mode = CONSTANTS.EDIT_MODE.CREATE, type = CONSTANTS.TODO_TYPE.INBOX, cb = () => {} }) {
    const {userData} = useAuth();
    const todos = useTodos(); // Ensure this is not undefined and returns proper methods.
    const {modifySpoons} = useSpoonContext();
    const [todoName, setTodoName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [cost, setCost] = useState(1);
    const [repeat, setRepeat] = useState(false);
    const [replenish, setReplenish] = useState(false);
    const [notification, setNotification] = useState({
        msg: '',
        success: false,
    });
    const editable = mode !== CONSTANTS.EDIT_MODE.CREATE && mode !== CONSTANTS.EDIT_MODE.UPDATE;
    const navigate = useNavigate();
    useEffect(() => {
        if (todo) {
            setTodoName(todo.text || '');
            setDescription(todo.description || '');
            setDate(new Date((todo.date * 1000) || new Date()));
            setCost(todo.cost || 1);
            setRepeat(!!todo.repeat_task);
            setReplenish(!!todo.replenish);
        }
    }, [todo]);

    function resetAll() {
        setTodoName('');
        setDescription('');
        setDate(new Date());
        setCost(1);
        setRepeat(false);
        setReplenish(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // Convert date to UNIX timestamp (in seconds)
        const unix = dayjs(date).unix();
        const todoData = {
            text: todoName,
            date: unix,  // Use the timestamp instead of the Date object
            cost,
            repeat,
            replenish,
            description
        };

        try {
            if (mode === CONSTANTS.EDIT_MODE.CREATE) {
                await todos.create(todoData);
                resetAll();
            } else if (mode === CONSTANTS.EDIT_MODE.UPDATE) {
                const {msg, success} = await todos.update({data: todoData, id: todo.id});
                setNotification({
                    msg,
                    success
                })
            } else if (mode === CONSTANTS.EDIT_MODE.DELETE) {
                await todos.alterDeletedStatus({id:todo.id, newStatus: false});
                navigate(`/deleted`);
            } else if (mode === CONSTANTS.EDIT_MODE.COMPLETE) {
                await todos.alterCompleteStatus({id:todo.id, newStatus:false});
                await modifySpoons({cost:todo.cost, replenish:!(todo.replenish), maxSpoons: userData.maxSpoons})
                navigate('/completed');
            } else {
                console.error('Invalid mode: Please use CONSTANTS.');
            }
            cb(); // Trigger callback if provided
        } catch (error) {
            setNotification({
                msg: error.message,
                success: false
            });
        }
    }

    async function deleteAction() {
        await todos.deleteTodo(todo.id);
        navigate('/deleted');
    } 

    async function handleTrashClick(e) {
        e.preventDefault();
        await todos.alterDeletedStatus({id:todo.id, newStatus: true});
        if(type == CONSTANTS.TODO_TYPE.TODAY) {
            navigate(`/today`);
        } else if (type == CONSTANTS.TODO_TYPE.INBOX) {
            navigate(`/inbox`);
        } else if (type == CONSTANTS.TODO_TYPE.COMPLETED) {
            navigate(`/completed`);
        } else {
            navigate(`/`);
        }
    }

    return (
        <form data-testid={modal ? CONSTANTS.ids.AddTodoFieldsModal : CONSTANTS.ids.AddTodoFields} 
        className={`todo-fields ${modal ? '' : 'fill-screen'}`} onSubmit={handleSubmit}>
            {notification.msg && <MessageBox text={notification.msg} error={!notification.success} cb={() => setNotification({
                msg: '',
                success: false,
            })}></MessageBox>}
            <TextField
                disabled={editable}
                label="What are you doing today?"
                style={{ width: '100%' }}
                onChange={(e) => setTodoName(e.target.value)}
                value={todoName}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    disabled={editable}
                    value={dayjs(date)}
                    onChange={(newValue) => setDate(new Date(newValue.$d))}  // Ensure this sets the Date object correctly
                    label="Date select"
                />
            </LocalizationProvider>
            <div className="togglers">
                <FormControlLabel
                    className="toggler-color"
                    control={
                        <Switch
                            disabled={editable}
                            checked={repeat}
                            onChange={(e) => setRepeat(e.target.checked)}
                            name="repeat"
                        />
                    }
                    label="Repeat?"
                />
                <FormControlLabel
                    className="toggler-color"
                    control={
                        <Switch
                            disabled={editable}
                            checked={replenish}
                            onChange={(e) => setReplenish(e.target.checked)}
                            name="replenishing"
                        />
                    }
                    label="Replenish spoons?"
                />
            </div>
            <SpoonSelect value={cost} onChange={(cost) => setCost(cost)} />
            {!modal && (
                <>
                    <label htmlFor="todo-description">Description</label>
                    <textarea
                        disabled={editable}
                        id="todo-description"
                        placeholder="Enter your description here"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="Todo description"
                    />
                </>
            )} 
            <div className="controls">
                {(mode === CONSTANTS.EDIT_MODE.UPDATE && type !== CONSTANTS.TODO_TYPE.COMPLETED) ? 
                <CustomButton aria-label="Delete Button" fullWidth={false} variant='contained' color="danger" onClick={handleTrashClick}> 
                    <FontAwesomeIcon size="lg" icon={faTrash}></FontAwesomeIcon>
                </CustomButton> : ''}
                {(mode === CONSTANTS.EDIT_MODE.DELETE || type === CONSTANTS.TODO_TYPE.COMPLETED) && 
                <CustomButton onClick={deleteAction} aria-label="Permanently Delete" fullWidth={false} color="danger" variant='contained'>Delete Forever</CustomButton>}
                <CustomButton fullWidth={false} type="submit" variant='contained' className='create-btn'>
                    {mode === CONSTANTS.EDIT_MODE.CREATE ? 'Create Todo' : 
                     mode === CONSTANTS.EDIT_MODE.UPDATE ? 'Update Todo' :
                     mode === CONSTANTS.EDIT_MODE.COMPLETE ? 'Uncomplete' :
                     mode === CONSTANTS.EDIT_MODE.DELETE ? 'Restore' : 
                     'Invalid Mode'}
                </CustomButton>
            </div>
        </form>
    );
}
