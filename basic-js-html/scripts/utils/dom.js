'use strict';

function CheckToggleValue() {
    var toggle = document.getElementById('incalcs');
    if (toggle.getAttribute('checked')) {
        toggle.setAttribute('checked', false);
    } else {
        toggle.setAttribute('checked', true);
    }
}

function CheckProductView() {
    var product = store.getProduct();
    var prodviewLabel = document.getElementById('pvlink');
    var wellviewLabel = document.getElementById('wvlink');
    var prodviewLinks = document.getElementById('pvreqs');
    var wellviewLinks = document.getElementById('wvreqs');
    if (product === 'wellview') {
        wellviewLinks.removeAttribute('class', 'shutdown');
        prodviewLabel.removeAttribute('class', 'turnedon');
        prodviewLinks.setAttribute('class', 'shutdown');
        wellviewLabel.setAttribute('class', 'turnedon');
    } else if (product === 'prodview') {
        prodviewLinks.removeAttribute('class', 'shutdown');
        wellviewLabel.removeAttribute('class', 'turnedon');
        wellviewLinks.setAttribute('class', 'shutdown');
        prodviewLabel.setAttribute('class', 'turnedon');
    }
}

function HighlightProductRow(product) {
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].hasAttribute('justactivated')) {
            rows[i].removeAttribute('justactivated');
        }
        if (rows[i].innerText.includes(product)) {
            rows[i].setAttribute('class', 'justactivated');
        }
    }
}

function LaunchEntitySelectionDialog(product, dataset) {
    var wells = [];
    var networks = [];
    var wellsList = document.getElementById('mywells');
    var networksList = document.getElementById('mynetworks');
    var wellviewModal = document.getElementById('wellsModal');
    var prodviewModal = document.getElementById('networksModal');
    if (product === 'prodview') {
        var prompt = 'Select Network...';
        dataset.forEach(network => {
            networks.push({
                'name': network.name,
                'id': network.idflownet
            });
        });
        var selector = CreateDropdownSelector(prompt, networks);
        networksList.appendChild(selector);
        prodviewModal.show();
    } else if (product === 'wellview') {
        var prompt = 'Select Well...';
        dataset.forEach(well => {
            wells.push({
                'name': well.wellname,
                'id': well.idwell
            });
        });
        var selector = CreateDropdownSelector(prompt, wells);
        wellsList.appendChild(selector);
        wellviewModal.show();
    }
}

function CloseDialog(name) {
    if (name === 'network') {
        var modal = document.getElementById('networksModal');
        var content = document.getElementById('mynetworks');
        content.innerHTML = '';
        modal.close();
    } else {
        var modal = document.getElementById('wellsModal');
        var content = document.getElementById('mywells');
        content.innerHTML = '';
        modal.close();
    }
}

function CreateDropdownSelector(prompt, array) {
    var hiddenEID = document.getElementById('EID')
    var select = document.createElement('select');
    var opt = document.createElement('option');
    opt.setAttribute('value', '');
    opt.innerHTML = prompt;
    opt.selected = true;
    opt.disabled = true;
    select.appendChild(opt);
    array.forEach(item => {
        var opt = document.createElement('option');
        opt.setAttribute('value', item.id);
        opt.innerHTML = item.name;
        select.appendChild(opt);
    });
    select.addEventListener('change', (event) => {
        select.value = event.target.value;
        hiddenEID.value = select.value;
    });
    return select;
}

function BuildTable(container, dataset) {
    var table = CreateTable(dataset);
    container.appendChild(table);
    return container;
}

function CreateTable(dataset) {
    var cols = [];
    for (var i = 0; i < dataset.length; i++) {
        for (var key in dataset[i]) {
            if (cols.indexOf(key) == -1) {
                cols.push(key);
            }
        }
    }
    var table = document.createElement('table');
    var tr = table.insertRow(-1);
    for (var i = 0; i < cols.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = cols[i];
        tr.appendChild(th);
    }
    for (var i = 0; i < dataset.length; i++) {
        var tr = table.insertRow(-1);
        for (var j = 0; j < cols.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = dataset[i][cols[j]];
        }
    }
    return table;
}

function AttachTable(container, data) {
    var table = CreateTable(data);
    container.appendChild(table);
    return container;
}

function GenerateHeaderFor(set, key) {
    var headerLabel = key.charAt(0).toUpperCase().concat(key.substring(1));
    var headerValue = `${set[key]}`;
    var header = document.createElement('h3');
    header.innerHTML = `${headerLabel}: ${headerValue}`;
    return header;
}

function CreateModifiedHeader() {
    var header = document.createElement('h4');
    header.innerHTML = `Modified JSON-Formatted Data`;
    return header;
}

function CreateDefaultHeader() {
    var header = document.createElement('h4');
    header.innerHTML = `Raw JSON-Formatted Data`;
    return header;
}

function BuildUserJson(container, dataset, modified) {
    var defView = CreateJsonBody(dataset);
    var modView = CreateJsonBody(modified);
    var modHeader = CreateModifiedHeader();
    var defHeader = CreateDefaultHeader();
    container.appendChild(modHeader);
    container.appendChild(modView);
    container.appendChild(defHeader);
    container.appendChild(defView);
    return container;
}

function BuildJson(container, data) {
    var jsonview = CreateJsonBody(data);
    var jsonHeader = CreateDefaultHeader();
    container.appendChild(jsonHeader);
    container.appendChild(jsonview);
    return container;
}

function CreateJsonBody(data) {
    var jsonview = document.createElement('pre');
    jsonview.setAttribute('id', 'json');
    jsonview.innerHTML = JSON.stringify(data, undefined, 2);
    return jsonview;
}