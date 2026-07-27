import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data: {
        email: string;
        password: string;
        fullname: string;
        username: string;
      }) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getProfile: builder.query<any, void>({
      query: () => "user/profile",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetProfileQuery,
} = userApi;
