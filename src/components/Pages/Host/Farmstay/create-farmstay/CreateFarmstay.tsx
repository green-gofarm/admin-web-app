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
import { createFarmstay, uploadImage } from "../../../../../redux/farmstay/action";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/redux-setting";
import { toast } from "react-toastify";
import { isAvailableArray } from "../../../../../helpers/arrayUtils";

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
export interface Farmstay {
    fileAvatar: any,
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
        fileAvatar: "",
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

    const handleOnChange = useCallback((key: keyof Farmstay, value: any) => {
        setFarmstay(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const getNewFileLink = async (file: File) => {
        return new Promise<any[]>((resolve, rj) => {
            const formData = new FormData();
            formData.append("files", file);

            dispatch(uploadImage(
                formData,
                {
                    loading: setLoading,
                    onSuccess: (response: any) => {
                        if (isAvailableArray(response?.data)) {
                            const link = response.data[0];
                            resolve(link);
                            return;
                        }
                    },
                    onFailure: (error: any) => {
                        rj("Có lỗi xảy ra: Upload failed");
                    }
                }
            ));
        })
    }

    const handleCreate = async () => {
        const linkAvatar = await getNewFileLink(farmstay.fileAvatar);

        const data = {
            name: farmstay.name,
            images: JSON.stringify({ avatar: linkAvatar, others: [] }),
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
                    defaultFileAvatar={farmstay.fileAvatar}
                    defaultName={farmstay.name}
                    onContinue={(name: string, fileAvatar: any) => {
                        handleOnChange("name", name);
                        handleOnChange("fileAvatar", fileAvatar);
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