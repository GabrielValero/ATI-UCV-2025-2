function renderProfiles(profiles) {
    const gallery = document.querySelector('section ul');
    gallery.innerHTML = `${profiles.map(profile => renderItem(profile)).join('')}`;
    
    // document.body.appendChild(gallery);
}

function renderItem(profile) {
    return`<li>
            <img class="grande" src="${profile.imagen}" alt="mi imágen">
            <p>${profile.nombre}</p>
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
        footer.innerHTML = `${config.copyRight} asdf`;

        const mid = document.querySelector('#nav2 p');
        mid.innerHTML = `${config.saludo}, ${perfiles[0].nombre}`;

        const searchBar = document.querySelector('li form');
        searchBar.querySelector('.buscar').setAttribute('placeholder', `${config.nombre}...`);
        searchBar.querySelector('button').innerHTML = `${config.buscar}`;

    }
    document.body.appendChild(configlan);
    renderProfiles(perfiles);

}