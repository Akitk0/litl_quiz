let questionfield = document.querySelector('.question')

let answerButtons = document.querySelectorAll('.answer');

let scoreElement = document.getElementById('score');
let currentQuestion;

class Question {
    constructor() {
        this.questionTextElement = document.getElementById('question-text');
        this.answerBlockElement = document.getElementById('answer-block');

        let a = randint(1, 40);
        let b = randint(1, 40);
        let sign = getRandomSign();

        this.question = `${a} ${sign} ${b}`;
        this.correct = this.calculateAnswer(a, b, sign);
        this.answers = this.generateAnswerOptions(this.correct);

        this.createAnswerButtons();
    }

    calculateAnswer(a, b, sign) {
        switch (sign) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return Math.round(a / b);
            default:
                return NaN;
        }
    }

    generateAnswerOptions(correctAnswer) {
        let answers = [correctAnswer];
        for (let i = 0; i < 4; i++) {
            answers.push(randint(correctAnswer - 15, correctAnswer + 7));
        }
        return answers;
    }

    createAnswerButtons() {
        this.answerBlockElement.innerHTML = '';

        this.answers = this.shuffleArray(this.answers);

        this.answers.forEach((answer) => {
            let button = document.createElement('div');
            button.classList.add('answer');
            button.textContent = answer;

            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-1px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });

            button.addEventListener('click', () => {
                if (parseInt(button.textContent) === this.correct) {
                    button.classList.add('correct-answer');
                    correctAnswers++;
                    scoreElement.textContent = `Score: ${correctAnswers}`;
                } else {
                    button.classList.add('incorrect-answer');
                    incorrectAnswers++;
                }

                setTimeout(() => {
                    this.reset();
                }, 1000);
            });

            this.answerBlockElement.appendChild(button);
        });
    }

    reset() {
        currentQuestion = new Question();
        currentQuestion.display();
    }

    display() {
        this.questionTextElement.textContent = this.question;
    }
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomSign() {
    let signs = ['+', '-', '*', '/'];
    let i = randint(0, 3);
    return signs[i];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

currentQuestion = new Question();
currentQuestion.display();
