import { SpoonContextProvider } from "../contexts/SpoonContext.jsx";
import CONSTANTS from "../models/utils/CONSTANTS.js";
import SpoonMeter from '../components/organisms/SpoonMeter/SpoonMeter.jsx';
import QuickAdd from '../components/molecules/QuickAdd/QuickAdd.jsx';
import TaskList from "../components/organisms/TaskList/TaskList.jsx";
import QuickAddPopup from '../components/organisms/QuickAddPopup/QuickAddPopup.jsx';
import SidePopup from '../components/organisms/SidePopup/SidePopup.jsx';
import Nav from '../components/organisms/Nav/Nav.jsx';
export default function Home() {
    return <>
    <Nav text="Today"></Nav>
    <SpoonMeter></SpoonMeter>
    <QuickAdd></QuickAdd>
    <TaskList type={CONSTANTS.TODO_TYPE.TODAY}></TaskList>
    <QuickAddPopup></QuickAddPopup>
    <SidePopup></SidePopup>
  </>;
}