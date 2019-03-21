
    var incalcs = false;
    var product = null;
    var prodkey = null;
    var app = null;
    var builder = null;
    
    function setApp(app) {
        this.app = app;
    }

    function getApp() {
        return this.app;
    }

    function setProduct(product) {
        this.product = product;
    }

    function getProduct() {
        return this.product;
    }

    function setBuilder(builder) {
        this.builder = builder;
    }

    function getBuilder() {
        return this.builder;
    }

    function setBackup(app, builder) {
        this.builder = builder;
        this.app = app;
    }

    function setProductKey(key) {
        this.prodkey = key;
    }

    function getProductKey() {
        return this.prodkey;
    }

    function includeCalcs() {
        return this.incalcs;
    }

    function setCalcs(calcs) {
        if (calcs) { this.incalcs = false; }
        else { this.incalcs = true; }
    }