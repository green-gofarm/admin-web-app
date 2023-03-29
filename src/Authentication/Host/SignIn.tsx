import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import { auth } from '../Firebase/firebase';
import { Box, Grid } from '@mui/material';
import { GoogleAuthProvider, auth, getFirebaseToken } from '../../Firebase/firebase';
import GoogleButton from '../google-button/GoogleButton';
import { useDispatch } from 'react-redux';
import { signInHost } from '../../redux/auth/action';
import { toast } from 'react-toastify';
import WithAuthBackDropLoader from '../../components/General/WithAuthBackDropLoader';
import { AxiosError } from 'axios';
import { Alert } from "react-bootstrap";
import useBackUrl from '../../hooks/useBackUrl';

const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");

    const { getBackUrl } = useBackUrl();

    // State
    const [loadingSignIn, setLoadingSignIn] = useState(false);

    const handleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await auth.signInWithPopup(provider);
            const token = await getFirebaseToken();

            if (token) {
                dispatch(signInHost({
                    loading: setLoadingSignIn,
                    onSuccess: (response: any) => {
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
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <React.Fragment>
            <WithAuthBackDropLoader
                open={loadingSignIn}
            />
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
                                <div className="card-sigin">
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
                                </div>
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
