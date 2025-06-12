/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// fr
import settings_fr from "./lang/fr/settings.json";
import global_fr from "./lang/fr/global.json";
import home_fr from "./lang/fr/home.json";
import search_fr from "./lang/fr/search.json";
import welcome_fr from "./lang/fr/welcome.json";
import popup_fr from "./lang/fr/popup.json";
import rdvs_fr from "./lang/fr/rdvs.json";
import stat_fr from "./lang/fr/stat.json";
import note_fr from "./lang/fr/note.json";
import invoice_fr from "./lang/fr/invoice.json";

import global_en from "./lang/en/global.json";
import home_en from "./lang/en/home.json";
import search_en from "./lang/en/search.json";
import welcome_en from "./lang/en/welcome.json";
import popup_en from "./lang/en/popup.json";

import i18next from "i18next";

import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import store from "./store";
import { Provider } from "react-redux";

i18next.init({
    interpolation: { escapeValue: false },
    lng: "fr",
    resources: {
        en: {
            global: global_en,
            home: home_en,
            search: search_en,
            welcome: welcome_en,
            popup: popup_en,
        },
        fr: {
            global: global_fr,
            settings: settings_fr,
            home: home_fr,
            search: search_fr,
            welcome: welcome_fr,
            popup: popup_fr,
            rdvs: rdvs_fr,
            stat: stat_fr,
            note: note_fr,
            invoice: invoice_fr,
        },
    },
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <Provider store={store}>
                <ChakraProvider>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
                    </QueryClientProvider>
                </ChakraProvider>
            </Provider>
        </I18nextProvider>
    </React.StrictMode>
);
