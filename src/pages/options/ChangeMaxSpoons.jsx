import CustomButton from "../../components/atoms/CustomButton/CustomButton";
import { TextField } from "@mui/material";
import Nav from "../../components/organisms/Nav/Nav";
import SidePopup from "../../components/organisms/SidePopup/SidePopup";
import FormContainer from "../../components/atoms/FormContainer/FormContainer";
import BackgroundWrapper from "../../components/atoms/BackgroundWrapper/BackgroundWrapper";
import CustomText from "../../components/atoms/CustomText/CustomText";
import { useAuth } from "../../contexts/AuthContext";
export default function ChangeMaxSpoons() {
    const {userData} = useAuth();
    return <>
        <Nav inner={true}></Nav>
        <BackgroundWrapper navPage={true} centerText={false} background={false}>
            <FormContainer>
                <CustomText ElementType="h1" size="lg">Change Max Spoons</CustomText>
                <CustomText>Current Max Spoons: {userData.maxSpoons}</CustomText>
                <TextField type="number" label="New Max Spoons">Enter New Value</TextField>
                <CustomButton>Change Max Spoons</CustomButton>
            </FormContainer>
        </BackgroundWrapper>
        <SidePopup></SidePopup>
    </>
}