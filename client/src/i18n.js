import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./translations/en.json";
import uaTranslations from "./translations/ua.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslations
            },
            ua: {
                translation: uaTranslations
            }
        },
        lng: "ua",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
