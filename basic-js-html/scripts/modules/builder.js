'use strict';

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