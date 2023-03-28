import { useEffect, useState } from 'react'
import { Form, FormGroup } from 'react-bootstrap'
import { Box, CircularProgress, Grid } from '@mui/material'
import CustomizedCard from '../../../../General/Card/CustomizedCard';
import { useForm } from 'react-hook-form';
import InvalidFeedback from '../../../../General/InvalidFeedback';
import { useDispatch } from 'react-redux';
import { updateHostMyProfile } from '../../../../../redux/user/action';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';


type Host = {
    bankAccountOwner: string | null,
    bankAccountName: string | null
    bankAccountNumber: string | null
    contactInformation: string | null
}

const getValuesFromHost = (user: any): Host => ({
    bankAccountOwner: user?.bankAccountOwner ?? "",
    bankAccountName: user?.bankAccountName ?? "",
    bankAccountNumber: user?.bankAccountNumber ?? "",
    contactInformation: user?.contactInformation ?? "",
})

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

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Host>({
        defaultValues: getValuesFromHost(user)
    });

    useEffect(() => {
        reset(getValuesFromHost(user));
    }, [reset, user]);

    const handleOnUpdate = (data: any) => {
        dispatch(updateHostMyProfile(
            data,
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Cập nhật thành công")
                    setOpenEdit(false);
                },
                onFailure: () => toast.error("Cập nhật thất bại"),
            }
        ))
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
                                    reset(getValuesFromHost(user));
                                }}
                            >
                                <i className="fe fe-x"></i>
                            </Box>
                            <Box
                                className="btn ripple border btn-icon"
                                width="32px !important"
                                height="32px !important"
                                padding="0"
                                title="Lưu"
                                onClick={handleSubmit(handleOnUpdate)}
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
                        <Form className="form-horizontal" onSubmit={handleSubmit(handleOnUpdate)}>
                            <FormGroup className="form-group ">
                                <Grid container>
                                    <Grid item xs={12} md={3}>
                                        <Form.Label className="form-label">
                                            Ngân hàng (*)
                                        </Form.Label>

                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            {...register("bankAccountName", { required: true })}
                                            disabled={!openEdit}
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
                                            Tài khoản (*)
                                        </Form.Label>

                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <Form.Control
                                            type="number"
                                            className="form-control"
                                            {...register("bankAccountNumber")}
                                            disabled={!openEdit}
                                        />
                                        {errors.bankAccountNumber
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
                                            Tên chủ tài khoản (*)
                                        </Form.Label>

                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            {...register("bankAccountOwner", { required: true })}
                                            disabled={!openEdit}
                                        />
                                        {errors.bankAccountOwner
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
                                            Số điện thoại liên hệ (*)
                                        </Form.Label>

                                    </Grid>

                                    <Grid item xs={12} md={9}>
                                        <Form.Control
                                            type="phone"
                                            className="form-control"
                                            {...register("contactInformation", { required: true })}
                                            disabled={!openEdit}
                                        />
                                        {errors.contactInformation
                                            ? <InvalidFeedback />
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