import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, getFirebaseToken } from "../../Firebase/firebase"
import { Box, CircularProgress, Grid } from '@mui/material';
import GoogleButton from '../google-button/GoogleButton';
import { checkNewlySignupAccount, signUpAdmin } from '../../redux/auth/action';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Alert } from "react-bootstrap";
import useBackUrl from '../../hooks/useBackUrl';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AxiosError } from 'axios';
import useDelayLoading from '../../hooks/useDelayLoading';

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { getBackUrl } = useBackUrl();

    // State
    const [loadingMessage, setLoadingMessage] = useState<string>("");
    const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
    const delay = useDelayLoading(loadingSignUp);

    const signUpWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            return await getFirebaseToken();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const isNewlySignedUpAccount = async (token: string) => {
        return await new Promise<boolean>((rs, rj) => {
            dispatch(checkNewlySignupAccount(token, {
                loading: (state: any) => {
                    if (state) {
                        setLoadingSignUp(true);
                        setLoadingMessage("Đang kiểm tra tài khoản.")
                        return;
                    }
                    setLoadingSignUp(false);
                },
                onSuccess: (response: any) => {
                    const registered = response?.data?.registered;
                    const isNewly = !Boolean(registered);
                    rs(isNewly);
                },
                onFailure: (error: any) => {
                    toast.error("Có lỗi xảy ra");
                    console.log("Error in 'Checking newly account' step: ", error);
                    rj(error);
                }
            }))
        })
    }

    const clear = () => {
        setErrorMessage("");
        setLoadingMessage("");
    }

    const handleSignUp = async () => {
        clear();

        try {
            const token = await signUpWithGoogle();
            if (token === null) {
                return true;
            }

            const isNewAccount = await isNewlySignedUpAccount(token);
            if (isNewAccount === false) {
                auth.signOut();
                setErrorMessage("Tài khoản đã tồn tại");
                return;
            }

            if (isNewAccount === true) {
                dispatch(signUpAdmin(token, {
                    loading: (state: any) => {
                        if (state) {
                            setLoadingSignUp(true);
                            setLoadingMessage("Khởi tạo tài khoản Gofarm.")
                            return;
                        }
                        setLoadingSignUp(false);
                    },
                    onSuccess: async () => {
                        auth.signOut();
                        toast.success("Đăng ký thành công.");
                        toast.info("Vui lòng liên hệ quản trị viên để kích hoạt tài khoản", { autoClose: false });
                        navigate(getBackUrl() ?? "/authentication/sign-in");
                    },
                    onFailure: (error: AxiosError | any) => {
                        auth.signOut();
                        if (error?.response?.data?.resultCode === 8000) {
                            setErrorMessage("Tài khoản đã tồn tại.");
                        } else {
                            setErrorMessage("Đăng ký thất bại.");
                        }
                    }
                }));
                return;
            }
        } catch (error) {
            auth.signOut();
            setErrorMessage("Có lỗi xảy ra.");
        }
    };

    return (
        <div>
            <div className="square-box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className="page bg-primary">
                <div className="page-single">
                    <Box
                        className="container"
                        marginTop="90px"
                    >
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
                                <Box
                                    className="card-sigin"
                                    position="relative"
                                >
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
                                            <Box>
                                                <div className="main-signup-header">
                                                    <h2 className="text-dark">Tạo tài khoản Gofarm</h2>
                                                    <h6 className="font-weight-normal mb-4">
                                                        Đăng ký tài khoản quản trị viên.
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
                                                    {delay
                                                        ? <Box
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"

                                                            position="absolute"
                                                            top="0"
                                                            left="0"
                                                            zIndex="1"

                                                            width="100%"
                                                            height="100%"
                                                            gap="8px"
                                                            bgcolor="rgba(255, 255,255,0.8)"
                                                        >
                                                            <CircularProgress
                                                                size="24px"
                                                                thickness={4}
                                                                color="primary"
                                                            />
                                                            <Box
                                                                fontSize="1rem"
                                                                fontWeight="500"
                                                                textAlign="center"
                                                                color="#139c7f"
                                                            >
                                                                {loadingMessage}
                                                            </Box>
                                                        </Box>
                                                        : null
                                                    }
                                                    {errorMessage
                                                        ? <Alert variant="danger">{errorMessage}</Alert>
                                                        : null
                                                    }
                                                    <div className="main-signup-footer mt-3 text-center ">
                                                        <p>Quay lại trang  <Link to="/authentication/sign-in">Đăng nhập</Link></p>
                                                    </div>

                                                </div>
                                            </Box>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
