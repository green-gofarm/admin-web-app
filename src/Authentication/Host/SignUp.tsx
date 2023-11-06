import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, getFirebaseToken } from "../../Firebase/firebase"
import { Box, Grid } from '@mui/material';
import { checkNewlySignUpAccount, signUpHost } from '../../redux/auth/action';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Alert } from "react-bootstrap";
import useBackUrl from '../../hooks/useBackUrl';
import { AxiosError } from 'axios';
import useDelayLoading from '../../hooks/useDelayLoading';
import { ResultCode } from '../../setting/response-result-code';
import ConditionWrapper from '../../components/General/Wrapper/ConditionWrapper';
import AuthBoxLoader from './ui-segment/AuthBoxLoader';
import GetCredential from './sign-up-step/GetCredential';
import GetBankInfo from './sign-up-step/GetBankInfo';
import CustomizedButton from './ui-segment/CustomizedButton';
import CancelSignUp from './action/CancelSignUp';

enum HOST_SIGN_UP_STEP {
    GET_CREDENTIAL = 1,
    GET_BANK_INFO = 2,
}

function getClsNavBtn(active: any) {
    return "btn" + (active ? " active" : "");
}

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getBackUrl } = useBackUrl();

    // State
    const [currentStep, setCurrentStep] = useState<HOST_SIGN_UP_STEP>(HOST_SIGN_UP_STEP.GET_CREDENTIAL);

    const [loadingMessage, setLoadingMessage] = useState<string>("");
    const [loadingSignUp, setLoadingSignUp] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const delay = useDelayLoading(loadingSignUp);

    const [openCancel, setOpenCancel] = useState<boolean>(false);

    const isNewlySignedUpAccount = async (token: string) => {
        return await new Promise<boolean>((rs, rj) => {
            dispatch(checkNewlySignUpAccount(token, {
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

    const handleAfterGetCredential = async (token: string) => {
        clear();
        try {
            const isNewly = await isNewlySignedUpAccount(token);
            if (isNewly === false) {
                auth.signOut();
                setErrorMessage("Tài khoản đã tồn tại.");
                return;
            }
            if (isNewly === true) {
                setCurrentStep(HOST_SIGN_UP_STEP.GET_BANK_INFO);
                return;
            }
            setErrorMessage("Có lỗi xảy ra.");
        } catch (error) {
            auth.signOut();
            setErrorMessage("Có lỗi xảy ra.");
            console.log("Checking account: ", error);
        }
    }

    const handleSubmit = async (data: any) => {
        clear();

        try {
            const token = await getFirebaseToken();
            if (token) {
                const payload = {
                    accessToken: token,
                    ...data
                }

                const handleLoading = (state: any) => {
                    if (state) {
                        setLoadingSignUp(true);
                        setLoadingMessage("Khởi tạo tài khoản Gofarm.")
                        return;
                    }
                    setLoadingSignUp(false);
                }

                const onSuccess = async () => {
                    await getFirebaseToken(true);
                    toast.success("Đăng ký thành công.");
                    navigate(getBackUrl() ?? "/");
                }

                const onFailure = (error: AxiosError | any) => {
                    auth.signOut();
                    const code = error?.response?.data?.resultCode;
                    if (code === ResultCode.USER_ALREADY_REGISTERED) {
                        setErrorMessage("Tài khoản đã tồn tại.");
                        return;
                    }
                    setErrorMessage("Đăng ký thất bại.");
                }

                dispatch(signUpHost(payload, {
                    loading: handleLoading,
                    onSuccess,
                    onFailure,
                }));
            }

        } catch (error) {
            auth.signOut();
            setErrorMessage("Có lỗi xảy ra.");
        }
    }

    const handleCancelSignUpProgress = () => {
        setOpenCancel(false);
        clear();
        setCurrentStep(HOST_SIGN_UP_STEP.GET_CREDENTIAL);
    }

    const renderStep = () => {
        if (currentStep === HOST_SIGN_UP_STEP.GET_CREDENTIAL) {
            return (
                <GetCredential onContinue={handleAfterGetCredential} />
            )
        }

        if (currentStep === HOST_SIGN_UP_STEP.GET_BANK_INFO) {
            return (
                <GetBankInfo
                    onContinue={handleSubmit}
                    onCancel={() => setOpenCancel(true)}
                />
            )
        }

        return null;
    }

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
                        className="container mb-4"
                        marginTop="90px"
                    >
                        <Grid container justifyContent="center">
                            <Grid
                                item
                                sm="auto"
                                xs={12}
                                className="card-sigin-main justify-content-center mx-auto"
                            >
                                <Box
                                    className="card-sigin"
                                    position="relative"
                                >
                                    <div className="main-card-signin d-lg-flex">
                                        <Box width="500px" maxWidth="100%">
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
                                                        Đăng ký tài khoản miễn phí.
                                                    </h6>

                                                    <div id="wizard1" className='border br-5 mb-3'>
                                                        <div>
                                                            <Box
                                                                component="nav"
                                                                className="btn-group basicsteps"
                                                            >
                                                                <CustomizedButton
                                                                    onClick={() => {
                                                                        if (currentStep !== HOST_SIGN_UP_STEP.GET_CREDENTIAL) {
                                                                            setOpenCancel(true);
                                                                        }
                                                                    }}
                                                                    className={getClsNavBtn(currentStep === HOST_SIGN_UP_STEP.GET_CREDENTIAL)}
                                                                >
                                                                    <span className="number me-2 ">1</span>
                                                                    <i>Chọn phương thức</i>
                                                                </CustomizedButton>
                                                                <CustomizedButton
                                                                    onClick={() => { }}
                                                                    className={getClsNavBtn(currentStep === HOST_SIGN_UP_STEP.GET_BANK_INFO)}
                                                                    disabled={currentStep === HOST_SIGN_UP_STEP.GET_CREDENTIAL}
                                                                >
                                                                    <span className="number me-2 ">2</span>
                                                                    <i>Bổ sung thông tin</i>
                                                                </CustomizedButton>
                                                            </Box>
                                                            {renderStep()}
                                                        </div>
                                                    </div>
                                                    <ConditionWrapper isRender={delay}>
                                                        <AuthBoxLoader message={loadingMessage} />
                                                    </ConditionWrapper>
                                                    {errorMessage
                                                        ? <Alert variant="danger">{errorMessage}</Alert>
                                                        : null
                                                    }
                                                    <div className="main-signup-footer mt-3 text-center ">
                                                        <p>Đã có tài khoản? <Link to="/authentication/sign-in">Đăng nhập</Link></p>
                                                    </div>

                                                </div>
                                            </Box>
                                        </Box>
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>

            {openCancel
                ? <CancelSignUp
                    open={openCancel}
                    onClose={() => setOpenCancel(false)}
                    onConfirm={handleCancelSignUpProgress}
                />
                : null
            }
        </div>
    );
}

export default SignUp;
