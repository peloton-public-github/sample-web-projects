'use strict';

class Store {
    constructor() {
        this.needentity = false;
        this.incalcs = false;
        this.entityid = null;
        this.builder = null;
        this.product = null;
        this.prodkey = null;
        this.app = null;
    }

    setApp(app) {
        this.app = app;
    }

    getApp() {
        return this.app;
    }

    setProduct(product) {
        this.product = product;
    }

    getProduct() {
        return this.product;
    }

    setBuilder(builder) {
        this.builder = builder;
    }

    getBuilder() {
        return this.builder;
    }

    setBackup(app, builder) {
        this.builder = builder;
        this.app = app;
    }

    setProductKey(key) {
        this.prodkey = key;
    }

    getProductKey() {
        return this.prodkey;
    }

    includeCalcs() {
        return this.incalcs;
    }

    setCalcs(calcs) {
        if (calcs) { this.incalcs = false; }
        else { this.incalcs = true; }
    }

    setEntityNeeded(need) {
        this.needentity = need;
    }

    needEntityId() {
        return this.needentity;
    }

    setEntityId(id) {
        this.entityid = id;
    }

    getEntityId() {
        return this.entityid;
    }
}