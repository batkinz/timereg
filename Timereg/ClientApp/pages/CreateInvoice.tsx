import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { TimeSlot } from '../interfaces/TimeSlot';
import TimeSlotApi from '../api/TimeSlotApi';
import SelectTimeRangeWizardPage from '../components/SelectTimeRangeWizardPage';
import ListProjectsWizardPage from '../components/ListProjectsWizardPage';
import InvoiceTableWizardPage from '../components/InvoiceTableWizardPage';
import { InvoiceWizardPageData } from '../model/InvoiceWizardProps';

interface InvoiceState {
    subPageState: InvoiceWizardPageData;
    currentPageIndex : number;
}

export class CreateInvoice extends React.Component<RouteComponentProps<{}>, InvoiceState> {
    constructor(props : RouteComponentProps<{}>) {
        super(props);

        this.state = {
            subPageState: {},
            currentPageIndex: 0,
        };
    }

    private static renderInvoiceTable(slots : TimeSlot[], selectedProjects : string[])
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
        return JSON.stringify(accumulatedResults);
    }

    private setSubPageState(receivedState : InvoiceWizardPageData)
    {
        this.setState({
            subPageState: {
                ...this.state.subPageState,
                ...receivedState
            },  
        });
    }

    private goToNextWizardPage()
    {
        this.setState({ currentPageIndex: this.state.currentPageIndex + 1 });
    }

    private resetWizard()
    {
        this.setState({
            currentPageIndex: 0,
            subPageState: {},
        });
    }

    public render() {
        const { startDate = '', endDate = '', selectedProjects = [] } = this.state.subPageState;
        const { currentPageIndex } = this.state;

        console.log(this.state);
        let currentPage;
        switch (currentPageIndex)
        {
            case 0:
                currentPage = (<SelectTimeRangeWizardPage
                    addData={state => this.setSubPageState(state)}
                    goNext={this.goToNextWizardPage.bind(this)}/>);
                break;
            case 1:
                currentPage = (<ListProjectsWizardPage
                    addData={state => this.setSubPageState(state)}
                    goNext={this.goToNextWizardPage.bind(this)}
                    startDate={startDate}
                    endDate={endDate} />);
                break;
            case 2:
                currentPage = (<InvoiceTableWizardPage
                    addData={state => this.setSubPageState(state)}
                    goNext={this.goToNextWizardPage.bind(this)}
                    selectedSlots={selectedProjects}
                    startDate={startDate}
                    endDate={endDate}/>);
                break;
            default:
                currentPage = (<div>Unknown page index: {currentPageIndex}</div>);
                break;
        }

        return (
            <div>
                <h1>Create invoice</h1>
                <button className="btn btn-warning" onClick={e => this.resetWizard()}>
                    <span className="glyphicon glyphicon-repeat" /> Reset
                </button>
                {currentPage}
            </div>
        );
    }
}
