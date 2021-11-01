export const createElement = (tag, className) => {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
};

export default class Player {
	constructor(props) {
		//console.log(props);
		this.player = props.player;
		this.name = props.name;
		this.hp = props.hp;
		this.img = props.img;
		this.rootSelector = props.rootSelector;
	};

	createPlayer = () => {
		const $arenas = document.querySelector(`.${this.rootSelector}`);
		const $player = createElement('div', `player${this.player}`);
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

		$characterImg.src = this.img;
		$life.style.width = this.hp;
		$name.innerText = this.name;
		$arenas.appendChild($player);
	};

	elHP = () => {
		return document.querySelector(`.player${this.player} .life`);
	}

	changeHP = (getRandom) => {
		//player.hp -= Math.floor(Math.random() * 20 + 1);
		this.hp -= getRandom;
		if (this.hp < 0) { this.hp = 0; }
		//console.log(this.name + ' ' + this.hp + ' hp ' + 'left');
		return this.hp;
	};

	renderHP = () => {
		this.elHP().style.width = this.hp + '%';
	};

	attack = () => {
		console.log(this.name + 'Fight...');
	};
};

