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
        <p>${profile.libro.map(e=>` ${e}`)}</p>
      </div>
      <div class="info">
        <p>Mi estilo de música preferida:</p>
        <p>${profile.musica.map(e=>` ${e}`)}</p>
      </div>
      <div class="info">
        <p>Video juego favorito:</p>
        <p>${profile.video_juego.map(e=>` ${e}`)}</p>
      </div>
      <div class="info lng">
        <p>Lenguajes aprendidos:</p>
        <p>${profile.lenguajes.map(e=>` ${e}`)}</p>
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
}