import CustomButton from '../components/atoms/CustomButton/CustomButton';
import FormContainer from '../components/atoms/FormContainer/FormContainer';
import GapWrapper from '../components/atoms/GapWrapper/GapWrapper';
import BackgroundWrapper from '../components/atoms/BackgroundWrapper/BackgroundWrapper';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import Integrations from '../components/molecules/Integrations/Integrations';
import CustomText from '../components/atoms/CustomText/CustomText';

export default function Login() {
    return <BackgroundWrapper>
        <FormContainer>
            <GapWrapper sizeClass='sm'>
                <h1>Login</h1>
            </GapWrapper>
            <GapWrapper sizeClass='sm'>
                <TextField label="Username" type="text"></TextField>
                <TextField label="Password" type="password"></TextField>
            </GapWrapper>
            <GapWrapper sizeClass="sm">
                <CustomButton variant="contained">Login</CustomButton>
            </GapWrapper>
            <GapWrapper sizeClass="sm">
                <CustomText>Don't have an account? <Link to="/sign-up">Sign Up</Link></CustomText>
            </GapWrapper>
            <Integrations text="Or login using:"></Integrations>
        </FormContainer>
    </BackgroundWrapper>
}