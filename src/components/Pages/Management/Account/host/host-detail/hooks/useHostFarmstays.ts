import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clone } from 'lodash';
import { PaginationProps } from '../../../../../../../setting/general-props';
import { searchFarmstay } from '../../../../../../../redux/farmstay/action';
import { isAvailableArray } from '../../../../../../../helpers/arrayUtils';
import { Interceptors } from '../../../../../../../setting/setting';

const DEFAULT_PROPS = {
    defaultRowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
    defaultOrderBy: 'createdDate',
    defaultOrderDirection: 'desc',
}

export const defaultHostFarmstaysPagination: PaginationProps = {
    page: 1,
    pageSize: DEFAULT_PROPS.defaultRowsPerPage,
    orderBy: DEFAULT_PROPS.defaultOrderBy,
    orderDirection: DEFAULT_PROPS.defaultOrderDirection,
    totalPage: 1,
    totalItem: 0,
}

function useHostFarmstays(hostId?: any) {
    const dispatch = useDispatch();

    const [data, setData] = useState<any[]>([]);
    const [params, setParams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationProps>({ ...defaultHostFarmstaysPagination });

    const refresh = useCallback((newPagination?: PaginationProps, newParams?: any) => {
        if (!hostId) return;
        const _pagination = newPagination ?? { ...pagination };
        const _params = newParams ?? params ?? {};

        const total: PaginationProps & any = {
            page: _pagination.page ?? defaultHostFarmstaysPagination.page,
            pageSize: _pagination.pageSize ?? defaultHostFarmstaysPagination.pageSize,
            orderBy: _pagination.orderBy ?? defaultHostFarmstaysPagination.orderBy,
            orderDirection: _pagination.orderDirection ?? defaultHostFarmstaysPagination.orderDirection,
            ..._params,
            HostId: hostId
        };

        if (newParams) {
            setParams(clone(newParams));
        }

        if (newPagination) {
            setPagination(clone(newPagination));
        }

        dispatch(searchFarmstay(
            { params: total },
            {
                loading: setLoading,
                onSuccess: (response: any) => {
                    if (_pagination.page > response.data.totalPage && _pagination.page !== 1) {
                        const newPagination = {
                            ..._pagination,
                            page: 1,
                            totalPage: response.data?.totalPage,
                            totalItem: response.data?.totalItem,
                        }

                        refresh(newPagination, newParams);
                        return;
                    }

                    setPagination(pre => ({
                        ...pre,
                        totalPage: response.data?.totalPage ?? defaultHostFarmstaysPagination.totalPage,
                        totalItem: response.data?.totalItem ?? defaultHostFarmstaysPagination.totalItem,
                    }))

                    setData(prev => isAvailableArray(response?.data?.data) ? response.data.data : [])
                }
            }
        ))

    }, [hostId, pagination, params, dispatch]);

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
        if (hostId) {
            refresh();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hostId])

    return {
        data,
        loading,
        pagination,
        rowsPerPageOptions: DEFAULT_PROPS.rowsPerPageOptions,

        refresh,
        handleChangePage,
        handleChangeRowsPerPage
    };
}

export default useHostFarmstays