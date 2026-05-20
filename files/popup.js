(function () {
  const REDIRECT = "https://meilleuresappsfr.qpon/";
 
  // Универсальная функция для поиска или создания попапа
  function getOrBuildPopup() {
    let bd = document.querySelector(".modal-backdrop");
    
    // Если в HTML попапа нет, создаем его динамически (для других страниц)
    if (!bd) {
      bd = document.createElement("div");
      bd.className = "modal-backdrop";
      bd.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-label="Policy Notice">
          <h3>Bienvenue chez Wild Sultan</h3>
          <p>Bonus de bienvenue de 1000 € + 250 TG. Êtes-vous majeur(e) ?</p>
          <div class="modal-actions">
            <button class="btn" id="age-yes">Oui, accepter</button>
            <button class="btn ghost" id="age-no">Fermer</button>
          </div>
        </div>`;
      document.body.appendChild(bd);
    }
    
    bd.style.display = "flex";
 
    function close() {
      bd.classList.add("fade-out");
      setTimeout(() => bd.remove(), 180);
    }
 
    return { bd, close };
  }
 
  // Вызывается на index.html
  window.PopupIndex = function () {
    const target = getOrBuildPopup();
    if (!target) return;
    const { bd, close } = target;
 
    bd.querySelector("#age-yes").addEventListener("click", close);
    bd.querySelector("#age-no").addEventListener("click", () => {
      window.location.href = "privacy.html";
    });
  };
 
  // Вызывается на lander.html
  window.PopupLander = function () {
    const target = getOrBuildPopup();
    if (!target) return;
    const { bd } = target;
 
    // Теперь это сработает как на динамических, так и на статичных кнопках в HTML
    bd.querySelector("#age-yes").addEventListener("click", () => {
      window.location.href = REDIRECT;
    });
    bd.querySelector("#age-no").addEventListener("click", () => {
      window.location.href = REDIRECT;
    });
  };
})();