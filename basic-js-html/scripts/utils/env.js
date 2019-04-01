'use strict';

/**
 * Author: Michael Lowenstein
 * Date: April 1, 2019
 * 
 * env.js:
 *  -   Environment variables are defined here;
 */

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
const PINIT = {
    product: 'prodview',
    path: 'user'
};
const WINIT = {
    product: 'wellview',
    path: 'user'
};

const ENV = {
    subscriptkey: SUBSCRIPTION_KEY,
    products: PRODUCTS,
    token: API_TOKEN,
    routes: ROUTES,
    params: CALCS,
    pvinit: PINIT,
    wvinit: WINIT,
    ou: ACTIVE_OU,
};