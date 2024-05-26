import CustomButton from "../../components/atoms/CustomButton/CustomButton";
import { TextField } from "@mui/material";
import CustomText from "../../components/atoms/CustomText/CustomText";
import User from "../../models/User/UserManager";
import FormWithMessageBoxWrapper from "../../components/organisms/FormWithMessageBoxWrapper/FormWithMessageBoxWrapper";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const {userData} = useAuth();
    async function changePassword() {
        if(repeatNewPassword == newPassword) {
            return await User.changePassword({id:userData.userId, oldPassword, newPassword});
        }
    }

    return <FormWithMessageBoxWrapper cb={changePassword}>
        <CustomText ElementType="h1" size="lg">Change Password</CustomText>
        <input
        label="Username"
        value={userData ? userData.username : ''}
        readOnly={true}
        hidden={true}
        type="text"></input>
        <TextField
        label="Current Password"
        autoComplete='current-password'
        helperText="Please enter a password."
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        type="password"></TextField>
        <TextField
        label="Password"
        autoComplete='new-password'
        helperText="Please enter a new password."
        value={newPassword}
        onChange={(e) => setNewPassword(newPassword)}
        type="password"></TextField>
        <TextField
        label="Repeat
        Password"
        autoComplete='new-password'
        value={repeatNewPassword}
        onChange={(e) => setRepeatNewPassword(e.target.value)}
        helperText="Ensure both passwords match."
        type="password"></TextField>
        <CustomButton type="submit">Change Password</CustomButton>
    </FormWithMessageBoxWrapper>
}