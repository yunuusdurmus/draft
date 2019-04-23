'use strict'; 

/* Controllers */
function CommunicationCtrl($scope, $http)
{ 
	var mapOptions = {
        zoom: 4,
        disableDefaultUI:true,
        center: new google.maps.LatLng(36.9894,38.020504), 
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#13100c"},{"lightness":0}]},
                 {"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#837875"},{"lightness":0}]},
                 {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},
                 {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},
                 {"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},
                 {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},
                 {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},
                 {"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},
                 {"elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},
                 {"elementType":"labels.icon","stylers":[{"visibility":"off"}]},
                 {"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},
                 {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},
                 {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]}]
    };
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var markerLatlng = new google.maps.LatLng(37.992679,32.612346);
    var marker = new MarkerWithLabel({
		position: markerLatlng,
		map: map,
		draggable: false,
		raiseOnDrag: true,
		labelContent: "DRAFT<br>CHOCOLATE & CANDY",
		labelAnchor: new google.maps.Point(10, -2),
		labelClass: "labels",
		labelInBackground: false,
		title: "DRAFT CHOCOLATE & CANDY",
		icon: '/app/img/marker.png'
	});
	marker.setAnimation(null);
	marker.setAnimation(google.maps.Animation.BOUNCE);
	window.setTimeout(function(){
		marker.setAnimation(null);
	}, 4000);

	var button = angular.element('.contentBox.contact .topRightColum .formContainer .redButton'),
		name = angular.element('.contentBox.contact .topRightColum .formContainer .name'),
		email = angular.element('.contentBox.contact .topRightColum .formContainer .email'),
		message = angular.element('.contentBox.contact .topRightColum .formContainer .message'),
		result = angular.element('.contact.contentBox .topRightColum .formContainer span.result');


	button.click(function(){
		var	postData = $.param({name: name.val(),email: email.val(),message: message.val()});
	  	$http({
		  method  : 'POST',
		  url     : '/contact.php',
		  data    : postData,
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	 	})
 		.success(function(data) {
			result.html(data);
		 })
	})

	
}

function HomeCtrl($scope, $http)
{
	var glryI = angular.element('#galry h3');

	if (mailresult != 'bos') {
		glryI.html(mailresult)
		glryI.addClass('show');
		window.setTimeout(function(){
			glryI.fadeOut(500);
		}, 5000);
		mailresult = 'bos';
	};

	var ptag = angular.element('.centerContainer.home .containerContent .loveIcone p');
	if (langParam == 'tr') {
		ptag.html('ÇİKOLATA <br>AŞKLA YAPILIR')
	};
	if (langParam == 'en') {
		ptag.html('CHOCOLATE <br>MADE WİTH LOVE')
	};
	if (langParam == 'ru') {
		ptag.html('Шоколад<br>производится<br>с любовью.')
	};
	if (langParam == 'ar') {
		ptag.html('الشوكولاته المصنوعة<br>من الحب')
	};
}
function ProductsCtrl($scope, $http, DataLoader)
{



	setTimeout(function(){$('.nano').nanoScroller({ alwaysVisible: true });},4000)
	$scope.activeProduct = 'productList';
	var glry = angular.element('#galry .fullGalry'),
		glryI = angular.element('#galry img'),
		image = angular.element('.products .rightPart.detail img');

	
//---------------------------------------------------------------
	angular.element('#products').click(function(){
		angular.element('.centerContainer.products .containerContent .backButton').click();
	});

	$scope.productArray = [];
	$scope.productDetail = [];

	DataLoader.getData(function(data) {
		$scope.productArray = data.products;
	});

	var emptyFilter = {"name" : "!!"};

	$scope.currentCategory = emptyFilter;

    function isCurrentCategory(category) {
        return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
    }

    function setCurrentCategory(category) {
        $scope.currentCategory = category;
    }

    $scope.isCurrentCategory = isCurrentCategory;
    $scope.setCurrentCategory = setCurrentCategory;

//---------------------------------------------------------------
	$scope.activated = function(root){
		$scope.activeProduct = root;
	}

	$scope.showProductDetail = function(root,id){
		$scope.activated(root);
		var varmi = true;
		if ($scope.productDetail.length == 0) {
			$scope.productDetail.push(id);
		}else{
			$scope.productDetail.forEach(function(item){
				 if (item.root === id.root) {
				 	varmi = false;
				 }
			});
		}
		if (varmi) {
			$scope.productDetail.push(id);
		};
		
	}

	$scope.activatedGallery = function(id){
		glry.addClass('show');
		glryI.addClass('show');
		$scope.glryImage = id.replace("products","productsbig");
	};
	glry.click(function(){
		glry.removeClass('show');
		glryI.removeClass('show');
	});

}

