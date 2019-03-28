'use strict';

const PATH = {
    inspections: 'inspections',
    facilities: 'facilities',
    networks: 'networks',
    tickets: 'tickets',
    casings: 'casings',
    cements: 'cements',
    wells: 'wells',
    tasks: 'tasks',
    units: 'units',
    jobs: 'jobs',
    user: 'user'
};
const MODE = {
    table: 'table',
    json: 'json'
};

class State {
    constructor() {
        this.path = null;
        this.mode = 'table';
    }

    userPath() {
        return this.path === 'user';
    }

    wellsPath() {
        return this.path === 'wells';
    }

    networksPath() {
        return this.path === 'networks';
    }

    jsonMode() {
        return this.mode === 'json';
    }

    tableMode() {
        return this.mode === 'table';
    }

    setMode(mode) {
        this.mode = MODE[mode];
    }

    getMode() {
        return this.mode;
    }

    setPath(path) {
        store.setPath(path);
        this.path = PATH[path];
    }

    getPath() {
        return this.path;
    }
}