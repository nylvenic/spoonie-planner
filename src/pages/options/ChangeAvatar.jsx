import CustomButton from "../../components/atoms/CustomButton/CustomButton";
import Nav from "../../components/organisms/Nav/Nav";
import SidePopup from "../../components/organisms/SidePopup/SidePopup";
import FormContainer from "../../components/atoms/FormContainer/FormContainer";
import BackgroundWrapper from "../../components/atoms/BackgroundWrapper/BackgroundWrapper";
import CustomText from "../../components/atoms/CustomText/CustomText";
import { useRef, useState } from "react";
export default function ChangeAvatar() {
    const [file, setFile] = useState();
    function onClick() {
        fileInput.current.click()
    }

    function onChange(e) {
        setFile(e.target.files[0]);
        console.log(file);
    }
    const fileInput = useRef(0);
    return <>
        <Nav inner={true}></Nav>
        <BackgroundWrapper navPage={true} centerText={false} background={false}>
            <FormContainer>
                <CustomText ElementType="h1" size="lg">Change Avatar</CustomText>
                <input ref={fileInput} onChange={onChange} type="file" hidden></input>
                <CustomButton onClick={onClick}>Select a file</CustomButton>
            </FormContainer>
        </BackgroundWrapper>
        <SidePopup></SidePopup>
    </>
}