import {
    type ExecuteFormHandler,
    type Form,
    type FormKey,
    FormsViewer,
    type GetFormHandler,
    type OmittedFormViewerProps,
    type SaveFormHandler,
} from "@optimajet/workflow-forms-viewer";
import {
    models,
    RsLocalizationWrapper,
} from "@react-form-builder/components-rsuite";
import { createView } from "@react-form-builder/core";
import type React from "react";
import form from "./form.json";

import '@react-form-builder/core/assets/styles.css'
import '@react-form-builder/components-rsuite/assets/styles.ltr.css'

const view = createView(models).withViewerWrapper(RsLocalizationWrapper);
const formViewerProps: OmittedFormViewerProps = {
    view,
};

function emulateNetwork(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

interface Props {
    processId: string;
    modalId: string;
}

const WorflowForms: React.FC<Props> = ({ processId, modalId }) => {
    const getForm: GetFormHandler = async (_formKey: FormKey) => {
        if (!processId) {
            return;
        }

        emulateNetwork(100);

        return JSON.stringify(form);
    };

    const getForms = async () => {
        const forms: Form[] = [];

        emulateNetwork(100);

        forms.push({
            processId: "processId",
            formKey: {
                formName: "form",
            },
            formCode: JSON.stringify(form),
            formData: {},
            commands: [],
            allowSave: false,
        });

        return forms;
    };

    const showError = async (error: Error) => {
        console.error(error);
    };

    const showSuccess = async (message: string) => {
        console.info(message);
    };

    const saveForm: SaveFormHandler = async (
        _processId: string,
        _formKey: FormKey,
        _data: Record<string, string>,
    ) => {
        // do nothing
        emulateNetwork(100);
        return {};
    };

    const executeForm: ExecuteFormHandler = async (
        _processId: string,
        _formKey: FormKey,
        _commandName: string,
        _data: Record<string, string>,
    ) => {
        emulateNetwork(100);
        return {};
    };

    return (
        <FormsViewer
            getForm={getForm}
            getForms={getForms}
            onError={showError}
            onSuccess={showSuccess}
            saveForm={saveForm}
            executeForm={executeForm}
            formViewerProps={formViewerProps}
            tenantId={"tenantId"}
        />
    );
};

export default WorflowForms;
