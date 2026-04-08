import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({
        data,
      }: {
        data: {
          email: string;
          password: string;
          fullname: string;
          username: string;
        };
      }) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: ({ data }: { data: { email: string; password: string } }) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),

    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    getProfile: builder.query<any, void>({
      query: () => "user/profile",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetProfileQuery,
} = userApi;
