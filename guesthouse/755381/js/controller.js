var GHController = angular.module('GHController', []);

GHController.controller('LoginCtrl', function($scope, $rootScope, $location, $http) {
	//fetch users.json here

	$http.get("data/users.json").then(function(response) {
		$scope.users = response.data;
	}).then(function(response){
		//Because the $http get method is asynchronous, console may show error before loading, 
		//but later $scope.item gets populated
		console.log("Error"+response.statusText);
	})

    $scope.validate = function() {
    	var flag = true;
    	var currentuser;
    	angular.forEach($scope.users, function(value){
			if(flag){
				if($scope.username==value.username) {
					//if authenticate user is found toggle the flag
					flag=false;
					currentuser = value;
					//Also check for correct password
					if($scope.password==value.password){
						$rootScope.name = value.name;
						$rootScope.userobj = value;
						$location.path('/home')
					}
					else{
						alert("Please double check the password")
						return ;
					}
				}
			}	
		});
		if(flag){
			alert("Username entered in Invalid. Please Try again.");
			$location.path('/login')
		}
    }
});

GHController.controller('BookingCtrl', function($scope, $rootScope, $location, $http) {
    //fetch bookings.json here

	$http.get("data/bookings.json").then(function(response) {
		$rootScope.bookings = response.data;
	}).then(function(response){
		//Because the $http get method is asynchronous, console may show error before loading, 
		//but later rootScope.bookings gets populated
		console.log("Error"+response.statusText);
	})    
      

    $scope.showBookings=function(){

	//use this empty array to create the bookings list for the logged in user.
		$rootScope.specificBooking=[];
		angular.forEach($rootScope.userobj.bookingId, function(value){
			//Insert each entry from a loop, using push function
    		$rootScope.specificBooking.push($rootScope.bookings[value-1]);
    	});

		$location.path('/bookings');	
	
}

	$scope.book = function(){
	
		//code for generating a new booking ID for a new booking
        var bookingId=Number(Math.floor(Math.random()*10000));
		
		alert('Booking Success! Here\'s Summary Booking ID for '+$scope.name+'\'s booking is '+bookingId+'and '+$scope.rooms+' room(s) are booked between '+$scope.from+' and '+$scope.to+'.')
		
		// use constructor/prototype to initialize the new booking object property
   		var Booking = function(bookingId,name,fromDate,toDate,guests,rooms){
   			this.bookingId = bookingId;
   			this.name = name;
   			this.fromDate = fromDate;
   			this.toDate = toDate;
   			this.guests = guests;
   			this.rooms = rooms;
   		}

		//instantiate the new booking object 
		var booking_object = new Booking(bookingId,$scope.name,$scope.from,$scope.to,$scope.guests,$scope.rooms);
		//and push it into specificBooking[]
		$rootScope.specificBooking.push(booking_object);
	}
});