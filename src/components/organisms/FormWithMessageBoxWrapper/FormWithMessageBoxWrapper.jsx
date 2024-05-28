import Nav from "../Nav/Nav";
import SidePopup from "../SidePopup/SidePopup";
import FormContainer from "../../atoms/FormContainer/FormContainer";
import BackgroundWrapper from "../../atoms/BackgroundWrapper/BackgroundWrapper";
import { useState, useRef, useEffect } from "react";
import MessageBox from "../../molecules/MessageBox/MessageBox";
import GapWrapper from "../../atoms/GapWrapper/GapWrapper";
import { useNavigate } from "react-router-dom";
import CONSTANTS from "../../../models/utils/CONSTANTS";

export default function FormWithMessageBoxWrapper({cb,
    children,
    login=false,
    background=false,
    nav=true,
    header=null,
    footer=null,
    redirectOnComplete=false,
    redirectTime=CONSTANTS.redirectTimer
}) {
    const [msg, setMsg] = useState({
        text: '',
        success: true
    });
    const timeoutRef = useRef();
    const navigate = useNavigate();

    async function onSubmitHandler(e) {
        e.preventDefault();
        try {
            const res = await cb();  // Using userData.id as parameter
            const token = res ? res.token : false;
            if(token && login) {
                login(res.token);
            }
            setMsg({
                text: res.msg,  // Assuming response contains a message
                success: res.success  // Assuming response contains a success flag
            });
            if(res.success && redirectOnComplete) {
                timeoutRef.current = setTimeout(() => {
                    navigate(redirectOnComplete);
                }, redirectTime);
            }
        } catch (error) {
            setMsg({
                text: "Something went wrong with the form submission.",
                success: false,
            })
        }
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    function resetMsg() {
        setMsg({
            text: '',
            success: true,  // Assuming you want to reset to true
        });
    }

    return (
        <>
            {nav ? <Nav inner={true}></Nav> : null}
            <BackgroundWrapper navPage={nav} centerText={false} background={background}>
                <FormContainer>
                    {header ? header : null}
                    {msg.text ? <MessageBox error={!msg.success} text={msg.text} cb={resetMsg}></MessageBox> : ''}
                    <form onSubmit={onSubmitHandler}>
                        <GapWrapper sizeClass="base">
                            {children}
                        </GapWrapper>
                    </form>
                    {footer ? footer : null}
                </FormContainer>
            </BackgroundWrapper>
            <SidePopup></SidePopup>
        </>
    );
}
