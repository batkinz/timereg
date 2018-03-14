import * as React from 'react';
import WizardPageBase from '../model/WizardPageBase';
import { InvoiceWizardProps } from '../model/InvoiceWizardProps';

interface SelectTimeRangeState
{
    startDate : string;
    endDate : string;
}

export default class SelectTimeRangeWizardPage extends WizardPageBase<InvoiceWizardProps, SelectTimeRangeState>
{
    constructor(props : InvoiceWizardProps)
    {
        super(props);

        this.state = {
            startDate: Date.today().toString('yyyy-MM-dd'),
            endDate: Date.today().toString('yyyy-MM-dd'),
        };
    }

    private goNext()
    {
        this.props.addData({...this.state});
        this.props.goNext();
    }

    public render() : JSX.Element
    {
        return (
            <div>
                <h2>Select the invoice date range</h2>
                <div>
                    <label>From date: </label>
                    <input
                        name="startDate"
                        className="formControl"
                        value={this.state.startDate}
                        onChange={e => WizardPageBase.fieldChanged(e, this)}
                        type="date"/>
                </div>
                <div>
                    <label>To date: </label>
                    <input
                        name="endDate"
                        className="formControl"
                        value={this.state.endDate}
                        min={this.state.startDate}
                        onChange={e => WizardPageBase.fieldChanged(e, this)}
                        type="date"/>
                </div>
                <div>
                    <button className="btn btn-default" onClick={() => this.goNext()}>
                        <span className="glyphicon glyphicon-refresh" /> List projects
                    </button>
                </div>
            </div>
        );
    }
}