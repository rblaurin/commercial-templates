// Webfonts
import { getIframeId, getWebfonts } from '../_shared/js/messages.js';
import { write } from '../_shared/js/dom.js';

// Loads the card data from CAPI in JSON format.
function retrieveCapiData () {

	// Do request stuff.
	var capiData = {};


}

// Constructs the title part of the card: headline and media icon.
function buildTitle (card, cardInfo) {

	let title = document.querySelector('.advert__title');

	if (cardInfo.isVideo) {
		title.insertAdjacentHTML('afterbegin', mediaIcons.video);
	} else if (cardInfo.isGallery) {
		title.insertAdjacentHTML('afterbegin', mediaIcons.video);
	} else if (cardInfo.isAudio) {
		title.insertAdjacentHTML('afterbegin', mediaIcons.volume);
	}

	title.textContent = cardInfo.headline;
	return card;

}

// Constructs an individual card.
function buildCard (cardInfo) {

	let cardTemplate = document.getElementById('paidfor-card');
	let card = document.importNode(cardTemplate.card, true);

	card = buildTitle(card, cardInfo);

	return card;

}

// Constructs an array of cards from an array of data.
function buildCards (cardsInfo) {

	let cardList = document.createDocumentFragment();

	cardsInfo.foreach(info => {
		cardList.appendChild(buildCard(info));
	});

	// DOM mutation function.
	return () => {

		let advertRow = document.getElementsByClassName('adverts__row')[0];
		advertRow.appendChild(cardList);

	};

}

// Inserts cards into the advert, retrieving their data from CAPI.
retrieveCapiData().then((data) => {
	return buildCards(data);
}).then(write).catch(err => {
	console.log(err);
});
