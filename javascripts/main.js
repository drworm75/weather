$(document).ready(function() {

	let apiKey = "58b63a593de911f64d9ac764e3786ada";
	let userZip = "";


	let cityID = "";

	const writeToDom = (results) => {
		cityID = results.id;
		let outputString = "";
		for (var i = 0; i < results.weather.length; i++) {
			outputString += `<h2>Current Weather: ${results.weather[i].main}</h2> `;
		}
		outputString += `<h4>Temperature: ${results.main.temp}</h4>`;
		outputString += `<h4>Air Pressure: ${results.main.pressure}</h4> `;
		outputString += `<h4>Wind Speed: ${results.wind.speed}</h4> `;
		outputString += `<ul>`;
		outputString += `<li><a href="#" class="forecast-days" name="1">See today's forcast</a></li>`;
		outputString += `<li><a href="#" class="forecast-days" name="3">See the 3 day forcast</a></li>`;
		outputString += `<li><a href="#" class="forecast-days" name="7">See the 7 day forcast</a></li>`;
		outputString += `</ul>`;
		$('#weather-info').append(outputString);
		console.log(cityID);
	};

	const writeForecast = (results) => {

		let forecastOutput = "";

		forecastOutput += `<div class="container">`;
		forecastOutput += `<div class="row">`;
		for (var i = 0; i < results.length; i++) {

			forecastOutput += `<div class="panel panel-primary col-sm-3">`;
			forecastOutput += `<div class="panel-heading ">${moment.unix(results[i].dt).format("dddd, MMMM D")}</div>`;
			forecastOutput += `<ul class="list-group">`;
			forecastOutput += `<li class="list-group-item">${results[i].weather[0].main}</li>`;
			forecastOutput += `<li class="list-group-item">High: ${Math.round(results[i].temp.max)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Low: ${Math.round(results[i].temp.min)}</li>`;

			forecastOutput += `</ul></div>`;
			if ((i+1) % 4 === 0) {
			forecastOutput += `</div>`;
			forecastOutput += `<div class="row">`;

			}
		}
	
	forecastOutput += `</div></div></div>`;
	$('#forecast').html(forecastOutput);
};

// <div class="panel panel-default">
//   <!-- Default panel contents -->
//   <div class="panel-heading">Panel heading</div>
//   <div class="panel-body">
//     <p>...</p>
//   </div>

//   <!-- List group -->
//   <ul class="list-group">
//     <li class="list-group-item">Cras justo odio</li>
//     <li class="list-group-item">Dapibus ac facilisis in</li>
//     <li class="list-group-item">Morbi leo risus</li>
//     <li class="list-group-item">Porta ac consectetur ac</li>
//     <li class="list-group-item">Vestibulum at eros</li>
//   </ul>
// </div>
  
    




		
	// 	console.log(results[i].weather[0].main);
	// 	console.log(results[i].temp.max);
	// 	console.log(results[i].temp.min);
	// 	console.log(results[i].pressure);
	// 	console.log(results[i].speed);
	// 	console.log();
	// 	}
	// };

// 	<table class="table">
//   ...
// </table>





	$('#zipbtn').on('click', () => {
		userZip = $('#zip').val();
		//Need to validate zip
		loadWeather(userZip).then((results) => {
			writeToDom(results);
			}).catch((error) => {
				console.log(error);
			});
	});


	$('#zip').on('keypress', (e) => {
		if (e.keyCode === 13) {
			console.log(cityID);
	// 		// userZip = $('#zip').val();
	// 		// //need to vaildate zip
	// 		// loadWeather(userZip).then((results) => {
	// 		// 	writeToDom(results);
	// 		// 	}).catch((error) => {
	// 		// 		console.log(error);
	// 		// 	});
		}
	});

	$('.output').on('click', '.forecast-days', (event) => {
		let days = event.target.name;
		loadForecast(days).then((results) => {
			writeForecast(results.list);
			}).catch((error2) => {
				console.log(error2);
			});
	});

	const loadWeather = (zip) => {
		console.log(zip);
		let apiCall = `http://api.openweathermap.org/data/2.5/weather?zip=${userZip},us&units=imperial&appid=${apiKey}`;
		console.log(apiCall);
		return new Promise ((resolve, reject) => {
			$.ajax(apiCall)
		.done((data) => resolve(data))
		.fail((error) => reject(error));
		});
	};


	const loadForecast = (count) => {
		console.log(`${count}`);
		let apiCallForecast = `http://api.openweathermap.org/data/2.5/forecast/daily?id=${cityID}&cnt=${count}&units=imperial&appid=${apiKey}`;
		return new Promise ((resolve, reject) => {
			$.ajax(apiCallForecast)
		.done((data2) => resolve(data2))
		.fail((error) => reject(error));
		});
	};

	$( function () {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		e.preventDefault();
	});

});

	// 	const loadForecast = (count) => {
	// 	let apiCallForecast = `http://api.openweathermap.org/data/2.5/forecast/daily?id=${cityID}&cnt=${count}&appid=${apiKey}`;
	// 	return new Promise ((resolve, reject) => {
	// 		$.ajax(apiCallForecast)
	// 	.done((forecast) => {
	// 		Object.keys(forecast).forEach((key) => {
	// 			console.log(key);
	// 		});

	// 		resolve()
	// 	})
	// 	.fail((error) => reject(error));
	// 	});
	// };

	// let items = [];
	// 	return new Promise ((resolve, reject) => {
	// 		$.ajax('./database/seed.json')
	// 		.done((data)=> {
	// 			let response = data.items;
	// 			Object.keys(response).forEach((key) => {
	// 				response[key].id = key;
	// 				items.push(response[key]);
	// 			});
	// 			FbApi.setTodos(items);
	// 			resolve();
	// 		})
	// 		.fail((error) => {
	// 			reject(error);			
	// 		});
		// });

	
});

