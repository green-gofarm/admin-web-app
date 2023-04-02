
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clone } from 'lodash';
import { PaginationProps } from '../setting/general-props';
import { searchNotification } from '../redux/auth/action';
import { isAvailableArray } from '../helpers/arrayUtils';
import { Interceptors } from '../setting/setting';

const DEFAULT_PROPS = {
    defaultRowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 50],
    defaultOrderBy: 'createdDate',
    defaultOrderDirection: 'desc',
}

export const defaultPagination: PaginationProps = {
    page: 1,
    pageSize: DEFAULT_PROPS.defaultRowsPerPage,
    orderBy: DEFAULT_PROPS.defaultOrderBy,
    orderDirection: DEFAULT_PROPS.defaultOrderDirection,
    totalPage: 1,
    totalItem: 0,
}

function useNotification(preventFirstCall?: boolean) {
    const dispatch = useDispatch();

    const [data, setData] = useState<any[]>([]);
    const [params, setParams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationProps>({ ...defaultPagination });

    const refresh = useCallback((newPagination?: PaginationProps, newParams?: any) => {
        const _pagination = newPagination ?? { ...pagination };
        const _params = newParams ?? params ?? {};

        const total: PaginationProps & any = {
            page: _pagination.page ?? defaultPagination.page,
            pageSize: _pagination.pageSize ?? defaultPagination.pageSize,
            orderBy: _pagination.orderBy ?? defaultPagination.orderBy,
            orderDirection: _pagination.orderDirection ?? defaultPagination.orderDirection,
            ..._params
        };

        if (newParams) {
            setParams(clone(newParams));
        }

        if (newPagination) {
            setPagination(clone(newPagination));
        }

        dispatch(searchNotification(
            { params: total },
            {
                loading: setLoading,
                onSuccess: (response: any) => {
                    setPagination(pre => ({
                        ...pre,
                        totalPage: response.data?.totalPage ?? defaultPagination.totalPage,
                        totalItem: response.data?.totalItem ?? defaultPagination.totalItem,
                    }))

                    setData(() => isAvailableArray(response?.data?.data) ? response.data.data : [])
                },
            }
        ))

    }, [dispatch, params, pagination]);

    const handleChangePage = useCallback((_: any, newPage: number) => {
        refresh({
            ...pagination,
            page: Interceptors.pageNumber(newPage + 1),
        })
    }, [pagination, refresh]);

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        const pageSize = !isNaN(newValue) ? newValue : DEFAULT_PROPS.defaultRowsPerPage;

        refresh({
            ...pagination,
            pageSize,
            page: 1
        })
    }, [pagination, refresh])

    useEffect(() => {
        if (!!preventFirstCall) {
            return;
        }
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        data,
        loading,
        pagination,
        rowsPerPage: DEFAULT_PROPS.defaultRowsPerPage,
        rowsPerPageOptions: DEFAULT_PROPS.rowsPerPageOptions,
        defaultPagination,
        refresh,
        handleChangePage,
        handleChangeRowsPerPage
    };
}

export default useNotification;