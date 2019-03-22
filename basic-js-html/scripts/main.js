// var store;
var store;

(function() {
    StartUp();
})();

function StartUp()  {
    store = new Store();
    updateCalcs();
    setActiveProduct(ENV.default.product);
}

function initialize() {
    return new App();
}

function updateCalcs() {
    var calcs = store.includeCalcs();
    store.setCalcs(calcs);
    CheckToggleValue();
}

function setActiveProduct(product) {
    store.setProduct(product);
    CheckProductView(product);
    requestFor(ENV.default.path);
}

function requestFor(path) {
    let app = initialize();
    let product = store.getProduct();
    app.setupRequest(product, path);
    waitForResponse(app);
}

function waitForResponse(app) {
    setTimeout(() => {
        if (app.api.complete) {
            confirmResponse(app);
        } else {
            waitForResponse(app);
        }
    }, 500)
}

function confirmResponse(app) {
    app.setDataSet(app.api.response);
    if (app.state.userPath()) {
        setProductKey(app);
    }
    prepareResults(app);
}

function organizationExists(orgs) {
    if (orgs) { return orgs.length > 0; }
    return false;
}

function setProductKey(app) {
    let prod = store.getProduct();
    let orgs = app.api.response[0]['organizations'];
    findProductHeaderValue(prod, orgs)
}

function findProductHeaderValue(prod, orgs) {
    if (organizationExists(orgs)) {
        var keys = Object.keys(orgs[0]);
        keys.forEach(key => {
            if (key === prod) {
                store.setProductKey(orgs[0][key]['headervalue']);
            }
        })       
    }
}

function prepareResults(app) {
    let dbset = app.getDataSet();
    renderResponse(app, dbset);
}

function renderResponse(app, dbset) {
    app.clear();
    var prod = store.getProduct();
    var builder = new Builder(app.viewer, dbset);
    renderTable(app, builder, prod);
    store.setBackup(app, builder);
}

function switchFormat() {
    let app = store.getApp();
    let builder = store.getBuilder();
    if (app.state.tableMode()) {
        app.state.setMode('json');
        rerenderAsJson(app, builder);
    } else {
        app.state.setMode('table');
        rerenderAsTable(app, builder);
    }
}

function rerenderAsJson(app, builder) {
    app.clear();
    renderJson(app, builder);
    store.setBackup(app, builder);
}

function rerenderAsTable(app, builder) {
    app.clear();
    var prod = store.getProduct();
    renderTable(app, builder, prod);
    store.setBackup(app, builder);
}

function renderTable(app, builder, prod) {
    if (app.state.userPath()) {
        app.viewer = builder.buildHeaders();
        HighlightProductRow(prod);
    } else {
        app.viewer = builder.buildTable();
    }
}

function renderJson(app, builder) {
    if (app.state.userPath()) {
        app.viewer = builder.getUserJson();
    } else {
        app.viewer = builder.buildJson();
    }
}