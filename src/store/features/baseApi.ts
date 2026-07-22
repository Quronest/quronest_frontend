import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URI;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL + "/backend/api/v1",
    credentials: "include",
});

const baseQueryWithErrorHandling: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.data) {
    return result;
  }

  if (result.error) {
    const err = result.error as any;

    return {
      error: {
        status: err.status,
        message: err?.data?.message || err?.error || "Something went wrong",
        data: err?.data || null,
      },
    };
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
