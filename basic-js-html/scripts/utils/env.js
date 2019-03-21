'use strict';

const API_TOKEN = '';
const SUBSCRIPTION_KEY = '';
const ACTIVE_OU = 'appframewebapi';
const PRODUCTS = [
    'siteview',
    'landview',
    'prodview',
    'wellview',
    'rigview'
];
const CALCS = 'includecalcs';
const INIT = {
    product: 'prodview',
    path: 'user'
};

const ENV = {
    subscriptkey: SUBSCRIPTION_KEY,
    products: PRODUCTS,
    token: API_TOKEN,
    routes: ROUTES,
    params: CALCS,
    default: INIT,
    ou: ACTIVE_OU,
};