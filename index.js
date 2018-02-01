'use strict';

const quizQuestions = [
	{
	question: 'What is the name of Erlich\'s startup incubator?',
	answers: [
		'Bachmanity Insanity', 'Raviga', 'Coder Corral', 'Hacker Hostel'
		],
	correctAnswer: 'Hacker Hostel'
	},
	{
	question: 'What app was Big Head developing before he took a job at Hooli?',
	answers: [
		'Aviato', 'Piper Chat', 'Nip Alert', 'Smokation'
		],
	correctAnswer: 'Nip Alert'
	},
	{
	question: 'Which Pied Piper Employee is not a US citizen?',
	answers: [
		'Gilfoyle', 'Richard', 'Dinesh', 'Jared'
		],
	correctAnswer: 'Gilfoyle'
	},
	{
	question: 'What is Jared\'s real name?',
	answers: [
		'Gabe', 'Steve', 'Donald', 'Richard'
		],
	correctAnswer: 'Donald'
	},
	{
	question: 'Why did Erlich stop coding?',
	answers: [
		'He doesn\'t know how', 'He signed a non-compete', 'He thinks he is above it', 'He has carpal tunnel syndrome'
		],
	correctAnswer: 'He has carpal tunnel syndrome'
	},
	{
	question: 'Why do Richard and Winnie break up?',
	answers: [
		'He calls her a Woman Engineer', 'She uses spaces instead of tabs', 'He turns her in to the FBI', 'She wants to date Dinesh'
		],
	correctAnswer: 'She uses spaces instead of tabs'
	},
	{
	question: 'Who is Jared\'s fictional supervisor?',
	answers: [
		'Keenan Feldspar', 'Ed Chambers', 'Russ Hanneman', 'Pakistani Denzel'
		],
	correctAnswer: 'Ed Chambers'
	},
	{
	question: 'What is the name of Gilfoyle\'s server?',
	answers: [
		'Anton', 'Dante', 'Kaczynski', 'Bertram'
		],
	correctAnswer: 'Anton'
	},
	{
	question: 'What does Jian-Yang spend the SeeFood funding on?',
	answers: [
		'A yellow corvette', 'A toga party', 'A palapa', 'Server space'
		],
	correctAnswer: 'A yellow corvette'
	},
	{
	question: 'This guy f*cks.',
	answers: [
		'Erlich', 'Dinesh', 'Jared', 'Richard'
		],
	correctAnswer: 'Jared'
	}
];

let questionIndex = 0;
let answersCorrect = 0;
let answersIncorrect = 0;

function renderTitle(){
	$('body').append(`
		<header role='banner' class='quiz-name'>
			<img src='https://i.imgur.com/BylrOEA.png' alt='Silicon Valley TV show logo' class='logo'>
			<h1 class='the-quiz-header'>The Quiz</>
		</header>
		<main role='main'></main>
	`);
}

function renderStartScreen(){
	$('main').append(`
		<div class='start-screen'>
			<button class='start'>Click to Start</button>
		</div>
	`);
}		

function handleStartClick(){
	$('main').on('click', '.start', event => {
		event.preventDefault();
		renderQuestions();
	});
}

function renderQuestions(){
  const questionNumber = parseInt([questionIndex]) + 1;
  const quizForm = `
    <div class='question-box'>
     <p class='question-number'>Question ${questionNumber} of ${quizQuestions.length}</p>
     <form>
        <fieldset>
          <legend class='question'>${quizQuestions[questionIndex].question}</legend>
          <button class='answer' value='${quizQuestions[questionIndex].answers[0]}'>${quizQuestions[questionIndex].answers[0]}</button>
          <button class='answer' value='${quizQuestions[questionIndex].answers[1]}'>${quizQuestions[questionIndex].answers[1]}</button>
          <button class='answer' value='${quizQuestions[questionIndex].answers[2]}'>${quizQuestions[questionIndex].answers[2]}</button>
          <button class='answer' value='${quizQuestions[questionIndex].answers[3]}'>${quizQuestions[questionIndex].answers[3]}</button>
        </fieldset>
     </form>
   <p class='current-score'>You have ${answersCorrect} correct and ${answersIncorrect} incorrect.</p>
  </div>
  `;		
  $('main').html(quizForm);
}

function handleAnswerClick(){
	$('main').on('click', '.answer', event => {
		event.preventDefault();
		let answerButton = event.target.value;
		if (answerButton == quizQuestions[questionIndex].correctAnswer) {
			answersCorrect ++;
			renderCorrectFeedBack();
			handleProgressButton();
			}
		else {
			answersIncorrect ++;
			renderIncorrectFeedBack();
			handleProgressButton();
			}
			
		});
}

function renderCorrectFeedBack(){
	const feedback = `
		<div class='feedback'>
			<img src='https://i.imgur.com/8QNScfP.png' alt='Photo of a hotdog "Hotdog!" text' class='feedback-image'/>
			<p class='feedback-text'>Correct!</p>
			<p class='feedback-score'>You have ${answersCorrect} correct and ${answersIncorrect} incorrect.</p>
		</div>
		`;
		$('main').html(feedback);
}

function renderIncorrectFeedBack(){
	const feedback = `
		<div class='feedback'>
			<img src='https://i.imgur.com/iUxgj52.png' alt='Photo of a sandwich with Not Hotdog text and a red x' class='feedback-image'/></a>
			<p class='feedback-text'>Incorrect! The correct answer is "${quizQuestions[questionIndex].correctAnswer}"</p>
			<p class='feedback-score'>You have ${answersCorrect} correct and ${answersIncorrect} incorrect.</p>
		</div>
		`;
		$('main').html(feedback);
}

function handleProgressButton(){
	if (questionIndex + 1 < quizQuestions.length) {
		$('.feedback').append(`
			<button class='next-question'>Next Question</button>
		`);
	}
	else {
		$('.feedback').append(`
			<button class='final-score'>See Final Score</button>
		`);
	}
}

function handleProgressClick(){
	$('main').on('click', '.next-question', event => {
		event.preventDefault();
		questionIndex ++;
		renderQuestions();
	});
	$('main').on('click', '.final-score', event => {
		event.preventDefault();
		questionIndex ++;
		renderEndScreen();
	});
}

function renderEndScreen(){
	const endScreen = `
		<div class='end-screen'>
			<a href='https://imgur.com/fLE7kmB'><img src='https://i.imgur.com/fLE7kmB.gif' alt='Gif of the Pied Piper guys toasting with beer bottles' class='end-gif'/></a>      		
			<p class='end-score'>You got ${answersCorrect} out of ${quizQuestions.length} correct!</p>
      		<button class='play-again'>Play Again</button>
    	</div>
    `;
    $('main').html(endScreen);
}

function handlePlayAgainClick(){
	$('main').on('click', '.play-again', event => {
		event.preventDefault();
		questionIndex = 0;
		answersCorrect = 0;
		answersIncorrect = 0;
		renderQuestions();
	});	
}

function handleQuiz(){
	renderTitle();
	renderStartScreen();
	handleStartClick();
	handleAnswerClick();
	handleProgressClick();
	handlePlayAgainClick();
}

$(handleQuiz);
