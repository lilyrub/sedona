
var menuButton = document.querySelector('.menu-button');
var navigationList = document.querySelector('.nav-menu__list');
var logoMobile = document.querySelector('.menu-section__logo-mobile');

var isMenuClosed = true;

/*toggle menu*/ 
menuButton.addEventListener('click', function() {
	
	if (isMenuClosed) {
		menuButton.classList.add("change");
		navigationList.style.opacity = "1";
		console.log('Now menu is opened.');
		logoMobile.style.visibility = "hidden";
		isMenuClosed = false;
	}

	else {
		menuButton.classList.remove("change");
		logoMobile.style.visibility = "visible";
		navigationList.style.opacity = "0";
		console.log('Now menu is closed');
		isMenuClosed = true;
	}
});



/*correct work if resolution changes*/ 
function screenCheck(reso) {
	logoMobile.style.visibility = "visible";
	if (reso.matches) {
		navigationList.style.opacity = "0";
		menuButton.classList.remove("change");

	}

	else {
		navigationList.style.opacity = "1";
	}
};

var phoneReso = window.matchMedia('(max-width: 720px)');
phoneReso.addListener(screenCheck );
screenCheck(phoneReso);





/*adding svg shape in IE*/ 
var sAgent = window.navigator.userAgent;
var Idx = sAgent.indexOf("MSIE");

function addClassToIE() {
	var body = document.body;
	if ((Idx > 0) || (!!navigator.userAgent.match(/Trident\/7\./)))  {
		body.classList.add("class-for-ie");
		//alert("IE");
	}
	else {
		console.log("It's not IE");
	}
};

addClassToIE();
