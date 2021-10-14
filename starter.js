const cardsArray = [
	{
		name: "fire",
		img: "img/fire.png",
	},
	{
		name: "youtube",
		img: "img/youtube.png",
	},
	{
		name: "flash",
		img: "img/flash.png",
	},
	{
		name: "gift",
		img: "img/gift.png",
	},
	{
		name: "tron",
		img: "img/tron.png",
	},
	{
		name: "ufo",
		img: "img/ufo.png",
	},
	{
		name: "plant",
		img: "img/plant.png",
	},
	{
		name: "burger",
		img: "img/burger.png",
	},
];
const grid = document.querySelector(".grid");
let count = 0;
let previousCard;
let firstGuess = "";
let secondGuess = "";
let delay = 1000;

function generateCard() {
	//reset innerHtml
	grid.innerHTML = "";
	const cardMerge = cardsArray
		.concat(cardsArray)
		.sort(() => 0.5 - Math.random());
	cardMerge.forEach((item) => {
		console.log(item);
		const card = document.createElement("div");
		card.classList.add("card");
		card.dataset.name = item.name;

		//front
		const front = document.createElement("div");
		front.classList.add("front");

		//back
		const back = document.createElement("div");
		back.classList.add("back");

		back.style.backgroundImage = `url(${item.img})`;

		card.appendChild(front);
		card.appendChild(back);
		grid.appendChild(card);
	});
}
generateCard();
function matchingCard() {
	const selects = document.querySelectorAll(".selected");

	[...selects].forEach((item) => item.classList.add("matched"));
}
function resetGuess() {
	count = 0;
	previousCard = null;
	firstGuess = "";
	secondGuess = "";
	const selects = document.querySelectorAll(".selected");

	[...selects].forEach((item) => item.classList.remove("selected"));
	const matchedAll = document.querySelectorAll(".matched");
	const cardLength = document.querySelectorAll(".card").length;

	if (matchedAll.length === cardLength) {
		setTimeout(
			matchedAll.forEach((item) => item.classList.remove("matched")),
			1000
		);
		setTimeout(generateCard, delay);
	}
}
grid.addEventListener("click", function (e) {
	const clicked = e.target;
	if (
		clicked.nodeName === "SECTION" ||
		previousCard === clicked ||
		clicked.parentNode.classList.contains("selected") ||
		clicked.parentNode.classList.contains("matched")
	) {
		return;
	}
	if (count < 2) {
		count++;
		if (count === 1) {
			firstGuess = clicked.parentNode.dataset.name;
			clicked.parentNode.classList.add("selected");
		} else {
			secondGuess = clicked.parentNode.dataset.name;
			clicked.parentNode.classList.add("selected");
		}
		if (firstGuess && secondGuess) {
			if (firstGuess === secondGuess) {
				setTimeout(matchingCard, delay);
			}
			setTimeout(resetGuess, delay);
		}

		previousCard = clicked;
	}
});
