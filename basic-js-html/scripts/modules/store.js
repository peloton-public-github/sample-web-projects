'use strict';

/**
 * Author: Michael Lowenstein
 * Date: April 1, 2019
 * 
 * store.js:
 *  -   Serves as a state-management class;
 *  -   Allows for certain values to persist
 *      across user-interaction while others
 *      are reset/changed.
 */

class Store {
    constructor() {
        this.requestagain = false;
        this.contextshown = false;
        this.dialogopen = false;
        this.needentity = false;
        this.nullresult = false;
        this.incalcs = false;
        this.entityid = null;
        this.builder = null;
        this.product = null;
        this.prodkey = null;
        this.extras = null;
        this.path = null;
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

    setRequestAgain(again) {
        this.requestagain = again;
    }

    getRequestAgain() {
        return this.requestagain;
    }

    setExtras(extras) {
        this.extras = extras;
    }

    getExtras() {
        return this.extras;
    }

    setDialogOpen(open) {
        this.dialogopen = open;
    }

    dialogIsOpen() {
        return this.dialogopen;
    }

    setContextShown(shown) {
        this.contextshown = shown;
    }

    contextIsShown() {
        return this.contextshown;
    }

    setPath(path) {
        this.path = path;
    }

    getPath() {
        return this.path;
    }

    setNullResult(isnull) {
        this.nullresult = isnull;
    }

    resultIsNull() {
        return this.nullresult;
    }
}