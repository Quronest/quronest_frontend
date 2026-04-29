import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./features/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import workspaceReducer from "./features/workspace/workspaceSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    workspace: workspaceReducer,
  },
  middleware: (gdm) => gdm().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
