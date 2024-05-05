import './Integrations.css';
import Facebook from '../../atoms/Icon/Facebook';
import GooglePlus from '../../atoms/Icon/GooglePlus';
import LinkedIn from '../../atoms/Icon/LinkedIn';
import GapWrapper from '../../atoms/GapWrapper/GapWrapper';
import CustomText from '../../atoms/CustomText/CustomText';

export default function Integrations({text}) {
    return <GapWrapper className="integrations">
        <CustomText color="grey">{text}</CustomText>
        <GapWrapper centered sizeClass='lg' direction="row">
            <Facebook></Facebook>
            <GooglePlus></GooglePlus>
            <LinkedIn></LinkedIn>
        </GapWrapper>
    </GapWrapper>
}