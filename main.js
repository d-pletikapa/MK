const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const player1 = {
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
const player2 = {
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

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

generateLogs('start', player1.name, player2.name);

function generateLogs(type, player1, player2) {
	let text;
	let el;
	let currentTime = new Date().toLocaleTimeString().slice(0, 5);
	/*let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	let currentTime = `${hours}:${minutes}:${seconds}`;
	*/

	switch (type) {
		case 'hit':
			text = logs[type][getRandom(logs[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
			el = `<p>${currentTime} ${text} -${enemyAttack().value}HP. ${player2.name} ${player2.hp}/100.</p>`;
			break;
		case 'defence':
			text = logs[type][getRandom(logs[type].length - 1)].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
			el = `<p>${currentTime} ${text} -${playerAttack().value}HP. ${player1.name} ${player1.hp}/100.</p>`;
			break;
		case 'start':
			text = logs[type].replace('[time]', currentTime).replace('[player1]', player1).replace('[player2]', player2);
			el = `<p>${text}</p>`;
			break;
		case 'draw':
			text = logs[type];
			el = `<p>${currentTime} ${text}</p>`;
			break;
		case 'end':
			text = logs[type][getRandom(logs[type].length - 1)].replace('[playerWins]', player1).replace('[playerLose]', player2);
			el = `<p>${currentTime} ${text}</p>`;
			break;
	}
	$chat.insertAdjacentHTML('afterbegin', el);
};


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

function createPlayer(playerId) {
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
};

function playerAttack() {
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

	return attack;
};

function showResult() {
	if (player1.hp === 0 && player2.hp > player1.hp) {
		generateLogs('end', player2.name, player1.name);
		$arenas.appendChild(playerWins(player2.name));
	}

	else if (player2.hp === 0 && player2.hp < player1.hp) {
		generateLogs('end', player1.name, player2.name);
		$arenas.appendChild(playerWins(player1.name));
	}
	else if (player1.hp === 0 && player2.hp === 0) {
		generateLogs('draw');
		$arenas.appendChild(playerWins());

	}
}

$formFight.addEventListener('submit', function (e) {
	e.preventDefault();
	const enemy = enemyAttack();
	const player = playerAttack();

	if (player1.hp != 0 || player2.hp != 0) {

		if (player.defence !== enemy.hit) {
			player1.changeHP(player.value);
			player1.renderHP();
			generateLogs('hit', player2, player1);
		}

		if (enemy.defence !== player.hit) {
			player2.changeHP(enemy.value);
			player2.renderHP();
			generateLogs('hit', player1, player2);
		}
		showResult();
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
	this.elHP().style.width = this.hp + '%';
}

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
