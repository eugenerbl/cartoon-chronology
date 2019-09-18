const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');
container.setAttribute('id', 'cartoons');
app.appendChild(container);

// XMLHttpRequest to retrieve Excel file
var url = "cartoons.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

// loading Excel file
oReq.onload = function(e)
{
	var arraybuffer = oReq.response;

	/* convert data to binary string */
	var data = new Uint8Array(arraybuffer);
	var arr = new Array();
	for (var i = 0; i != data.length; ++i)
		arr[i] = String.fromCharCode(data[i]);
	var bstr = arr.join("");

	/* call Excel file */
	var workbook = XLSX.read(bstr, { type: "binary" });
	
	/* get worksheet */
	var first_sheet_name = workbook.SheetNames[0];
	var worksheet = workbook.Sheets[first_sheet_name];
	var values = XLSX.utils.sheet_to_json(worksheet, { raw: true });
	
	// create information for each cartoon
	values.forEach(cartoon =>
	{
		// button that activates modal
		const button = document.createElement('button');
		button.setAttribute('class', 'trigger');
		button.alt = cartoon.Title;
		
		// set the image as the button's background
		// first, check if the image field on the Excel file is filled
		// also check if the image url exists on the Internet
		// if no image found, defaults to gradient background and title
		var image = cartoon.Image;
		if(image != null && imageExists("url('"+ image +"')"))
			button.style.backgroundImage = "url('"+ image +"')";
		else
			button.textContent = cartoon.Title;
		
		// main modal
		const modal = document.createElement('div');
		modal.setAttribute('class', 'modal');
		// contains information
		const content = document.createElement('div');
		content.setAttribute('class', 'modal-content');
		// close button
		const close = document.createElement('span');
		close.setAttribute('class', 'close-button');
		close.textContent = '×';
		
		// add modal to page
		container.appendChild(button);
		container.appendChild(modal);
		modal.appendChild(content);
		content.appendChild(close);
		
		
		// various information seen from json
		const title = document.createElement('h2');
		title.setAttribute('class', 'title');
		title.textContent = cartoon.Title;
		
		const create = document.createElement('p');
		create.setAttribute('class', 'creator');
		create.textContent = 'Created by: ' + cartoon.Creator;
		
		const describe = document.createElement('p');
		describe.setAttribute('class', 'description');
		describe.textContent = cartoon.Description;
		
		const airtime = document.createElement('p');
		airtime.setAttribute('class', 'airtime');
		// use different formats if show is still airing
		if(cartoon.EndYear == null)
			airtime.textContent = 'Airtime: ' + cartoon.StartYear + " - Present";
		else
			airtime.textContent = 'Airtime: ' + cartoon.StartYear + " - " + cartoon.EndYear;
		
		const genre = document.createElement('p');
		genre.setAttribute('class', 'genre');
		genre.textContent = 'Genre: ' + cartoon.Genre;
		
		const seasons = document.createElement('p');
		seasons.setAttribute('class', 'seasons');
		seasons.textContent = 'Number of Seasons: ' + cartoon.Seasons;
		
		const episodes = document.createElement('p');
		episodes.setAttribute('class', 'episodes');
		episodes.textContent = 'Number of Episodes: ' + cartoon.Episodes;
		
		const network = document.createElement('p');
		network.setAttribute('class', 'network');
		network.textContent = 'Network: ' + cartoon.Network;
		
		// add information to modal
		content.appendChild(title);
		content.appendChild(create);
		content.appendChild(describe);
		content.appendChild(airtime);
		content.appendChild(genre);
		content.appendChild(seasons);
		content.appendChild(episodes);
		content.appendChild(network);
	});

	// acquire all modals
	var modals = document.getElementsByClassName("modal");
	var btns   = document.getElementsByClassName("trigger");
	var close  = document.getElementsByClassName("close-button");

	// open correct modal when clicking button
	for (let i = 0; i < btns.length; i++)
	{
		btns[i].addEventListener('click', function()
		{
			modals[i].style.display = "block";
			modals[i].classList.toggle("show-modal");	// should turn on modal
		})
	}

	// closes modal when clicking outside modal
	for (let i = 0; i < btns.length; i++)
	{
		modals[i].addEventListener('click', function()
		{
			if (event.target == modals[i])
			{
				modals[i].style.display = "none";
				modals[i].classList.toggle("show-modal");	// should turn off modal
			}
		})
	}
	
	// closes modal when 'x' is clicked
	for (let i = 0; i < close.length; i++)
	{
		close[i].addEventListener('click', function()
		{
			modals[i].style.display = "none";
			modals[i].classList.toggle("show-modal");	// should turn off modal
		})
	}
}

// function to check if an image exists on the internet
function imageExists(image_url)
{ 
	var http = new XMLHttpRequest();
	http.open("HEAD", image_url, true);
	http.send();
	return http.status < 400;
}

oReq.send();		// send request