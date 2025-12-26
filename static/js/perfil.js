function renderProfiles(profile, conf) {

  const container = document.querySelector('.container');
  container.innerHTML = `
    <img src="${profile.ci}/${profile.ci}.jpg" alt="" width="200">
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
    </div>`
}
window.onload = function () {
  const language = new URLSearchParams(window.location.search).get("lang");
  if (!language) {
    let url = window.location.href;
    url += '&lang=ES'
    window.location.href = url;
  }
  const configlan = document.createElement('script');
  configlan.src = `/conf/config${language}.json`;
  configlan.onload = function () {
    const ciProfile = new URLSearchParams(window.location.search).get("ci");
    const profile = document.createElement('script');
    profile.src = `/${ciProfile}/perfil.json`;
    profile.onload = function () {
      renderProfiles(perfil, config);
    }
    document.body.appendChild(profile);
  }
  document.body.appendChild(configlan);


}

