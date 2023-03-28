import { Dialog, DialogContent } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import CustomizedDialogTitle from "../../../../General/Dialog/CustomizedDialogTitle";
import { Container } from "react-bootstrap";
import GetNameStep from "./step/GetNameStep";
import GetAddress from "./step/GetAddress";
import ConfirmStep from "./step/ConfirmStep";
import GuideStep from "./step/GuideStep";
import GetContactInfo from "./step/GetContactInfo";
import GetLocation from "./step/GetLocation";
import { useDispatch } from "react-redux";
import { createFarmstay } from "../../../../../redux/farmstay/action";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/redux-setting";
import { toast } from "react-toastify";

interface CreateFarmstayProps {
    open?: boolean,
    onClose: () => void,
    refresh: () => void,
}

enum STEPS {
    GET_NAME = "GET_NAME",
    GET_ADDRESS = "GET_ADDRESS",
    GET_LOCATION = "GET_LOCATION",
    GET_CONTACT_INFO = "GET_CONTACT_INFO",
    CONFIRM = "CONFIRM",
    GUIDE = "GUIDE"
}

export type ContactItem = {
    method: string,
    value: string,
}

export type Location = {
    lat: number | null,
    lng: number | null
}

export type Address = {
    country: "Việt Nam";
    province: {
        code: any,
        name: string | null
    };
    district: {
        code: any,
        name: string | null
    };
    ward: {
        code: any,
        name: string | null
    };
    detail: string | null;
}
interface Farmstay {
    name: string | null;
    address: Address;
    location: Location;
    contactInfo: ContactItem[] | [];
}

const CreateFarmstay: FC<CreateFarmstayProps> = ({
    open,
    onClose,
    refresh,
}) => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [loading, setLoading] = useState<boolean>(false);

    const [farmstay, setFarmstay] = useState<Farmstay>({
        name: null,
        address: {
            country: "Việt Nam",
            province: {
                code: null,
                name: null,
            },
            district: {
                code: null,
                name: null,
            },
            ward: {
                code: null,
                name: null,
            },
            detail: null,
        },
        location: {
            lat: null,
            lng: null
        },
        contactInfo: [],
    });

    const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.GET_NAME);

    const handleOnChange = useCallback((key: string, value: any) => {
        setFarmstay(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const handleCreate = () => {
        const data = {
            name: farmstay.name,
            address: JSON.stringify(farmstay.address),
            latitude: farmstay.location.lat,
            longitude: farmstay.location.lng,
            contactInformation: JSON.stringify(farmstay.contactInfo),
        }


        dispatch(createFarmstay(
            user.id,
            data,
            {
                loading: setLoading,
                onSuccess: () => {
                    setCurrentStep(STEPS.GUIDE);
                    toast.success("Thêm mới farmstay thành công.");
                },
                onFailure: (error: any) => {
                    console.log(error);
                    toast.error("Có lỗi xảy ra");
                }
            }
        ));
    }

    const renderContent = () => {
        if (currentStep === STEPS.GET_NAME) {
            return (
                <GetNameStep
                    defaultName={farmstay.name}
                    onContinue={(name: string) => {
                        handleOnChange("name", name);
                        setCurrentStep(STEPS.GET_ADDRESS)
                    }}
                />
            )
        }

        if (currentStep === STEPS.GET_ADDRESS) {
            return (
                <GetAddress
                    defaultAddress={farmstay.address}
                    onBack={() => setCurrentStep(STEPS.GET_NAME)}
                    onContinue={(address) => {
                        handleOnChange("address", address);
                        setCurrentStep(STEPS.GET_LOCATION)
                    }}
                />
            )
        }

        if (currentStep === STEPS.GET_LOCATION) {
            return (
                <GetLocation
                    defaultLocation={farmstay.location}
                    onBack={() => setCurrentStep(STEPS.GET_ADDRESS)}
                    onContinue={(location) => {
                        handleOnChange("location", location);
                        setCurrentStep(STEPS.GET_CONTACT_INFO)
                    }}
                />
            )
        }

        if (currentStep === STEPS.GET_CONTACT_INFO) {
            return (
                <GetContactInfo
                    defaultContactInfo={farmstay.contactInfo}
                    onBack={() => setCurrentStep(STEPS.GET_LOCATION)}
                    onContinue={(contactInfo) => {
                        handleOnChange("contactInfo", contactInfo);
                        setCurrentStep(STEPS.CONFIRM)
                    }}
                />
            )
        }

        if (currentStep === STEPS.CONFIRM) {
            return (
                <ConfirmStep
                    farmstay={farmstay}
                    onBack={() => setCurrentStep(STEPS.GET_CONTACT_INFO)}
                    onConfirm={() => handleCreate()}
                    loading={loading}
                />
            )
        }

        if (currentStep === STEPS.GUIDE) {
            return (
                <GuideStep
                    onClose={() => {
                        onClose && onClose();
                        refresh && refresh();
                    }}
                />
            )
        }

        return null;
    }

    return (
        <Dialog
            open={Boolean(open)}
            fullScreen
        >
            <CustomizedDialogTitle
                title="THÊM FARMSTAY"
                onClose={onClose}
            />
            <DialogContent>
                <Container>
                    {renderContent()}
                </Container>
            </DialogContent>
        </Dialog>
    )
}

export default memo(CreateFarmstay);