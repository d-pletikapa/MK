import { $arenas, } from './main.js';

function changeHP(getRandom) {
	//player.hp -= Math.floor(Math.random() * 20 + 1);
	this.hp -= getRandom;
	if (this.hp < 0) { this.hp = 0; }
	console.log(this.name + ' ' + this.hp + ' hp ' + 'left');
	return this.hp;
};

function elHP() {
	return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
	this.elHP().style.width = this.hp + '%';
}

const getRandom = (num) => Math.ceil(Math.random() * num);

export function createReloadButton() {
	const $reloadDiv = createElement('div', 'reloadWrap');
	const $reloadButton = createElement('button', 'button');
	$reloadButton.innerText = 'Restart';
	$reloadDiv.appendChild($reloadButton);
	$arenas.appendChild($reloadDiv);

	$reloadButton.addEventListener('click', () => {
		window.location.reload();
	});
}

export const createElement = (tag, className) => {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
};

export { changeHP, elHP, renderHP, getRandom };