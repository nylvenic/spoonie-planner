import CustomButton from '../components/atoms/CustomButton/CustomButton';
import FormContainer from '../components/atoms/FormContainer/FormContainer';
import GapWrapper from '../components/atoms/GapWrapper/GapWrapper';
import BackgroundWrapper from '../components/atoms/BackgroundWrapper/BackgroundWrapper';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import Integrations from '../components/molecules/Integrations/Integrations';
import CustomText from '../components/atoms/CustomText/CustomText';
export default function SignUp() {
    return <BackgroundWrapper>
        <FormContainer>
            <GapWrapper sizeClass='sm'>
                <h1>Sign Up</h1>
            </GapWrapper>
            <GapWrapper sizeClass='sm'>
                <TextField label="Username" type="text"></TextField>
                <TextField label="Email" type="email"></TextField>
                <TextField label="Password" type="password"></TextField>
                <TextField label="Repeat Password" type="password"></TextField>
            </GapWrapper>
            <GapWrapper sizeClass="sm">
                <CustomButton variant="contained">Sign Up</CustomButton>
            </GapWrapper>
            <GapWrapper sizeClass="sm">
                <CustomText>Have an account? <Link to="/login">Login</Link></CustomText>
            </GapWrapper>
            <Integrations text="Or sign up using:"></Integrations>
        </FormContainer>
    </BackgroundWrapper>
}