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

const getQuestionElement = (question, index) => {
	const parent = document.createElement("div");
	parent.classList.add("question");
	const para = document.createElement("p");
	para.classList.add("question-text");
	para.innerText = `${index + 1}. ${question.text}`;
	parent.append(para);
	const trueOption = document.createElement("div");
	trueOption.classList.add("form-check");
	const trueInput = document.createElement("input");
	trueInput.type = "radio";
	trueInput.setAttribute("name", `q${index + 1}`);
	trueInput.value = "A";
	const trueLabel = document.createElement("label");
	trueLabel.classList.add("form-label");
	trueLabel.innerText = "True";
	trueOption.append(trueInput);
	trueOption.append(trueLabel);
	const falseOption = document.createElement("div");
	falseOption.classList.add("form-check");
	const falseInput = document.createElement("input");
	falseInput.type = "radio";
	falseInput.setAttribute("name", `q${index + 1}`);
	falseInput.value = "B";
	const falseLabel = document.createElement("label");
	falseLabel.classList.add("form-label");
	falseLabel.innerText = "False";
	falseOption.append(falseInput);
	falseOption.append(falseLabel);
	parent.append(trueOption);
	parent.append(falseOption);
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

// Lista med frågor

const questions = [
	{
		text: "Första frågan?",
		answer: "A",
		type: "trueorfalse",
	},
	{
		text: "Andra Frågan?",
		answer: "B",
		type: "trueorfalse",
	},
	{
		text: "Trejde Frågan?",
		answer: "A",
		type: "trueorfalse",
	},
	{
		text: "Fjärde Frågan?",
		answer: "B",
		type: "trueorfalse",
	},
	{
		text: "Femte Frågan?",
		answer: "A",
		type: "trueorfalse",
	},
	{
		text: "Sjätte Frågan?",
		answer: "B",
		type: "trueorfalse",
	},
	{
		text: "Sjunde Frågan?",
		answer: "A",
		type: "trueorfalse",
	},
	{
		text: "Åttonde Frågan?",
		answer: "B",
		type: "trueorfalse",
	},
	{
		text: "Nionde Frågan?",
		answer: "A",
		type: "trueorfalse",
	},
	{
		text: "Tionde Frågan?",
		answer: "B",
		type: "trueorfalse",
	},
];

const form = document.querySelector(".quiz-form");

// För varje fråga, hämta ett element för den frågan och lägg till i html-formuläret

questions.forEach((question, index) => {
	const questionElement = getQuestionElement(question, index);
	form.append(questionElement);
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
