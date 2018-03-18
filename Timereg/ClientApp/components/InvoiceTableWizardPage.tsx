import * as React from 'react';
import WizardPageBase from '../model/WizardPageBase';
import { InvoiceWizardProps } from '../model/InvoiceWizardProps';
import { AccuSlot } from '../interfaces/AccuSlot';

interface InvoiceTableProps extends InvoiceWizardProps
{
    selectedSlots : AccuSlot[];
    startDate: string;
    endDate: string;
}

interface InvoiceTableState
{
    vatPercentage : number;
    hourlyRate : number;
}

export default class InvoiceTableWizardPage extends WizardPageBase<InvoiceTableProps, InvoiceTableState>
{
    constructor(props : InvoiceTableProps)
    {
        super(props);
        this.state = {
            vatPercentage: 25,
            hourlyRate: 250,
        };
    }

    render() : JSX.Element
    {
        const { vatPercentage, hourlyRate } = this.state;
        const totalHours = this.props.selectedSlots.map(s => s.totalHours).reduce((a, b) => a + b, 0);
        return(
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <label>VAT percentage</label>
                        <input
                            name="vatPercentage"
                            className="form-control"
                            onChange={e => WizardPageBase.fieldChanged(e, this)}
                            value={vatPercentage}
                            type="number"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <label>Hourly rate</label>
                        <input
                            name="hourlyRate"
                            className="form-control"
                            onChange={e => WizardPageBase.fieldChanged(e, this)}
                            value={hourlyRate}
                            type="number"/>
                    </div>
                </div>
                <h2>{this.props.startDate} - {this.props.endDate}</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Project name</th>
                            <th>Hours worked</th>
                            <th>Net cost</th>
                            <th>Gross cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.selectedSlots.map(s =>
                        <tr>
                            <td>{s.projectName}</td>
                            <td>{s.totalHours}</td>
                            <td>{(s.totalHours * hourlyRate).toFixed(2)}</td>
                            <td>{(s.totalHours * hourlyRate * (1 + (vatPercentage / 100))).toFixed(2)}</td>
                        </tr>)}
                        <tr className="warning">
                            <td><strong>TOTAL</strong></td>
                            <td><strong>{totalHours}</strong></td>
                            <td><strong>{totalHours * hourlyRate}</strong></td>
                            <td><strong>{totalHours * hourlyRate * (1 + (vatPercentage / 100))}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}