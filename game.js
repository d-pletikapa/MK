import { logs } from './logs.js';
import Player from './player.js';
import { createElement } from './player.js';
const $chat = document.querySelector('.chat');
const random = (num) => Math.ceil(Math.random() * num);
const $arenas = document.querySelector('.arenas');
//const ATTACK = ['head', 'body', 'foot'];
const $formFight = document.querySelector('.control');
const $buttonWrap = document.querySelector('.buttonWrap .button');
//console.log($buttonWrap);
const HIT = {
	head: 30,
	body: 25,
	foot: 20,
}

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

	getEnemyAttack(hit, defence) {

		return fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
			method: 'POST',
			body: JSON.stringify({
				hit: hit,
				defence: defence,
			})
		}).then(res => res.json().catch(error => console.log(error.message)));
	};

	fight = async () => {
		const { player1, player2 } = await this.getEnemyAttack();
		console.log(player1, player2);
	};

	generateLogs = (type, { name, hp } = {}, { name: playerName2, hp: playerHp2 } = {}, valueEn) => {
		let text;
		let el;
		let currentTime = new Date().toLocaleTimeString().slice(0, 5);

		switch (type) {
			case 'hit':
				text = logs[type][random(logs[type].length - 1)].replace('[playerKick]', name).replace('[playerDefence]', playerName2);
				el = `<p>${currentTime} ${text} -${valueEn}HP. ${playerName2} ${playerHp2}/100.</p>`;
				break;
			case 'defence':
				text = logs[type][random(logs[type].length - 1)].replace('[playerKick]', playerName2).replace('[playerDefence]', name);
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
				text = logs[type][random(logs[type].length - 1)].replace('[playerWins]', name).replace('[playerLose]', playerName2);
				el = `<p>${currentTime} ${text}</p>`;
				break;
		}
		$chat.insertAdjacentHTML('afterbegin', el);
	};

	showResult = () => {
		if (this.player1.hp === 0 && this.player2.hp > this.player1.hp) {
			this.generateLogs('end', this.player2, this.player1);
			$arenas.appendChild(this.playerWins(this.player2.name));
		}

		else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
			this.generateLogs('end', this.player1, this.player2);
			$arenas.appendChild(this.playerWins(this.player1.name));
		}
		else if (this.player1.hp === 0 && this.player2.hp === 0) {
			this.generateLogs('draw');
			$arenas.appendChild(this.playerWins());

		}
	}

	playerWins = (name) => {
		const $winTitle = createElement('div', 'loseTitle');
		$buttonWrap.disabled = true;
		//$buttonWrap.style.display = 'none';
		if (name) {
			$winTitle.innerText = name + ' wins';
		} else {
			$winTitle.innerText = 'TIE';
		}
		this.createReloadButton();
		$buttonWrap.style.display = 'none';
		return $winTitle;
	};


	createReloadButton = () => {
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

	start = async () => {

		const players = await this.getPlayer();  //console.log('players:', players) 	
		const enemyPLayer = await this.getEnemyPlayer();		//console.log('enemyPLayer:', enemyPLayer)

		const p1 = JSON.parse(localStorage.getItem('player1'));
		const p2 = enemyPLayer;  	 //console.log('p1, p2:', p2)

		this.player1 = new Player({
			...p1,
			player: 1,
			rootSelector: 'arenas',
		});

		this.player2 = new Player({
			...p2,
			player: 2,
			rootSelector: 'arenas',
		});

		this.player1.createPlayer();
		this.player2.createPlayer();


		//const p1 = players[random(players.length) - 1];  //console.log('p1:', p1)

		this.generateLogs('start', this.player1, this.player2);

		$formFight.addEventListener('submit', async (e) => {
			e.preventDefault();

			this.playerAttack = () => {
				const attack = {};
				//console.dir(item);
				for (let item of $formFight) {
					if (item.checked && item.name === 'hit') {
						attack.value = random(HIT[item.value]);
						attack.hit = item.value;
					}
					if (item.checked && item.name === 'defence') {
						attack.defence = item.value;
					}
					item.checked = false;
				}
				return attack;
			};
			//const { hit: hitEnemy, defence: DefenceEnemy, value: valueEnemy } = enemyAttack();
			//const { hit: playerHit, defence: playerDefence, value: playerValue } = playerAttack();
			const { hit, defence } = this.playerAttack();

			const {
				player1: {
					hit: playerHit,
					value: playerValue,
					defence: playerDefence
				},
				player2: {
					hit: hitEnemy,
					value: valueEnemy,
					defence: DefenceEnemy
				},
			} = await
					this.getEnemyAttack(hit, defence);
			//player2 = { value: this.getEnemyAttack().valueEnemy };

			const data = await this.getEnemyAttack(hit, defence);
			console.log(data)

			if (this.player1.hp != 0 || this.player2.hp != 0) {

				if (playerDefence !== hitEnemy) {
					this.player1.changeHP(valueEnemy);
					this.player1.renderHP();
					this.generateLogs('hit', this.player2, this.player1, valueEnemy);
				}

				if (DefenceEnemy !== playerHit) {
					this.player2.changeHP(playerValue);
					this.player2.renderHP();
					this.generateLogs('hit', this.player1, this.player2, playerValue);
				}
				this.showResult();
			}
		});
	};
};



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

				// const enemyAttack = () => {
		// 	const hit = ATTACK[random(3) - 1]
		// 	const defence = ATTACK[random(3) - 1]
		// 	return {
		// 		value: random(HIT[hit]),
		// 		hit,
		// 		defence,
		// 	}
		// };