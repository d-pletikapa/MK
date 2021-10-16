//HomeWork #2 task 1
let player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapons: ['fist', 'leg', 'poisonspit'],
	attack: function () {
		console.log(player1.name + 'Fight...')
	},
}
let player2 = {
	player: 2,
	name: 'Subzero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapons: ['fist', 'leg', 'frostball'],
	attack: function () {
		console.log(player2.name + 'Fight...')
	},
}

//HomeWork #3

const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

function changeHP(player) {

	const $playerLife = document.querySelector('.player' + player.player + ' .life');

	hpRandomDamage(player); //HomeWork #3 task 2  ---Math.ceil(Math.random() * 10); or Math.floor(Math.random() * 10 + 1)

	if (player.hp < 0) { player.hp = 0; } //HomeWork #3 Task #1 say no to negative player`s hp

	$playerLife.style.width = player.hp + '%';
	console.log(player.name + ' ' + player.hp + ' hp ' + 'left');

	announceWinner(player); 	//HomeWork #3 Task #3

}

//HomeWork #3 task 2  ---Math.ceil(Math.random() * 10); or Math.floor(Math.random() * 10 + 1)

function hpRandomDamage(player) {
	player.hp -= Math.floor(Math.random() * 20 + 1);
}

//HomeWork #3 Task #3

function announceWinner(player) {
	if (player.hp <= 0) {
		if (player1.hp < player2.hp) {
			$arenas.appendChild(playerWins(player2.name));
			$randomButton.disabled = true;
		}
		else {
			$arenas.appendChild(playerWins(player1.name));
			$randomButton.disabled = true;
		}
	}
}

function playerWins(name) {

	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = name + ' wins';

	return $loseTitle;
}

$randomButton.addEventListener('click', function () {
	console.log('###: Click Random Button');

	changeHP(player1);
	changeHP(player2);

});

//HomeWork #3 pre-task 2

function createElement(tag, className) {

	const $tag = document.createElement(tag);

	if (className) {
		$tag.classList.add(className);
	}

	return $tag;

};

//HomeWork #2 task 2

function createPlayer(identificator) {

	let $player = createElement('div', 'player' + identificator.player);
	let $progressbar = createElement('div', 'progressbar');
	let $life = createElement('div', 'life');
	let $name = createElement('div', 'name');
	let $character = createElement('div', 'character');

	let $characterImg = createElement('img');

	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($characterImg);

	$characterImg.src = identificator.img;
	$life.style.width = identificator.hp;
	$name.innerText = identificator.name;

	//$arenas.appendChild($player); => return $player;
	return $player;
}

//HomeWork #2 task 3

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
