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
		// also check if the image URL exists on the Internet
		// if no image found, defaults to gradient background and title
		var image = cartoon.Image;
		if(image != null && imageExists("url('"+ image +"')"))
			button.style.backgroundImage = "url('"+ image +"')";
		else
			button.textContent = cartoon.Title;
		
		// main modal
		const modal = document.createElement('div');
		modal.setAttribute('class', 'modal');
		
		// contains cartoon information
		const content = document.createElement('div');
		content.setAttribute('class', 'modal-content');
		
		// add button and modal to page
		container.appendChild(button);
		container.appendChild(modal);
		
		// variables getting each piece of information
		var tle = cartoon.Title, tra = cartoon.Trailer, cre = cartoon.Creator,
				des = cartoon.Description, ats = cartoon.StartYear,
				ate = cartoon.EndYear, gen = cartoon.Genre, sea = cartoon.Seasons,
				epi = cartoon.Episodes, net = cartoon.Network;

		// add HTML - close button and title
		content.innerHTML = `
			<span class="close-button">×</span>
			<h2 class="title">${tle}</h2>
		`;
		
		// check if the show has a trailer that exists online
		if(tra != null && imageExists("url('"+ tra +"')"))
		{
			// if it does, add a link to watch the trailer
			content.innerHTML += `
				<div class="sortButtons">
					<a href=${tra}><button class="dropbtn">Watch Trailer</button></a>
				</div>
			`;
		}
		
		content.innerHTML += `
			<p class="creator">Created by: ${cre}</p>
			<p class="description">${des}</p>
			<p class="airtime">Airtime: ${ats} - ${ate}</p>
			<p class="genre">Genre: ${gen}</p>
			<p class="seasons">Number of Seasons: ${sea}</p>
			<p class="episodes">Number of Episodes: ${epi}</p>
			<p class="network">Network: ${net}</p>
		`;
		
		modal.appendChild(content);
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