const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector("ul");
let chaptersArray = getChapterList() || [];

function getChapterList() {
    return JSON.parse(localStorage.getItem("chapters"));
}

function setChapterList() {
    localStorage.setItem("chapters", JSON.stringify(chaptersArray));
}

function deleteChapter(chapter) {
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
}

function displayList(item) {
    const entry = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    entry.textContent = item;

    deleteButton.addEventListener("click", () => {
        list.removeChild(entry);
        deleteChapter(item); // why does the example use entry.textContent instead of the provided item variable?
        input.focus();
    });

    entry.appendChild(deleteButton);
    list.appendChild(entry);
}

chaptersArray.forEach(displayList);
button.addEventListener("click", function() {
    if (input.value.trim() === "") {
        return;
    }

    displayList(input.value);
    chaptersArray.push(input.value);
    setChapterList();
    input.value = "";
    input.focus();
});