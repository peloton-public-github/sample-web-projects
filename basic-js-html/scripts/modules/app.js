'use strict';

/**
 * Author: Michael Lowenstein
 * Date: April 1, 2019
 * 
 * app.js:
 *  -   Serves as the parent class to both api.js
 *      and state.js, and a sibling of builders.js;
 *  -   Class tracks user-interaction and makes use
 *      of the various utility functions related to
 *      DOM-manipulation and request-conditions;
 */

class App {
    constructor() {
        this.viewer = document.getElementById('showData');
        this.state = new State();
        this.api = new Api();
        this.dataset = null;
        this.product = null;
    }

    forUser(path) {
        return path === 'user';
    }

    setProduct(product) {
        this.api.setProduct(product);
        this.product = product;
    }

    getProduct() {
        return this.product;
    }

    setupRequest(product, path) {
        this.state.setPath(path);
        this.setProduct(product);
        var reqUser = this.forUser(path);
        var reqChild = this.forChild(path);
        this.api.createRequest(reqUser, reqChild, path);
    }

    forChild(path) {
        return !(path === 'networks' || path === 'wells');
    }

    checkApiResponse() {
        if (this.api.isComplete()) {
            let response = this.api.getResponse();
            this.setDataSet(response);
        }
    }

    setDataSet(response) {
        this.dataset = response;
    }

    getDataSet() {
        return this.dataset;
    }

    getState() {
        return this.state;
    }

    load() {
        this.viewer = document.getElementById('showData');
        return this.viewer;
    }

    clear() {
        this.viewer = document.getElementById('showData');
        this.viewer.innerHTML = '';
    }
}