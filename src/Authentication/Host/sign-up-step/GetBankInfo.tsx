import { useCallback, useMemo, useState } from 'react'
import CustomizedButton from '../ui-segment/CustomizedButton'
import { Form, FormGroup, InputGroup } from 'react-bootstrap'
import { Box, Grid } from '@mui/material'
import Select from "react-select";
import useBanks from '../../../hooks/useBanks';
import { isAvailableArray } from '../../../helpers/arrayUtils';
import InvalidFeedback from '../../../components/General/InvalidFeedback';
import VALIDATOR from '../../../components/Pages/Host/Farmstay/FarmstayDetail/action/validator';

export const formatBankLabel = (option: any) => (
    <Box
        display="flex"
        alignItems="center"
        gap="8px"
    >
        <Box
            width="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                component="img"
                src={option?.logo}
                height="24px"
            />
        </Box>
        <Box
            className="text-muted"
        >
            {`${option?.bankName} (${option?.bankCode})`}
        </Box>
    </Box>
)

type HostBankInfo = {
    bank: any,
    bankAccountName: string,
    bankAccountNumber: string,
    contactInformation: string,
}

const initialBankAccount: HostBankInfo = {
    bank: null,
    bankAccountName: "",
    bankAccountNumber: "",
    contactInformation: "",
}

type Error = {
    bank: string,
    bankAccountName: string,
    bankAccountNumber: string,
    contactInformation: string,
}

const initialError: Error = {
    bank: "",
    bankAccountName: "",
    bankAccountNumber: "",
    contactInformation: "",
}

interface GetBankInfoProps {
    onContinue: (data: any) => Promise<void>,
    onCancel: () => void
}

function GetBankInfo({
    onContinue,
    onCancel
}: GetBankInfoProps) {

    const { banks } = useBanks();

    const bankOptions: any[] = useMemo(() => {
        if (!isAvailableArray(banks)) return [];
        return banks.map((bank) => ({
            ...bank,
            value: bank.bankCode,
            label: bank.bankName,
        }))
    }, [banks]);

    const [bankAccount, setBankAccount] = useState<HostBankInfo>(initialBankAccount);
    const [errors, setErrors] = useState<Error>(initialError);

    const handleOnChange = useCallback((key: keyof HostBankInfo, value: any) => {
        setBankAccount(prev => ({
            ...prev,
            [key]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [key]: "",
        }));
    }, []);

    const validate = (data: HostBankInfo) => {
        const tempActivityError: Error = {
            bank: VALIDATOR.isRequired(data.bank?.value),
            bankAccountName: VALIDATOR.isRequired(data.bankAccountName),
            bankAccountNumber: VALIDATOR.isRequired(data.bankAccountNumber) || VALIDATOR.isNumberString(data.bankAccountNumber),
            contactInformation: VALIDATOR.isRequired(data.contactInformation) || VALIDATOR.isNumberString(data.contactInformation),
        }

        setErrors(tempActivityError);

        return Object.values(tempActivityError).every(i => i === VALIDATOR.NO_ERROR);
    }

    const handleSubmit = () => {
        if (validate(bankAccount)) {
            const payload = {
                bankName: bankAccount.bank.value,
                bankAccountName: bankAccount.bankAccountName.trim(),
                bankAccountNumber: bankAccount.bankAccountNumber.trim(),
                contactInformation: bankAccount.contactInformation.trim(),
            }
            onContinue(payload);
        }
    }

    return (
        <>
            <section className="card-body Basicwizard">

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <FormGroup className="form-group mb-0">
                            <Form.Label className="form-label mt-0">Chủ tài khoản *</Form.Label>
                            <Form.Control
                                value={bankAccount.bankAccountName}
                                type="text"
                                className="form-control"
                                id="name12"
                                onChange={(e) => handleOnChange("bankAccountName", e.target.value)}
                            />
                        </FormGroup>
                        {errors.bankAccountName
                            ? <InvalidFeedback />
                            : null
                        }
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup className="form-group mb-0">
                            <Form.Label className="form-label">
                                Ngân hàng *
                            </Form.Label>
                            <InputGroup className="input-group">
                                <Select
                                    value={bankAccount.bank}
                                    options={bankOptions}
                                    placeholder="Tìm kiếm"
                                    className='w-100'
                                    formatOptionLabel={formatBankLabel}
                                    onChange={(newValue) => handleOnChange("bank", newValue)}
                                />
                            </InputGroup>
                        </FormGroup>
                        {errors.bank
                            ? <InvalidFeedback />
                            : null
                        }
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup className="form-group mb-0">
                            <Form.Label className="form-label">Số tài khoản *</Form.Label>
                            <Form.Control
                                value={bankAccount.bankAccountNumber}
                                type="number"
                                className="form-control"
                                placeholder="Nhập tài khoản ngân hàng"
                                onChange={(e) => handleOnChange("bankAccountNumber", e.target.value)}
                            />
                        </FormGroup>
                        {errors.bankAccountNumber
                            ? <InvalidFeedback message={errors.bankAccountNumber} />
                            : null
                        }
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup className="form-group mb-0">
                            <Form.Label className="form-label">Số điện thoại liên hệ *</Form.Label>
                            <Form.Control
                                value={bankAccount.contactInformation}
                                type="number"
                                className="form-control"
                                id="name12"
                                placeholder="First Name"
                                onChange={(e) => handleOnChange("contactInformation", e.target.value)}
                            />
                        </FormGroup>
                        {errors.contactInformation
                            ? <InvalidFeedback message={errors.contactInformation} />
                            : null
                        }
                    </Grid>
                </Grid>
            </section>
            <div className=" p-3 d-flex justify-content-between">
                <CustomizedButton
                    visible={true}
                    onClick={onCancel}
                    title="Hủy"
                    className="btn btn-light"
                >
                    Hủy
                </CustomizedButton>
                <CustomizedButton
                    visible={true}
                    onClick={handleSubmit}
                    title="Xác nhận"
                >
                    Xác nhận
                </CustomizedButton>
            </div>
        </>
    )
}

export default GetBankInfo