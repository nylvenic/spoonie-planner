import Nav from "../Nav/Nav";
import SidePopup from "../SidePopup/SidePopup";
import FormContainer from "../../atoms/FormContainer/FormContainer";
import BackgroundWrapper from "../../atoms/BackgroundWrapper/BackgroundWrapper";
import { useState } from "react";
import MessageBox from "../../molecules/MessageBox/MessageBox";
import { useAuth } from "../../../contexts/AuthContext";
import GapWrapper from "../../atoms/GapWrapper/GapWrapper";

export default function FormWithMessageBoxWrapper({cb, children, login=false}) {
    const [msg, setMsg] = useState({
        text: '',
        success: true
    });

    async function onSubmitHandler(e) {
        e.preventDefault();
        const res = await cb();  // Using userData.id as parameter
        const token = res.token || false;
        if(token && login) {
            login(res.token);
        }
        console.log(res.msg);
        setMsg({
            text: res.msg,  // Assuming response contains a message
            success: res.success  // Assuming response contains a success flag
        });
    }

    function resetMsg() {
        setMsg({
            text: '',
            success: true,  // Assuming you want to reset to true
        });
    }

    return (
        <>
            <Nav inner={true}></Nav>
            <BackgroundWrapper navPage={true} centerText={false} background={false}>
                <FormContainer>
                    {msg.text ? <MessageBox error={!msg.success} text={msg.text} cb={resetMsg}></MessageBox> : ''}
                    <form onSubmit={onSubmitHandler}>
                        <GapWrapper sizeClass="base">
                            {children}
                        </GapWrapper>
                    </form>
                </FormContainer>
            </BackgroundWrapper>
            <SidePopup></SidePopup>
        </>
    );
}
