const express = require('express');
const axios = require('axios');

//Mongo Model

const User = require('../models/User');

const router = express.Router();

router.get('/register', (req,res) => res.render('register'));

//function for saving data

const login = async (serverurl,username, password) =>
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

router.post('/register', async (req,res) => {
    const { serverurl, servername, username, password} = req.body;
	
	var loginData = await login(serverurl,username,password);
	
	if(loginData.status == 'true'){

		var userid = loginData.userId;
		var authtoken = loginData.authToken;
		const _id = Math.floor(100000 + Math.random() * 900000);

		const newUser = new User({
			_id,serverurl,servername,username,password,userid,authtoken
		},{ expireAfterSeconds: 3600 });
	
		console.log(newUser);

		//var uid = 135131;
		// User.findOne({_id : '266929'})
		// .then(user =>{
		// 	console.log(user);
		// })
		// .catch(err => {
		// 	console.log(err)
		// })

		res.send(`Data Stored at: ${_id}`);

		
	} else {
		res.send('Sorry Authorisation Failed. Please check your data and try again');
	}
    

});

module.exports = router;