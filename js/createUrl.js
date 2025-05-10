document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const url = document.getElementById("url");
    const expiration = document.getElementById("expirationDate");

    function redirectTo(url) {
        window.location.href = `details.html?shortUrl=${url}`;
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        let fetchObject = {
            url: url.value,
            expirationDate: expiration.value,
        }

        alert(JSON.stringify(fetchObject))

        fetch(`http://127.0.0.1:8080/api/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchObject)
        }).then(response => response.json())
        .then(data => redirectTo(data.shortUrl))
        .catch(error => alert(`Erro: ${error.message}`))                
    }
    )
}
) 
