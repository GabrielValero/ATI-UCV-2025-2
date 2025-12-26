window.onload = async function () {
    const { data, config } = await fetchProfilesAndLanguage()
    renderHeader(data, config);
    renderProfiles(data, config);

    const searchBar = document.querySelector('li form');
    const searchButton = searchBar.querySelector('button');

    searchButton.onclick = function (e) {
        e.preventDefault();
        const query = searchBar.querySelector('.buscar').value.toLowerCase();

        if (query.length === 0) {
            renderProfiles(data, config);
            return;
        }

        const filteredProfiles = data.filter(profile => profile.nombre.toLowerCase().includes(query));
        if (filteredProfiles.length > 0) {
            renderProfiles(filteredProfiles, config);
        } else {
            emptyResult(query, config)
        }
    }
    document.getElementById("profiles").addEventListener("click", (e) => {
        const item = e.target.closest(".perfilElement");
        if (!item) return;

        const ci = item.dataset.ci
        window.location.href = "/ATI/perfil/" + ci + "?lang=" + new URLSearchParams(window.location.search).get("lang");
        renderProfileDetail(ci, config)
    });
    document.getElementById("logo").addEventListener("click", () => {
        window.location.href = "/ATI/index.py"
    })
}

async function renderProfileDetail(ci, conf) {
    const profile = await fetch(`/api/perfil?ci=${ci}`).then(res => res.json());
    console.log(profile);

    const container = document.querySelector('#profiles');
    container.classList.add("perfil");
    container.innerHTML = `
    <div class="container">
        <img src="/static/${profile.ci}/${profile.ci}.jpg" alt="" width="200">
        <div class="textContainer">
        <h1>${profile.nombre}</h1>
        <p class="description">
        ${profile.descripcion}
        </p>
        <div class="info">
            <p>${conf.color}</p>
            <p>${profile.color}</p>
        </div>
        <div class="info">
            <p>${conf.libro}</p>
            <p>${profile.libro.map(e => ` ${e}`)}</p>
        </div>
        <div class="info">
            <p>${conf.musica}</p>
            <p>${profile.musica.map(e => ` ${e}`)}</p>
        </div>
        <div class="info">
            <p>${conf.video_juego}</p>
            <p>${profile.video_juego.map(e => ` ${e}`)}</p>
        </div>
        <div class="info lng">
            <p>${conf.lenguajes}</p>
            <p>${profile.lenguajes.map(e => ` ${e}`)}</p>
        </div>
        <div class="contact">
            <p>${conf.email} <a href="mailto:${profile.email}">${profile.email}</a></p>
            
        </div>
        </div>
    </div>
    `
}

function emptyResult(query, config) {
    const gallery = document.querySelector('section ul');

    gallery.innerHTML = `<p class="vacio">${config.vacio}"${query}"</p>`
}
function renderHeader(profile, config) {
    const logo = document.querySelector('#nav1');
    logo.innerHTML = `<h1 id="logo">${config.sitio[0]} <span>${config.sitio[1]}</span> ${config.sitio[2]}</h1>`;
    const footer = document.querySelector('footer p');
    footer.innerHTML = `${config.copyRight}`;

    const mid = document.querySelector('#nav2 p');
    console.log(profile);

    mid.innerHTML = `${config.saludo}, ${profile[0].nombre}`;

    const searchBar = document.querySelector('li form');
    searchBar.querySelector('.buscar').setAttribute('placeholder', `${config.nombre}...`);
    searchBar.querySelector('button').innerHTML = `${config.buscar}`;
}
function renderProfiles(profiles) {
    const gallery = document.querySelector('#profiles');
    gallery.classList.remove("perfil");
    gallery.innerHTML = `<ul>${profiles.map(profile => {

        return renderItem(profile);
    }).join('')}</ul>`;
}

function renderItem(profile) {
    "use-strict";
    return `
    <li class="perfilElement"
        data-ci="${profile.ci}"
    >
        <img src="/static/${profile.imagen}" alt="mi imágen">
        <p class="textPerfil">${profile.nombre}</p>
    </li>
    `
}

async function fetchProfilesAndLanguage() {
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

    const response = await fetch(`/api/data?lang=${language}`);
    const data = await response.json();
    return data
}
