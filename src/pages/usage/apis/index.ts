import { request } from '@umijs/max';
import {
  BreakdownItem,
  FilterOptionType,
  UsageBreakdownResponse,
  UsageMeta
} from '../config/types';

export const USAGE_META = '/usage/meta';
export const USAGE_BREAKDOWN = '/usage/breakdown';

export const MODEL_ROUTE_TARGETS = '/model-route-targets';

type UsageTimeSeriesParams = {
  start_date: string;
  end_date: string;
  scope: string;
  metric: string;
  group_by: string[];
  granularity: string;
  page?: number;
  perPage?: number;
  sort_by?: string;
  allPages?: boolean;
  filters: {
    routes?: FilterOptionType[];
    users?: FilterOptionType[];
    api_keys?: FilterOptionType[];
  };
};

export async function queryUsageMetaData(
  params: Record<string, any>,
  options?: any
): Promise<UsageMeta> {
  return request<UsageMeta>(USAGE_META, {
    params,
    method: 'GET',
    cancelToken: options?.token
  });
}

export async function queryUsageTimeSeriesData(
  params: UsageTimeSeriesParams,
  options?: any
): Promise<UsageBreakdownResponse> {
  const { allPages, ...requestParams } = params;

  if (allPages || params.page === -1) {
    const pageSize =
      params.perPage && params.perPage > 0 ? params.perPage : 100;
    const firstPageParams = {
      ...requestParams,
      page: 1,
      perPage: pageSize
    };

    const firstPage = await request<UsageBreakdownResponse>(USAGE_BREAKDOWN, {
      data: firstPageParams,
      method: 'POST',
      cancelToken: options?.token
    });

    const totalPage =
      firstPage.pagination?.totalPage ??
      Math.ceil(
        (firstPage.pagination?.total ?? firstPage.items?.length ?? 0) / pageSize
      );

    if (totalPage <= 1) {
      return firstPage;
    }

    const restPages = await Promise.all(
      Array.from({ length: totalPage - 1 }, (_, index) =>
        request<UsageBreakdownResponse>(USAGE_BREAKDOWN, {
          data: {
            ...firstPageParams,
            page: index + 2
          },
          method: 'POST',
          cancelToken: options?.token
        })
      )
    );

    const items = [
      ...(firstPage.items || []),
      ...restPages.flatMap((page) => page.items || [])
    ];

    return {
      ...firstPage,
      items,
      pagination: {
        ...firstPage.pagination,
        page: 1,
        perPage: pageSize,
        totalPage,
        total: firstPage.pagination?.total ?? items.length
      }
    };
  }

  return request<UsageBreakdownResponse>(USAGE_BREAKDOWN, {
    data: requestParams,
    method: 'POST',
    cancelToken: options?.token
  });
}

export async function queryUsageBreakdownList(
  params: Global.SearchParams & {
    filters: {
      routes?: FilterOptionType[];
      users?: FilterOptionType[];
      api_keys?: FilterOptionType[];
    };
  },
  options?: any
) {
  const requestParams = {
    ...params,
    page: params.page > 0 ? params.page : 1,
    perPage: params.perPage && params.perPage > 0 ? params.perPage : 100
  };

  return request<Global.PageResponse<BreakdownItem>>(USAGE_BREAKDOWN, {
    data: requestParams,
    method: 'POST',
    cancelToken: options?.token
  });
}
