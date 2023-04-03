import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import { auth } from '../Firebase/firebase';
import { Box, CircularProgress, Grid } from '@mui/material';
import { auth, getFirebaseToken, getMessagingToken } from '../../Firebase/firebase';
import GoogleButton from '../google-button/GoogleButton';
import { useDispatch } from 'react-redux';
import { signInHost, subscribeMessageToken } from '../../redux/auth/action';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { Alert } from "react-bootstrap";
import useBackUrl from '../../hooks/useBackUrl';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useDelayLoading from '../../hooks/useDelayLoading';

const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { getBackUrl } = useBackUrl();

    // State
    const [loadingMessage, setLoadingMessage] = useState<string>("");
    const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const delay = useDelayLoading(loadingSignIn, 1000);

    const subscribe = async () => {
        const messageToken = await getMessagingToken();
        if (messageToken) {
            dispatch(subscribeMessageToken(messageToken));
        }
    }

    const clear = () => {
        setErrorMessage("");
        setLoadingMessage("");
    }

    const handleSignIn = async () => {
        clear();

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            const token = await getFirebaseToken();

            if (token) {
                dispatch(signInHost({
                    loading: (state: any) => {
                        if (state) {
                            setLoadingSignIn(true);
                            setLoadingMessage("Đang kiểm tra thông tin tài khoản.")
                            return;
                        }
                        setLoadingSignIn(false);
                    },
                    onSuccess: (response: any) => {
                        subscribe();
                        toast.success("Đăng nhập thành công");
                        navigate(getBackUrl() ?? "/");
                    },
                    onFailure: (error: AxiosError | any) => {
                        auth.signOut();
                        if (error?.response?.status === 404) {
                            setErrorMessage("Tài khoản không tồn tại.")
                        } else {
                            setErrorMessage("Đăng nhập thất bại");
                        }
                    }
                }));
            }
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra");
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <React.Fragment>
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
                                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
                            >
                                <Box
                                    className="card-sigin"
                                    position="relative"
                                >
                                    <div className="main-card-signin d-md-flex">
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
                                                    <h2>Chào mừng quay lại!!</h2>
                                                    <h6 className="font-weight-semibold mb-4">
                                                        Vui lòng đăng nhập để tiếp tục
                                                    </h6>
                                                    <div className="panel panel-primary">
                                                        <div className=" tab-menu-heading mb-2 border-bottom-0">
                                                            <div className="tabs-menu1">
                                                                <Box>
                                                                    <GoogleButton
                                                                        text='Đăng nhập với Google'
                                                                        onClick={handleSignIn}
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
                                                                size="32px"
                                                                thickness={4}
                                                                color="primary"
                                                            />
                                                            <Box
                                                                fontSize="1.5rem"
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
                                                    <div className="main-signup-footer mt-3 text-center">
                                                        <p>Chưa có tài khoản?  <Link to={`/authentication/sign-up`} >Đăng ký</Link></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </div >
            </div>
        </React.Fragment>
    );
}

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
