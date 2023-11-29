document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://reqres.in/api/users?delay=3";
    const userTable = document.getElementById("userTable");
  
    function fetchData() {
      // Intentar obtener datos del almacenamiento local
      const storedData = JSON.parse(localStorage.getItem("userData"));
  
      // Verificar si los datos almacenados están dentro del tiempo límite
      if (storedData && withinTimeLimit(storedData.timestamp)) {
        displayData(storedData.data);
      } else {
        // Si ha pasado más de 1 minuto, realizar una nueva solicitud
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            // Almacenar los nuevos datos en local storage
            const timestamp = new Date().getTime();
            localStorage.setItem("userData", JSON.stringify({ data, timestamp }));
            
            displayData(data);
          })
          .catch(error => console.error("Error al recuperar datos:", error));
      }
    }
  
    function displayData(data) {
      // Construir la tabla HTML con los datos
      const tableHtml = `
        <table class="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            ${data.data.map(user => `
              <tr>
                <td><img src="${user.avatar}" class="rounded-circle" alt="Avatar"></td>
                <td>${user.first_name} ${user.last_name}</td>
                <td>${user.email}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
  
      // Actualizar el DOM con la tabla generada
      userTable.innerHTML = tableHtml;
    }
  
    function withinTimeLimit(timestamp) {
      // Verificar si ha pasado menos de 1 minuto desde el timestamp proporcionado
      const currentTime = new Date().getTime();
      const timeDifference = (currentTime - timestamp) / 1000; // convertir a segundos
      return timeDifference < 60; // 60 segundos = 1 minuto
    }
  
    // Iniciar la práctica al cargar la página
    fetchData();
  });
  