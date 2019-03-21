'use-strict';

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
        var item = {'product': key};
        var product = {...item, ...vals};
        this.prods.push(product);
    }

    setModifiedJson(orgs) {
        this.mod = {
            ...this.user,
            'organizations': [
                ...orgs
            ]
        };
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
            orgset.push({
                ...organization,
                'products': [
                    ...products
                ]
            });
        });
        this.setModifiedJson(orgset);
        return header;
    }
}