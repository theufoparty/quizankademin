// ------------------------------- DARKMODE ------------------------------- //

const darkModeClassName = "darkmode";

const darkModeToggle = document.querySelector("#dark-mode-button");

const enableDarkMode = () => {
	document.body.classList.add(darkModeClassName);
};

const disableDarkMode = () => {
	document.body.classList.remove(darkModeClassName);
};

// När någon klickar på Darkmode knappen
darkModeToggle.addEventListener("click", () => {
	const hasDarkmode = document.body.classList.contains(darkModeClassName);
	if (hasDarkmode) {
		disableDarkMode();
	} else {
		enableDarkMode();
	}
});

// ------------------------------- QUESTIONS ------------------------------- //

// SKAPA INPUT ELEMENT TILL DE OLIKA TYPERNA AV FRÅGOR

const getInputElement = (inputName, inputValue, labelText, type) => {
	const wrapperElement = document.createElement("div");
	wrapperElement.classList.add("form-check");
	const inputElement = document.createElement("input");
	inputElement.type = type;
	inputElement.setAttribute("name", inputName);
	inputElement.value = inputValue;
	const labelElement = document.createElement("label");
	labelElement.classList.add("form-label");
	labelElement.innerText = labelText;
	wrapperElement.append(inputElement);
	wrapperElement.append(labelElement);
	return wrapperElement;
};

// TYPER AV FRÅGOR

const getTrueFalseQuestionElement = (question, index) => {
	const parent = document.createElement("div");
	parent.classList.add("question");
	const para = document.createElement("p");
	para.classList.add("question-text");
	para.innerText = `${index + 1}. ${question.text}`;
	parent.append(para);
	const trueInput = getInputElement(`q${index + 1}`, "A", "True", "radio");
	const falseInput = getInputElement(`q${index + 1}`, "B", "False", "radio");
	parent.append(trueInput);
	parent.append(falseInput);
	return parent;
};

const getMultipleChoiceQuestionElement = (question, index) => {
	const parent = document.createElement("div");
	parent.classList.add("question");
	const para = document.createElement("p");
	para.classList.add("question-text");
	para.innerText = `${index + 1}. ${question.text}`;
	parent.append(para);

	question.choices.forEach((choice) => {
		const inputElement = getInputElement(`q${index + 1}`, choice.value, choice.label, "radio");
		parent.append(inputElement);
	});
	return parent;
};

const getCheckboxQuestionElement = (question, index) => {
	const parent = document.createElement("div");
	parent.classList.add("question");
	const para = document.createElement("p");
	para.classList.add("question-text");
	para.innerText = `${index + 1}. ${question.text}`;
	parent.append(para);

	question.choices.forEach((choice) => {
		const inputElement = getInputElement(`q${index + 1}`, choice.value, choice.label, "checkbox");
		parent.append(inputElement);
	});
	return parent;
};

// Funktion för att ändra färg på score

const getColorFromScore = (score) => {
	if (score >= 75) {
		return "#456e47";
	}
	if (score >= 50) {
		return "#ec7b19";
	}
	return "#bb2323";
};

// LISTA MED FRÅGOR

const questionTypes = {
	trueFalse: "truefalse",
	multiple: "multiple",
	checkbox: "checkbox",
};

const questions = [
	{
		text: "Vem är längst?",
		answer: "A",
		choices: [
			{
				label: "Patrick",
				value: "A",
			},
			{
				label: "Nell",
				value: "B",
			},
			{
				label: "Floki",
				value: "C",
			},
			{
				label: "Tonto",
				value: "D",
			},
		],
		type: questionTypes.multiple,
	},
	{
		text: "Vilken karaktär är med i Attack on Titan?",
		answer: "B",
		choices: [
			{
				label: "Eren",
				value: "A",
			},
			{
				label: "Askeladd",
				value: "B",
			},
			{
				label: "Floki",
				value: "C",
			},
			{
				label: "Thor",
				value: "D",
			},
		],
		type: questionTypes.multiple,
	},
	{
		text: "Trejde Frågan?",
		answer: "A",
		type: questionTypes.truefalse,
	},
	{
		text: "Fjärde Frågan?",
		answer: "B",
		type: questionTypes.truefalse,
	},
	{
		text: "Femte Frågan?",
		answer: "A",
		type: questionTypes.truefalse,
	},
	{
		text: "Sjätte Frågan?",
		answer: "B",
		type: questionTypes.truefalse,
	},
	{
		text: "Sjunde Frågan?",
		answer: "A",
		type: questionTypes.truefalse,
	},
	{
		text: "Åttonde Frågan?",
		answer: "B",
		type: questionTypes.truefalse,
	},
	{
		text: "Nionde Frågan?",
		answer: "A",
		type: questionTypes.truefalse,
	},
	{
		text: "Tionde Frågan",
		answer: ["B", "A"],
		choices: [
			{
				label: "Hej1",
				value: "A",
			},
			{
				label: "Hej2",
				value: "B",
			},
			{
				label: "Hej3",
				value: "C",
			},
			{
				label: "Hej4",
				value: "D",
			},
		],
		type: questionTypes.checkbox,
	},
];

