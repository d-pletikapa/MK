export class Player {
	constructor(props) {
		//console.log(props);
		this.player = props.player;
		this.name = props.name;
		this.hp = props.hp;
		this.img = props.img;
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