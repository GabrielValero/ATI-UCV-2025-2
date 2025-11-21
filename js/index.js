function emptyResult(query){
    const gallery = document.querySelector('section ul');
    
    gallery.innerHTML = `<p class="vacio">${config.vacio}"${query}"</p>`
}
function renderProfiles(profiles, language) {
    const gallery = document.querySelector('section ul');
    gallery.innerHTML = `${profiles.map(profile => renderItem(profile, language)).join('')}`;
}

function renderItem(profile, lang) {
    return `
    <li>
        <a href="perfil.html?ci=${profile.ci}&lang=${lang}">
            <img class="grande" src="${profile.imagen}" alt="mi imágen">
            <p>${profile.nombre}</p>
        </a>
    </li>`
}

window.onload = function () {
    const language = new URLSearchParams(window.location.search).get("lang");
    if (!language) {
        let url = window.location.href;
        if (url.indexOf('?') > -1) {
            url += 'lang=ES'
        } else {
            url += '?lang=ES'
        }
        window.location.href = url;
    }

    const configlan = document.createElement('script');
    configlan.src = `/conf/config${language}.json`;
    configlan.onload = function () {

        const logo = document.querySelector('#nav1');
        logo.innerHTML = `<h1>${config.sitio[0]} <span>${config.sitio[1]}</span> ${config.sitio[2]}</h1>`;
        const footer = document.querySelector('footer p');
        footer.innerHTML = `${config.copyRight}`;

        const mid = document.querySelector('#nav2 p');
        mid.innerHTML = `${config.saludo}, ${perfiles[0].nombre}`;

        const searchBar = document.querySelector('li form');
        searchBar.querySelector('.buscar').setAttribute('placeholder', `${config.nombre}...`);
        searchBar.querySelector('button').innerHTML = `${config.buscar}`;

    }
    document.body.appendChild(configlan);
    renderProfiles(perfiles, language);

    const searchBar = document.querySelector('li form');
    const searchButton = searchBar.querySelector('button');

    searchButton.onclick = function (e) {
        const query = searchBar.querySelector('.buscar').value.toLowerCase();
        const filteredProfiles = perfiles.filter(profile => profile.nombre.toLowerCase().includes(query));
        if(filteredProfiles.length > 0){
            renderProfiles(filteredProfiles);
        }else{
            emptyResult(query)
        }
        e.preventDefault();
    }
}