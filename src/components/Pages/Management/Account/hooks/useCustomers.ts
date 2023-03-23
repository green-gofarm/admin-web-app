import { searchCustomers } from '../../../../../redux/user/action';
import { DEFAULT_PAGINATION } from '../../../../Mui-Table/setting';
import { useCallback } from 'react';
import { PaginationProps } from '../../../../../setting/general-props';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isAvailableArray } from '../../../../../helpers/arrayUtils';
import { clone } from 'lodash';
import { Interceptors } from '../../../../../setting/setting';

const DEFAULT_PROPS = {
    defaultRowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20, 50],
    defaultOrderBy: 'createdDate',
    defaultOrderDirection: 'desc',
}

export const defaultCustomersPagination: PaginationProps = {
    page: 1,
    pageSize: DEFAULT_PROPS.defaultRowsPerPage,
    orderBy: DEFAULT_PROPS.defaultOrderBy,
    orderDirection: DEFAULT_PROPS.defaultOrderDirection,
    totalPage: 1,
    totalItem: 0,
}

function useCustomers(preventFirstCall?: boolean) {
    const dispatch = useDispatch();

    const [data, setData] = useState<any[]>([]);
    const [params, setParams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationProps>({ ...defaultCustomersPagination });

    const refresh = useCallback((newPagination?: PaginationProps, newParams?: any) => {
        const _pagination = newPagination ?? { ...pagination };
        const _params = newParams ?? params ?? {};

        const total: PaginationProps & any = {
            page: _pagination.page ?? defaultCustomersPagination.page,
            pageSize: _pagination.pageSize ?? defaultCustomersPagination.pageSize,
            orderBy: _pagination.orderBy ?? defaultCustomersPagination.orderBy,
            orderDirection: _pagination.orderDirection ?? defaultCustomersPagination.orderDirection,
            ..._params
        };

        if (newParams) {
            setParams(clone(newParams));
        }

        if (newPagination) {
            setPagination(clone(newPagination));
        }

        dispatch(searchCustomers(
            { params: total },
            {
                loading: setLoading,
                onSuccess: (response: any) => {
                    setPagination(pre => ({
                        ...pre,
                        totalPage: response.data?.totalPage ?? defaultCustomersPagination.totalPage,
                        totalItem: response.data?.totalItem ?? defaultCustomersPagination.totalItem,
                    }))
                    setData(prev => isAvailableArray(response?.data?.data) ? response.data.data : prev)
                }
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
        rowsPerPageOptions: DEFAULT_PAGINATION.rowsPerPageOptions,

        refresh,
        handleChangePage,
        handleChangeRowsPerPage
    };
}

export default useCustomers