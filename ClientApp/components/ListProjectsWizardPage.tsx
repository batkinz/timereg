import * as React from 'react';
import WizardPageBase from '../model/WizardPageBase';
import { InvoiceWizardProps } from '../model/InvoiceWizardProps';
import { TimeSlot } from '../interfaces/TimeSlot';
import TimeSlotApi from '../api/TimeSlotApi';
import { AccuSlot } from '../interfaces/AccuSlot';

interface ListProjectsProps extends InvoiceWizardProps
{
    startDate : string;
    endDate : string;
}

interface ListProjectsState
{
    accumulatedSlots : AccuSlot[]
}

export default class SelectTimeRangeWizardPage extends WizardPageBase<ListProjectsProps, ListProjectsState>
{
    constructor(props : ListProjectsProps)
    {
        super(props);

        this.state = { accumulatedSlots: [] };
    }

    componentDidMount()
    {
        this.update();
    }

    private async update()
    {
        const startDate = Date.parse(this.props.startDate) as Date | any;
        const endDate = Date.parse(this.props.endDate) as Date | any;

        if (!startDate || !endDate) return;

        const slots = await TimeSlotApi.getSlots(startDate, endDate);
        this.setState({ accumulatedSlots: this.accumulateSlots(slots) });
    }

    private goNext()
    {
        this.props.addData({ selectedProjects: this.state.accumulatedSlots.filter(s => s.selected) });
        this.props.goNext();
    }

    private accumulateSlots(slots : TimeSlot[]) : AccuSlot[]
    {
        const accumulatedResults : any = {};
        slots.map(s => {
            const projectName = (typeof s.projectName === 'undefined') ? '' : s.projectName;
            if (!accumulatedResults.hasOwnProperty(s.projectName))
            {
                accumulatedResults[projectName] = 0;
            }
            accumulatedResults[projectName] += s.lengthOfWork;
        });

        const accuSlots : AccuSlot[] = [];
        for (const key of Object.keys(accumulatedResults))
        {
            const hours = accumulatedResults[key] as number;
            accuSlots.push({ projectName: key, totalHours: hours, selected: false });
        }

        return accuSlots;
    }

    private onCheckBoxTicked(e : React.ChangeEvent<HTMLInputElement>)
    {
        const newAccuSlots = Array.from(this.state.accumulatedSlots);
        for (const s of newAccuSlots)
        {
            if (s.projectName === e.target.name)
            {
                s.selected = e.target.checked;
                break;
            }
        }

        this.setState({ accumulatedSlots: newAccuSlots });
    }

    private renderProjectCheckboxes(slots : AccuSlot[])
    {
        const uniqueProjects = Array.from(new Set(slots.map(s => s.projectName)));
        return uniqueProjects.map(p =>
            <div className="checkbox" key={p}>
                <label>
                    <input type="checkbox" name={p} onChange={e => this.onCheckBoxTicked(e)} />
                    {p}
                </label>
            </div>);
    }

    public render()
    {
        return (
            <div>
                <h2>Select the projects</h2>
                {this.renderProjectCheckboxes(this.state.accumulatedSlots)}
                <div>
                    <button className="btn btn-default" onClick={() => this.goNext()} >
                        <span className="glyphicon glyphicon-list-alt" /> Generate invoice
                    </button>
                </div>
            </div>
        );
    }
}