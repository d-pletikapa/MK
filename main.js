
const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 100,
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP,
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
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP,
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


function changeHP(getRandom) {
	//player.hp -= Math.floor(Math.random() * 20 + 1);

	this.hp -= getRandom;
	if (this.hp < 0) { this.hp = 0; }
	console.log(this.name + ' ' + this.hp + ' hp ' + 'left');
	return this.hp;


}


function elHP() {
	return document.querySelector('.player' + this.player + ' .life');

}


function renderHP() {
	console.log(this.elHP());
	this.elHP().style.width = this.hp + '%';
	return this.elHP;


}

$randomButton.addEventListener('click', function () {
	console.log('###: Click Random Button');

	player1.changeHP(20);
	player2.changeHP(20);

	player1.renderHP();
	player2.renderHP();

	player1.elHP();
	player2.elHP();


	if (player1.hp === 0 || player2.hp === 0) { $randomButton.disabled = true; createReloadButton(); }

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
	}
	else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) { $arenas.appendChild(playerWins()); }

});

// Task #2
function createReloadButton() {
	const $reloadDiv = createElement('div', 'reloadWrap');
	const $reloadButton = createElement('button', 'button');
	$reloadButton.innerText = 'Restart';
	$reloadDiv.appendChild($reloadButton);
	$arenas.appendChild($reloadDiv);
	$reloadButton.addEventListener('click', function () {
		window.location.reload();
	});
}


function playerWins(name) {

	const $winTitle = createElement('div', 'loseTitle');

	if (name) {
		$winTitle.innerText = name + ' wins';
	} else {
		$winTitle.innerText = 'TIE';
	}
	return $winTitle;
}

