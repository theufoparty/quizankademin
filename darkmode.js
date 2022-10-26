// ------------------------------- DARKMODE ------------------------------- //

const darkModeClassName = "darkmode";

const darkModeToggle = document.querySelector("#dark-mode-button");

const disableDarkMode = () => {
	document.body.classList.remove(darkModeClassName);
};

const enableDarkMode = () => {
	document.body.classList.add(darkModeClassName);
};

darkModeToggle.addEventListener("click", () => {
	const hasDarkmode = document.body.classList.contains(darkModeClassName);
	if (hasDarkmode) {
		disableDarkMode();
	} else {
		enableDarkMode();
	}
});
