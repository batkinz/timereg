import * as React from 'react';

import { TimeSlot } from '../interfaces/TimeSlot';
import TimeSlotApi from '../api/TimeSlotApi';

interface TimeRowState {
    dirty: boolean;
    projectName: string;
    description: string;
    lengthOfWork: number;
}

interface TimeRowProperties {
    timeSlot: TimeSlot;
    onChanged: (slot : TimeSlot) => void;
}

export class TimeRow extends React.Component<TimeRowProperties, TimeRowState> {
    constructor(props: TimeRowProperties) {
        super(props);

        const { description, projectName, lengthOfWork, id } = this.props.timeSlot;
        this.state = {
            dirty: false,
            projectName,
            description,
            lengthOfWork,
        };
    }

    private fieldChanged(e : React.ChangeEvent<HTMLInputElement>) {
        const newState : any = { dirty: true };
        newState[`${e.target.name}`] = e.target.value;

        this.setState(newState);
    }

    private async saveRow() {
        const { id, date } = this.props.timeSlot;
        const { projectName, description, lengthOfWork } = this.state;

        const updatedSlot = { id, date, projectName, description, lengthOfWork };
        
        await TimeSlotApi.updateSlot(updatedSlot);
        
        this.props.onChanged(updatedSlot);
    }

    public render() {
        return <tr key={this.props.timeSlot.id}>
            <td>
                <input
                    className="form-control"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={e => this.fieldChanged(e)}/>
            </td>
            <td>
                <input
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={e => this.fieldChanged(e)}/>
            </td>
            <td>
                <input
                    className="form-control"
                    type="number"
                    name="lengthOfWork"
                    value={this.state.lengthOfWork}
                    onChange={e => this.fieldChanged(e)}/>
            </td>
            <td>
                <button className="btn btn-default" disabled={!this.state.dirty} onClick={() => this.saveRow()}>
                    <span className="glyphicon glyphicon-floppy-disk" />
                </button>
            </td>
        </tr>;
    }
}
