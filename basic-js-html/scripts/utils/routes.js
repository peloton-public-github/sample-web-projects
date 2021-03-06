'use strict';

const PV_FACILITIES = 'data/pvfacility/entityId/B3AA2B1C82364B19A75792A2888657E1';
const PV_TICKETS = 'data/pvticket/entityId/B3AA2B1C82364B19A75792A2888657E1';
const PV_TASKS = 'data/pvtask/entityId/B3AA2B1C82364B19A75792A2888657E1';
const PV_UNITS = 'data/pvunit/entityId/B3AA2B1C82364B19A75792A2888657E1'
const PV_NETWORKS = 'data/pvflownetheader';

const WV_INSPECTS = 'data/wvinspect/entityId/946E6358693E482097B8099D7F84F532';
const WV_CEMENTS = 'data/wvcement/entityId/946E6358693E482097B8099D7F84F532';
const WV_CASINGS = 'data/wvcas/entityId/946E6358693E482097B8099D7F84F532';
const WV_JOBS = 'data/wvjob/entityId/946E6358693E482097B8099D7F84F532';
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