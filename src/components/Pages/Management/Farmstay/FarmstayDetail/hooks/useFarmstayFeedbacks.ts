
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clone } from 'lodash';
import { PaginationProps } from '../../../../../../setting/general-props';
import { searchFeedbacks } from '../../../../../../redux/feedback/action';
import { isAvailableArray } from '../../../../../../helpers/arrayUtils';

const DEFAULT_PROPS = {
    defaultRowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20, 50],
    defaultOrderBy: 'createdDate',
    defaultOrderDirection: 'desc',
}

export const defaultFarmstayFeedbacksPagination: PaginationProps = {
    page: 1,
    pageSize: 10000,
    orderBy: DEFAULT_PROPS.defaultOrderBy,
    orderDirection: DEFAULT_PROPS.defaultOrderDirection,
    totalPage: 1,
    totalItem: 0,
}

function useFarmstayFeedbacks(id: any) {
    const dispatch = useDispatch();

    const [data, setData] = useState<any[]>([]);
    const [params, setParams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<PaginationProps>({ ...defaultFarmstayFeedbacksPagination });

    const refresh = useCallback((newPagination?: PaginationProps, newParams?: any) => {
        if (id == null) return;
        const _pagination = newPagination ?? { ...pagination };
        const _params = newParams ?? params ?? {};

        const total: PaginationProps & any = {
            page: _pagination.page ?? defaultFarmstayFeedbacksPagination.page,
            pageSize: _pagination.pageSize ?? defaultFarmstayFeedbacksPagination.pageSize,
            orderBy: _pagination.orderBy ?? defaultFarmstayFeedbacksPagination.orderBy,
            orderDirection: _pagination.orderDirection ?? defaultFarmstayFeedbacksPagination.orderDirection,
            ..._params,
            FarmstayId: id,
        };

        if (newParams) {
            setParams(clone(newParams));
        }

        if (newPagination) {
            setPagination(clone(newPagination));
        }

        dispatch(searchFeedbacks(
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
                        totalPage: response.data?.totalPage ?? defaultFarmstayFeedbacksPagination.totalPage,
                        totalItem: response.data?.totalItem ?? defaultFarmstayFeedbacksPagination.totalItem,
                    }))

                    setData(prev => isAvailableArray(response?.data?.data) ? response.data.data : [])
                }
            }
        ))

    }, [id, pagination, params, dispatch]);

    useEffect(() => {
        if (id) {
            refresh();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return {
        data,
        loading,
        pagination,
        rowsPerPageOptions: DEFAULT_PROPS.rowsPerPageOptions,

        refresh,
    };
}

export default useFarmstayFeedbacks;