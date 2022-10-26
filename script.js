// ------------------------------- DARKMODE ------------------------------- //

const darkModeClassName = "darkmode";

const darkModeToggle = document.querySelector("#dark-mode-button");

const disableDarkMode = () => {
	document.body.classList.remove(darkModeClassName);
};

const enableDarkMode = () => {
	document.body.classList.add(darkModeClassName);
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

const getQuestionWrapperWithTitle = (question, index) => {
	const questionWrapper = document.createElement("div");
	questionWrapper.classList.add("question");
	const titleElement = document.createElement("p");
	titleElement.classList.add("question-text");
	titleElement.innerText = `${index + 1}. ${question.text}`;
	questionWrapper.append(titleElement);
	return questionWrapper;
};

// SKAPA INPUT ELEMENT TILL DE OLIKA TYPERNA AV FRÅGOR

const getInputElement = (inputName, inputValue, labelText, type) => {
	const wrapperElement = document.createElement("div");
	wrapperElement.classList.add("form-check");
	const inputElement = document.createElement("input");
	inputElement.type = type; // type är ett argument till funktionen och i det här fallet är antingen radio eller checkbox
	inputElement.setAttribute("name", inputName); // inputName är ett arguemnt till funktionen och är frågans namn, t.ex. q3
	inputElement.value = inputValue; // inputValue är ett argument till funktionen och är frågans value (A, B, C, D)
	const labelElement = document.createElement("label");
	labelElement.classList.add("form-label");
	labelElement.innerText = labelText;
	wrapperElement.append(inputElement);
	wrapperElement.append(labelElement);
	return wrapperElement; // spottas ut där vi använder oss av getInputElement funktionen
};

// TYPER AV FRÅGOR

// True or False Frågor

const getTrueFalseQuestionElement = (question, index) => {
	const questionWrapper = getQuestionWrapperWithTitle(question, index);
	const trueInput = getInputElement(question.inputName, "A", "True", "radio");
	const falseInput = getInputElement(question.inputName, "B", "False", "radio");
	questionWrapper.append(trueInput);
	questionWrapper.append(falseInput);
	return questionWrapper;
};

// Multiple choice Frågor

const getMultipleChoiceQuestionElement = (question, index) => {
	const questionWrapper = getQuestionWrapperWithTitle(question, index);
	question.choices.forEach((choice) => {
		const inputElement = getInputElement(question.inputName, choice.value, choice.label, "radio");
		questionWrapper.append(inputElement);
	});
	return questionWrapper;
};

// Checkbox frågor

const getCheckboxQuestionElement = (question, index) => {
	const questionWrapper = getQuestionWrapperWithTitle(question, index);
	question.choices.forEach((choice) => {
		const inputElement = getInputElement(
			question.inputName,
			choice.value,
			choice.label,
			"checkbox"
		);
		questionWrapper.append(inputElement);
	});
	return questionWrapper;
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
		inputName: "q1",
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
		inputName: "q2",
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
		inputName: "q3",
		type: questionTypes.truefalse,
	},
	{
		text: "Fjärde Frågan?",
		answer: "B",
		inputName: "q4",
		type: questionTypes.truefalse,
	},
	{
		text: "Femte Frågan?",
		answer: "A",
		inputName: "q5",
		type: questionTypes.truefalse,
	},
	{
		text: "Sjätte Frågan?",
		answer: "B",
		inputName: "q6",
		type: questionTypes.truefalse,
	},
	{
		text: "Sjunde Frågan?",
		answer: "A",
		inputName: "q7",
		type: questionTypes.truefalse,
	},
	{
		text: "Åttonde Frågan?",
		answer: "B",
		inputName: "q8",
		type: questionTypes.truefalse,
	},
	{
		text: "Nionde Frågan?",
		answer: "A",
		inputName: "q9",
		type: questionTypes.truefalse,
	},
	{
		text: "Tionde Frågan",
		answer: ["B", "A"],
		inputName: "q10",
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

// Element från DOM:en att användas när man lämnar in svaret för att dölja frågorna (testcontainer) och visar resultatet (resultcontainer)

const testcontainer = document.querySelector(".test-container");
const resultcontainer = document.querySelector(".result-container");

// Element från DOM:en där resultat visas upp

const resultScore = document.querySelector(".score-container");
const resultText = document.querySelector(".answer-container");

// Resultat

const getValuesForCheckboxQuestion = (question) => {
	// Hämtar alla inputelement där namnet är q{questionIndex + 1} som även är ikryssade.
	const checkboxes = document.querySelectorAll(`input[name="${question.inputName}"]:checked`);
	// Vi plockar bara checkboxes som är checked
	let values = [];
	// För varje checkbox i checkboxes som är checked, ta det värdet(A, B, C, D) och lägg till det i values listan
	checkboxes.forEach((checkbox) => {
		values.push(checkbox.value);
	});
	return values;
};

// Den här funktionens funktion är att kolla så att listorna innehåller samma strängar.

const compareValueArrays = (values1, values2) => {
	// Är två listor av strängar
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
	// Dessa kommer att fyllas baserat på ens svar
	questions.forEach((question, index) => {
		if (question.type === questionTypes.checkbox) {
			// Hämtar svaren du fyllt i
			const values = getValuesForCheckboxQuestion(question);
			// Jämför svaren du fyllt i med frågans facit
			const isCorrect = compareValueArrays(values, question.answer);

			// Om isCorrect är true kör detta
			if (isCorrect) {
				// += vi ökar score med 100/q.length
				score += 100 / questions.length;
				answerString += `${index + 1}. ${question.text} : Rätt\n`;
			} else {
				answerString += `${index + 1}. ${question.text} : Fel\n`;
			}
		} else {
			// Om det inte är checkbox vet vi att det är radio buttons och endast ett korrekt svar
			//här kollar man frågans namn och kollar värdet som är ikryssat med det namnet.
			const formAnswer = form[question.inputName].value;
			if (formAnswer === question.answer) {
				score += 100 / questions.length;
				answerString += `${index + 1}. ${question.text} : Rätt\n`;
			} else {
				answerString += `${index + 1}. ${question.text} : Fel\n`;
			}
		}
	});

	testcontainer.classList.add("hidden");
	resultcontainer.classList.remove("hidden");
	// Används för att jag hade ett problem med att få resultatet att fada in snyggt. Jag ville göra display none på resultatet så att det inte
	// tar upp plats i layouten innan det ska visas men ville samtidigt att den skulle fada in när den visas, problemet är att om man tar bort
	// display none och lägger till opacity 1 samtidigt så triggas inte animationen från opacity 0 till opacity 1 så med setTimeout så kan man
	// först ta bort display none och därefter ändra opacity till 1 i två separata steg. Vilket gör att vi får vår önskade animation. Är det
	// någon annan som har en bättre lösning????????

	setTimeout(() => resultcontainer.classList.add("visible"), 0);

	// Här presenteras resultatet genom att lägga till vår text ifrån answerString med vilka frågor man har haft rätt och fel på.
	resultText.querySelector("p").innerText = answerString;

	// Här börjar vi animationen av resultatet i procentform.
	let output = 0;
	const timer = setInterval(() => {
		// math floor används för att avrunda ner talet för att inte få ett tal med många decimaler.
		resultScore.querySelector("span").textContent = `${Math.floor(output)}%`;
		resultScore.querySelector("span").style.color = getColorFromScore(Math.floor(output));
		if (output >= score) {
			clearInterval(timer);
		} else {
			output++;
		}
	}, 10);
});
