const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 10
const MAX_QUESTIONS = 15


let questions = [
{
    question: "What do you think when it comes to book genres?",
    choice1: "Fiction all the way!",
    choice2: "Non-fiction. I need real stories",
    choice3: "Mystery. Give me the suspense",
    choice4: "Fantasy. I love escaping to new worlds",
    answer: "choice1",
},
{
    question: "What’s your preferred reading style?",
    choice1: "I like standalone books",
    choice2: "I’m all about series",
    choice3: "It really depends on the mood",
    choice4: "Not sure yet",
    answer: "choice2",
},
{
    question: "What’s your top genre right now?",
    choice1: "Romance, obviously",
    choice2: "Thriller. I need the adrenaline",
    choice3: "Historical Fiction. Take me back in time",
    choice4: "Sci-Fi. The future is calling",
    answer: "choice3",
},
{
    question: "What kind of setting do you vibe with in books?",
    choice1: "A buzzing city",
    choice2: "A magical fantasy world",
    choice3: "A deep dive into history",
    choice4: "A dystopian future that’s a little too real",
    answer: "choice4",
},
{
    question: "Are you into books with complex or simple plots?",
    choice1: "Complex, I want to be challenged",
    choice2: "Keep it chill. I want to relax",
    choice3: "It depends on the genre",
    choice4: "Mix it up",
    answer: "choice1",
},
{
    question: "How do you feel about books with multiple viewpoints?",
    choice1: "One perspective is enough for me",
    choice2: "Multiple viewpoints. Let’s get all the angles",
    choice3: "Depends on the book",
    choice4: "I don't care, just tell me a good story",
    answer: "choice2",
},
{
    question: "What kind of protagonist are you into?",
    choice1: "A classic hero on a mission",
    choice2: "An antihero who keeps it real",
    choice3: "Someone just trying to survive",
    choice4: "A character with an epic transformation",
    answer: "choice3",
},
{
    question: "How do you feel about supernatural stuff in books?",
    choice1: "I love it. Give me all the magic!",
    choice2: "Not really my thing",
    choice3: "I can make it work if it’s done right",
    choice4: "I’m into subtle magic. Nothing too wild",
    answer: "choice4",
},
{
    question: "How fast do you want the story to move?",
    choice1: "I like it fast-paced and full of action",
    choice2: "Slow and steady. Let’s build the tension",
    choice3: "Mix it up! Both works for me",
    choice4: "I’m down for anything, just keep it interesting",
    answer: "choice1",
},
{
    question: "What type of world do you want to read about?",
    choice1: "A big, vibrant city",
    choice2: "A quiet, small town",
    choice3: "A world full of magic and wonder",
    choice4: "A wild, untamed wilderness",
    answer: "choice2",
},
{
    question: "Do you like books that make you think about life?",
    choice1: "Yes, deep thoughts are my jam",
    choice2: "No, I just want to have fun",
    choice3: "Sometimes, if I’m in the mood",
    choice4: "I want both action and depth",
    answer: "choice3",
},
{
    question: "What’s your take on romance in books?",
    choice1: "I need it! Romance is everything",
    choice2: "I like it, but not too much",
    choice3: "I’m more into action, no romance for me",
    choice4: "Only if it’s a subplot",
    answer: "choice4",
},
{
    question: "How important is character development to you?",
    choice1: "Super important. I need to connect with them",
    choice2: "Not so much. I prefer action-driven plots",
    choice3: "I want a balance of both",
    choice4: "It depends on the genre",
    answer: "choice1",
},
{
    question: "How do you feel about heavy themes like trauma in books?",
    choice1: "I love deep, meaningful stories",
    choice2: "Not for me. I like lighter books",
    choice3: "I’m okay with it if it’s handled well",
    choice4: "I tend to avoid those types of books",
    answer: "choice2",
},
{
    question: "What kind of endings do you like?",
    choice1: "Happy!",
    choice2: "Sad, but with a lesson",
    choice3: "I like an open ending to think about",
    choice4: "Give me a plot twist! I love surprises",
    answer: "choice3",
},
  ];


