import CustomButton from '../components/atoms/CustomButton/CustomButton';
import FormContainer from '../components/atoms/FormContainer/FormContainer';
import GapWrapper from '../components/atoms/GapWrapper/GapWrapper';
import BackgroundWrapper from '../components/atoms/BackgroundWrapper/BackgroundWrapper';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import Integrations from '../components/molecules/Integrations/Integrations';
import CustomText from '../components/atoms/CustomText/CustomText';
import CONSTANTS from '../models/utils/CONSTANTS.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../models/User/UserManager.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import MessageBox from '../components/molecules/MessageBox/MessageBox.jsx';
export default function Login() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginMsg, setLoginMsg] = useState('');

    async function onSubmitHandler(e) {
        setUsernameError(false);
        setPasswordError(false);
        e.preventDefault();
        if(!username) {
            setUsernameError(true);
            return;
        };
        // if(!password) {
        //     setPasswordError(true)
        //     return;
        // };
        const {token, msg, success} = await User.login({username, password});
        setLoginMsg(msg);
        
        if(token) {
            auth.login(token);
            navigate('/today');
        }
    }

    return <BackgroundWrapper>
        <FormContainer>
            <GapWrapper sizeClass='sm'>
                <h1>Login</h1>
            </GapWrapper>
            {loginMsg && <MessageBox error={true} cb={() => setLoginMsg('')} text={loginMsg}></MessageBox>}
            <form onSubmit={onSubmitHandler}>
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
            </form>
            <GapWrapper sizeClass="sm">
                <CustomText>Don't have an account? <Link to="/sign-up">Sign Up</Link></CustomText>
            </GapWrapper>
            <Integrations text="Or login using:"></Integrations>
        </FormContainer>
    </BackgroundWrapper>
}