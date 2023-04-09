import { useCallback, useEffect, useMemo, useState } from 'react'
import { Form, FormGroup, InputGroup } from 'react-bootstrap'
import { Box, CircularProgress, Grid } from '@mui/material'
import CustomizedCard from '../../../../General/Card/CustomizedCard';
import InvalidFeedback from '../../../../General/InvalidFeedback';
import { useDispatch } from 'react-redux';
import { updateHostMyProfile } from '../../../../../redux/user/action';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';
import useBanks from '../../../../../hooks/useBanks';
import { isAvailableArray } from '../../../../../helpers/arrayUtils';
import Select from "react-select";
import { formatBankLabel } from '../../../../../Authentication/Host/sign-up-step/GetBankInfo';
import VALIDATOR from '../../../Host/Farmstay/FarmstayDetail/action/validator';

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

const getHostBankInfo = (user: any, bankOptions: any[]): HostBankInfo => {
    if (!user) return initialBankAccount;
    return {
        bank: bankOptions.find(item => item.value === user.bankName) ?? null,
        bankAccountName: user?.bankAccountName,
        bankAccountNumber: user?.bankAccountNumber,
        contactInformation: user?.contactInformation,
    }
}

interface BankAccountInfoProps {
    user: any,
}

function BankAccountInfo({
    user,
}: BankAccountInfoProps) {

    const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const delay = useDelayLoading(loading);


    const isDisabled: boolean = useMemo(() => !openEdit || !!delay, [delay, openEdit]);

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


    useEffect(() => {
        if (user) {
            setBankAccount(getHostBankInfo(user, bankOptions));
        }
    }, [bankOptions, user]);

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

            dispatch(updateHostMyProfile(payload, {
                loading: setLoading,
                onSuccess: () => {
                    setOpenEdit(false);
                    toast.success("Cập nhật thành công");
                },
                onFailure: () => {
                    toast.success("Cập nhật thất bại");
                }
            }));
        }
    }

    return (
        <>
            <CustomizedCard
                title="Tài khoản ngân hàng"
                panel={
                    openEdit
                        ? <Box
                            display="flex"
                            alignItems="center"
                            gap="8px"
                        >
                            <Box
                                className="btn ripple border btn-icon"
                                width="32px !important"
                                height="32px !important"
                                padding="0"
                                title="Hủy"
                                onClick={() => {
                                    setOpenEdit(false);
                                    setBankAccount(getHostBankInfo(user, bankOptions));
                                }}
                            >
                                <i className="fe fe-x"></i>
                            </Box>
                            <Box
                                component="button"
                                className="btn ripple border btn-icon"
                                width="32px !important"
                                height="32px !important"
                                padding="0"
                                title="Lưu"
                                onClick={handleSubmit}
                                disabled={delay}
                            >
                                {delay
                                    ? <CircularProgress size={16} thickness={4} />
                                    : <i className="fe fe-save"></i>
                                }
                            </Box>
                        </Box>
                        : <Box
                            className="btn ripple border btn-icon"
                            width="32px !important"
                            height="32px !important"
                            padding="0"
                            title="Cập nhật"
                            onClick={() => setOpenEdit(true)}
                        >

                            <i className="fe fe-edit"></i>
                        </Box>
                }

                content={
                    <>
                        <Form
                            className="form-horizontal"
                            onSubmit={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <FormGroup className="form-group ">
                                <Grid container>
                                    <Grid item xs={12} md={3}>
                                        <Form.Label className="form-label">
                                            Tên chủ tài khoản (*)
                                        </Form.Label>

                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <Form.Control
                                            value={bankAccount.bankAccountName}
                                            type="text"
                                            className="form-control"
                                            id="name12"
                                            disabled={isDisabled}
                                            onChange={(e) => handleOnChange("bankAccountName", e.target.value)}
                                        />
                                        {errors.bankAccountName
                                            ? <InvalidFeedback />
                                            : null
                                        }
                                    </Grid>
                                </Grid>
                            </FormGroup>

                            <FormGroup className="form-group ">
                                <Grid container>
                                    <Grid item xs={12} md={3}>
                                        <Form.Label className="form-label">
                                            Ngân hàng (*)
                                        </Form.Label>

                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <InputGroup className="input-group">
                                            <Select
                                                value={bankAccount.bank}
                                                options={bankOptions}
                                                placeholder="Tìm kiếm"
                                                className='w-100'
                                                isDisabled={isDisabled}
                                                formatOptionLabel={formatBankLabel}
                                                onChange={(newValue) => handleOnChange("bank", newValue)}
                                            />
                                        </InputGroup>
                                        {errors.bank
                                            ? <InvalidFeedback />
                                            : null
                                        }
                                    </Grid>
                                </Grid>
                            </FormGroup>

                            <FormGroup className="form-group ">
                                <Grid container>
                                    <Grid item xs={12} md={3}>
                                        <Form.Label className="form-label">
                                            Số tài khoản (*)
                                        </Form.Label>

                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <Form.Control
                                            value={bankAccount.bankAccountNumber}
                                            type="number"
                                            className="form-control"
                                            placeholder="Nhập tài khoản ngân hàng"
                                            disabled={isDisabled}
                                            onChange={(e) => handleOnChange("bankAccountNumber", e.target.value)}
                                        />
                                        {errors.bankAccountNumber
                                            ? <InvalidFeedback message={errors.bankAccountNumber} />
                                            : null
                                        }
                                    </Grid>
                                </Grid>
                            </FormGroup>

                            <FormGroup className="form-group ">
                                <Grid container>
                                    <Grid item xs={12} md={3}>
                                        <Form.Label className="form-label">
                                            Số điện thoại liên hệ (*)
                                        </Form.Label>

                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <Form.Control
                                            value={bankAccount.contactInformation}
                                            type="number"
                                            className="form-control"
                                            id="name12"
                                            placeholder="First Name"
                                            disabled={isDisabled}
                                            onChange={(e) => handleOnChange("contactInformation", e.target.value)}
                                        />
                                        {errors.contactInformation
                                            ? <InvalidFeedback message={errors.contactInformation} />
                                            : null
                                        }
                                    </Grid>
                                </Grid>
                            </FormGroup>
                        </Form>
                    </>
                }
            />
        </>
    )
}

export default BankAccountInfo