import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./popup/alert-slice";
import providerSlice from "./provider/provider-slice";
import providerFilterSlice from "./filter/filter-provider-slice";
import authSlice from "./ui/auth-slice";

const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    providers: providerSlice.reducer,
    filterProviders: providerFilterSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
