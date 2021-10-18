
const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapons: ['fist', 'leg', 'poisonspit'],
	attack: function () {
		console.log(player1.name + 'Fight...')
	},
}
const player2 = {
	player: 2,
	name: 'Subzero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapons: ['fist', 'leg', 'frostball'],
	attack: function () {
		console.log(player2.name + 'Fight...')
	},
}
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

function createElement(tag, className) {

	const $tag = document.createElement(tag);

	if (className) {
		$tag.classList.add(className);
	}

	return $tag;

};

function createPlayer(identificator) {

	const $player = createElement('div', 'player' + identificator.player);
	const $progressbar = createElement('div', 'progressbar');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $character = createElement('div', 'character');

	const $characterImg = createElement('img');

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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function hpRandomDamage(player) {
	player.hp -= Math.floor(Math.random() * 20 + 1);
	if (player.hp < 0) { player.hp = 0; }
	return player.hp
}

function changeHP(player) {

	const $playerLife = document.querySelector('.player' + player.player + ' .life');

	hpRandomDamage(player);

	$playerLife.style.width = player.hp + '%';
	console.log(player.name + ' ' + player.hp + ' hp ' + 'left');

}

$randomButton.addEventListener('click', function () {
	console.log('###: Click Random Button');
	changeHP(player1);
	changeHP(player2);
	announceWinner();
	if (player1.hp === 0 || player2.hp === 0) { $randomButton.disabled = true; }

	function announceWinner() {

		if (player1.hp === 0 && player2.hp === 0 && player1.hp === player2.hp) {
			$arenas.appendChild(itsTie());
		}
		else {
			if (player1.hp === 0 || player2.hp === 0 && player1.hp != player2.hp && player2.hp != player1.hp) {
				if (player1.hp < player2.hp && player1.hp === 0) {
					$arenas.appendChild(playerWins(player2.name));
				}
				else {
					$arenas.appendChild(playerWins(player1.name));
				}
			}
		}
	}


});

function playerWins(name) {

	const $winTitle = createElement('div', 'loseTitle');
	$winTitle.innerText = name + ' wins';

	return $winTitle;
}

function itsTie() {
	const $itsTie = createElement('div', 'loseTitle');
	$itsTie.innerText = 'TIE';
	return $itsTie;
}


