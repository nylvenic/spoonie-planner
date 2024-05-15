import './QuickAddPopup.css';
import { useRef, useEffect } from 'react';
import { useUIContext } from '../../../contexts/UIContext';
import Overlay from '../../atoms/Overlay/Overlay';
import AddTodoFields from '../AddTodoFields/AddTodoFields';
export default function QuickAddPopup() {
    const {quickAddPopup, setQuickAddPopup} = useUIContext();
    const dialog = useRef(0);

    useEffect(() => {
      quickAddPopup ? dialog.current.style.display = 'block' : dialog.current.style.display = 'none';
      quickAddPopup ? dialog.current.show() : dialog.current.close();
    }, [quickAddPopup]);

    return (<>
      <Overlay onClick={() => setQuickAddPopup(false)}></Overlay>
      <dialog ref={dialog} open className="quick-add-popup">
        <AddTodoFields modal={true} cb={() => setQuickAddPopup(false)}></AddTodoFields>
      </dialog>
    </>);
}