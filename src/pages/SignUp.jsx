import CustomButton from '../components/atoms/CustomButton/CustomButton';
import GapWrapper from '../components/atoms/GapWrapper/GapWrapper';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Integrations from '../components/molecules/Integrations/Integrations';
import CustomText from '../components/atoms/CustomText/CustomText';
import { useState } from 'react';
import User from '../models/User/UserManager';
import FormWithMessageBoxWrapper from '../components/organisms/FormWithMessageBoxWrapper/FormWithMessageBoxWrapper';
export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    async function signup() {
        setUsernameError(false);
        setPasswordError(false);
        setEmailError(false);
        if(!username) {
            setUsernameError(true);
        }
        if(!password) {
            setPasswordError(true);
        }
        if(!email) {
            setEmailError(true);
        }
        if(password == repeatPassword) {
            return await User.signup({username, password, email});
        } else {
            return {
                msg: "Please re-enter your password in the Repeat Password field.",
                success: false,
            }
        }
    }

    const header = <GapWrapper sizeClass='sm'>
        <h1>Sign Up</h1>
    </GapWrapper>;
    const footer = <>
        <GapWrapper sizeClass="sm">
            <CustomText>Have an account? <Link to="/login">Login</Link></CustomText>
        </GapWrapper>
        {/* <Integrations text="Or sign up using:"></Integrations> */}
    </>

    return <FormWithMessageBoxWrapper 
            cb={signup} 
            background={true} 
            nav={false} 
            header={header} 
            footer={footer} 
            redirectOnComplete='/login'>
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
            error={password !== repeatPassword}
            autoComplete='new-password'
            helperText="Ensure both passwords match."
            type="password"></TextField>
            <CustomButton type="submit" variant="contained">Sign Up</CustomButton>
        </GapWrapper>
    </FormWithMessageBoxWrapper>
}