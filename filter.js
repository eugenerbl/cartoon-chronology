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

// filters all shows based on the selected genre and network
// optG = index of genreList, optN = index of networkList
function selection(optG, optN)
{  
	var shows, genres, networks, a, b, i;
  var inputG = genreList[optG];
	var inputN = networkList[optN];
	
  shows    = document.getElementsByClassName("trigger");
	genres   = document.getElementsByClassName("genre");
	networks = document.getElementsByClassName("network");
	
	// change button's text based on what is selected
	if(inputG === "none")
		document.getElementById("genreSelect").textContent = "Genre";
	else document.getElementById("genreSelect").textContent = inputG;
	
	if(inputN === "none")
		document.getElementById("networkSelect").textContent = "Network";
	else document.getElementById("networkSelect").textContent = inputN;
	
	// loop through all shows
  for (i = 0; i < shows.length; i++)
	{
		shows[i].style.display = "none";	// hide show initially
		a = genres[i].textContent;
		b = networks[i].textContent;
		
		// no input for network, check for genre
		if (inputN === 'none' && (a.includes(inputG) || inputG === 'none'))
			shows[i].style.display = "block";
		// no input for genre, check for network
		else if (inputG === 'none' && (b.includes(inputN) || inputN === 'none'))
			shows[i].style.display = "block";
		// both filters applied
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


/* POPULATING DROPDOWN FILTERS */

// mark current filter selections
// y is an index from genreList, z is an index from networkList
var y=0, z=0;	

// fill genre filter
const fillBox = document.getElementById('fillGenres');
var genreList = ["none", "Action", "Adventure", "Comedy", "Fantasy", 
		"Mystery", "Satire", "Science Fantasy", "Science Fiction"];

// fill network filter
const fillBox2 = document.getElementById('fillNetworks');
var networkList = ["none", "Disney Channel", "Disney XD", 
		"Nickelodeon", "Cartoon Network"];

// create dropdown options
fillBoxes(genreList, 0, fillBox);
fillBoxes(networkList, 1, fillBox2);

function fillBoxes(lists, choice, box)
{
	for(var i = 0; i < lists.length; i++)
	{
		var opt = lists[i];
		var val = document.createElement("p");
		// pass the correct values to the combined filters
		val.setAttribute('onclick', 'makeDecision(' + i + ', ' + choice + ')');
		val.textContent = opt;
		box.appendChild(val);
	}
}

/* decides whether to filter the shows by genre, network, both, or neither
	 first  - indicates which genre or network is selected 
	 choice - which filter is being used: genre or network? */
function makeDecision(first, choice)
{
	if(choice == 0) y=first;				// change genre selection
	else if(choice == 1) z=first;		// change network selection
	else 
	{
		// choice == 2: reset all filters, including search bar
		document.getElementById('myInput').value = "";
		y=z=0;	// defaults to none
	}
	// filters shows
	selection(y, z);
}