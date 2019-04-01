
/**
 * Author: Michael Lowenstein
 * Date: April 1, 2019
 * 
 * main.js:
 *  -   Entry point to the application;
 *  -   Handles app initialization and calls
 *      module classes and/or utility functions
 *      as needed;
 */

var store;

(function() {
    StartUp();
})();

function StartUp()  {
    store = new Store();
    updateCalcs();
    setActiveProduct(ENV.pvinit.product);
}

function ReStartUp()  {
    store = new Store();
    updateCalcs();
    setActiveProduct(ENV.wvinit.product);
}

function checkForReboot() {
    if (store.getPath() === 'networks') {
        ReStartUp();
    } else if (store.getPath() === 'wells') {
        StartUp();
    }
}

function checkForRebootFromJson(app, builder) {
    var temppath = store.getPath();
    var tempid = store.getEntityId();
    if (temppath === 'networks') {
        StartUp();
        store.setEntityId(tempid);
    } else if (temppath === 'wells') {
        ReStartUp();
        store.setEntityId(tempid);
    } else {
        app.state.setMode('table');
        rerenderAsTable(app, builder);
    }
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
    store.setEntityId(null);
    rebootDomElements(product);
}

function rebootDomElements(product) {
    RebootDialogIfNeeded(product);
    CheckProductView(product);
    RemoveContextHeader();
    rebootScriptElements(product);
}

function rebootScriptElements(product) {
    store.setProduct(product);
    checkForReboot()
    if (product === 'wellview') requestFor(ENV.wvinit.path);
    else requestFor(ENV.pvinit.path);
}

function requestFor(path) {
    checkIfCallIsPermitted(path);
}

function checkIfCallIsPermitted(path) {
    if (
        (path !== ('user' || 'networks' || 'wells'))
        && store.getEntityId() === null
    ) {
        alert('You must select a parent Network/Well to make this request.');
    } else {
        forwardRequestFor(path);
    }
}

function forwardRequestFor(path) {
    let app = initialize();
    let product = store.getProduct();
    app.setupRequest(product, path);
    waitForResponse(app);
}

function waitForResponse(app) {
    setTimeout(() => {
        if (app.api.complete) {
            if (app.state.wellsPath() || app.state.networksPath()) {
                store.setEntityNeeded(app.api.complete);
                var res = app.api.getResponse();
                var prod = store.getProduct();
                checkIfParentCall(prod, res);
                store.setExtras(res);
            } else {
                confirmResponse(app);
            }
        } else {
            waitForResponse(app);
        }
    }, 500)
}

function confirmResponse(app) {
    app.setDataSet(app.api.response);
    if (app.state.userPath()) {
        setProductKey(app);
    } else {
        store.setEntityNeeded(false);
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

function setEntityNeeded(needed) {
    store.setEntityNeeded(needed);
}

function closeDialog(name) {
    store.setDialogOpen(false);
    CloseDialog(name);
}

function submitDialog(name) {
    var hiddenEID = document.getElementById('EID');
    store.setRequestAgain(false);
    store.setDialogOpen(false);
    var eid = hiddenEID.value;
    store.setEntityId(eid);
    CloseDialog(name);
}

function findProductHeaderValue(prod, orgs) {
    if (organizationExists(orgs)) {
        orgs.forEach(org => {
            let products = org['applications'];
            products.forEach(product => {
                var keys = Object.keys(product);
                keys.forEach(key => {
                    if (product[key] === prod) {
                        store.setProductKey(product['headervalue']);
                    }
                });
            });
        });   
    }
}

function prepareResults(app) {
    let dbset = app.getDataSet();
    renderResponse(app, dbset);
}

function renderResponse(app, dbset) {
    app.clear();
    var prod = store.getProduct();
    checkIfParentCall(prod, dbset);
    var builder = new Builder(app.viewer, dbset);
    renderTable(app, builder, prod);
    store.setBackup(app, builder);
}

function checkIfParentCall(prod, data) {
    if (store.needEntityId()) {
        if (!store.dialogIsOpen()) {
            LaunchEntitySelectionDialog(prod, data);
            store.setDialogOpen(true);
        }
    }
}

function switchFormat() {
    let app = store.getApp();
    let builder = store.getBuilder();
    if (app.state.tableMode()) {
        app.state.setMode('json');
        rerenderAsJson(app, builder);
    } else {
        checkForRebootFromJson(app, builder);
    }
}

function rerenderAsJson(app, builder) {
    app.clear();
    app.viewer = builder.buildJson();
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
        RemoveContextHeader();
        app.viewer = builder.buildHeaders();
        store.setRequestAgain(app.state.userPath());
        app.viewer = AppendTableTitleRow(app.viewer);
        HighlightProductRow(prod);
    } else {
        var eid = store.getEntityId();
        var extras = store.getExtras();
        app.viewer = builder.buildTable();
        if (!store.contextIsShown()) {
            AppendTableContextHeader(prod, eid, extras);
            store.setContextShown(true);
        }
    }
    checkIfRequestingAgain(app, prod);
    if (store.resultIsNull()) {
        alert('The request returned a null response. Try another request, or switch you Network/Well selection.');
    }
}

function checkIfRequestingAgain(app, prod) {
    if (store.getRequestAgain()) {
        app.api = new Api();
        if (prod === 'wellview') {
            app.setupRequest(prod, 'wells');
        } else if (prod === 'prodview') {
            app.setupRequest(prod, 'networks');
        }
        waitForResponse(app);
    }
}