import { logs } from './logs.js';
import { player1, player2, createPlayer } from './players.js';
import { getRandom, createReloadButton, createElement } from './engine.js';
//console.log(logs);

export const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const $buttonWrap = document.querySelector('.buttonWrap .button');
console.log($buttonWrap);

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


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

const enemyAttack = () => {
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

$formFight.addEventListener('submit', (e) => {
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

function playerWins(name) {
	const $winTitle = createElement('div', 'loseTitle');
	$buttonWrap.disabled = true;
	//$buttonWrap.style.display = 'none';
	if (name) {
		$winTitle.innerText = name + ' wins';
	} else {
		$winTitle.innerText = 'TIE';
	}
	createReloadButton();
	$buttonWrap.style.display = 'none';
	return $winTitle;
}
