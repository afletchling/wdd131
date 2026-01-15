const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector("ul");

button.addEventListener("click", function() {
    input.focus();

    if (input.value.trim() === '') {
        return;
    }

    const entry = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    entry.innerHTML = input.value;
    input.value = "";

    deleteButton.addEventListener("click", () => {
        list.removeChild(entry);
        input.value = "";
        input.focus();
    });

    entry.appendChild(deleteButton);
    list.appendChild(entry);
});