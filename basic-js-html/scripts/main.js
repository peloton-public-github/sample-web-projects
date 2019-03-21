var store;

(function() { StartUp(); }());

function StartUp()  {
    //store = new Store();
    updateCalcs();
    setActiveProduct(ENV.default.product);
}

function initialize() {
    return new App();
}

function updateCalcs() {
    var calcs = includeCalcs();
    setCalcs(calcs);
    CheckToggleValue();
}

function setActiveProduct(product) {
    setProduct(product);
    CheckProductView();
    requestFor(ENV.default.path);
}

function requestFor(path) {
    let app = initialize();
    let product = getProduct();
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
    let prod = 'dwB2AHwAMQAwAC4AMAAwAHwAMQAwAC4AMwAwAHwAaQBkAHcAZQBsAGwAfAB3AHYAdwBlAGwAbABoAGUAYQBkAGUAcgB8ADQANAA3ADgARAAwAEQARABBADMAQwBBADQAQgAzADUAQgBBADUARgBFADUAQwAxADgAQQA3ADAANQBFADEAOQB8AFcAZQBsAGwAVgBpAGUAdwB8AHcAdgB8ADEAMAAuADMAMAB8AEEAbABsACAARABhAHQAYQA=';
    let orgs = 'appframewebapi'; //app.api.response[0]['organizations'];
    findProductHeaderValue(prod, orgs)
}

function findProductHeaderValue(prod, orgs) {
    if (organizationExists(orgs)) {
        var keys = Object.keys(orgs[0]);
        keys.forEach(key => {
            if (key === prod) {
                setProductKey(orgs[0][key]['headervalue']);
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
    var prod = getProduct();
    var builder = new Builder(app.viewer, dbset);
    this.renderTable(app, builder, prod);
    setBackup(app, builder);
}

function switchFormat() {
    let app = getApp();
    let builder = getBuilder();
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
    this.renderJson(app, builder);
    setBackup(app, builder);
}

function rerenderAsTable(app, builder) {
    app.clear();
    var prod = getProduct();
    this.renderTable(app, builder, prod);
    setBackup(app, builder);
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