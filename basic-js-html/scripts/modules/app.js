'use strict';

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