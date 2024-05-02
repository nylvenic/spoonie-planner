import { SpoonContextProvider } from "../contexts/SpoonContext";
import { TodoProvider } from "../contexts/TodoContext.jsx";
import SpoonMeter from '../components/organisms/SpoonMeter/SpoonMeter.jsx';
import QuickAdd from '../components/molecules/QuickAdd/QuickAdd.jsx';
import TaskList from "../components/organisms/TaskList/TaskList.jsx";
import QuickAddPopup from '../components/organisms/QuickAddPopup/QuickAddPopup.jsx';
import SidePopup from '../components/organisms/SidePopup/SidePopup.jsx';
import Nav from '../components/organisms/Nav/Nav.jsx';
export default function Home() {
    return <>
    <Nav text="Today"></Nav>
    <SpoonContextProvider>
      <SpoonMeter></SpoonMeter>
      <QuickAdd></QuickAdd>
      <TodoProvider>
        <TaskList></TaskList>
        <QuickAddPopup></QuickAddPopup>
      </TodoProvider>
    </SpoonContextProvider>
    <SidePopup></SidePopup>
  </>;
}