import { useContext, createContext, useState, useCallback, useEffect, useRef } from "react";
import todoManager from "../models/TodoList/TodoListManager";
import Todo from "../models/TodoList/Todo";
import { useNotification } from "./NotificationContext";
import { useAuth } from "./AuthContext";
import CONSTANTS from "../models/utils/CONSTANTS";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const {requestNotificationPermission, showNotification} = useNotification();
    const {userData} = useAuth();
    const [todos, setTodos] = useState([]);
    const [today, setToday] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [completed, setCompleted] = useState([]);
    const dueInterval = useRef();

    const checkForNotifications = async () => {
        // Get current time
        const now = new Date().getTime();
        // Filter todos to find those that need notifying
        for(let todo of todos) {
            const accountReminders = {
                reminderDay1: !!(userData.reminderDay1),
                reminderHour1: !!(userData.reminderHour1),
                reminderMin5: !!(userData.reminderMin5),
                reminderMin30: !!(userData.reminderMin30),
                reminderOnTime: !!(userData.reminderOnTime),
            }
            console.log('ACCOUNT REMINDER', accountReminders);

            const reminders = {
                dayReminder1: !!todo['1_day_reminder'],
                hourReminder1: !!todo['1_hour_reminder'],
                minuteReminder5: !!todo['5_min_reminder'],
                minuteReminder30: !!todo['30_min_reminder'],
                onTimeReminder: !!todo['on_time_reminder']
            }
            if (todo.completed || todo.deleted) {
                return; // Skip completed or deleted todos
            }
    
            // Calculate reminder times
            const dueTime = new Date(todo.date).getTime() * 1000;
            const fiveMinutesBefore = dueTime - 5 * 60 * 1000; // 5 minutes before
            const thirtyMinutesBefore = dueTime - 30 * 60 * 1000; // 30 minutes before
            const oneHourBefore = dueTime - 60 * 60 * 1000; // 1 hour before
            const oneDayBefore = dueTime - 24 * 60 * 60 * 1000; // 1 day before
    
            // Check if it's time to send a notification
            if ((now >= dueTime) 
                && (now <= dueTime + CONSTANTS.notificationLeeway) 
                && reminders.onTimeReminder == false 
                && accountReminders.reminderOnTime
            ) {
                showNotification(todo.text, "It's time to complete your task.");
                reminders.onTimeReminder = true;
                await alterReminderStatus({id: todo.id, reminders});
            } else if ((now >= fiveMinutesBefore) 
                && (now <= fiveMinutesBefore + CONSTANTS.notificationLeeway) 
                && reminders.minuteReminder5 == false 
                && accountReminders.reminderMin5
            ) {
                showNotification(todo.text, "5 minutes until your task is due.");
                reminders.minuteReminder5 = true;
                await alterReminderStatus({id: todo.id, reminders});
            } else if ((now >= thirtyMinutesBefore) 
                && (now <= thirtyMinutesBefore + CONSTANTS.notificationLeeway) 
                && reminders.minuteReminder30 == false 
                && accountReminders.reminderMin30
            ) {
                showNotification(todo.text, "30 minutes till your task is due.");
                reminders.minuteReminder30 = true;
                await alterReminderStatus({id: todo.id, reminders});
            } else if ((now >= oneHourBefore) 
                && (now <= oneHourBefore + CONSTANTS.notificationLeeway) 
                && reminders.hourReminder1 == false 
                && accountReminders.reminderHour1
            ) {
                showNotification(todo.text, "1 hour till your task is due.");
                reminders.hourReminder1 = true;
                await alterReminderStatus({id: todo.id, reminders});
            } else if ((now >= oneDayBefore) 
                && (now <= oneDayBefore + CONSTANTS.notificationLeeway) 
                && reminders.dayReminder1 == false 
                && accountReminders.reminderDay1
            ) {
                showNotification(todo.text, "1 day till your task is due.");
                reminders.dayReminder1 = true;
                await alterReminderStatus({id: todo.id, reminders});
            }
        }
    };

    const fetchTodos = useCallback(async () => {
        const result = await todoManager.getAll();
        setTodos(result);
    }, []);

    const fetchDeleted = useCallback(async () => {
        const result = await todoManager.getAll('deleted');
        setDeleted(result);
    }, []);

    const fetchCompleted = useCallback(async () => {
        const result = await todoManager.getAll('completed');
        setCompleted(result);
    }, []);

    const fetchToday = useCallback(async () => {
        const result = await todoManager.getAll('today');
        setToday(result);
    }, []);

    const alterReminderStatus = useCallback(async ({id, reminders}) => {
        await todoManager.setRemindedState({id, reminders});
        fetchTodos();
    });

    const alterCompleteStatus = useCallback(async ({ id, newStatus }) => {
        await todoManager.alterCompleteStatus({ id, newStatus });
        await fetchTodos();
        await fetchToday();
        await fetchCompleted();
    }, [fetchTodos, fetchCompleted, fetchToday]);

    const deleteTodo = useCallback(async (id) => {
        await todoManager.deleteTodo(id);
        await fetchTodos();
        await fetchToday();
        await fetchCompleted();
        await fetchDeleted();
    }, [fetchTodos, fetchDeleted, fetchToday, fetchCompleted]);

    const alterDeletedStatus = useCallback(async ({id, newStatus}) => {
        await todoManager.alterDeletedStatus({id, newStatus});
        await fetchTodos();
        await fetchToday();
        await fetchCompleted();
        await fetchDeleted();
    }, [fetchTodos, fetchCompleted, fetchDeleted, fetchToday]);

    const create = useCallback(async (data) => {
        const todo = new Todo(data);
        await todoManager.createTodo(todo);
        await fetchTodos();
        await fetchToday();
    }, [fetchTodos, fetchToday]);

    const update = useCallback(async ({ data, id }) => {
        const todo = new Todo(data);
        console.log(data);
        await todoManager.updateTodo({ data: todo, id });
        await fetchTodos();
    }, [fetchTodos]);

    useEffect(() => {
        fetchTodos();
    }, [])

    useEffect(() => {
        clearInterval(dueInterval.current);
        requestNotificationPermission();
        dueInterval.current = setInterval(checkForNotifications, CONSTANTS.notificationTimer);
        return () => clearInterval(dueInterval.current);
    }, [todos]); // Run only once on component mount
    
    const value = {
        fetchTodos,
        fetchDeleted,
        fetchCompleted,
        create,
        update,
        alterCompleteStatus,
        alterDeletedStatus,
        deleteTodo,
        fetchToday,
        todos,
        deleted,
        completed,
        today,
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => useContext(TodoContext);
