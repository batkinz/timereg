import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { TimeRow } from '../components/TimeRow';
import { TimeSlot } from '../interfaces/TimeSlot';
import TimeSlotApi from '../api/TimeSlotApi';
import { CurrentDateWidget } from '../components/CurrentDateWidget';

interface RegisterTimeState {
    timeSlots: TimeSlot[];
    loading: boolean;
    currentDate: Date;
}

export class RegisterTime extends React.Component<RouteComponentProps<{}>, RegisterTimeState> {
    constructor() {
        super();
        this.state = { timeSlots: [], loading: true, currentDate: Date.today() };

        this.dateChanged = this.dateChanged.bind(this);
        this.update = this.update.bind(this);
    }

    componentWillMount() {
        this.update(this.state.currentDate);
    }

    private async update(date : Date) {
        this.setState({ loading: true });

        const slots = await TimeSlotApi.getSlots(date);
        this.setState({ timeSlots: slots, loading: false });
    }

    private dateChanged(newDate : Date) {
        this.setState({ currentDate: newDate });
        this.update(newDate);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTimeSlotsTable(this.state.timeSlots);

        return <div>
            <h1>Register time</h1>
            <div className="row">
                <CurrentDateWidget currentDate={this.state.currentDate} dateChanged={this.dateChanged} />
                { contents }
            </div>
        </div>;
    }

    private renderTimeSlotsTable(slots: TimeSlot[]) {
        const newSlot = { id: -1, date: this.state.currentDate, lengthOfWork: 0 };

        return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Delete</th>
                    <th>Project name</th>
                    <th>Description</th>
                    <th>Hours</th>
                    <th>Save</th>
                </tr>
            </thead>
            <tbody>
                {slots.map((slot, i) =>
                    <TimeRow
                        key={i}
                        timeSlot={slot}
                        onChanged={s => this.update(this.state.currentDate)}/>
                )}
                <TimeRow key="new" timeSlot={newSlot} onChanged={s => this.update(this.state.currentDate)}/>
            </tbody>
        </table>);
    }
}
