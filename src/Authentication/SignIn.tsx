import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
// import { auth } from '../Firebase/firebase';
import { Box } from '@mui/material';
import { GoogleAuthProvider, auth, getFirebaseToken } from '../Firebase/firebase';
import GoogleButton from './google-button/GoogleButton';

const SignIn = () => {

    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await auth.signInWithPopup(provider);
            const token = await getFirebaseToken();
            console.log(token);
            navigate("/")
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <React.Fragment>
            <div className="square-box"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
            <div className="page bg-primary">
                <div className="page-single">
                    <div className="container" style={{ marginTop: "89px" }} >
                        <Row>
                            <Col
                                xl={5}
                                lg={6}
                                md={8}
                                sm={8}
                                xs={10}
                                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
                            >
                                <div className="card-sigin">
                                    <div className="main-card-signin d-md-flex">
                                        <div className="wd-100p">
                                            <div className="d-flex mb-4">
                                                <Link to="#">
                                                    <img
                                                        src={require("../assets/img/brand/favicon.png")}
                                                        className="sign-favicon ht-40"
                                                        alt="logo"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="">
                                                <div className="main-signup-header">
                                                    <h2>Chào mừng bạn quay lại!!</h2>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div >
            </div>
        </React.Fragment>
    );
}

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
