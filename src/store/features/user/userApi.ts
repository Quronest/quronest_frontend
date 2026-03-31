import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({
        body,
      }: {
        body: {
          email: string;
          password: string;
          fullname: string;
          username: string;
        };
      }) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation({
      query: ({ body }: { body: { email: string; password: string } }) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<any, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  userApi;
