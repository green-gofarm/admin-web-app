import { Dialog, DialogContent } from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import CustomizedDialogTitle from "../../../../General/Dialog/CustomizedDialogTitle";
import { Container } from "react-bootstrap";
import GetNameStep from "./step/GetNameStep";
import GetLocationStep from "./step/GetLocationStep";
import ConfirmStep from "./step/ConfirmStep";
import GuideStep from "./step/GuideStep";
import GetContactInfo from "./step/GetContactInfo";

interface CreateFarmstayProps {
    open?: boolean,
    onClose: () => void,
}

enum STEPS {
    GET_NAME = "GET_NAME",
    GET_LOCATION = "GET_LOCATION",
    GET_CONTACT_INFO = "GET_CONTACT_INFO",
    CONFIRM = "CONFIRM",
    GUIDE = "GUIDE"
}

interface Farmstay {
    name: string | null;
    addressDetail: string | null;
    position: any,
    contactInfo: any,
}


const CreateFarmstay: FC<CreateFarmstayProps> = ({
    open,
    onClose,
}) => {

    const [farmstay, setFarmstay] = useState<Farmstay>({
        name: null,
        addressDetail: null,
        position: null,
        contactInfo: [],
    });

    const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.GET_NAME);

    const handleOnChange = useCallback((key: string, value: any) => {
        setFarmstay(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const renderContent = () => {
        if (currentStep === STEPS.GET_NAME) {
            return (
                <GetNameStep
                    defaultName={farmstay.name}
                    onContinue={(name: string) => {
                        handleOnChange("name", name);
                        setCurrentStep(STEPS.GET_LOCATION)
                    }}
                />
            )
        }

        if (currentStep === STEPS.GET_LOCATION) {
            return (
                <GetLocationStep
                    defaultAddressDetail={farmstay.addressDetail}
                    defaultPosition={farmstay.position}
                    onBack={() => setCurrentStep(STEPS.GET_NAME)}
                    onContinue={(position, detail) => {
                        handleOnChange("position", position);
                        handleOnChange("addressDetail", detail);
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
                    onConfirm={() => setCurrentStep(STEPS.GUIDE)}
                />
            )
        }

        if (currentStep === STEPS.GUIDE) {
            return (
                <GuideStep
                    onClose={onClose}
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