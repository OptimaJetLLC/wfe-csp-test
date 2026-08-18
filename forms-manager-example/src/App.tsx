import WorflowForms from "./forms2";
import WorkflowDesigner from "./WorkflowDesigner";
import WorkflowFormDesigner from "./WorkflowFormDesigner";

export const App = () => {
    const processId = "d681f711-dad3-4785-a117-ab43d07bc2a3";
    const schemeCode = "SimpleWF";

    return (
        <div>
            <WorflowForms processId={processId} modalId="modalId" />
            <WorkflowFormDesigner formKey={{ formName: "form" }} />
            <WorkflowDesigner processId={undefined} schemeCode={schemeCode} />
        </div>
    );
};