const playButton = document.getElementById("playButton");
const homeScreen = document.getElementById("home");
const gameScreen = document.getElementById("game");


playButton.addEventListener("click", () => {
  homeScreen.classList.add("d-none");
  gameScreen.classList.remove("d-none");
  startGame();
});

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  progressBarFull.style.width = "0%";
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;


  loadGame();
  saveProgress();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    showRecommendation();
    return;
  }
  questionCounter++
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  
  const progressValue = (questionCounter / MAX_QUESTIONS * 100);
  document.getElementById('quiz-progress').value = progressValue;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice, index) => {
    choice.innerText = currentQuestion["choice" + (index + 1)];
    choice.setAttribute("data-choice", "choice" + (index + 1));
    choice.removeEventListener("click", handleAnswer); 
    choice.addEventListener("click", handleAnswer); 
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}


const bookRecommendations = [
{ range: [0, 5], 
    recommendation: "You're gonna love 'The Catcher in the Rye' by J.D. Salinger",
    description: "A disillusioned teenager’s journey that’ll hit you in the feels.", 
    reason: "If you're into deep self-discovery, this one’s for you!", 
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Catcher-in-the-rye-red-cover.jpg", 
    link: "https://www.goodreads.com/book/show/5107.The_Catcher_in_the_Rye"
},

{ range: [6, 10], 
    recommendation: "Check out 'To Kill a Mockingbird' by Harper Lee", 
    description: "A gripping story about race and justice in the South.", 
    reason: "If you vibe with thought-provoking social issues, you’ll love this.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg", 
    link: "https://www.goodreads.com/book/show/2657.To_Kill_a_Mockingbird"
},

{ range: [11, 15], 
    recommendation: "Try '1984' by George Orwell", 
    description: "A dystopian novel that will make you rethink everything about power and control.", 
    reason: "If you’re into chilling depictions of surveillance and oppression, you’ll love this.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/1984-orwell-en-librairies-petite_%28cropped%29.jpg", 
    link: "https://www.goodreads.com/book/show/5470.1984"
},

{ range: [16, 20], 
    recommendation: "You need to read 'The Great Gatsby' by F. Scott Fitzgerald", 
    description: "A story of obsession, love, and the American Dream in the Roaring Twenties.", 
    reason: "If you're into rich, complicated characters and a touch of tragedy, this is your vibe.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/The_Great_Gatsby_cover_1925_wikisource.jpg",
    link: "https://www.goodreads.com/book/show/4671.The_Great_Gatsby"
 },

{ range: [21, 25], 
    recommendation: "'Moby-Dick' by Herman Melville' is calling your name", 
    description: "A philosophical adventure about obsession and the sea.", 
    reason: "If you’re into deep dives into human obsession and fate, get ready for this classic.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Moby-Dick_FE_title_page.jpg",
    link: "https://www.goodreads.com/book/show/153747.Moby_Dick_or_The_Whale"
 },

{ range: [26, 30], 
    recommendation: "'Pride and Prejudice by Jane Austen' is the one for you", 
    description: "A romantic drama about love, social pressure, and personal growth.",
    reason: "If you love complex relationships and social commentary, you’ll vibe with this.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Thomson-PP02.jpg",
    link: "https://www.goodreads.com/book/show/1885.Pride_and_Prejudice"
 },

{ range: [31, 35], 
    recommendation: "You’d totally dig 'The Hobbit' by J.R.R. Tolkien", 
    description: "A fantastical adventure that will transport you to Middle-earth.", 
    reason: "Perfect if you’re looking for an epic journey with heart and courage.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/The_Hobbit_First_Edition_cover.jpg",
    link: "https://www.goodreads.com/book/show/5907.The_Hobbit"
 },

{ range: [36, 40], 
    recommendation: "'The Hunger Games' by Suzanne Collins", 
    description: "A gripping dystopian trilogy about survival and rebellion.", 
    reason: "If you're into fast-paced, high-stakes adventures, this one’s a must-read.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/The_Hunger_Games_cover.jpg",
    link: "https://www.goodreads.com/book/show/2767052-the-hunger-games"
 },

{ range: [41, 45], 
    recommendation: "'The Midnight Library' by Matt Haig", 
    description: "A story about regret, possibility, and finding your true path in life.", 
    reason: "If you like exploring the different choices life offers, this is perfect.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/The_Midnight_Library.jpg",
    link: "https://www.goodreads.com/book/show/52578297-the-midnight-library"
 },

{ range: [46, 50], 
    recommendation: "'Circe' by Madeline Miller", 
    description: "A modern take on Greek mythology with a twist.", 
    reason: "If you love mythology with a fresh, female perspective, you’ll love Circe.", 
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Circe_Novel_Cover.jpg",
    link: "https://www.goodreads.com/book/show/35959740-circe"

 },
];

