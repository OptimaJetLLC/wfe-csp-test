import type { FormKey } from "@optimajet/workflow-forms-viewer";
import { rSuiteComponents } from "@react-form-builder/components-rsuite";
import { Language } from "@react-form-builder/core";
import {
    BuilderView,
    FormBuilder,
    type FormBuilderI18n,
    type IFormBuilder,
    type IFormStorage,
} from "@react-form-builder/designer";
import type React from "react";
import { useRef } from "react";
import { deDE, enGB } from "rsuite/esm/locales/index.js";
import form from "./form.json";

import "@react-form-builder/core/assets/styles.css";
import "@react-form-builder/designer/assets/designer.ltr.min.css";

function emulateNetwork(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

interface Props {
    formKey: FormKey;
}

const componentsMetadata = rSuiteComponents.map((definer) => definer.build());
const builderView = new BuilderView([...componentsMetadata]);

const WorkflowFormDesigner: React.FC<Props> = ({ formKey }) => {
    const builderRef = useRef<IFormBuilder>(null);

    const formStorage: IFormStorage | undefined = undefined;

    const getFormFn = async (_name?: string) => {
        await emulateNetwork(100);
        return JSON.stringify(form);
    };

    const builderLanguages: FormBuilderI18n = {
        languages: [
            new Language("de", "DE", "German", "Deutsch"),
            new Language("en", "US", "English", "English"),
        ],

        getData: async (languageFullCode: string) => {
            if (languageFullCode === "de-DE") {
                return {
                    data: { leftMenu: { menu: "Menü" } },
                    componentsLocale: deDE,
                };
            }

            return {
                data: { leftMenu: { menu: "Menu" } },
                componentsLocale: enGB,
            };
        },
    };

    // disable CSS injection
    const StylesProvider = ({ children }: { children: React.ReactNode }) =>
        children;
    const defaultLanguage = "de-DE";

    return (
        <FormBuilder
            builderRef={builderRef}
            view={builderView}
            theme="light"
            getForm={getFormFn}
            formName={formKey.formName}
            formStorage={formStorage}
            persistFormName={true}
            localStoragePrefix="OptimajetForm"
            i18n={builderLanguages}
            licenseKey={undefined}
            stylesProvider={StylesProvider}
            defaultViewerLanguage={defaultLanguage}
            defaultBuilderLanguage={defaultLanguage}
        />
    );
};

export default WorkflowFormDesigner;
