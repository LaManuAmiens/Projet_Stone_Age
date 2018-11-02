var app = angular.module('store', ['ngRoute']);
	//configuration du routeur
	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
    // on met notre page presentation, il faudras l'associer a un bouton retour
    // pour chaque view, on peut mettre un controller different
    // decommenter le commentaire et changer le nom du controller
		.when('/presentation',{
      //le lien pour la page que l'on veut afficher
			templateUrl:'partials/presentation.html',
			// controller:'formCtrl'
		})
		.when('/extraterrestre',{
			templateUrl:'partials/extraterrestre.html',
			// controller: 'viewCtrl'
		})
    .when('/terrestre',{
      templateUrl:'partials/terrestre.html',
      // controller: 'viewCtrl'
    })
    .when('/souterrain',{
      templateUrl:'partials/souterrain.html',
      // controller: 'viewCtrl'
    })
    //pour rediriger vers notre page panier
    .when('/panier',{
      templateUrl:'partials/panier.html',
      // controller: 'viewCtrl'
    })
    // Page redirigé par defaut, dans ce cas notre page presentaion
		.otherwise({
			redirectTo:'/presentation'
		})
	}]);

  app.run(function($rootScope){
    $rootScope.cart = [];
    $rootScope.total = 0;
  });

  app.controller('StoreController', function($scope, $rootScope, $http, $window, $timeout){
  	$http.get("stones.json")
  	.then(function(response) {
  		$scope.products = response.data;
  	});
    $scope.buy = function(arg) {
      $window.alert (arg);
    };
  	//Fonction addItemToCart : Si panier général à 0 (aucun produit) alors ajout du dit produit dans le panier
  	// mais si le panier général n'est pas à 0, variable repaet qui passe sur false
  	//
  	$scope.addItemToCart = function(product){
      //Affichage d'un message durant 3 secondes quand on ajoute un produit au panier
      $scope.showSuccessCart = true;
      $timeout(function(){
            $scope.showSuccessCart = false;
        }, 3000 );

  		if ($rootScope.cart.length === 0){
  			product.count = 1;
  			$rootScope.cart.push(product);
  		} else {
  			var repeat = false;
  			for(var i = 0; i< $rootScope.cart.length; i++){
  				// Si l'id est présent dans le panier, il incrémente la quantité de 1, repeat passe à true
  				if($rootScope.cart[i].id === product.id){
  					repeat = true;
  					$rootScope.cart[i].count +=1;
  				}
  			}
  			// Sinon ajout dans le panier du nouveau produit, (repeat=false)
  			if (!repeat) {
  				product.count = 1;
  				$rootScope.cart.push(product);
  			}
  		}
  		//Mise à jour du panier
  		$rootScope.total += parseFloat(product.price);
  	};

  	//Fonction addQuantity : Augmentation de la quantité de produit dans le panier
  	$scope.addQuantity = function(product){
  		product.count +=1;
  		//Mise à jour du panier
  		$rootScope.total += parseFloat(product.price);
  	};

  	//Fonction removeItemCart : Enlève 1 à la quantité de produit mais s'il reste un produit et qu'on clique sur le bouton, l'article est supprimé du panier
  	$scope.removeItemCart = function(product){

  		if(product.count > 1){
  			product.count -= 1;
  		}
  		else if(product.count === 1){
  			var index = $rootScope.cart.indexOf(product);
  			$rootScope.cart.splice(index, 1);
  		}
  		//Mise à jour du panier
  		$rootScope.total -= parseFloat(product.price);
  	};
  });
