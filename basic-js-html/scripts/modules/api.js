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

    fetchEntityId() {
        let entityid = store.getEntityId();
        return entityid;
    }

    setEndpoint(forUser, forChild, product, target) {
        if (!forUser) {
            if (store.includeCalcs()) {
                let suffix = `?${ENV.params}=true`;
                if (forChild) {
                    let eid = this.fetchEntityId();
                    this.endpoint = `${ENV.routes.base}/${ENV.ou}/${product}/${ENV.routes[product][target]}/${eid}${suffix}`;
                } else {
                    this.endpoint = `${ENV.routes.base}/${ENV.ou}/${product}/${ENV.routes[product][target]}${suffix}`;
                }
            } else {
                if (forChild) {
                    this.endpoint = `${ENV.routes.base}/${ENV.ou}/${product}/${ENV.routes[product][target]}/${eid}`;
                } else {
                    this.endpoint = `${ENV.routes.base}/${ENV.ou}/${product}/${ENV.routes[product][target]}`;
                }
            }
        } else {
            this.endpoint = `${ENV.routes.base}/${ENV.routes.user}`;
        }
    }

    getEndpoint() {
        return this.endpoint;
    }

    createRequest(forUser, forChild, path) {
        this.request = this.initRequest(forUser, forChild, path);
    }

    initRequest(forUser, forChild, path) {
        var product = this.getProduct();
        var custom = store.getProductKey();
        this.setEndpoint(forUser, forChild, product, path);
        this.request = this.configureRequest(product, custom);
        this.sendRequest(this.request);
    }

    configureRequest(product, custom) {
        var req = new XMLHttpRequest();
        req.open('GET', this.endpoint, true);
        req.setRequestHeader('Ocp-Apim-Subscription-Key', `${ENV.subscriptkey}`)
        req.setRequestHeader('Authorization', `Bearer ${ENV.token}`);
        req.setRequestHeader(`${product}`, `${custom}`);
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
            this.flagIfNullResult(res);
            if (!res.length) {
                this.response = [res];
            } else {
                this.response = res;
            }
            this.complete = true;
        }
    }

    flagIfNullResult(res) {
        if (res.length === 0) store.setNullResult(true);
        else store.setNullResult(false); 
    }

    getResponse() {
        return this.response;
    }

    isComplete() {
        return this.complete;
    }
}