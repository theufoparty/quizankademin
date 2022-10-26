// ------------------------------- QUESTION CREATION ------------------------------- //

// Helperfuktion för att skapa våra input element, checkbox och radiobuttons med deras tillhörande labels.
// Vi lägger till tre attributer till inputElement, type (radio eller checkbox), name (t.ex. q3) och value (A, B, C, D)

const getInputElement = (inputName, inputValue, labelText, type) => {
	const wrapperElement = document.createElement("div");
	const inputElement = document.createElement("input");
	inputElement.type = type;
	inputElement.name = inputName;
	inputElement.value = inputValue;
	const labelElement = document.createElement("label");
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

// ------------------------------- QUESTION LIST ------------------------------- //

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
		text: "What is the standard starting life total?",
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
				label: "Twentyone",
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
		text: "Does lands count as permanents?",
		answer: "A",
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
		text: "Sjätte Frågan?",
		answer: "B",
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
		text: "Sjunde Frågan?",
		answer: "A",
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
		text: "What does the Black color stand for?",
		answer: ["A", "B", "C", "E", "G"],
		inputName: "q9",
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
		text: "What does the Black color stand for?",
		answer: ["A", "B", "C", "E", "G"],
		inputName: "q10",
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
];

const form = document.querySelector(".quiz-form");

// För varje fråga, hämta ett element med getQuestionElement och lägg till i Form.

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
	// Hämtar alla inputelement som har samma namn samt är ikryssade.
	const checkboxes = document.querySelectorAll(`input[name="${question.inputName}"]:checked`);
	const values = [];
	// För varje checkbox i checkboxes som är checked, ta det värdet(A, B, C, D) och lägg till det i values listan.
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

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let score = 0;
	let answerString = "";

	questions.forEach((question, index) => {
		// Först kollar vi om question type är checkboxes, om det är checkboxes så använder vi
		// helperfunktionen för att få svaren, sedan jämför vi svaren med frågans facit.
		// Om variabel isCorrect kommer tillbaka som true så lägger vi till 100/q.length till score.
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
			// Om det inte är checkbox vet vi att det är radio buttons och endast ett korrekt svar
			// Så här kontrollerar vi om vårat formAnswer är samma som vår frågans facit.
			const formAnswer = form[question.inputName].value;
			if (formAnswer === question.answer) {
				score += 100 / questions.length;
				answerString += `${index + 1}. ${question.text} : Correct!\n`;
			} else {
				answerString += `${index + 1}. ${question.text} : Wrong!\n`;
			}
		}
	});

	// setTimeout behövde användas då jag fick problem med att få resultatet att fade:a in snyggt.
	// Jag tänkte först göra resultatet till display none för att det inte skulle ta upp plats i layouten innan det skulle visas.
	// Samtidigt som att det skulle fade:a in när det ska visas, problemet var att om man tar bort display none och lägger till
	// opacity 1 samtidigt triggas inte animationen från opacity 0 till 1, då allt utfördes i ett steg i JS.
	// Men med setTimeout kan man ta bort display none, och därefter ändra till opacity 1 i två separata steg.

	testcontainer.classList.add("hidden");
	resultcontainer.classList.remove("hidden");
	setTimeout(() => resultcontainer.classList.add("visible"), 0);

	// Här presenteras resultatet genom att lägga till vår text av frågor med rätt och fel ifrån answerString i p-taggen. :)
	resultText.querySelector("p").innerText = answerString;

	// Här börjar vi animationen av resultatet i procentform.
	let output = 0;
	const timer = setInterval(() => {
		resultScore.querySelector("span").textContent = `${output}%`;
		resultScore.querySelector("span").style.color = getColorFromScore(output);
		if (output >= score) {
			clearInterval(timer);
		} else {
			output++;
		}
	}, 10);
});
