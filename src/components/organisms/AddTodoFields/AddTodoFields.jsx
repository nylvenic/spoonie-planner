import './AddTodoFields.css';
import { TextField, FormControlLabel, Switch, Button } from "@mui/material";
import SpoonSelect from '../../molecules/SpoonSelect/SpoonSelect';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useTodos } from '../../../contexts/TodoContext';

export default function AddTodoFields({ todo, modal = false, mode = 'create', cb = () => {} }) {
    const todos = useTodos(); // Ensure this is not undefined and returns proper methods.
    const [todoName, setTodoName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [cost, setCost] = useState(1);
    const [repeat, setRepeat] = useState(false);
    const [replenish, setReplenish] = useState(false);

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
        const todoData = { text: todoName, date, cost, repeat, replenish, description };

        try {
            console.log(todos);
            if (mode === 'create') {
                await todos.create(todoData);
                resetAll();
            } else if (mode === 'update') {
                await todos.update({data: todoData, id: todo.id});
            } else {
                console.error('Invalid mode: Please use "create" or "update".');
            }
            cb(); // Trigger callback if provided
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <form className={`todo-fields ${modal ? '' : 'fill-screen'}`} onSubmit={handleSubmit}>
            <TextField
                required
                label="What are you doing today?"
                style={{ width: '100%' }}
                onChange={(e) => setTodoName(e.target.value)}
                value={todoName}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDateTimePicker
                    value={dayjs(date)}
                    onChange={(e) => setDate(new Date(e.$d))}
                />
            </LocalizationProvider>
            <div className="togglers">
                <FormControlLabel
                    className="toggler-color"
                    control={
                        <Switch
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
                            checked={replenish}
                            onChange={(e) => setReplenish(e.target.checked)}
                            name="replenishing"
                        />
                    }
                    label="Replenish Spoons?"
                />
            </div>
            <SpoonSelect value={cost} onChange={(cost) => setCost(cost)} />
            {!modal && (
                <textarea
                    placeholder="Enter your description here"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            )}
            <div className="controls">
                <Button type="submit" variant='contained' className='create-btn'>
                    {mode === 'create' ? 'Create Todo' : mode === 'update' ? 'Update Todo' : 'Invalid Mode'}
                </Button>
            </div>
        </form>
    );
}
