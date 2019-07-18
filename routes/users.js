const express = require('express');
const axios = require('axios');

//Mongo Model

const User = require('../models/user');

const router = express.Router();

router.get('/register', (req, res) => res.render('register'));

// Login Function

const login = async (serverurl, username, password) =>
	await axios
	.post(`${ serverurl }/api/v1/login`, {
		user: username,
		password: password,
	})
	.then((res) => res.data)
	.then((res) => {
		console.log(res);

		return {
			status: 'true',
			authToken: res.data.authToken,
			userId: res.data.userId
		};

	})
	.catch((err) => {
		console.log(err);
		return {
			status: 'false',
		}
	});


//Register Handle

router.post('/register', async (req, res) => {
	const {
		serverurl,
		servername,
		username,
		password
	} = req.body;

	var loginData = await login(serverurl, username, password);

	if (loginData.status == 'true') {

		var userid = loginData.userId;
		var authtoken = loginData.authToken;
		const _id = Math.floor(100000 + Math.random() * 900000);

		const newUser = new User({
			_id,
			serverurl,
			servername,
			userid,
			authtoken
		});

		newUser.save()
			.then(user => console.log(user))
			.catch(err => console.log(err));

		console.log(newUser);

		const result = JSON.stringify({
			code: _id,
			expiry: 5,
			status: true
		})

		const responseData = JSON.parse(result);

		res.status(200).send(responseData);


	} else {

		const result = JSON.stringify({
			error: `Authentication Error`,
			status: false
		})

		const responseData = JSON.parse(result);

		res.status(200).send(responseData);
	}


});

router.get('/data', (req, res) => {
	
	//console.log(req.query.qcode);

	const qcode = req.query.qcode;

	User.findOne({
			_id: qcode
		})
		.then(data => {

			if(data){

				const result = JSON.stringify({
					data: data,
					status: true
				});
				const responseData = JSON.parse(result);
	
				res.status(200).send(responseData);

			}
			else {

				const result = JSON.stringify({
					error: `No Record Found`,
					status: false
				})
	
				const responseData = JSON.parse(result);
	
				res.send(responseData);

			}

		})
		.catch(err => {
			console.log(err);
		});

})



module.exports = router;