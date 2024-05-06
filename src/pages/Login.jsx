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
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
export default function Login() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmitHandler(e) {
        e.preventDefault();
        const response = await fetch(`${CONSTANTS.backend_url}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            })
        });
        const {token, msg} = await response.json();
        auth.login(token);
        navigate('/');
    }

    return <BackgroundWrapper>
        <FormContainer>
            <GapWrapper sizeClass='sm'>
                <h1>Login</h1>
            </GapWrapper>
            <form onSubmit={onSubmitHandler}>
                <GapWrapper sizeClass='sm'>
                    <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"></TextField>
                    <TextField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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