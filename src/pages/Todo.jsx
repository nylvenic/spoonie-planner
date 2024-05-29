import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import todoManager from "../models/TodoList/TodoListManager";
import AddTodoFields from "../components/organisms/AddTodoFields/AddTodoFields";
import Nav from "../components/organisms/Nav/Nav";
import CONSTANTS from "../models/utils/CONSTANTS";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useAuth } from "../contexts/AuthContext";

export default function Todo() {
    const {userData} = useAuth();
    const {id} = useParams();
    const location = useLocation();
    const {page, type} = queryString.parse(location.search);
    const [todo, setTodo] = useState(null);
    
    async function fetchTodoData() {
        if(userData) {
            const data = await todoManager.getById({id, userId: userData.userId});
            setTodo(data.todo[0]);
        }
    }

    useEffect(() => {
        fetchTodoData();
    }, [userData]); 

    return <>
        <Nav inner={true} text="Edit Task"></Nav>
        <AddTodoFields todo={todo} type={CONSTANTS.TODO_TYPE[type]} mode={CONSTANTS.EDIT_MODE[page]} cb={fetchTodoData}></AddTodoFields>
    </>
}