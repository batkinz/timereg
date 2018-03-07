import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RegisterTime } from './components/RegisterTime';
import { CreateInvoice } from './components/CreateInvoice';

export const routes = <Layout>
    <Route exact path='/' component={ RegisterTime } />
    <Route path='/invoice' component={ CreateInvoice } />
</Layout>;
