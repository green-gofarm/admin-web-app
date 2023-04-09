import { useDispatch } from "react-redux";
import { PaginationProps } from "../../../../../../setting/general-props";
import { useCallback, useEffect, useState } from "react";
import { clone } from "lodash";
import { Interceptors } from "../../../../../../setting/setting";
import { searchOrders } from "../../../../../../redux/order/action";
import { isAvailableArray } from "../../../../../../helpers/arrayUtils";

const DEFAULT_PROPS = {
    defaultRowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20, 50],
    defaultOrderBy: 'createdDate',
    defaultOrderDirection: 'desc',
}

export const defaultOrdersPagination: PaginationProps = {
    page: 1,
    pageSize: DEFAULT_PROPS.defaultRowsPerPage,
    orderBy: DEFAULT_PROPS.defaultOrderBy,
    orderDirection: DEFAULT_PROPS.defaultOrderDirection,
    totalPage: 1,
    totalItem: 0,
}

function useFarmstayOrders(preventFirstCall?: boolean, id?: any) {
    const dispatch = useDispatch();

    const [data, setData] = useState<any[]>([]);
    const [params, setParams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationProps>({ ...defaultOrdersPagination });

    const refresh = useCallback((newPagination?: PaginationProps, newParams?: any) => {
        if (!id) return;
        const _pagination = newPagination ?? { ...pagination };
        const _params = newParams ?? params ?? {};

        const total: PaginationProps & any = {
            page: _pagination.page ?? defaultOrdersPagination.page,
            pageSize: _pagination.pageSize ?? defaultOrdersPagination.pageSize,
            orderBy: _pagination.orderBy ?? defaultOrdersPagination.orderBy,
            orderDirection: _pagination.orderDirection ?? defaultOrdersPagination.orderDirection,
            ..._params,
            FarmstayId: id,
        };

        if (newParams) {
            setParams(clone(newParams));
        }

        if (newPagination) {
            setPagination(clone(newPagination));
        }

        dispatch(searchOrders(
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
                        totalPage: response.data?.totalPage ?? defaultOrdersPagination.totalPage,
                        totalItem: response.data?.totalItem ?? defaultOrdersPagination.totalItem,
                    }))

                    setData(prev => isAvailableArray(response?.data?.data) ? response.data.data : [])
                }
            }
        ))

    }, [id, pagination, params, dispatch]);

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

    useEffect(() => {
        if (id) {
            refresh();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

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

export default useFarmstayOrders