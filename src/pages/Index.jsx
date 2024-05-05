import CustomButton from '../components/atoms/CustomButton/CustomButton';
import FormContainer from '../components/atoms/FormContainer/FormContainer';
import GapWrapper from '../components/atoms/GapWrapper/GapWrapper';
import BackgroundWrapper from '../components/atoms/BackgroundWrapper/BackgroundWrapper';
import { Link } from 'react-router-dom';
import CustomText from '../components/atoms/CustomText/CustomText';
export default function Index() {
    return <BackgroundWrapper>
        <FormContainer>
            <GapWrapper sizeClass='sm'>
                <h1>Welcome!</h1>
                <CustomText>Manage your daily spoons effortlessly with the SpoonieTodo app.</CustomText>
            </GapWrapper>
            <GapWrapper sizeClass="sm">
                <Link to="login"><CustomButton variant="contained">Login</CustomButton></Link>
                <Link to="sign-up"><CustomButton variant="outlined">Sign Up</CustomButton></Link>
            </GapWrapper>
        </FormContainer>
    </BackgroundWrapper>
}