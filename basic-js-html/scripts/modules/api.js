'use strict';

class Api {
    constructor() {
        this.request = null;
        this.product = null;
        this.endpoint = null;
        this.response = null;
        this.complete = false;
    }

    setProduct(product) {
        this.product = product;
    }

    getProduct() {
        return this.product;
    }

    setEndpoint(forUser, product, target) {
        if (!forUser) {
            if (includeCalcs()) {
                let suffix = `?${ENV.params}=true`;
                this.endpoint = `${ENV.routes.base}/${ENV.ou}/${product}/${ENV.routes[product][target]}${suffix}`;
            } else {
                this.endpoint = `${ENV.routes.base}/${ENV.ou}/${product}/${ENV.routes[product][target]}`;
            }
        } else {
            this.endpoint = `${ENV.routes.base}/${ENV.routes.user}`;
        }
    }

    getEndpoint() {
        return this.endpoint;
    }

    createRequest(forUser, path) {
        this.request = this.initRequest(forUser, path);
    }

    initRequest(forUser, path) {
        var product = this.getProduct();
        var custom = getProductKey();
        this.setEndpoint(forUser, product, path);
        this.request = this.configureRequest(product, custom);
        this.sendRequest(this.request);
    }

    configureRequest(product, custom) {
        var req = new XMLHttpRequest();
        req.open('GET', this.endpoint, true);
        req.setRequestHeader('Ocp-Apim-Subscription-Key', `${ENV.subscriptkey}`)
        req.setRequestHeader('Authorization', `Bearer ${ENV.token}`);
        req.setRequestHeader(`${product}`, 'dwB2AHwAMQAwAC4AMAAwAHwAMQAwAC4AMwAwAHwAaQBkAHcAZQBsAGwAfAB3AHYAdwBlAGwAbABoAGUAYQBkAGUAcgB8ADQANAA3ADgARAAwAEQARABBADMAQwBBADQAQgAzADUAQgBBADUARgBFADUAQwAxADgAQQA3ADAANQBFADEAOQB8AFcAZQBsAGwAVgBpAGUAdwB8AHcAdgB8ADEAMAAuADMAMAB8AEEAbABsACAARABhAHQAYQA=');
        return req;
    }

    sendRequest(req) {
        req.send();
        req.onreadystatechange = (event) => {
            this.processRequest(event);
        };
    }

    processRequest(event) {
        if (event.target.readyState == 4
            && event.target.status == 200) {
            let res = JSON.parse(event.target.response);
            if (!res.length) {
                this.response = [res];
            } else {
                this.response = res;
            }
            this.complete = true;
        }
    }

    getResponse() {
        return this.response;
    }

    isComplete() {
        return this.complete;
    }
}