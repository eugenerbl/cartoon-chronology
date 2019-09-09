const app = document.getElementById('root');

const logo = document.createElement('h2');
logo.textContent = 'Cartoon Chronology';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
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
		//button.textContent = cartoon.Title;
		
		// set the image as the button's background
		// first, check if the image field on the Excel file is filled
		// also check if the image url exists on the Internet
		// if no image found, defaults to gradient background
		var image = cartoon.Image;
		if(image != null && imageExists("url('"+ image +"')"))
			button.style.backgroundImage = "url('"+ image +"')";
		
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
		
		// various information seen from json
		const title = document.createElement('h1');
		title.textContent = cartoon.Title;

		const create = document.createElement('p');
		create.textContent = 'Created by: ' + cartoon.Creator;
		
		const describe = document.createElement('p');
		describe.textContent = cartoon.Description;
		
		const airtime = document.createElement('p');
		// use different formats if show is still airing
		if(cartoon.EndYear == null)
			airtime.textContent = 'Airtime: ' + cartoon.StartYear + " - Present";
		else
			airtime.textContent = 'Airtime: ' + cartoon.StartYear + " - " + cartoon.EndYear;
		
		const genre = document.createElement('p');
		genre.textContent = 'Genre: ' + cartoon.Genre;
		
		const seasons = document.createElement('p');
		seasons.textContent = 'Number of Seasons: ' + cartoon.Seasons;
		
		const episodes = document.createElement('p');
		episodes.textContent = 'Number of Episodes: ' + cartoon.Episodes;
		
		const network = document.createElement('p');
		network.textContent = 'Network: ' + cartoon.Network;
		
		// add modal to page
		container.appendChild(button);
		container.appendChild(modal);
		modal.appendChild(content);
		content.appendChild(close);
		
		// add information to modal
		content.appendChild(title);
		content.appendChild(create);
		content.appendChild(describe);
		content.appendChild(airtime);
		content.appendChild(genre);
		content.appendChild(seasons);
		content.appendChild(episodes);
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

// function to check if an image exists on the web
function imageExists(image_url)
{ 
	var http = new XMLHttpRequest();
	http.open("HEAD", image_url, true);
	http.send();

	return http.status < 400;
}

oReq.send();