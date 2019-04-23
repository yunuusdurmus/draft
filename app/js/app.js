 'use strict';

/* App Module */

var app;
if (isMobile == 0){
app = angular.module('mag', ['mag.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider. 
      when('/contact', {templateUrl: '/app/partials/communication.html',   controller: CommunicationCtrl}).
      when('/products', {templateUrl: '/app/partials/products.html',   controller: ProductsCtrl}).
      when('/about-us', {templateUrl: '/app/partials/about-us.html',   controller: AboutUSCtrl}).
      when('/blog', {templateUrl: '/app/partials/blog.html',   controller: BlogCtrl}).
      when('/', {templateUrl: '/app/partials/home.html', controller: HomeCtrl}).
      otherwise({redirectTo: '/'} );
}])
.factory('DataLoader', function ($http) {
   var data = [],
       MagBase = {};

    MagBase.getData = function(callback) {
        if (data.length > 0) {
            callback(data);
            return;
        }
        $http({
            url: '/app/js/data.json',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).success(callback).error(callback);
    };
    return MagBase;
});
}
if (isMobile == 1){
app = angular.module('mag', ['mag.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider. 
      when('/contact', {templateUrl: '/app/partials/mobile/communication.html',   controller: MobileCommunicationCtrl}).
      when('/about-us', {templateUrl: '/app/partials/mobile/about-us.html',   controller: MobileAboutUSCtrl}).
      when('/blog', {templateUrl: '/app/partials/mobile/blog.html',   controller: MobileBlogCtrl}).
      when('/', {templateUrl: '/app/partials/mobile/home.html', controller: MobileHomeCtrl}).
      otherwise({redirectTo: '/'} );
      
}]);
};