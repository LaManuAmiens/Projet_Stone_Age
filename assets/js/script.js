var form = angular.module('App', ['ngRoute']);
// form.run(function($rootScope){
// 	$rootScope.subjectList = [];
// 	$rootScope.nameList = [];
// 	$rootScope.emailList = [];
// 	$rootScope.textList = [];
// });
	//configuration du routeur
	form.config(['$routeProvider', function($routeProvider){
		$routeProvider
    // on mets notre page presentaion, il faudras l'associer a un bouton retour
    // pour chaque view, on peut mettre un controller different
    // decommenter le commentaire et changer le nom du controller
		.when('/presentations',{
      //le lien pour la page que l'on veut afficher
			templateUrl:'partials/presentations.html',
			// controller:'formCtrl'
		})
		.when('/categorie1',{
			templateUrl:'partials/categorie1.html',
			// controller: 'viewCtrl'
		})
    .when('/categorie2',{
      templateUrl:'partials/categorie2.html',
      // controller: 'viewCtrl'
    })
    .when('/categorie3',{
      templateUrl:'partials/categorie3.html',
      // controller: 'viewCtrl'
    })
    //pour rediriger vers notre page panier
    .when('/panier',{
      templateUrl:'partials/panier.html',
      // controller: 'viewCtrl'
    })
    // Page redirigé par defaut, dans ce cas notre page presentaion
		.otherwise({
			redirectTo:'/presentations'
		})
	}]);

// //on crée un controller rattaché à notre object "form"
// form.controller('formCtrl', ['$scope', '$rootScope', function ($scope, $rootScope){
// $scope.sendData = function (){
// //crée une variable qui sera accessible dans tout le document
// 	$rootScope.subjectList.push($scope.subject);
// 	$rootScope.nameList.push($scope.name);
// 	$rootScope.emailList.push($scope.email);
// 	$rootScope.textList.push($scope.text);
// 	}
// }]);
// form.controller('viewCtrl',['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
// 	$scope.id = $routeParams.id;
// 	$scope.subject = $rootScope.subjectList[$scope.id];
// 	$scope.name = $rootScope.nameList[$scope.id];
// 	$scope.email = $rootScope.emailList[$scope.id];
// 	$scope.text = $rootScope.textList[$scope.id];
// }]);
