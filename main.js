// task 1
let player1 = {
	name: 'Scorpion',
	hp: 50,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapons: ['fist', 'leg', 'poisonspit'],
	attack: function () {
		console.log(player1.name + 'Fight...')
	},
}
let player2 = {
	name: 'Subzero',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapons: ['fist', 'leg', 'frostball'],
	attack: function () {
		console.log(player2.name + 'Fight...')
	},
}

const $arenas = document.querySelector('.arenas')

// task 2
function createPlayer(player, identificator) {
	//player
	let $player = document.createElement('div');
	$player.classList.add(player);

	let $progressbar = document.createElement('div');
	$progressbar.classList.add('progressbar');

	let $life = document.createElement('div');
	$life.classList.add('life');
	$life.style.width = identificator.hp, '100%';

	let $name = document.createElement('div');
	$name.classList.add('name');
	$name.innerText = identificator.name;

	let $character = document.createElement('div');
	$character.classList.add('character');
	let $characterImg = document.createElement('img');
	$characterImg.src = identificator.img;

	$player.appendChild($progressbar);
	$player.appendChild($character);

	$progressbar.appendChild($life);
	$progressbar.appendChild($name);

	$character.appendChild($characterImg);

	$arenas.appendChild($player);

}

//task 3

createPlayer('player1', player1);
createPlayer('player2', player2);


