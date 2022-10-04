const quizData = [
  {
    question:
      "Java-Script dasturlash tilida malumot turlari nechta (data types) ?",
    a: "4",
    b: "3",
    c: "5",
    d: "2",
    answer: "d",
  },
  {
    question: "Java-Script dasturlash tili nechchi tarmoqli dasturlash tili ?",
    a: "bir tarmoqli (single-threaded )",
    b: "ko'p tarmoqli (multithreaded )",
    c: "hech qanaqa tarmoqsiz,(no-threaded )",
    d: "ikki tarmoqli (double-threated)",
    answer: "a",
  },
  {
    question: "Java-Script dasturlash tilida 'event-loop' qanaqa ishlaydi ?",
    a: "bir tarmoqli (single-threaded )",
    b: "ko'p tarmoqli (multithreaded )",
    c: "hech qanaqa tarmoqsiz,(no-threaded )",
    d: "asinxron (asynic)",
    answer: "a",
  },
  {
    question:
      "Java-Script dasturlash tilida 'null' qaysi malumot turiga kiradi ?",
    a: "'null' malummot turi emas ",
    b: " murakkab (nonprimitive)",
    c: " sodda (primitive)",
    d: "object",
    answer: "c",
  },
];

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const scoreEl = document.getElementById("score");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitEl = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;
loadQduiz();
function loadQduiz() {
  disSelect();
  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}
function disSelect() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitEl.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    answer === quizData[currentQuiz].answer && (score += 10);

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQduiz();
    } else {
      // alert("you've finished");
      scoreEl.innerText = `Score:${score}`;
    }
  }
});
//
