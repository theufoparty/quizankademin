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

const getRadioInputElement = (inputName, inputValue, labelText) => {
	const wrapperElement = document.createElement("div");
	wrapperElement.classList.add("form-check");
	const inputElement = document.createElement("input");
	inputElement.type = "radio";
	inputElement.setAttribute("name", inputName);
	inputElement.value = inputValue;
	const labelElement = document.createElement("label");
	labelElement.classList.add("form-label");
	labelElement.innerText = labelText;
	wrapperElement.append(inputElement);
	wrapperElement.append(labelElement);
	return wrapperElement;
};

const getTrueFalseQuestionElement = (question, index) => {
	const parent = document.createElement("div");
	parent.classList.add("question");
	const para = document.createElement("p");
	para.classList.add("question-text");
	para.innerText = `${index + 1}. ${question.text}`;
	parent.append(para);
	const trueInput = getRadioInputElement(`q${index + 1}`, "A", "True");
	const falseInput = getRadioInputElement(`q${index + 1}`, "B", "False");
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
		const inputElement = getRadioInputElement(`q${index + 1}`, choice.value, choice.label);
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

const questionTypes = {
	trueFalse: "truefalse",
	multiple: "multiple",
};

// Lista med frågor

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
		text: "Andra Frågan?",
		answer: "B",
		type: questionTypes.truefalse,
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
		text: "Tionde Frågan?",
		answer: "B",
		type: questionTypes.truefalse,
	},
];

const form = document.querySelector(".quiz-form");

// För varje fråga, hämta ett element för den frågan och lägg till i html-formuläret

questions.forEach((question, index) => {
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
buttonWrapper.classList.add("button-container");
const buttonInput = document.createElement("input");
buttonInput.type = "submit";
buttonInput.classList.add("btn");
buttonInput.classList.add("btn-submit");
buttonWrapper.append(buttonInput);
form.append(buttonWrapper);

const result = document.querySelector(".result-container");
const hidequestion = document.querySelector(".container");

// Resultat

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let score = 0;

	questions.forEach((question, index) => {
		const formAnswer = form[`q${index + 1}`].value;
		if (formAnswer === question.answer) {
			score += 100 / questions.length;
		}
	});

	console.log(result.querySelector("span"), `${score}%`);
	result.classList.remove("hidden");
	hidequestion.classList.add("hidden");

	let output = 0;
	const timer = setInterval(() => {
		result.querySelector("span").textContent = `${output}%`;
		result.querySelector("span").style.color = getColorFromScore(output);
		if (output === score) {
			clearInterval(timer);
		} else {
			output++;
		}
	}, 20);
});
