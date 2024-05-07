import CustomButton from '../components/atoms/CustomButton/CustomButton';
import FormContainer from '../components/atoms/FormContainer/FormContainer';
import GapWrapper from '../components/atoms/GapWrapper/GapWrapper';
import BackgroundWrapper from '../components/atoms/BackgroundWrapper/BackgroundWrapper';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import Integrations from '../components/molecules/Integrations/Integrations';
import CustomText from '../components/atoms/CustomText/CustomText';
import { useState } from 'react';
import CONSTANTS from '../models/utils/CONSTANTS';
import MessageBox from '../components/molecules/MessageBox/MessageBox';
export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true); 
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [signUpMsg, setSignUpMsg] = useState(null);

    async function onSubmitHandler(e) {
        e.preventDefault();
        if(!username) {
            setUsernameError(true);
        }
        if(!password) {
            setPasswordError(true);
        }
        if(!email) {
            setEmailError(true);
        }
        if(password == repeatPassword && repeatPassword) {
            console.log('pass');
            const response = await fetch(`${CONSTANTS.backend_url}/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    email
                })
            });
            const {msg, error} = await response.json();
            if(msg) {
                setSignUpMsg({
                    text: msg,
                    error: false,
                })
            } else if(error) {
                setSignUpMsg({
                    text: error,
                    error: true
                })
            }
        } else {
            setPasswordMatch(false);
        }
    }

    return <BackgroundWrapper>
        <FormContainer>
            <GapWrapper sizeClass='sm'>
                <h1>Sign Up</h1>
            </GapWrapper>
            {signUpMsg && <MessageBox
            error={signUpMsg.error}
            cb={() => setSignUpMsg(null)}
            persistent={true}
            text={signUpMsg.text}
            ></MessageBox>}
            <form onSubmit={onSubmitHandler}>
                <GapWrapper sizeClass='sm'>
                    <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    label="Username"
                    autoComplete='username'
                    error={usernameError}
                    helperText="Please enter a username."
                    type="text"></TextField>
                    <TextField
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    label="Email"
                    error={emailError}
                    helperText="Please enter an email."
                    type="email"></TextField>
                    <TextField
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    label="Password"
                    autoComplete='new-password'
                    error={passwordError}
                    helperText="Please enter a password."
                    type="password"></TextField>
                    <TextField
                    onChange={e => setRepeatPassword(e.target.value)}
                    value={repeatPassword}
                    label="Repeat
                    Password"
                    error={passwordMatch ? false : true}
                    autoComplete='new-password'
                    helperText="Ensure both passwords match."
                    type="password"></TextField>
                    <CustomButton type="submit" variant="contained">Sign Up</CustomButton>
                </GapWrapper>
            </form>
            <GapWrapper sizeClass="sm">
                <CustomText>Have an account? <Link to="/login">Login</Link></CustomText>
            </GapWrapper>
            <Integrations text="Or sign up using:"></Integrations>
        </FormContainer>
    </BackgroundWrapper>
}