const saveProgress = () => {
    if (localStorage.getItem('score') === null) {
      localStorage.setItem('score', score);
    }
    if (localStorage.getItem('questionCounter') === null) {
      localStorage.setItem('questionCounter', questionCounter);
    }
  };

const loadProgress = () => {
  const savedScore = localStorage.getItem('score');
  const savedCounter = localStorage.getItem('questionCounter');
  if (savedScore && savedCounter) {
    score = parseInt(savedScore);
    questionCounter = parseInt(savedCounter);
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  }
};

window.onload = loadProgress;


const handleAnswer = (e) => {
    if (!acceptingAnswers) return;
  
    acceptingAnswers = false;
    const selectedAnswer = e.target;
    const selectedChoice = selectedAnswer.getAttribute("data-choice");  
    const classToApply = selectedChoice === currentQuestion.answer ? "btn-success" : "btn-danger";
  
    if (classToApply === currentQuestion.answer) {
      incrementScore(CORRECT_BONUS);
    }
  
    selectedAnswer.classList.add(classToApply);
    selectedAnswer.classList.remove("btn-outline-primary");
  
    setTimeout(() => {
      selectedAnswer.classList.remove(classToApply);
      acceptingAnswers = true;
      getNewQuestion(); 
    }, 1000);
};

let previousRecommendation = null; 

const showRecommendation = () => {
  gameScreen.classList.add("d-none");
  homeScreen.classList.add("d-none");

  let bookRecommendation = "No recommendation available.";
  let bookDescription = "";
  let bookImage = "";
  let bookReason = "";
  let bookLink = "";
  

  let selectedRecommendation = null;
  do {
    selectedRecommendation = bookRecommendations[Math.floor(Math.random() * bookRecommendations.length)];
  } while (selectedRecommendation === previousRecommendation); 

  previousRecommendation = selectedRecommendation;
  
  bookRecommendation = selectedRecommendation.recommendation;
  bookDescription = selectedRecommendation.description;
  bookImage = selectedRecommendation.image;
  bookReason = selectedRecommendation.reason;
  bookLink = selectedRecommendation.link;

    const oldRecommendation = document.querySelector('.container');
if (oldRecommendation) oldRecommendation.remove();
  
    const recommendationSection = document.createElement('div');
    recommendationSection.classList.add("container", "text-center");
    recommendationSection.innerHTML = `
      <h1>You've completed the quiz!</h1>
      <p>${bookRecommendation}</p>
      <p>${bookDescription}</p>
      <p>${bookReason}</p>
      <p>Click the image to learn more!</p>
      <div id="bookImage" class="text-center">
          <a href="${bookLink}" target="_blank">
              <img id="bookImageImg" src="${bookImage}" alt="Book Image"/>
          </a>
          <p><a href="https://en.wikipedia.org/wiki/File:${bookImage.split('/').pop()}" target="_blank">Image credit</a></p>
      </div>
      <button id="restartButton" class="btn btn-primary">Restart</button>
    `;
    document.body.appendChild(recommendationSection);

  const restartButton = document.getElementById("restartButton");
  if (restartButton) {
   restartButton.addEventListener("click", () => {
    homeScreen.classList.add("d-none");
    gameScreen.classList.remove("d-none");
    startGame();
  });
  }
  };



const incrementScore = (num) => {
  score += num;
};