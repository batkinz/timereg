import * as React from 'react';
import { TimeSlot } from '../interfaces/TimeSlot'

interface TimeRowState {
    dirty: boolean;
    projectName: string;
    description: string;
    lengthOfWork: number;
}

export class TimeRow extends React.Component<TimeSlot, TimeRowState> {
    constructor(props: TimeSlot) {
        super(props);

        const { description, projectName, lengthOfWork } = this.props;
        this.state = {
            dirty: false,
            projectName,
            description,
            lengthOfWork,
        };
    }

    public render() {
        return <tr key={this.props.id}>
            <td>
                <input
                    value={this.state.projectName}
                    onChange={e => this.setState({ projectName: e.target.value })}/>
            </td>
            <td>
                <input
                    value={this.state.description}
                    onChange={e => this.setState({ description: e.target.value })}/>
            </td>
            <td>
                <input
                    type="number"
                    value={this.state.lengthOfWork}
                    onChange={e => this.setState({ lengthOfWork: parseFloat(e.target.value) })}/>
            </td>
        </tr>;
    }
}
