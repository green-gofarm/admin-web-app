import { useEffect, useState } from 'react'
import { Form, FormGroup } from 'react-bootstrap'
import { Box, CircularProgress, Grid } from '@mui/material'
import CustomizedCard from '../../../../General/Card/CustomizedCard';
import { Controller, useForm } from 'react-hook-form';
import { genderOptions } from '../../../../../setting/setting';
import ReactDatePicker from 'react-datepicker';
import { isValidDate } from '../../../../../helpers/dateUtils';
import makeStyles from '@mui/styles/makeStyles/makeStyles';
import InvalidFeedback from '../../../../General/InvalidFeedback';
import { useDispatch } from 'react-redux';
import { updateAdminMyProfile } from '../../../../../redux/user/action';
import { toast } from 'react-toastify';
import useDelayLoading from '../../../../../hooks/useDelayLoading';

const useStyle = makeStyles({
    input: {
        width: "100% !important"
    }
});

type User = {
    name: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    email: string | null
    dateOfBirth: Date | null
    gender: string | null
}

const getValuesFromUser = (user: any): User => ({
    name: user?.name ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    email: user?.email ?? "",
    dateOfBirth: isValidDate(user?.dateOfBirth) ? new Date(user?.dateOfBirth) : null,
    gender: user?.gender ?? "",
})

interface BasicInfoProps {
    user: any,
    refresh: () => void
}

function BasicInfo({
    user,
    refresh
}: BasicInfoProps) {

    const classes = useStyle();
    const dispatch = useDispatch();

    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const delay = useDelayLoading(loading);

    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<User>({
        defaultValues: getValuesFromUser(user)
    });

    useEffect(() => {
        reset(getValuesFromUser(user));
    }, [reset, user]);

    const handleOnUpdate = (data: any) => {
        dispatch(updateAdminMyProfile(
            data,
            {
                loading: setLoading,
                onSuccess: () => {
                    toast.success("Cập nhật thành công")
                    setOpenEdit(false);
                    refresh();
                },
                onFailure: () => toast.error("Cập nhật thất bại"),
            }
        ))
    }

    return (
        <>
            <CustomizedCard
                title="Thông tin cơ bản"
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
                                    reset(getValuesFromUser(user));
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
                    <Form className="form-horizontal" onSubmit={handleSubmit(handleOnUpdate)}>
                        <FormGroup className="form-group ">
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <Form.Label className="form-label">
                                        Họ và tên (*)
                                    </Form.Label>

                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        {...register("name", { required: true })}
                                        disabled={!openEdit}
                                    />
                                    {errors.name
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
                                        Họ
                                    </Form.Label>

                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        {...register("lastName")}
                                        disabled={!openEdit}
                                    />

                                </Grid>
                            </Grid>
                        </FormGroup>

                        <FormGroup className="form-group ">
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <Form.Label className="form-label">
                                        Tên
                                    </Form.Label>

                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        {...register("firstName")}
                                        disabled={!openEdit}
                                    />

                                </Grid>
                            </Grid>
                        </FormGroup>

                        <FormGroup className="form-group ">
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <Form.Label className="form-label">
                                        Giới tính
                                    </Form.Label>

                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <Form.Select
                                        className="form-control"
                                        {...register("gender")}
                                        disabled={!openEdit}
                                    >
                                        {genderOptions.map(item =>
                                            <option value={item.value} key={item.value}>
                                                {item.label}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Grid>
                            </Grid>
                        </FormGroup>

                        <FormGroup className="form-group ">
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <Form.Label className="form-label">
                                        Ngày sinh
                                    </Form.Label>

                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <Controller
                                        control={control}
                                        name='dateOfBirth'
                                        render={({ field }) => (
                                            <ReactDatePicker
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText='dd/mm/yyyy'
                                                onChange={(date: any) => field.onChange(date)}
                                                selected={field.value}
                                                className="form-control"
                                                disabled={!openEdit}
                                                wrapperClassName={classes.input}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </FormGroup>

                        <FormGroup className="form-group ">
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <Form.Label className="form-label">
                                        Email (*)
                                    </Form.Label>

                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <Form.Control
                                        type="email"
                                        {...register("email", { required: true })}
                                        className="form-control"
                                        disabled={!openEdit}
                                    />
                                    {errors.email
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
                                        Số điện thoại
                                    </Form.Label>

                                </Grid>

                                <Grid item xs={12} md={9}>
                                    <Form.Control
                                        type="number"
                                        {...register("phoneNumber")}
                                        className="form-control"
                                        disabled={!openEdit}
                                    />
                                </Grid>
                            </Grid>

                        </FormGroup>
                    </Form>
                }
            />
        </>
    )
}

export default BasicInfo