const player1 = {
	player: 1,
	name: 'Scorpion',
	hp: 30,
	changeHP,
	elHP,
	renderHP,
	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapons: ['fist', 'leg', 'poisonspit'],
	attack: function () {
		console.log(player1.name + 'Fight...')
	},
}
const player2 = {
	player: 2,
	name: 'Subzero',
	hp: 30,
	changeHP,
	elHP,
	renderHP,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapons: ['fist', 'leg', 'frostball'],
	attack: function () {
		console.log(player2.name + 'Fight...')
	},
}
const $arenas = document.querySelector('.arenas');
//const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];


function getRandom(num) {
	return Math.ceil(Math.random() * num);
}

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

function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1]
	const defence = ATTACK[getRandom(3) - 1]
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence,
	}

	//console.log('###: hit', hit);
	//console.log('###: defence', defence);
};

$formFight.addEventListener('submit', function (e) {
	e.preventDefault();
	//console.dir($formFight);
	const enemy = enemyAttack();
	//console.log('###: enemy', enemy);

	const attack = {};
	//console.dir(item);
	for (let item of $formFight) {
		if (item.checked && item.name === 'hit') {
			attack.value = getRandom(HIT[item.value]);
			attack.hit = item.value;
		}
		if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		}
		item.checked = false;
	}
	console.log('###: a', attack);
	console.log('###: e', enemy);
	console.log(attack.value)
	console.log(enemy.value)

	// Проверка защиты
	if (attack.hit === enemy.defence) {
		attack.value = 0;
	}

	else if (enemy.hit === attack.defence) {
		enemy.value = 0;
	};
	console.log(attack.value)
	console.log(enemy.value)

	if (player1.hp != 0 || player2.hp != 0) {

		player1.changeHP(attack.value);
		//console.log('### Scorpion Enemy ' + 'deals ' + enemy.value)
		player1.changeHP.call(player2, enemy.value);
		elHP.call(player1);
		elHP.call(player2);
		player1.renderHP();
		player2.renderHP();
		//console.log('### Subzero Atacker ' + 'deals ' + attack.value)
	}

	if (player1.hp === 0 && player2.hp > player1.hp) {
		$arenas.appendChild(playerWins(player2.name));
	}

	else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
	}
	else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWins());

	}
});

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
	//console.log(this.elHP());
	this.elHP().style.width = this.hp + '%';
}

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
	createReloadButton();
	return $winTitle;
}