$(document).ready(function() {

	let userZip;

	

	const writeToDom = (results) => {
		let outputString = "";
		for (var i = 0; i < results.weather.length; i++) {
		outputString += `<h2>Current Weather: ${results.weather[i].description}</h2> `;
		}
		outputString += `<h4>Temperature: ${results.main.temp}</h4>`;
		outputString += `<h4>Air Pressure: ${results.main.pressure}</h4> `;
		outputString += `<h4>Wind Speed: ${results.wind.speed}</h4> `;
		outputString += `<a href="#" id="three-day-forcast">See the 3 day forcast</a>`;
		$('#weather-info').append(outputString);
	};

	const writeThreeDayDom = (results) => {
		console.log(results);
	};





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
			userZip = $('#zip').val();
			//need to vaildate zip
			loadWeather(userZip).then((results) => {
				writeToDom(results);
				}).catch((error) => {
					console.log(error);
				});
		}
	});

	$('#weather-info').on('click', 'a', () => {
		userZip = $('#zip').val();
		loadThreeDay(userZip).then((results) => {
			writeThreeDayDom(results);
			}).catch((error2) => {
				console.log(error2);
			});
	});

	const loadWeather = (zip) => {
		let apiCall = `http://api.openweathermap.org/data/2.5/weather?zip=37064,us&units=imperial&appid=${apiKey}`;
		console.log(apiCall);
		return new Promise ((resolve, reject) => {
			$.ajax(apiCall)
		.done((data) => resolve(data))
		.fail((error) => reject(error));
		});
	};


	const loadThreeDay = (zip) => {
		let apiCallThreeDay = `http://api.openweathermap.org/data/2.5/forecast?zip=37064,us&units=imperial&appid=${apiKey}`;
		return new Promise ((resolve, reject) => {
			$.ajax(apiCallThreeDay)
		.done((data2) => resolve(data2))
		.fail((error) => reject(error));
		});
	};
	
});

