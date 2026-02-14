const list = document.getElementById('quiz-list');
const quizLabel = document.getElementById('quiz-label');
const inputBox = document.getElementById('quiz-name');
const submitButton = document.getElementById('submit-button');
const backButton = document.getElementById('back-button');
const quizes = JSON.parse(localStorage.getItem('quizes')) || {};
const elements = [];

let targetQuiz;
let targetQuestion;

function createQuizEntry(name, callbacks) {
    const entry = document.createElement('li');
    entry.textContent = name;

    for (const [button, callback] of Object.entries(callbacks)) {
        const bEntry = document.createElement('button');
        bEntry.textContent = button;
        bEntry.addEventListener('click', callback);
        entry.appendChild(bEntry);
    }

    list.appendChild(entry);
    elements.push(entry);
    return entry;
}

function cleanupEntries(hide) {
    elements.forEach((element) => element.remove());
    elements.splice();

    if (hide) {
        backButton.classList.add('hidden');
    } else {
        backButton.classList.remove('hidden');
    }
}

function saveQuiz() {
    localStorage.setItem('quizes', JSON.stringify(quizes));
}

function visualizeAnswers() {
    quizLabel.textContent = 'Answer Name:';
    submitButton.textContent = 'Add Answer';
    inputBox.placeholder = 'Banana';
    cleanupEntries(false);

    let index = 0;
    for (const [name, correct] of Object.entries(targetQuestion.answers)) {
        index++;
        createQuizEntry(`Answer ${index}: ${name} ${correct ? '✅': ''}`, {
            '📝': () => {
                inputBox.focus();
                targetQuestion.answers[name] = !targetQuestion.answers[name];
                visualizeAnswers();
                saveQuiz();
            },
            '❌': () => {
                inputBox.focus();
                delete targetQuestion.answers[name];
                visualizeAnswers();
                saveQuiz();
            }
        })
    }
}

function visualizeQuestions() {
    quizLabel.textContent = 'Question Name:';
    submitButton.textContent = 'Add Question';
    inputBox.placeholder = 'What is your favorite fruit?';
    cleanupEntries(false);

    let index = 0;
    for (const [name, question] of Object.entries(targetQuiz.questions)) {
        index++;
        createQuizEntry(`Question ${index}: ${name} `, {
            '📝': () => {
                inputBox.focus();
                targetQuestion = question;
                visualizeAnswers();
            },
            '❌': () => {
                inputBox.focus();
                delete targetQuiz.questions[name];
                visualizeQuestions();
                saveQuiz();
            }
        });
    }
}

function visualizeQuizes() {
    quizLabel.textContent = 'Quiz Name:';
    submitButton.textContent = 'Create Quiz';
    inputBox.placeholder = 'Food Quiz';
    cleanupEntries(true);

    for (const [name, quiz] of Object.entries(quizes)) {
        createQuizEntry(`Quiz: ${name} `, {
            '📝': () => {
                inputBox.focus();
                targetQuiz = quiz;
                visualizeQuestions();
            },
            '❌': () => {
                inputBox.focus();
                delete quizes[name];
                visualizeQuizes();
                saveQuiz();
            }
        });
    }
}

submitButton.addEventListener('click', () => {
    let added;
    if (targetQuestion) {
        if (targetQuestion.answers[inputBox.value] == undefined) {
            added = true;
            targetQuestion.answers[inputBox.value] = false;
            visualizeAnswers();
        }
    } else if (targetQuiz) {
        if (targetQuiz.questions[inputBox.value] == undefined) {
            added = true;
            targetQuiz.questions[inputBox.value] = {answers: {}};
            visualizeQuestions();
        }
    } else {
        if (quizes[inputBox.value] == undefined) {
            added = true;
            quizes[inputBox.value] = {questions: {}};
            visualizeQuizes();
        }
    }

    if (added) {
        saveQuiz();
    }

    inputBox.value = '';
    inputBox.focus();
});

backButton.addEventListener('click', () => {
    if (targetQuestion) {
        visualizeQuestions();
        targetQuestion = undefined;
        return;
    }

    if (targetQuiz) {
        visualizeQuizes();
        targetQuiz = undefined;
    }

    inputBox.focus();
});

visualizeQuizes();