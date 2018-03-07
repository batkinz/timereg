import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RegisterTime } from './pages/RegisterTime';
import { CreateInvoice } from './pages/CreateInvoice';

export const routes = <Layout>
    <Route exact path='/' component={ RegisterTime } />
    <Route path='/invoice' component={ CreateInvoice } />
</Layout>;
