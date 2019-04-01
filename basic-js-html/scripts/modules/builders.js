'use strict';

/**
 * Author: Michael Lowenstein
 * Date: April 1, 2019
 * 
 * builders.js:
 *  -   Class responsible for the manipulation
 *      of data retrieved from API-requests;
 *  -   Depending on the nature of the response
 *      data, certain manipulations are necessary
 *      to display clearly in a table;
 *  -   Builder class handles the data and constructs
 *      the tables for each API-request (default);
 *  -   Json class handles the manipulation and/or
 *      construction of the data into legible json. 
 */

class Json {
    constructor(data) {
        this.set = data;
        this.prods = [];
        this.mod = null;
        this.user = null;
    }

    setUser(key, val) {
        this.user = {};
        this.user[key] = val;
    }

    setProducts(products) {
        this.prods = products;
    }

    getUser() {
        return this.user;
    }

    getProducts() {
        return this.prods;
    }

    createUserHeader() {
        var header = null;
        var raw = this.set[0];
        var keys = Object.keys(raw);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'username') {
                header = GenerateHeaderFor(raw, keys[i]);
                this.setUser(keys[i], raw[keys[i]]);
            }
        }
        return header;
    }

    createOrgHeader() {
        this.orgs = [];
        this.prods = [];
        var header = null;
        var raw = this.set[0];
        var keys = Object.keys(raw);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === 'organizations') {
                header = this.formatHeader(raw[keys[i]]);
            }
        }
        return header;
    }

    formatHeader(orgs) {
        var header = null;
        var swapkeyforheader = 'Organization';
        orgs.forEach(org => {
            header = GenerateSubHeaderFor(swapkeyforheader, org['name']);
            this.setProducts(org['applications']);
        });
        return header;
    }
}

class Builder {
    constructor(container, data) {
        this.dataset = data;
        this.container = container;
        this.jsonBuilder = new Json(data);
    }

    setUser() {
        this.user = this.jsonBuilder.getUser();
    }

    getUser() {
        return this.user;
    }

    setOrganizations() {
        this.orgs = this.jsonBuilder.getOrganizations();
    }

    getOrganizations() {
        return this.orgs;
    }

    setProducts() {
        this.prods = this.jsonBuilder.getProducts();
    }

    getProducts() {
        return this.jsonBuilder.prods;
    }

    getContainer() {
        if (!this.container) {
            this.container = document.getElementById('showData');
        }
    }

    buildHeaders() {
        this.getContainer();
        var userHeader = this.jsonBuilder.createUserHeader();
        var orgHeader = this.jsonBuilder.createOrgHeader();
        this.container.appendChild(userHeader);
        this.container.appendChild(orgHeader);
        this.container = AttachTable(this.container, this.jsonBuilder.prods)
        return this.container;
    }

    buildTable() {
        this.container = BuildTable(this.container, this.dataset);
        return this.container;
    }

    buildJson() {
        this.container = BuildJson(this.container, this.dataset);
    }
}