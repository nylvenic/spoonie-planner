import CustomButton from "../../components/atoms/CustomButton/CustomButton";
import Nav from "../../components/organisms/Nav/Nav";
import SidePopup from "../../components/organisms/SidePopup/SidePopup";
import FormContainer from "../../components/atoms/FormContainer/FormContainer";
import BackgroundWrapper from "../../components/atoms/BackgroundWrapper/BackgroundWrapper";
import CustomText from "../../components/atoms/CustomText/CustomText";
import { useRef, useState, useEffect } from "react";
import FormWithMessageBoxWrapper from "../../components/organisms/FormWithMessageBoxWrapper/FormWithMessageBoxWrapper";
import User from "../../models/User/UserManager";
import { useAuth } from "../../contexts/AuthContext";

export default function ChangeAvatar() {
    const {userData, login} = useAuth();
    const [file, setFile] = useState(null);  // Initialize as null for an object
    const fileInput = useRef(null);
    const [imageUrl, setImageUrl] = useState(null);

    function onClick() {
        fileInput.current.click();
    }

    function onChange(e) {
        const newFile = e.target.files[0];
        setFile(newFile);  // Set new file
        if (newFile) {
            const url = URL.createObjectURL(newFile);
            setImageUrl(url);
        }
    }

    useEffect(() => {
        // Clean up the URL when the component unmounts or file changes
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    async function changeAvatar() {
        return await User.changeAvatar({id:userData.userId, file})
    }

    return (<FormWithMessageBoxWrapper cb={changeAvatar} login={login}>
        <CustomText ElementType="h1" size="lg">Change Avatar</CustomText>
        {imageUrl && <img src={imageUrl} alt="Uploaded Avatar" style={{ objectFit: 'cover',
         alignSelf: 'center',
         height: '250px',
         width: '250px',
         borderRadius: '100%' }} />}
        <input 
            ref={fileInput} 
            onChange={onChange} 
            type="file" 
            hidden 
            aria-label="Select a profile picture file"
        />
        <CustomButton onClick={onClick}>Select a file</CustomButton>
        <CustomButton type="submit">Change Avatar</CustomButton>
    </FormWithMessageBoxWrapper>
    );
}
