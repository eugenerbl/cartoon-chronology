// Search bar to find a specific show title
function searchShows()
{
  var input, filter, shows, a, i;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  shows = document.getElementsByClassName("trigger");
	titles = document.getElementsByClassName("title");

  // loop through all show titles and hide those who don't match the search query
  for (i = 0; i < shows.length; i++)
	{
    a = titles[i].textContent;		// get show title
    if (a.toUpperCase().indexOf(filter) > -1)
		  shows[i].style.display = "block";
    else
      shows[i].style.display = "none";
  }
}


/* DROPDOWN MENUS */
/* hide or show the dropdown content when button is pressed */
function dropDown(option)
{
	if(option == 1)
		document.getElementById("dropGenre").classList.toggle("show");
	else if(option == 2)
		document.getElementById("dropNetwork").classList.toggle("show");
}

// filters the shows based on the network(s) they are shown on
function selectNetwork(chosen)
{  
	var input, filter, shows, networks, a, b, i;
  input = event.target.textContent;
  filter = input.toUpperCase();
  shows = document.getElementsByClassName("trigger");
	networks = document.getElementsByClassName("network");
	genres = document.getElementsByClassName("genre");
	
	// change button's text based on what is selected
	if(input === "none")
		document.getElementById("networkSelect").textContent = "Network";
	else document.getElementById("networkSelect").textContent = input;
	
	//document.getElementById("genreSelect").textContent = "Genre";
	var preGenre = document.getElementById("genreSelect").textContent;
	
  // loop through all networks
  for (i = 0; i < shows.length; i++)
	{
    a = networks[i].textContent;		// get networks
		b = genres[i].textContent;
		// show the cartoon when the network matches or the button is on 'none'
    if (a.toUpperCase().includes(filter) || (input === 'none'))
		{
			if (b.includes(preGenre) || (preGenre === 'none'))
				shows[i].style.display = "block";
		}
		else
      shows[i].style.display = "none"; // hide if show is not on network
  }
}



function selectGenre(chosen)
{  
	var input, filter, shows, genres, a, i;
  input = event.target.textContent;
  filter = input.toUpperCase();
  shows = document.getElementsByClassName("trigger");
	genres = document.getElementsByClassName("genre");
	networks = document.getElementsByClassName("network");
	
	// change button's text based on what is selected
	if(input === "none")
		document.getElementById("genreSelect").textContent = "Genre";
	else document.getElementById("genreSelect").textContent = input;
	
	var preNetwork = document.getElementById("networkSelect").textContent;
	
  // loop through all genres
  for (i = 0; i < shows.length; i++)
	{
    a = genres[i].textContent;		// get genres
		b = networks[i].textContent;
		// show the cartoon when the genre matches or the button is on 'none'
    if (a.toUpperCase().includes(filter) || (input === 'none'))
		{
			if (b.includes(preNetwork) || (preNetwork === 'none'))
				shows[i].style.display = "block";
		}
    else
      shows[i].style.display = "none";
  }
}

// filters the shows based on the network(s) they are shown on
function selection(optG, optN)
{  
	var input, filter, shows, networks, a, b, i;
  var inputG = genreList[optG];
	var inputN = networkList[optN];
	
  shows = document.getElementsByClassName("trigger");
	genres = document.getElementsByClassName("genre");
	networks = document.getElementsByClassName("network");
	
	// change button's text based on what is selected
	if(inputG === "none")
		document.getElementById("genreSelect").textContent = "Genre";
	else document.getElementById("genreSelect").textContent = inputG;
	
	if(inputN === "none")
		document.getElementById("networkSelect").textContent = "Network";
	else document.getElementById("networkSelect").textContent = inputN;
	
	// loop through all networks
  for (i = 0; i < shows.length; i++)
	{
		shows[i].style.display = "none";
		a = genres[i].textContent;
		b = networks[i].textContent;		// get networks
		
		if (inputN === 'none' && (a.includes(inputG) || inputG === 'none'))
			shows[i].style.display = "block";
		else if (inputG === 'none' && (b.includes(inputN) || inputN === 'none'))
			shows[i].style.display = "block";
		else if (a.includes(inputG) && b.includes(inputN))
			shows[i].style.display = "block";
  }
}


// close the dropdown if the user clicks outside of it
window.onclick = function(event)
{
  if (!event.target.matches('.dropbtn'))
	{
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show'))
				openDropdown.classList.remove('show');
    }
  }
}


var y=0, z=0;
// fill out dropdown menus
const fillBox = document.getElementById('fillGenres');
// fixed set of genres
var genreList = ["none", "Action", "Adventure", "Comedy", "Fantasy", 
		"Mystery", "Satire", "Science Fantasy", "Science Fiction"];

		const fillBox2 = document.getElementById('fillNetworks');
// fixed set of networks
var networkList = ["none", "Disney Channel", "Disney XD", 
		"Nickelodeon", "Cartoon Network"];

/*for(var i = 0; i < genreList.length; i++)
{
	var opt = genreList[i];
	var val = document.createElement("p");
	val.setAttribute('onclick', 'makeDecision(' + i + ', 0)');
	val.textContent = opt;
	fillBox.appendChild(val);
}*/
/*for(var i = 0; i < networkList.length; i++)
{
	var opt = networkList[i];
	var val = document.createElement("p");
	val.setAttribute('onclick', 'makeDecision(' + i + ', 1)');
	val.textContent = opt;
	fillBox2.appendChild(val);
}*/

fillBoxes(genreList, 0, fillBox);
fillBoxes(networkList, 1, fillBox2);

function fillBoxes(lists, choice, box)
{
	for(var i = 0; i < lists.length; i++)
	{
		var opt = lists[i];
		var val = document.createElement("p");
		val.setAttribute('onclick', 'makeDecision(' + i + ', ' + choice + ')');
		val.textContent = opt;
		box.appendChild(val);
	}
}

function makeDecision(first, choice)
{
	if(choice == 0) y=first;
	else if(choice == 1) z=first;
	else 
	{
		document.getElementById('myInput').value = "";
		y=z=0;
	}
	selection(y, z);
}