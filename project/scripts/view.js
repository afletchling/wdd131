const list = document.getElementById('attempt-list');
const attempts = JSON.parse(localStorage.getItem('attempts')) || [];

function visualizeAttempts() {
    let index = 0;

    attempts.sort((a, b) => a.sortNumber < b.sortNumber);
    for (const attempt of attempts) {
        const entry = document.createElement('li');
        entry.textContent = `Attempt ${attempts.length - index} : ${attempt.name} : ${attempt.correct}/${attempt.total} : ${attempt.timestamp}`;

        list.appendChild(entry);
        index++;
    }
}

visualizeAttempts();