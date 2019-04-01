'use strict';

/**
 * Author: Michael Lowenstein
 * Date: April 1, 2019
 * 
 * routes.js:
 *  -   Contains the base url for the API as well
 *      as the relative paths for each request;
 */

const PV_FACILITIES = 'data/pvfacility/entityId';
const PV_TICKETS = 'data/pvticket/entityId';
const PV_TASKS = 'data/pvtask/entityId';
const PV_UNITS = 'data/pvunit/entityId';
const PV_NETWORKS = 'data/pvflownetheader';

const WV_INSPECTS = 'data/wvinspect/entityId';
const WV_CEMENTS = 'data/wvcement/entityId';
const WV_CASINGS = 'data/wvcas/entityId';
const WV_JOBS = 'data/wvjob/entityId';
const WV_WELLS = 'data/wvwellheader';

const API = 'https://apitest.peloton.com/v1';
const USER = 'user';

const ROUTES = {
    prodview: {
        'facilities': PV_FACILITIES,
        'networks': PV_NETWORKS,
        'tickets': PV_TICKETS,
        'tasks': PV_TASKS,
        'units': PV_UNITS
    },
    wellview: {
        'inspections': WV_INSPECTS,
        'casings': WV_CASINGS,
        'cements': WV_CEMENTS,
        'wells': WV_WELLS,
        'jobs': WV_JOBS,
    },
    user: USER,
    base: API
};