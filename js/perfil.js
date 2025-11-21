function renderProfiles(profile) {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <img src="${profile.ci}/${profile.ci}.jpg" id="grande" alt="" width="200">
    <div class="textContainer">
      <h1>${profile.nombre}</h1>
      <p class="description">
      ${profile.descripcion}
      </p>
      <div class="info">
        <p>Mi color favorito es:</p>
        <p>${profile.color}</p>
      </div>
      <div class="info">
        <p>Mi libro favorito es:</p>
        <p>${profile.libro.map(e => ` ${e}`)}</p>
      </div>
      <div class="info">
        <p>Mi estilo de música preferida:</p>
        <p>${profile.musica.map(e => ` ${e}`)}</p>
      </div>
      <div class="info">
        <p>Video juego favorito:</p>
        <p>${profile.video_juego.map(e => ` ${e}`)}</p>
      </div>
      <div class="info lng">
        <p>Lenguajes aprendidos:</p>
        <p>${profile.lenguajes.map(e => ` ${e}`)}</p>
      </div>
      <div class="contact">
        <p>SI necesitan comunicarse conmigo me pueden escribir a: </p>
        <a href="mailto:${profile.email}">${profile.email}</a>
      </div>
    </div>`


}

window.onload = function () {

  const ciProfile = new URLSearchParams(window.location.search).get("ci");

  const profile = document.createElement('script');
  profile.src = `/${ciProfile}/perfil.json`;
  profile.onload = function () {
    renderProfiles(perfil);

  }
  document.body.appendChild(profile);

  const language = new URLSearchParams(window.location.search).get("lang");
  if (!language) {
    let url = window.location.href;
    url += '&lang=ES'
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
    mid.innerHTML = `${config.saludo}, ${perfil.nombre}`;

    const searchBar = document.querySelector('li form');
    searchBar.querySelector('.buscar').setAttribute('placeholder', `${config.nombre}...`);
    searchBar.querySelector('button').innerHTML = `${config.buscar}`;

  }
  document.body.appendChild(configlan);



}