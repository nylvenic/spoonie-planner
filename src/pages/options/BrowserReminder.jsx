import CustomText from "../../components/atoms/CustomText/CustomText";
import {Switch, FormControlLabel} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import FormWithMessageBoxWrapper from "../../components/organisms/FormWithMessageBoxWrapper/FormWithMessageBoxWrapper";
import User from "../../models/User/UserManager";
import CustomButton from "../../components/atoms/CustomButton/CustomButton";
export default function BrowserReminder() {
    const {userData, login} = useAuth();
    const [reminderDay1State, setReminderDay1State] = useState(false);
    const [reminderHour1State, setReminderHour1State] = useState(false);
    const [reminderMin5State, setReminderMin5State] = useState(false);
    const [reminderMin30State, setReminderMin30State] = useState(false);
    const [reminderOnTimeState, setReminderOnTimeState] = useState(false);
    
    useEffect(() => {
        const { reminderDay1 = false, reminderHour1 = false, reminderMin5 = false, reminderMin30 = false, reminderOnTime = false } = userData || {};
        setReminderDay1State(reminderDay1);
        setReminderHour1State(reminderHour1);
        setReminderMin5State(reminderMin5);
        setReminderMin30State(reminderMin30);
        setReminderOnTimeState(reminderOnTime);
    }, [userData])

    async function changeReminders() {
        const reminders = {
            onTimeReminder: reminderOnTimeState,
            minuteReminder5: reminderMin5State,
            minuteReminder30: reminderMin30State,
            hourReminder1: reminderHour1State, 
            dayReminder1: reminderDay1State
        }
        return await User.changeReminders({id:userData.userId, reminders});
    }

    return <FormWithMessageBoxWrapper cb={changeReminders} login={login}>
        <CustomText ElementType="h1" size="lg">Browser Reminders</CustomText>
        <FormControlLabel
            className="toggler-color"
            control={
                <Switch
                    name="On time"
                    checked={reminderOnTimeState}
                    onChange={(e) => setReminderOnTimeState(e.target.checked)}
                />
            }
            label="On time?"
        />
        <FormControlLabel
            className="toggler-color"
            control={
                <Switch
                    name="5 minutes before"
                    checked={reminderMin5State}
                    onChange={(e) => setReminderMin5State(e.target.checked)}
                />
            }
            label="5 minutes before?"
        />
        <FormControlLabel
            className="toggler-color"
            control={
                <Switch
                    name="30 minutes before"
                    checked={reminderMin30State}
                    onChange={(e) => setReminderMin30State(e.target.checked)}
                />
            }
            label="30 minutes before?"
        />
        <FormControlLabel
            className="toggler-color"
            control={
                <Switch
                    name="1 hour before"
                    checked={reminderHour1State}
                    onChange={(e) => setReminderHour1State(e.target.checked)}
                />
            }
            label="1 hour before?"
        />
        <FormControlLabel
            className="toggler-color"
            control={
                <Switch
                    name="1 day before"
                    checked={reminderDay1State}
                    onChange={(e) => setReminderDay1State(e.target.checked)}
                />
            }
            label="1 day before?"
        />
        <CustomButton type="submit">Change Reminders</CustomButton>
    </FormWithMessageBoxWrapper>
}