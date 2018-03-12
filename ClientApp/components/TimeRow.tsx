import * as React from 'react';

import { TimeSlot } from '../interfaces/TimeSlot';
import TimeSlotApi from '../api/TimeSlotApi';

interface TimeRowState {
    dirty: boolean;
    projectName: string;
    description: string;
    lengthOfWork: number;
    hideInputsStyle: any;
}

interface TimeRowProperties {
    timeSlot: TimeSlot;
    onChanged: (slot? : TimeSlot) => void;
}

export class TimeRow extends React.Component<TimeRowProperties, TimeRowState> {
    constructor(props: TimeRowProperties) {
        super(props);

        const { description = "", projectName = "", lengthOfWork, id } = this.props.timeSlot;
        this.state = {
            dirty: (id == -1),
            projectName,
            description,
            lengthOfWork,
            hideInputsStyle: { visibility: (id == -1) ? 'hidden' : '' }
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

    private async deleteRow() {
        await TimeSlotApi.deleteSlot(this.props.timeSlot.id);
        this.props.onChanged();
    }

    public render() {
        const { id } = this.props.timeSlot;

        let addDeleteButton;
        if (id != -1) {
            addDeleteButton = (
                <button className="btn btn-danger" onClick={() => this.deleteRow()}>
                    <span className="glyphicon glyphicon-trash"/>
                </button>
            );
        }
        else {
            addDeleteButton = (
                <button className="btn btn-success" onClick={() => this.setState({ hideInputsStyle: { visibility: '' } })}>
                    <span className="glyphicon glyphicon-plus"/>
                </button>
            );
        }

        return (<tr key={id}>
            <td>
                {addDeleteButton}
            </td>
            <td>
                <input
                    style={this.state.hideInputsStyle}
                    className="form-control"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={e => this.fieldChanged(e)}/>
            </td>
            <td>
                <input
                    style={this.state.hideInputsStyle}
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={e => this.fieldChanged(e)}/>
            </td>
            <td>
                <input
                    style={this.state.hideInputsStyle}
                    className="form-control"
                    type="number"
                    name="lengthOfWork"
                    value={this.state.lengthOfWork}
                    onChange={e => this.fieldChanged(e)}/>
            </td>
            <td>
                <button
                    style={this.state.hideInputsStyle}
                    className="btn btn-default"
                    disabled={!this.state.dirty}
                    onClick={() => this.saveRow()}>
                    <span className="glyphicon glyphicon-floppy-disk" />
                </button>
            </td>
        </tr>);
    }
}
