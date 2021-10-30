import { logs } from './logs.js';
import { Player } from './player.js';
export class Game {
	//constructor(props) {	}
	start = () => {
		const $arenas = document.querySelector('.arenas');
		const $formFight = document.querySelector('.control');
		const $chat = document.querySelector('.chat');
		const $buttonWrap = document.querySelector('.buttonWrap .button');
		const getRandom = (num) => Math.ceil(Math.random() * num);
		//console.log($buttonWrap);

		const player1 = new Player({
			player: 1,
			name: 'Scorpion',
			hp: 30,
			img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
		})

		const player2 = new Player({
			player: 2,
			name: 'Subzero',
			hp: 30,
			img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
		})

		const createElement = (tag, className) => {
			const $tag = document.createElement(tag);
			if (className) {
				$tag.classList.add(className);
			}
			return $tag;
		};

		function createPlayer({ player, hp, name, img }) {
			const $player = createElement('div', 'player' + `${player}`);
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

			$characterImg.src = img;
			$life.style.width = hp;
			$name.innerText = name;

			return $player;
		}

		$arenas.appendChild(createPlayer(player1));
		$arenas.appendChild(createPlayer(player2));

		const HIT = {
			head: 30,
			body: 25,
			foot: 20,
		}

		const ATTACK = ['head', 'body', 'foot'];

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
			const { hit, defence, value } = playerAttack();

			if (player1.hp != 0 || player2.hp != 0) {

				if (defence !== hitEnemy) {
					player1.changeHP(valueEnemy);
					player1.renderHP();
					generateLogs('hit', player2, player1);
				}

				if (DefenceEnemy !== hit) {
					player2.changeHP(value);
					player2.renderHP();
					generateLogs('hit', player1, player2);
				}
				showResult();
			}
		});

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
				window.location.reload();
			});
		}

	};
};