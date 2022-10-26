// ------------------------------- QUESTION CREATION ------------------------------- //

// Helperfuktion för att skapa våra input element, checkbox och radiobuttons med deras tillhörande labels.

const getInputElement = (inputName, inputValue, labelText, type) => {
	const wrapperElement = document.createElement("div");
	const inputElement = document.createElement("input");
	inputElement.type = type;
	inputElement.name = inputName;
	inputElement.value = inputValue;
	inputElement.id = inputName + inputValue;
	const labelElement = document.createElement("label");
	labelElement.htmlFor = inputName + inputValue;
	labelElement.innerText = labelText;
	wrapperElement.append(inputElement);
	wrapperElement.append(labelElement);
	return wrapperElement;
};

// Helperfuktion för att skapa varje fråga

const getQuestionElement = (question, index) => {
	const questionWrapper = document.createElement("div");
	const titleElement = document.createElement("p");
	titleElement.innerText = `${index + 1}. ${question.text}`;
	questionWrapper.append(titleElement);
	question.choices.forEach((choice) => {
		const inputElement = getInputElement(
			question.inputName,
			choice.value,
			choice.label,
			question.type
		);
		questionWrapper.append(inputElement);
	});
	return questionWrapper;
};

// ------------------------------- QUESTIONS------------------------------- //

const questionTypes = {
	radio: "radio",
	checkbox: "checkbox",
};

const questions = [
	{
		text: "When a spell or effect is played, it goes on the...",
		answer: "B",
		inputName: "q1",
		choices: [
			{
				label: "Library",
				value: "A",
			},
			{
				label: "Stack",
				value: "B",
			},
			{
				label: "Statement",
				value: "C",
			},
			{
				label: "Queue",
				value: "D",
			},
		],
		type: questionTypes.radio,
	},
	{
		text: "What is your standard starting life?",
		answer: "B",
		inputName: "q2",
		choices: [
			{
				label: "Ten",
				value: "A",
			},
			{
				label: "Twenty",
				value: "B",
			},
			{
				label: "Fifteen",
				value: "C",
			},
			{
				label: "Twenty-one",
				value: "D",
			},
		],
		type: questionTypes.radio,
	},
	{
		text: "What is your Library?",
		answer: "D",
		inputName: "q3",
		choices: [
			{
				label: "The cards you have played.",
				value: "A",
			},
			{
				label: "Your Magic card collection.",
				value: "B",
			},
			{
				label: "Your hand.",
				value: "C",
			},
			{
				label: "The undrawn cards of your deck.",
				value: "D",
			},
		],
		type: questionTypes.radio,
	},
	{
		text: "What is the maximum hand size at the end of your turn?",
		answer: "C",
		inputName: "q4",
		choices: [
			{
				label: "Ten",
				value: "A",
			},
			{
				label: "There is no limit",
				value: "B",
			},
			{
				label: "Seven",
				value: "C",
			},
			{
				label: "Twelve",
				value: "D",
			},
		],
		type: questionTypes.radio,
	},
	{
		text: "Does lands count as non-permanents?",
		answer: "B",
		inputName: "q5",
		choices: [
			{
				label: "True",
				value: "A",
			},
			{
				label: "False",
				value: "B",
			},
		],
		type: questionTypes.radio,
	},
	{
		text: "Is Planeswalker a card type in Magic?",
		answer: "A",
		inputName: "q6",
		choices: [
			{
				label: "True",
				value: "A",
			},
			{
				label: "False",
				value: "B",
			},
		],
		type: questionTypes.radio,
	},
	{
		text: "Can cards only represent one color of mana?",
		answer: "B",
		inputName: "q7",
		choices: [
			{
				label: "True",
				value: "A",
			},
			{
				label: "False",
				value: "B",
			},
		],
		type: questionTypes.radio,
	},
	{
		text: "What does the Black color stand for?",
		answer: ["A", "B", "C", "E", "G"],
		inputName: "q8",
		choices: [
			{
				label: "Power",
				value: "A",
			},
			{
				label: "Death",
				value: "B",
			},
			{
				label: "Sacrifice",
				value: "C",
			},
			{
				label: "Caution",
				value: "D",
			},
			{
				label: "Self-interest",
				value: "E",
			},
			{
				label: "Impulse",
				value: "F",
			},
			{
				label: "Uninhibitedness",
				value: "G",
			},
		],
		type: questionTypes.checkbox,
	},
	{
		text: "Which of the following are colors of mana in Magic?",
		answer: ["B", "C", "E", "F", "G"],
		inputName: "q9",
		choices: [
			{
				label: "Yellow",
				value: "A",
			},
			{
				label: "Black",
				value: "B",
			},
			{
				label: "White",
				value: "C",
			},
			{
				label: "Purple",
				value: "D",
			},
			{
				label: "Blue",
				value: "E",
			},
			{
				label: "Red",
				value: "F",
			},
			{
				label: "Green",
				value: "G",
			},
		],
		type: questionTypes.checkbox,
	},
	{
		text: "Which of the following is not a set in Magic?",
		answer: ["F"],
		inputName: "q10",
		choices: [
			{
				label: "Throne Of Eldraine",
				value: "A",
			},
			{
				label: "Worldwake",
				value: "B",
			},
			{
				label: "Mirrodin",
				value: "C",
			},
			{
				label: "Urza's Saga",
				value: "D",
			},
			{
				label: "Exodus",
				value: "E",
			},
			{
				label: "Daedra",
				value: "F",
			},
			{
				label: "Alpha",
				value: "G",
			},
		],
		type: questionTypes.checkbox,
	},
];

