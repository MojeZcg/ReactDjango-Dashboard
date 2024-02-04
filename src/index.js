import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

import store from "store";
import { Provider } from "react-redux";

import i18 from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources: {
      en: {},
      es: {},
    },
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
    },
    fallbackLng: ["es", "en"],
  });

const root = ReactDOM.createRoot(document.getElementById("root"));

const loadingMarkup = (
  <div className="py-4 px-2 text-center">
    <h2 className="text-oro font-Main text-xl">Loading...</h2>
  </div>
);

root.render(
  <Provider store={store}>
    <Suspense fallback={loadingMarkup}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </Provider>
);
