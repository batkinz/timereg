import * as React from 'react';

export interface WizardPageProps
{
    goNext: () => void;
}

export default abstract class WizardPageBase<T extends WizardPageProps, S> extends React.Component<T, S>
{
    constructor(props : T)
    {
        super(props);
    }

    protected static fieldChanged(e : React.ChangeEvent<HTMLInputElement>, self : React.Component)
    {
        const newState : any = { };
        newState[e.target.name] = e.target.value;
        self.setState(newState);
    }
}