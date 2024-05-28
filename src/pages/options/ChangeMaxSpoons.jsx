import CustomButton from "../../components/atoms/CustomButton/CustomButton";
import { TextField } from "@mui/material";
import User from "../../models/User/UserManager";
import CustomText from "../../components/atoms/CustomText/CustomText";
import FormWithMessageBoxWrapper from "../../components/organisms/FormWithMessageBoxWrapper/FormWithMessageBoxWrapper";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
export default function ChangeMaxSpoons() {
    const {login, userData} = useAuth();
    const [newMaxSpoons, setNewMaxSpoons]= useState(userData.maxSpoons);
    async function changeMaxSpoons() {
        return await User.changeMaxSpoons({id: userData.userId, newMaxSpoons}); 
    }
    
    const header = <>
        <CustomText ElementType="h1" size="lg">Change Max Spoons</CustomText>
        <CustomText>Current Max Spoons: {userData.maxSpoons}</CustomText>
    </>
    return <FormWithMessageBoxWrapper login={login} cb={changeMaxSpoons} header={header}>
            <TextField 
            value={newMaxSpoons} 
            onChange={(e) => setNewMaxSpoons(e.target.value)} 
            type="number" 
            label="New Max Spoons">
                Enter New Value
            </TextField>
            <CustomButton type="submit">Change Max Spoons</CustomButton>
        </FormWithMessageBoxWrapper>
}