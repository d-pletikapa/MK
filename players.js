import { changeHP, elHP, renderHP, createElement } from './engine.js';
export const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 30,
	changeHP,
	elHP,
	renderHP,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapons: ['fist', 'leg', 'poisonSpit'],
	attack: function () {
		console.log(player1.name + 'Fight...')
	},
}
export const player2 = {
	player: 2,
	name: 'Subzero',
	hp: 30,
	changeHP,
	elHP,
	renderHP,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapons: ['fist', 'leg', 'frostBall'],
	attack: function () {
		console.log(player2.name + 'Fight...')
	},
}

export function createPlayer(playerId) {
	const $player = createElement('div', 'player' + playerId.player);
	const $progressbar = createElement('div', 'progressbar');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $character = createElement('div', 'character');
	const $characterImg = createElement('img');
	$player.appendChild($character);
	$player.appendChild($progressbar);
	$character.appendChild($characterImg);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);

	$characterImg.src = playerId.img;
	$life.style.width = playerId.hp;
	$name.innerText = playerId.name;

	return $player;
}