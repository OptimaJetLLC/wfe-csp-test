import "@optimajet/workflow-designer-react/css";

import Designer, {
    type WorkflowDesignerConfig,
} from "@optimajet/workflow-designer-react/strict";
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";

interface Props {
    schemeCode?: string;
    processId?: string;
}

export type WorkflowDesignerRef = {
    getData: () => any;
};

const WorkflowDesigner = forwardRef<WorkflowDesignerRef, Props>(
    ({ processId, schemeCode }, ref) => {
        const showSaveButton = !!schemeCode && !processId;
        const designerRef = useRef<any>(null);

        const onError = useCallback((error: Error) => {
            console.error(error);
        }, []);

        const getData = useCallback(() => {
            const instance = designerRef.current;

            return instance?.data;
        }, []);

        useImperativeHandle(ref, () => ({
            getData,
        }));

        const designerConfig = useMemo<WorkflowDesignerConfig>(
            () => ({
                renderTo: "wfdesigner",
                apiurl: "https://demo.workflowengine.io/Designer/API",
                showSaveButton,
                name: "wfe",
                graphwidth: "100%",
                graphheight: "100%",
            }),
            [showSaveButton],
        );

        const onLoadDesigner = useCallback(() => {
            const items = document.querySelectorAll(".el-menu-item");

            items.forEach((el) => {
                if (el.textContent?.trim() === "Reset settings") {
                    // is called method - resetLocalStorage
                    el.remove();
                }
            });
        }, []);

        return (
            <Designer
                schemeCode={schemeCode}
                processId={processId}
                ref={designerRef}
                designerConfig={designerConfig}
                readOnly={!!processId}
                loadError={onError}
                onLoadDesigner={onLoadDesigner}
            />
        );
    },
);

export default WorkflowDesigner;
