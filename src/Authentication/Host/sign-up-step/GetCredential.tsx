import { Box } from '@mui/material';
import GoogleButton from '../../google-button/GoogleButton';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../../Firebase/firebase';

const signUpWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        return userCredential.user?.getIdToken() ?? null;
    } catch (error) {
        console.log(error);
        return null;
    }
}


interface GetCredentialProps {
    onContinue: (token: string) => Promise<void>
}

function GetCredential({
    onContinue
}: GetCredentialProps) {

    const handleSignUp = async () => {
        const token = await signUpWithGoogle();
        if (token) {
            onContinue(token);
        }
    }

    return (
        <section className="card-body Basicwizard ">
            <div className="panel panel-primary">
                <div className=" tab-menu-heading mb-2 border-bottom-0">
                    <div className="tabs-menu1">
                        <Box>
                            <GoogleButton
                                text='Đăng ký tài khoản với Google'
                                onClick={handleSignUp}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GetCredential