function AboutUSCtrl($scope, $http)
{
	$scope.activetab = 'tab1';
	$(".nano").nanoScroller({ alwaysVisible: true });
}

function BlogCtrl($scope, $http)
{
	$(".nano").nanoScroller({ alwaysVisible: true });
	$scope.activetab = 'tab1'; 
	$scope.activeBlog = 'tab1';
	$scope.list = 'hide';
}

function ViewContaierCtrl($scope, $location){


		if ($.cookie('lang') == 'tr' || $.cookie('lang') == 'en' || $.cookie('lang') == 'ru' || $.cookie('lang') == 'ar') {

		angular.element('#langTr').click(function(){
			$.cookie('lang', 'tr');
			location.reload();
		});
		angular.element('#langEn').click(function(){
			$.cookie('lang', 'en');
			location.reload();
		});
		angular.element('#langRu').click(function(){
			$.cookie('lang', 'ru');
			location.reload();
		});
		angular.element('#langAr').click(function(){
			$.cookie('lang', 'ar');
			location.reload();
		});

		}else{
			$.cookie('lang', 'tr');
			location.reload();
		}
		
		
		
		$scope.$watch('$viewContentLoaded', function(){
    		$scope.fadeOut = true;
			$scope.threeD = true;
 		});
		var url = urlChange($location.path().slice(1)),
			header = angular.element('header'),
			menuElements = angular.element('header ul li a'),
			footer = angular.element('footer'),
			footerSB =  angular.element('footer i.topArrowIcone'),
			footerIndex = 0,
			logo2 = angular.element('header img.headerLogo'),
			logo3 = angular.element('header #qualityIcone');


		if (url == 'home') {
			menuElements.removeClass('active');
		}else{
			menuElements.removeClass('active');
			var activeElement = angular.element('header ul li a#'+ url).addClass('active');
		}

		footerSB.click(function() {
				var home = false;
				if($location.path().slice(1) == ''){home = true;}
				
				if (footerIndex == 0) {
					footer.addClass('show');
					if (home) {footer.removeClass('home');};
					footerIndex = 1;
				}else{
					footer.removeClass('show');
					if (home) {footer.addClass('home')};
					footerIndex = 0;
				}
				
			})
		
}
function urlChange(location)
{
	if (location == '') {
		return 'home';
	}else{
		return location;
	}
}

//-----------------------------------------------mobile Controller

function MobileHeaderCtrl(){
		angular.element('#langTr').click(function(){
			$.cookie('lang', 'tr');
			location.reload();
		});
		angular.element('#langEn').click(function(){
			$.cookie('lang', 'en');
			location.reload();
		});
		angular.element('#langRu').click(function(){
			$.cookie('lang', 'ru');
			location.reload();
		});
		angular.element('#langAr').click(function(){
			$.cookie('lang', 'ar');
			location.reload();
		});

	var openButton = angular.element('header #menuButton'),
		mobileMenu = angular.element('header ul.navMenu');

		openButton.click(function(){
			mobileMenu.addClass('show');
		});
		mobileMenu.click(function(){
			mobileMenu.removeClass('show');
		});

	var a = $(window).width(),
		b = $(window).height();	

	if (a < b){
		angular.element('#rotateWarning').fadeOut(0);
	};
		
	$( window ).resize(function() {
		a = $(window).width();
		b = $(window).height();
  		if (a > b){
			angular.element('#rotateWarning').fadeIn(0);
		}else{
			angular.element('#rotateWarning').fadeOut(1000);
		}
	});
}
function MobileCommunicationCtrl($scope, $http)
{
}
function MobileHomeCtrl($scope, $http)
{
	var glryI = angular.element('#galry h3');

	if (mailresult != 'bos') {
		glryI.html(mailresult)
		glryI.addClass('show');
		window.setTimeout(function(){
			glryI.fadeOut(500);
		}, 5000);
		mailresult = 'bos';
	};
}
function MobileAboutUSCtrl($scope, $http)
{
}
function MobileBlogCtrl($scope, $http)
{

}