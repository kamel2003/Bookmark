
var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var subBtn = document.getElementById('submitBtn');

var siteContainer = [];

if (localStorage.getItem('Sits') == null) {
    siteContainer = [];
} else {
    siteContainer = JSON.parse(localStorage.getItem('Sits'));
    displayWebSite();
}

function addWebSite() {
    var webSite = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value
    }
    siteContainer.push(webSite);
    localStorage.setItem('Sits', JSON.stringify(siteContainer));
    displayWebSite();
    clearForm();
};

function displayWebSite() {
    var cartona = '';
    for (var i = 0; i < siteContainer.length; i++) {

        cartona += `<tr>
        <th class="text-capitalize" id="index">${i + 1}</th>
        <th class="text-capitalize" id="webName">${siteContainer[i].siteName}</th>
        <th class="text-capitalize">
            <button onclick="visitWebSite(${i})" class="btn btn-visit" id="btn-visit">
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
        </th>
        <th class="text-capitalize">
            <button onclick="deleteWebSite(${i})" class="btn btn-delete pe-2" id="btn-delete">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
        </th>
    </tr>`
    }
    document.getElementById('tableContent').innerHTML = cartona;
};

function clearForm() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
};

function deleteWebSite(index) {
    siteContainer.splice(index, 1);
    localStorage.setItem('Sits', JSON.stringify(siteContainer));
    displayWebSite();
};

function visitWebSite(index) {
    var url = siteContainer[index].siteUrl;
    window.open(url, '_blank');
};

function validationInputs(element) {
    var regex = {
        siteName: /^[A-Z][a-z0-9 \s {A-Z}?]{3,20}$/,
        siteUrl: /^(http|https):\/\/[a-zA-Z0-9\-\.]+/,
    };

    if (regex[element.id].test(element.value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.replace('d-block','d-none');
    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.replace('d-none','d-block');
    }
};
