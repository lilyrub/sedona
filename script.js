
	$(function() {
		let menuButton = document.querySelector('.menu-button-box');
		let tabletReso = window.matchMedia('(max-width: 720px)');
		let flag = 0;

		menuButton.addEventListener('click', function() {
			if (flag===0) {
				$(".nav-menu").fadeTo("fast" , 1);
				menuButton.classList.toggle("change");
				flag = 1;
			}
			else {
				$(".nav-menu").fadeTo("fast" , 0);
				menuButton.classList.toggle("change");	
				flag = 0;			
			}
		});


		function screenTest(e) {
			if (e.matches) {
				$(".nav-menu").fadeTo(0 , 0);
				if (flag===1) {
					menuButton.classList.toggle("change");
					flag=0;
				}
			} else {
				$(".nav-menu").fadeTo("fast" , 1);
			}
		}
		tabletReso.addListener(screenTest);

		
	var sAgent = window.navigator.userAgent;
	var Idx = sAgent.indexOf("MSIE");

	function addClassToIE() {
	var body = document.body;
	if ((Idx > 0) || (!!navigator.userAgent.match(/Trident\/7\./)))  {
		body.classList.add("classForIE");
		//alert("IE");
	}
	else {
		console.log("It's not IE");
	}
	};

	addClassToIE();
	});