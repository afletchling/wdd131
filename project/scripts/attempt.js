const list = document.getElementById('quiz-list');
const questionList = document.getElementById('questions');
const quizHolder = document.getElementById('list-panel');
const questionHolder = document.getElementById('question-panel');
const questionTitle = document.querySelector('h2');
const quizes = JSON.parse(localStorage.getItem('quizes')) || {};
const attempts = JSON.parse(localStorage.getItem('attempts')) || [];
let elements = [];

let targetQuiz;
let targetQuizName;
let targetQuestion;
let correct = 0;
let answered;

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
    return entry;
}

function createQuestionEntry(name, isCorrect) {
    const entry = document.createElement('li');
    const clickable = document.createElement('a');
    clickable.classList.add('question');
    clickable.textContent = name;
    clickable.href = '#';

    clickable.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        if (isCorrect) {
            clickable.classList.add('correct');
            correct++;
        } else {
            clickable.classList.add('incorrect');
        }

        setTimeout(() => advanceQuestion(), 3000);
    });

    elements.push(entry);
    entry.appendChild(clickable);
    questionList.appendChild(entry);
}

function visualizeQuestion() {
    const questionEntries = Object.entries(targetQuiz.questions);
    const question = questionEntries[targetQuestion - 1];

    if (question && Object.values(question[1].answers).length > 0) {
        questionTitle.textContent = `Question ${targetQuestion}: ${question[0]}`;

        for (const [name, correct] of Object.entries(question[1].answers)) {
            createQuestionEntry(name, correct);
        }
    } else {
        correct++;
        advanceQuestion();
    }
}

function advanceQuestion() {
    elements.forEach((element) => element.remove());
    elements.splice();

    targetQuestion += 1;
    answered = false;

    if (targetQuestion > Object.values(targetQuiz.questions).length) {
        questionHolder.classList.add('hidden');
        quizHolder.classList.remove('hidden');

        attempts.push({
            name: `${targetQuizName}`,
            correct: correct,
            total: Object.values(targetQuiz.questions).length,
            timestamp: new Date().toLocaleString(),
            sortNumber: Date.now()
        });

        localStorage.setItem('attempts', JSON.stringify(attempts));
        targetQuiz = undefined;
        targetQuizName = undefined;
    } else {
        visualizeQuestion();
    }
}

function startQuiz() {
    correct = 0;
    if (Object.values(targetQuiz.questions).length > 0) {
        targetQuestion = 0;
        advanceQuestion();
    } else {
        questionHolder.classList.add('hidden');
        quizHolder.classList.remove('hidden');
    }
}

function visualizeQuizes() {
    for (const [name, quiz] of Object.entries(quizes)) {
        createQuizEntry(`Quiz: ${name} `, {
            'Attempt': () => {
                quizHolder.classList.add('hidden');
                questionHolder.classList.remove('hidden');
                targetQuiz = quiz;
                targetQuizName = name;
                startQuiz();
            }
        });
    }
}

visualizeQuizes();