const form = document.querySelector(".quiz-form");

// För varje fråga, hämta ett element för den frågan och lägg till i html-formuläret

questions.forEach((question, index) => {
	if (question.type === questionTypes.checkbox) {
		const questionElement = getCheckboxQuestionElement(question, index);
		form.append(questionElement);
	}
	if (question.type === questionTypes.truefalse) {
		const questionElement = getTrueFalseQuestionElement(question, index);
		form.append(questionElement);
	}
	if (question.type === questionTypes.multiple) {
		const questionElement = getMultipleChoiceQuestionElement(question, index);
		form.append(questionElement);
	}
});

// Efter frågorna, skapa submitknapp

const buttonWrapper = document.createElement("div");
buttonWrapper.classList.add("btn-container");
const buttonInput = document.createElement("input");
buttonInput.type = "submit";
buttonInput.classList.add("btn");
buttonInput.classList.add("btn-submit");
buttonWrapper.append(buttonInput);
form.append(buttonWrapper);

// ELEMENT FRÅN DOM:EN

const result = document.querySelector(".score-container");
const hidequestion = document.querySelector(".test-container");
const hideanswer = document.querySelector(".answer-container");
const hideresult = document.querySelector(".result-container");

// Resultat

const getValuesForCheckboxQuestion = (questionIndex) => {
	// Hämtar alla inputelement där namnet är q{questionIndex + 1} som även är ikryssade.
	const checkboxes = document.querySelectorAll(`input[name="q${questionIndex + 1}"]:checked`);
	let values = [];
	checkboxes.forEach((checkbox) => {
		values.push(checkbox.value);
	});
	return values;
};

const compareValueArrays = (values1, values2) => {
	// Sorterar listorna och därefter konverterar de sorterade listorna till strängar
	const valueString1 = JSON.stringify(values1.sort());
	const valueString2 = JSON.stringify(values2.sort());
	// Om strängarna är identiska så innehåller listorna samma saker och vi returnerar true
	return valueString1 === valueString2;
};

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let score = 0;
	let answerString = "";
	questions.forEach((question, index) => {
		if (question.type === questionTypes.checkbox) {
			const values = getValuesForCheckboxQuestion(index);
			const isCorrect = compareValueArrays(values, question.answer);

			if (isCorrect) {
				score += 100 / questions.length;
				answerString += `${index + 1}. ${question.text} : Rätt\n`;
			} else {
				answerString += `${index + 1}. ${question.text} : Fel\n`;
			}
		} else {
			const formAnswer = form[`q${index + 1}`].value;
			if (formAnswer === question.answer) {
				score += 100 / questions.length;
				answerString += `${index + 1}. ${question.text} : Rätt\n`;
			} else {
				answerString += `${index + 1}. ${question.text} : Fel\n`;
			}
		}
	});

	hidequestion.classList.add("hidden");
	hideresult.classList.remove("hidden");
	setTimeout(() => hideresult.classList.add("visible"), 0);

	const answerTextElement = document.querySelector(".answer-text");
	answerTextElement.innerText = answerString;

	let output = 0;
	const timer = setInterval(() => {
		// math floor används för att avrunda ner talet för att inte få ett tal med många decimaler.
		result.querySelector("span").textContent = `${Math.floor(output)}%`;
		result.querySelector("span").style.color = getColorFromScore(Math.floor(output));
		if (output >= score) {
			clearInterval(timer);
		} else {
			output++;
		}
	}, 20);
});
