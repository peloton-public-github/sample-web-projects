'use strict';

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

    setToBeProduct(key, vals) {
        this.prods.push(Object.assign({'product': key}, vals));
    }

    setModifiedJson(orgs) {
        this.mod = Object.assign(this.user, {'organizations': orgs}); 
    }

    getUser() {
        return this.user;
    }

    getProducts() {
        return this.prods;
    }

    getOrganizations() {
        return this.orgs;
    }

    getModifiedJson() {
        return this.mod;
    }

    fixUserJson() {
        var temp = this.mod;
        temp.organizations.forEach(org => {
            org.products.forEach(prod => {
                prod = this.fixProduct(prod);
            });
        });
        return temp;
    }

    fixProduct(prod) {
        var name = prod['product'];
        var header = prod['headervalue'];
        var profiles = prod['appprofiles'];
        delete prod['appprofiles'];
        delete prod['headervalue'];
        delete prod['product'];
        prod.name = name;
        prod.header_value = header;
        prod.app_profiles = profiles;
        return prod;
    }

    createUserHeader() {
        var header = null;
        var raw = this.set[0];
        var keys = Object.keys(raw);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] == 'username') {
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
            if (keys[i] == 'organizations') {
                header = this.formatHeader(raw[keys[i]]);
            }
        }
        return header;
    }

    formatHeader(orgs) {
        var keys = [];
        var orgset = [];
        var products = [];
        var header = null;
        var organization = {};
        orgs.forEach(org => {
            products = [];
            keys = Object.keys(org);
            keys.forEach(key => {
                if (key !== 'organization') {
                    this.setToBeProduct(key, org[key]);
                } else {
                    organization['name'] = org[key];
                    header = GenerateHeaderFor(org, key);
                }
            });
            products = this.getProducts();
            orgset.push(Object.assign(organization, {'products': products}));
        });
        this.setModifiedJson(orgset);
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

    getAltData() {
        return this.jsonBuilder.mod;
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

    getUserJson() {
        var modified = this.jsonBuilder.fixUserJson();
        this.container = this.buildUserJson(modified);
        return this.container;
    }

    buildUserJson(modified) {
        this.container = BuildUserJson(this.container, this.dataset, modified);
    }

    buildJson() {
        this.container = BuildJson(this.container, this.dataset);
    }
}