import CustomButton from "../../components/atoms/CustomButton/CustomButton";
import { TextField } from "@mui/material";
import CustomText from "../../components/atoms/CustomText/CustomText";
import { useEffect, useState } from "react";
import User from "../../models/User/UserManager";
import FormWithMessageBoxWrapper from "../../components/organisms/FormWithMessageBoxWrapper/FormWithMessageBoxWrapper";
import { useAuth } from "../../contexts/AuthContext";
export default function ChangeNickname() {
    const {userData, login} = useAuth();
    const [nickname, setNickname] = useState('');

    async function changeNickname() {
        return await User.changeNickname({id: userData.userId, newNickname: nickname});
    }

    useEffect(() => {
        setNickname(userData ? userData.nickname : '');
    }, [userData])

    const header = <CustomText ElementType="h1" size="lg">Change Nickname</CustomText>;
    return (
        <FormWithMessageBoxWrapper login={login} cb={changeNickname} header={header}>
            <TextField 
                label="Nickname" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
            />
            <CustomButton type='submit'>Change Nickname</CustomButton>
        </FormWithMessageBoxWrapper>
    );
}
