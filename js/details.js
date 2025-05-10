document.addEventListener("DOMContentLoaded", () => {
    const shortUrl = new URLSearchParams(window.location.search).get("shortUrl");
    const longUrlBox = document.getElementById("longUrlBox");
    const createdAtBox = document.getElementById("createdAtBox");
    const expirationBox = document.getElementById("expirationBox"); 
    
    async function getInfo(shortUrl) {
        const url = `http://127.0.0.1:8080/api/info?shortUrl=${encodeURIComponent(shortUrl)}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            alert(`Erro: ${error.message}`);
            throw error;
        }
    }

    async function populateDefaultData() {
        try {
            const info = await getInfo(shortUrl);  
            const longUrl = info.longUrl;
            const createdAt = new Date(info.createdAt);
            const expirationDate = new Date(info.expirationDate);
            const expirationInMinutes = Math.floor((expirationDate - createdAt) / 60000);
            const parsedCreationTime = createdAt.toLocaleString();

            if (longUrlBox) {
                longUrlBox.innerText = longUrl; 
            }

            if (createdAt) {
                createdAtBox.innerText = parsedCreationTime; 
            }

            if (expirationInMinutes) {
                expirationBox.innerText = expirationInMinutes;
            }
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    }

    if (shortUrl) {
        populateDefaultData();
    }
});
