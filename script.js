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

// ------------------------------- NEW CODE ------------------------------- //
