const API_URL = "https://black-unit-9e7f.gastiplay.workers.dev/";
let lastSend = 0;

function sanitize(str) {
    return String(str).replace(/[<>]/g, "").trim();
}

document.getElementById("tgForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    if (Date.now() - lastSend < 10000) {
        return showAlert("Подожди пару секунд ✔");
    }
    lastSend = Date.now();

    const form = new FormData(this);

    const body = {
        name: sanitize(form.get("name")),
        age: sanitize(form.get("age")),
        contacts: sanitize(form.get("contacts")),
    };

    if (
        body.name.length > 50 ||
        body.age.length > 3 ||
        body.contacts.length > 100
    ) {
        return showAlert("Слишком длинные данные");
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error("Bad response");

        showAlert("Отправлено!");
    } 
    catch (err) {
        console.error(err);
        showAlert("Ошибка отправки");
    }
});
