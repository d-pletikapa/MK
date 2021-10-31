// const q = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players'/*, {//method: 'GET',//method: 'POST',}*/);
// console.log('q:', q)
// q.then(response => {
// 	console.log(response)
// 	return response.json();
// }).then(data => { console.log(data), players = data });
// console.log('players:', players)

// async function getPlayers() {
// 	console.log('Start:');
// 	const q = new Promise(resolve => setTimeout(() => resolve(), 5000));
// 	console.log('Wait:');
// 	await q;
// 	console.log('Finish:');
// };

// getPlayers();


// const q = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players', {//method: 'GET',//method: 'POST',});
// 	console.log('q:', q)
// q.then(response => {
// 		console.log(response)
// 		return response.json();
// 	}).then(data => { console.log(data), players = data });



// 	async function getPlayers() {
// 	const q = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players');
// 	const body = await q.json();
// 	console.log('body:', body);
// 	return body;

// 	getPlayers();


// // 9 - е Задание
// console.log('Start');

// 	setTimeout(function() {
// 		console.log('Continue');
// 	}, 2000);
// console.log('Finish');

// const q = new Promise(function (resolve, reject) {

// 	const data = {
// 		status: 200,
// 		msg: 'Sucsess'
// 	};
// 	resolve(data);
// 	reject('SOme error');
// });

// console.log('q:', q);

// q/*.catch(function (err) { console.log(err); })*/.then(function (data) {
// 	console.log('data:', data)

// 	const clientData = {
// 		...data,
// 		name: 'Den',
// 	};

// 	return clientData;

// }).then(function (clientData) {
// 	console.log('clientData:', clientData);
// }
// ).catch(function (err) { console.log(err); });
