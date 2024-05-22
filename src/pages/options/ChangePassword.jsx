import CustomButton from "../../components/atoms/CustomButton/CustomButton";
import { TextField } from "@mui/material";
import Nav from "../../components/organisms/Nav/Nav";
import SidePopup from "../../components/organisms/SidePopup/SidePopup";
import FormContainer from "../../components/atoms/FormContainer/FormContainer";
import BackgroundWrapper from "../../components/atoms/BackgroundWrapper/BackgroundWrapper";
import CustomText from "../../components/atoms/CustomText/CustomText";
export default function ChangePassword() {
    return <>
        <Nav inner={true}></Nav>
        <BackgroundWrapper navPage={true} centerText={false} background={false}>
            <FormContainer>
                <CustomText ElementType="h1" size="lg">Change Password</CustomText>
                <TextField
                label="Current Password"
                autoComplete='current-password'
                helperText="Please enter a password."
                type="password"></TextField>
                <TextField
                label="Password"
                autoComplete='new-password'
                helperText="Please enter a new password."
                type="password"></TextField>
                <TextField
                label="Repeat
                Password"
                autoComplete='new-password'
                helperText="Ensure both passwords match."
                type="password"></TextField>
                <CustomButton>Change Password</CustomButton>
            </FormContainer>
        </BackgroundWrapper>
        <SidePopup></SidePopup>
    </>
}