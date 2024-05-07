import './QuickAddPopup.css';
import { TextField, Switch, FormControlLabel, Button } from '@mui/material';
import SpoonSelect from '../../molecules/SpoonSelect/SpoonSelect';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { useTodos } from '../../../contexts/TodoContext';
import { useUIContext } from '../../../contexts/UIContext';
import Overlay from '../../atoms/Overlay/Overlay';
export default function QuickAddPopup() {
    const {quickAddPopup, setQuickAddPopup} = useUIContext();
    const dialog = useRef(0);
    const {quickCreate} = useTodos();
    const [todoName, setTodoName] = useState('');
    const [date, setDate] = useState(new Date());
    const [cost, setCost] = useState(1);
    const [repeat, setRepeat] = useState(false);
    const [replenish, setReplenish] = useState(false);

    useEffect(() => {
      quickAddPopup ? dialog.current.style.display = 'block' : dialog.current.style.display = 'none';
      quickAddPopup ? dialog.current.show() : dialog.current.close();
    }, [quickAddPopup]);

    return (<>
      <Overlay onClick={() => setQuickAddPopup(false)}></Overlay>
        <dialog ref={dialog} open className="quick-add-popup">
          <form onSubmit={async (e) => {
              e.preventDefault();
              await quickCreate({
                  text: todoName,
                  cost: cost,
                  replenish: replenish,
                  repeat: repeat,
                  date: date,
              });
              setQuickAddPopup(false);
            }}>
            <TextField required={true} label="What are you doing today?" style={{width: '100%'}} onChange={(e) => setTodoName(e.target.value)}></TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker value={dayjs(date)} onChange={(e) => setDate(new Date(e.$d))}></MobileDateTimePicker>
            </LocalizationProvider>
            <div className="togglers">
              <FormControlLabel
                className="toggler-color"
                control={
                  <Switch onChange={(e) => setRepeat(e.target.checked)} name="repeat"></Switch>
                }
                label="Repeat?"
              />
              <FormControlLabel
                className="toggler-color"
                control={
                  <Switch onChange={(e) => setReplenish(e.target.checked)} name="refreshing"></Switch>
                }
                label="Replenish Spoons?"
              />
            </div>
            <SpoonSelect onChange={(cost) => setCost(cost)}></SpoonSelect>
            <div className="controls">
              <Button type="submit" variant='contained' className='create-btn'>Create Todo</Button>
            </div>
          </form>
      </dialog>
    </>);
}