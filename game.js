import { logs } from './logs.js';
import Player from './player.js';
import { createElement } from './player.js';


let player1;
let player2;
export class Game {
	//constructor(props) {	}

	getPlayer = async () => {
		const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players', { method: 'GET' }).then(res => res.json());
		return body;
	};

	getEnemyPlayer = async () => {
		const enemyBody = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose', { method: 'GET' }).then(res => res.json());
		return enemyBody;
	};

	getEnemyAttack = async ({ hit, defence } = playerAttack()) => {
		const body = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
			method: 'POST',
			body: JSON.stringify({
				hit: hit,
				defence: defence,
			})
		});
		let result = await body.json();

		return result;
	};

	fight(result) {
		const { player1: { hit: hitEnemy, defence: DefenceEnemy, value: valueEnemy } } = result;
		const { player2: { hit: playerHit, defence: playerDefence, value: playerValue } } = result;
	};

	//получить {player1, player2} c АПИ и "деструктурировать" их по playerHit, playerDefence, playerValue, hitEnemy, defenceEnemy, valueEnemy — один вызов апи и ///деструктурирование

	start = async () => {

		const HIT = {
			head: 30,
			body: 25,
			foot: 20,
		}
		const ATTACK = ['head', 'body', 'foot'];
		const $arenas = document.querySelector('.arenas');
		const $formFight = document.querySelector('.control');
		const $chat = document.querySelector('.chat');
		const $buttonWrap = document.querySelector('.buttonWrap .button');
		const getRandom = (num) => Math.ceil(Math.random() * num);
		//console.log($buttonWrap);

		const players = await this.getPlayer();
		const enemyPLayer = await this.getEnemyPlayer();

		console.log('players:', players)
		console.log('enemyPLayer:', enemyPLayer)
		const p2 = enemyPLayer;
		console.log('p1, p2:', p2)

		const p1 = JSON.parse(localStorage.getItem('player1'));
		//const p1 = players[getRandom(players.length) - 1];
		console.log('p1:', p1)

		player1 = new Player({
			...p1,
			player: 1,
			rootSelector: 'arenas',
		});

		player2 = new Player({
			...p2,
			player: 2,
			rootSelector: 'arenas',
		});

		player1.createPlayer();
		player2.createPlayer();

		// let player1 = new Player({
		// 	player: 1,
		// 	name: 'Scorpion',
		// 	hp: 30,
		// 	img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
		// })

		// let player2 = new Player({
		// 	player: 2,
		// 	name: 'Subzero',
		// 	hp: 30,
		// 	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
		// })

		generateLogs('start', player1, player2);

		function generateLogs(type, { name, hp } = {}, { name: playerName2, hp: playerHp2 } = {}) {
			let text;
			let el;
			let currentTime = new Date().toLocaleTimeString().slice(0, 5);

			switch (type) {
				case 'hit':
					text = logs[type][getRandom(logs[type].length - 1)].replace('[playerKick]', name).replace('[playerDefence]', playerName2);
					el = `<p>${currentTime} ${text} -${enemyAttack().value}HP. ${playerName2} ${playerHp2}/100.</p>`;
					break;
				case 'defence':
					text = logs[type][getRandom(logs[type].length - 1)].replace('[playerKick]', playerName2).replace('[playerDefence]', name);
					el = `<p>${currentTime} ${text} -${playerAttack().value}HP. ${name} ${hp}/100.</p>`;
					break;
				case 'start':
					text = logs[type].replace('[time]', currentTime).replace('[player1]', name).replace('[player2]', playerName2);
					el = `<p>${text}</p>`;
					break;
				case 'draw':
					text = logs[type];
					el = `<p>${currentTime} ${text}</p>`;
					break;
				case 'end':
					text = logs[type][getRandom(logs[type].length - 1)].replace('[playerWins]', name).replace('[playerLose]', playerName2);
					el = `<p>${currentTime} ${text}</p>`;
					break;
			}
			$chat.insertAdjacentHTML('afterbegin', el);
		};

		$formFight.addEventListener('submit', (e) => {
			e.preventDefault();

			const { hit: hitEnemy, defence: DefenceEnemy, value: valueEnemy } = enemyAttack();
			const { hit: playerHit, defence: playerDefence, value: playerValue } = playerAttack();

			if (player1.hp != 0 || player2.hp != 0) {

				if (playerDefence !== hitEnemy) {
					player1.changeHP(valueEnemy);
					player1.renderHP();
					generateLogs('hit', player2, player1);
				}

				if (DefenceEnemy !== playerHit) {
					player2.changeHP(playerValue);
					player2.renderHP();
					generateLogs('hit', player1, player2);
				}
				showResult();
			}
		});

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

		// const enemyAttack = () => {
		// 	const hit = ATTACK[getRandom(3) - 1]
		// 	const defence = ATTACK[getRandom(3) - 1]
		// 	return {
		// 		value: getRandom(HIT[hit]),
		// 		hit,
		// 		defence,
		// 	}
		// };

		function showResult() {
			if (player1.hp === 0 && player2.hp > player1.hp) {
				generateLogs('end', player2, player1);
				$arenas.appendChild(playerWins(player2.name));
			}

			else if (player2.hp === 0 && player2.hp < player1.hp) {
				generateLogs('end', player1, player2);
				$arenas.appendChild(playerWins(player1.name));
			}
			else if (player1.hp === 0 && player2.hp === 0) {
				generateLogs('draw');
				$arenas.appendChild(playerWins());

			}
		}

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
		};

		function createReloadButton() {
			const $reloadDiv = createElement('div', 'reloadWrap');
			const $reloadButton = createElement('button', 'button');
			$reloadButton.innerText = 'Restart';
			$reloadDiv.appendChild($reloadButton);
			$arenas.appendChild($reloadDiv);

			$reloadButton.addEventListener('click', () => {
				window.location.pathname = '/SelectPlayer/index.html';
				//window.location.reload();
			});
		}
	};
};