const form = document.querySelector(".quiz-form");

// För varje fråga, hämta ett element med getQuestionElement och lägg till i form.

questions.forEach((question, index) => {
	const questionElement = getQuestionElement(question, index);
	form.append(questionElement);
});

// --------------------------------- RESULT --------------------------------- //

const testcontainer = document.querySelector(".test-container");
const resultcontainer = document.querySelector(".result-container");

const resultScore = document.querySelector(".score-container");
const resultText = document.querySelector(".answer-container");

// Helperfunktion för att ändra färg på score

const getColorFromScore = (score) => {
	if (score >= 75) {
		return "#456e47";
	}
	if (score >= 50) {
		return "#ec7b19";
	}
	return "#bb2323";
};

// Helperfunktion som hämtar värden från checkbox frågor.

const getValuesForCheckboxQuestion = (question) => {
	const checkboxes = document.querySelectorAll(`input[name="${question.inputName}"]:checked`);
	const values = [];
	checkboxes.forEach((checkbox) => {
		values.push(checkbox.value);
	});
	return values;
};

// Helperfunktion som kontrollerar att svar och facitlistorna innehhåller samma strängar
// genom att sortera listorna och därefter konvertera dom till strängar.

const compareValueArrays = (values1, values2) => {
	const valueString1 = JSON.stringify(values1.sort());
	const valueString2 = JSON.stringify(values2.sort());
	return valueString1 === valueString2;
};

// Resultat

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let score = 0;
	let answerString = "";

	questions.forEach((question, index) => {
		if (question.type === questionTypes.checkbox) {
			const values = getValuesForCheckboxQuestion(question);
			const isCorrect = compareValueArrays(values, question.answer);
			if (isCorrect) {
				score += 100 / questions.length;
				answerString += `${index + 1}. ${question.text} : Correct!\n`;
			} else {
				answerString += `${index + 1}. ${question.text} : Wrong!\n`;
			}
		} else {
			const formAnswer = form[question.inputName].value;
			if (formAnswer === question.answer) {
				score += 100 / questions.length;
				answerString += `${index + 1}. ${question.text} : Correct!\n`;
			} else {
				answerString += `${index + 1}. ${question.text} : Wrong!\n`;
			}
		}
	});

	testcontainer.classList.add("hidden");
	resultcontainer.classList.remove("hidden");
	setTimeout(() => resultcontainer.classList.add("visible"), 0);

	resultText.querySelector("p").innerText = answerString;

	let output = 0;
	const timer = setInterval(() => {
		resultScore.querySelector("span").textContent = `${output}%`;
		resultScore.querySelector("span").style.color = getColorFromScore(output);
		if (output >= score) {
			clearInterval(timer);
		} else {
			output++;
		}
	}, 25);
});
