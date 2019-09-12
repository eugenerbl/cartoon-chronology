// Search bar to find a specific show title
function searchShows()
{
  var input, filter, shows, a, i;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  shows = document.getElementsByClassName("trigger");

  // loop through all show titles and hide those who don't match the search query
  for (i = 0; i < shows.length; i++)
	{
    a = shows[i].alt;		// get show title
    if (a.toUpperCase().indexOf(filter) > -1)
		  shows[i].style.display = "block";
    else
      shows[i].style.display = "none";
  }
}


/* DROPDOWN MENUS */
/* hide or show the dropdown content when button is pressed */
function dropDownMenu()
{
  document.getElementById("myDropdown").classList.toggle("show");
}

// filters the shows based on the network(s) they are shown on
function selected()
{  
	var input, filter, shows, networks, a, i;
  input = event.target.textContent;
  filter = input.toUpperCase();
  shows = document.getElementsByClassName("trigger");
	networks = document.getElementsByClassName("network");
	
	// change button's text based on what is selected
	if(input === "none")
		document.getElementById("networkSelect").textContent = "Network";
	else document.getElementById("networkSelect").textContent = input;
	
  // loop through all networks
  for (i = 0; i < shows.length; i++)
	{
    a = networks[i].textContent;		// get networks
		// show the cartoon when the network matches or the button is on 'none'
    if (a.toUpperCase().includes(filter) || (input === 'none'))
		  shows[i].style.display = "block";
    else
      shows[i].style.display = "none"; // hide if show is not on network
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