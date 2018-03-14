import { WizardPageProps } from "./WizardPageBase";
import { AccuSlot } from "../interfaces/AccuSlot";

export interface InvoiceWizardPageData
{
    startDate? : string;
    endDate? : string;
    selectedProjects? : AccuSlot[];
}

export interface InvoiceWizardProps extends WizardPageProps
{
    addData : (data : InvoiceWizardPageData) => void;
}