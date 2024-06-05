import CustomButton from '../components/atoms/CustomButton/CustomButton';
import GapWrapper from '../components/atoms/GapWrapper/GapWrapper';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import Integrations from '../components/molecules/Integrations/Integrations';
import CustomText from '../components/atoms/CustomText/CustomText';
import { useState } from 'react';
import User from '../models/User/UserManager.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import FormWithMessageBoxWrapper from '../components/organisms/FormWithMessageBoxWrapper/FormWithMessageBoxWrapper.jsx';
export default function Login() {
    const auth = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    async function login() {
        setUsernameError(false);
        setPasswordError(false);
        if(!username) {
            setUsernameError(true);
        };
        // if(!password) {
        //     setPasswordError(true)
        // };
        return await User.login({username, password});
    }

    const header = <GapWrapper sizeClass='sm'>
        <h1>Login</h1>
    </GapWrapper>;

    const footer = <>
        <GapWrapper sizeClass="sm">
            <CustomText>Don't have an account? <Link to="/sign-up">Sign Up</Link></CustomText>
        </GapWrapper>
        {/* <Integrations text="Or login using:"></Integrations> */}
    </>
    return <FormWithMessageBoxWrapper redirectTime={0}
            cb={login}
            login={auth.login} 
            background={true} 
            nav={false} 
            header={header} 
            footer={footer} 
            redirectOnComplete='/'>
        <GapWrapper sizeClass='sm'>
            <TextField
            label="Username"
            autoComplete='username'
            value={username}
            error={usernameError}
            onChange={(e) => setUsername(e.target.value)}
            helperText="Username must not be empty."
            type="text"></TextField>
            <TextField
            label="Password"
            autoComplete='current-password'
            error={passwordError}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Password must not be empty."
            type="password"></TextField>
            <CustomButton type="submit" variant="contained">Login</CustomButton>
        </GapWrapper>
    </FormWithMessageBoxWrapper>
}