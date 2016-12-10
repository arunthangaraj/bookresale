
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
      .state('resetPassword', {
    url: '/resetPassword',
    templateUrl: 'templates/resetPassword.html',
    controller: 'ResetPasswordController'
  })
   .state('changePassword', {
    url: '/changePassword',
    templateUrl: 'templates/changePassword.html',
    controller: 'ChangePasswordController'
  })
     .state('signIn',{
                url:'/signIn',
                templateUrl: 'templates/signIn.html',
                controller: 'SignInController'
  })
  
  .state('signUp',{
              url: '/signUp',
              templateUrl: 'templates/signUp.html',
              controller: 'SignUpController'
  })
  .state('verifyOtp',{
              url: '/verifyOtp',
              templateUrl: 'templates/checkoutotp.html',
              controller: 'otpCtrl'
  })
  .state('myPost',{
              url: '/myPost',
              templateUrl: 'templates/myPost.html',
              controller: 'myPostCtrl'
  })
  .state('postDetails', {
      url: '/post/:bookid/:bookname/:bookauthor/:bookprice/:userId/:username/:userlocation/:userphone',
      
      templateUrl: 'templates/postDetails.html',
      controller: 'postDetailCtrl'
     
    })
    
    .state('editPost',{
      url: '/editPost',
      templateUrl: 'templates/editPost.html',
      controller: 'editPostCtrl'
     })   
    
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:

  .state('tab.sell', {
    url: '/sell',
    views: {
      'tab-sell': {
        templateUrl: 'templates/tab-sellBook.html',
        controller: 'SellCtrl'
      }
    }
  })

  .state('tab.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'searchCtrl'
        }
      }
    })
    .state('tab.bookDetails', {
      url: '/book/:bookname/:bookauthor/:bookprice/:userId/:username/:userlocation/:userphone',
      views: {
        'tab-search': {
          templateUrl: 'templates/bookDetails.html',
          controller: 'bookDetailCtrl'
        }
      }
    })
    

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'LogoutCtrl'
      }
    }
  });
  
 
  
  
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.views.maxCache(0);
})




.service('PopupAlert', function($ionicPopup, $ionicHistory, $state){
    
    this.alert = function(title, message, action)
    {
        $ionicPopup.alert({
            title: title,
            cssClass: 'mypopup',
            template: message
        })
            .then(function(res){
                if(action === "reload")
                {
                    $state.reload();
                }
                else if(action === "error")
                {
                    
                }
                else
                {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go(action);
                }
        });
    };
})


        .service('DataService', function(){
   
   this.getCartItems = function()
   {
        return new shoppingCart(localStorage['merchantId']);
   };
   
})



.service('LocalStorage', function($window, $state){
    
    this.setUserId = function(userId)
    {
        $window.localstorage['userId'] = userId;
    };
    
    this.getUserId = function()
    {
        return $window.localstorage['userId'];
    };
    
    this.checkLogin = function()
    {
        if(getUserId() || getUserId() !== '0')
            $state.go('myAccount.merchantSearch');
    };
})


.service('MerchantStoreSearch', function(){
    this.searchStores = function(stores, searchFilter)
    {
            return stores.filter(function(store){
               
                if(store.book_text.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1)
                    return true;
            });
    };
})

        .service('MerchantProductSearch', function(){
            
            this.searchProducts = function(products, searchFilter)
            {
                return products.filter(function(products)
                {
                    if(products.product_name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1)
                        return true;
                });
            };
});