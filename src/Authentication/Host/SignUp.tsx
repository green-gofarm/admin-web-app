import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, auth, getFirebaseToken } from "../../Firebase/firebase"
import { Box, Grid } from '@mui/material';
import GoogleButton from '../google-button/GoogleButton';
import { signUpHost } from '../../redux/auth/action';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { Alert } from "react-bootstrap";
import useBackUrl from '../../hooks/useBackUrl';


const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const { getBackUrl } = useBackUrl();

    // State
    const [loadingSignIn, setLoadingSignIn] = useState(false);

    const handleSignUp = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await auth.signInWithPopup(provider);
            const token = await getFirebaseToken();

            if (token) {
                dispatch(signUpHost(token, {
                    loading: setLoadingSignIn,
                    onSuccess: (response: any) => {
                        toast.success("Đăng ký thành công");
                        // navigate(getBackUrl() ?? "/");
                    },
                    onFailure: (error: AxiosError | any) => {
                        console.log(error);
                        auth.signOut();
                        if (error?.response?.data?.resultCode === 8000) {
                            setErrorMessage("Email này đã được sử dụng.");
                        } else {
                            setErrorMessage("Đăng ký thất bại.");
                        }
                    }
                }));
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div>
            <div className="square-box"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
            <div className="page bg-primary">
                <div className="page-single">
                    <div className="container" style={{ marginTop: "89px" }} >
                        <Grid container justifyContent="center">
                            <Grid
                                item
                                xl={5}
                                lg={6}
                                md={8}
                                sm={8}
                                xs={12}
                                className="card-sigin-main py-4 justify-content-center mx-auto"
                            >

                                <div className="card-sigin">
                                    <div className="main-card-signin d-lg-flex">
                                        <div className="wd-100p">
                                            <div className="d-flex mb-4">
                                                <Link to="#">
                                                    <img
                                                        src={require("../../assets/img/brand/favicon.png")}
                                                        className="sign-favicon ht-40"
                                                        alt="logo"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="">
                                                <div className="main-signup-header">
                                                    <h2 className="text-dark">Tham gia với GoFarm</h2>
                                                    <h6 className="font-weight-normal mb-4">
                                                        Đăng ký tài khoản miễn phí.
                                                    </h6>
                                                    <div className="panel panel-primary">
                                                        <div className=" tab-menu-heading mb-2 border-bottom-0">
                                                            <div className="tabs-menu1">
                                                                <Box>
                                                                    <GoogleButton
                                                                        text='Đăng ký với Google'
                                                                        onClick={handleSignUp}
                                                                    />
                                                                </Box>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {errorMessage
                                                        ? <Alert variant="danger">{errorMessage}</Alert>
                                                        : null
                                                    }
                                                    <div className="main-signup-footer mt-3 text-center ">
                                                        <p>Đã có tài khoản?  <Link to={`${process.env.PUBLIC_URL}/authentication/sign-in`} >Đăng nhập</Link></p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
