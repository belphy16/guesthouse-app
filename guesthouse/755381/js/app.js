var guestHouseApp = angular.module('guestHouseApp', ['GHController',"ngRoute"]);

//Include Routing Logic here

guestHouseApp.config(function($routeProvider) {
	$routeProvider.
	when('/main', {
		//Initial load to main redircts here
		templateUrl: 'main',
		controller: 'LoginCtrl'
	}).
	when('/login', {
		//Clicking on Login button invokes here
		templateUrl: 'partials/login.html',
		controller: 'LoginCtrl'
	}).
	when('/home', {
		//After successful Login redirect here
		templateUrl: 'partials/home.html',
		controller: 'BookingCtrl'
	}).
	when('/bookings', {
		//To show the bookings made by the user
		templateUrl: 'partials/bookings.html',
		controller: 'BookingCtrl'
	}).
	when('/bookingForm', {
		// To book a new form, goes here
		templateUrl: 'partials/bookingForm.html',
		controller: 'BookingCtrl'
	}).
	otherwise({
		//Inital load to Main
		redirectTo: '/main'
	});
});