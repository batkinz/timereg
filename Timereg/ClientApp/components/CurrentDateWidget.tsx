import * as React from 'react';
import 'datejs';

interface CurrentDateProps {
    currentDate: Date;
    dateChanged: (newDate : Date) => void;
}

export class CurrentDateWidget extends React.Component<CurrentDateProps, {}> {
    constructor(props : CurrentDateProps) {
        super(props);
        this.changeDate = this.changeDate.bind(this);
    }

    private changeDate(day :number) {
        const { currentDate } = this.props;
        const newDate = currentDate.addDays(day);
        this.props.dateChanged(newDate);
    }

    public render() {
        const dateString = this.props.currentDate.toLocaleDateString();

        return (
        <div className="row justify-content-center">
            <div className="col-md-4 text-right">
                <button className="btn btn-default" onClick={() => this.changeDate(-1)}>
                    <h2><span className="glyphicon glyphicon-backward"/></h2>
                </button>
            </div>
            <div className="col-md-4 text-center">
                <h2>{dateString}</h2>
            </div>
            <div className="col-md-4 text-left">
                <button className="btn btn-default" onClick={() => this.changeDate(1)}>
                    <h2><span className="glyphicon glyphicon-forward"/></h2>
                </button>
            </div>
        </div>);
    }
}