var mid,sum,items,invoice_no;
var MERCHANT_API_LINK= 'http://www.groxer.com/mobileapi/merchant/userApi.php'; 
var title,author,price,place,phone,bid;
angular.module('starter.controllers', [])
//login check the credentials
        .controller('SignInController', function($scope, $http, PopupAlert, $state, $ionicHistory,$window) {
    $scope.signinData={};
    $scope.data={};
    $scope.signIn = function(){
      
        $scope.data.loading = true;
        $http.post(MERCHANT_API_LINK+'?action=signin',
                {
                    email: $scope.data.username,
                    pass: $scope.data.password
                })
                        .success(function(data){
                            if(data.success)
                            {
                                $scope.data.loading = false;
                                $window.localStorage['userName'] = data.userid;
                                localStorage['email'] = $scope.signinData.email;
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go('tab.sell');
                            }
                             
                            else
                            {
                                PopupAlert.alert("Signin Failure", data.message, "reload");
                            }
                })
                        .error(function (data){
                            $scope.data.loading = false;
                            PopupAlert.alert("Signin Failure", 'Check your internet connection', "error");
                });
        };
})

        .controller('SignUpController',function($scope, $http, PopupAlert,$window){ 
      $scope.signupData={};
    
            $scope.isPasswordMatch=function(){
                return ($scope.signupData.password === $scope.signupData.confirmPassword)?true:false;            
            };
            
            $scope.signUp=function(){
                
                $scope.signupData.loading = true;
                $window.localStorage['userMail'] = $scope.signupData.email;
                $http.post(MERCHANT_API_LINK+'?action=signup',
                {
                    email: $scope.signupData.email,
                    name: $scope.signupData.name,
                    phone: $scope.signupData.phone,
                    pass: $scope.signupData.password
                })
                        .success(function(data){
                            if(data.success)
                            {
                                $scope.signupData.loading = false;
                                PopupAlert.alert('Signup Successful', data.message, "verifyOtp");
                            }
                             
                            else
                            {
                                $scope.signupData.loading = false;
                                PopupAlert.alert('Signup Failure', data.message, "error");
                            }
                })
                        .error(function (data){
                            $scope.signupData.loading = false;
                            PopupAlert.alert('Signup Failure', 'Check your internet connection', "error");
                });
            };
})
        .controller('SellCtrl', function($window, PopupAlert,$scope,$http){ 
            $scope.signupData={};
      $scope.post=function(){
                
               
                $scope.signupData.loading = true;
                
                $http.post(MERCHANT_API_LINK+'?action=post',
                {
                    title: $scope.signupData.title,
                    author: $scope.signupData.author,
                    location: $scope.signupData.location,
                    price: $scope.signupData.price,
                    description: $scope.signupData.description,
                    phone: $scope.signupData.phone,
                    userid:$window.localStorage['userName']
                })
                        .success(function(data){
                            if(data.success)
                            {
                                $scope.signupData.loading = false;
                                PopupAlert.alert('Post Successful', data.message, "reload");
                            }
                             
                            else
                            {
                                $scope.signupData.loading = false;
                                PopupAlert.alert('Post Failure', data.message, "reload");
                            }
                })
                        .error(function (data){
                            $scope.signupData.loading = false;
                            PopupAlert.alert('Post Failure', 'Check your internet connection', "error");
                });
            };
})

.controller('otpCtrl', function($scope,$state,$window) {
  
})       

        .controller('searchCtrl', function($scope,$http,MerchantStoreSearch, DataService) {
    $scope.merchantSearchData={};
    $stores = [];
    $scope.data={};
    $scope.merchantSearchData.cart = DataService.getCartItems();
    $scope.data.loadingFirst=true;
    $http.post(MERCHANT_API_LINK+'?action=bookSearch')
            .success(function(data)
            {
                $scope.data.loadingFirst=false;
                $stores = data.stores;
                $scope.merchantSearchData.storeList = $stores;
            })
            .error(function(data)
            {
        
            });
            
            $scope.search = function()
            {
                if ($scope.merchantSearchData.search_text !== '')
                {
                    $scope.merchantSearchData.validSearch = true;
                    $scope.merchantSearchData.stores = MerchantStoreSearch.searchStores($stores, $scope.merchantSearchData.search_text);
                }
                else
                {
                    $scope.merchantSearchData.validSearch = false;
                }
                   
            };
        })

.controller('bookDetailCtrl', function($scope,$http,$stateParams) {
    
    $scope.data={};
    $scope.data.bookname=$stateParams.bookname;
    $scope.data.bookauthor=$stateParams.bookauthor;
    $scope.data.bookprice=$stateParams.bookprice;
    
    $scope.data.username=$stateParams.username;
    $scope.data.userlocation=$stateParams.userlocation;
    $scope.data.userphone=$stateParams.userphone;
     
})
.controller('postDetailCtrl', function($scope,$stateParams,$state) {
    
    $scope.data={};
    $scope.data.bookname=$stateParams.bookname;
    $scope.data.bookauthor=$stateParams.bookauthor;
    $scope.data.bookprice=$stateParams.bookprice;
    
    $scope.data.username=$stateParams.username;
    $scope.data.userlocation=$stateParams.userlocation;
    $scope.data.userphone=$stateParams.userphone;
    bid=$stateParams.bookid;
    
    title=$stateParams.bookname;
      author=$stateParams.bookauthor;
      price=$stateParams.bookprice;
      place=$stateParams.userlocation;
      phone=$stateParams.userphone;
    $scope.goaccount=function (){
      
        $state.go('myPost');
    };
    $scope.goEdit=function (){
      
        $state.go('editPost');
    };
     
})
.controller('LogoutCtrl', function($scope,$state,$window) {
  $scope.logout = function(){
      $window.localStorage['userName']='';
    $state.go('signIn');
  };
  
  $scope.mypost=function()
  {
      $state.go('myPost');
  };
})
.controller('myPostCtrl', function($scope,$http,$window,$state,$ionicPopup,PopupAlert){ 
     $scope.merchantSearchData={};
    $stores = [];
    $scope.data={};
    $scope.data.loadingFirst=true;
    
    $http.post(MERCHANT_API_LINK+'?action=mypost', {userid:$window.localStorage['userName']})
            .success(function(data)
            {
                 $scope.data.loadingFirst=false;
              $scope.stores = data.stores;
            })
            .error(function(data)
            {
        
            });
           
           $scope.back=function()
           {
             $state.go('tab.account');  
           };
            $scope.remove=function(id,bid){
    
      $ionicPopup.show({
          title:'Remove',
          cssClass: 'mypopup',
          inputType:null,
          template: 'Are you sure?',
          buttons:[
              {
                  text:'CANCEL',
                  type:'button-assertive button-block'
              },
              {
                  text:'YES',
                  type:'button-block app-theme',
                  onTap:function(e)
                  {
                       
                        $http.post(MERCHANT_API_LINK+'?action=removebook',{userid:id,bookid:bid})
                        .success(function(data)
                        {
                            PopupAlert.alert('Success', 'Successfully Removed', "reload");
                           
                        })
                        .error(function(data){
                        PopupAlert.alert('Failure', 'Check your internet connection', "error");
                 });  
                
                  }
              }
          ]
      });
      
    };
})
.controller('editPostCtrl', function($window, $state,$scope,$http,PopupAlert){ 
  $scope.signupData={};
  $scope.signupData.title=title;
  $scope.signupData.author=author;
  $scope.signupData.location=place;
  $scope.signupData.price=price;
  $scope.signupData.phone=phone;
   $scope.post=function(){
                
               
                $scope.signupData.loading = true;
                
                $http.post(MERCHANT_API_LINK+'?action=updatePost',
                {
                    title: $scope.signupData.title,
                    author: $scope.signupData.author,
                    location: $scope.signupData.location,
                    price: $scope.signupData.price,
                    phone: $scope.signupData.phone,
                    userid:$window.localStorage['userName'],
                    bookid:bid
                })
                        .success(function(data){
                            if(data.success)
                            {
                                $scope.signupData.loading = false;
                                PopupAlert.alert('Update Successful', data.message, "myPost");
                            }
                             
                            else
                            {
                                $scope.signupData.loading = false;
                                PopupAlert.alert('Update Failure', data.message, "reload");
                            }
                })
                        .error(function (data){
                            $scope.signupData.loading = false;
                            PopupAlert.alert('Update Failure', 'Check your internet connection', "error");
                });
            };
})
.controller('otpCtrl', function($scope, $window, $http, PopupAlert)
{
    $scope.otp = {};
    
    
    $scope.verifyOTP = function()
    {
        $scope.otp.loading = true;
        $http.post(MERCHANT_API_LINK + '?action=verifyOtp',
                {
                    usermail: $window.localStorage['userMail'] ,
                    otp: $scope.otp.code
                })
                .success(function (data) {
                    if (data.success)
                    {
                         PopupAlert.alert("OTP Success", data.message, "signIn");
                    }
                    else
                    {
                        PopupAlert.alert("OTP Failure", data.message, "reload");
                    }
                })
                .error(function (data) {
                    PopupAlert.alert("OTP Failure", 'Check your internet connection', "error");
                });
        
    };
})
.controller('ResetPasswordController', function($window, $state,$scope,$http,PopupAlert){ 
    
 $scope.signinData={};
    $scope.resetPassword = function(){

        $scope.signinData.loading = true;
        
         $http.post(MERCHANT_API_LINK+'?action=mailverify',
                 {
                     email: $scope.signinData.email
                    
                 })
                         .success(function(data){
                            if(data.success)
                            {
                                $scope.signinData.loading = false;
                                 PopupAlert.alert('Password Reset', data.message, "reload"); 
                                 mid=data.mid;
                                $state.go('changePassword');      
                           }
                             
                            else
                            {
                                $scope.signinData.loading = false;
                                PopupAlert.alert('Password Reset Failure', data.message, "reload"); 
                            }
                })
                        .error(function (data){
                            $scope.signinData.loading = false;
                            PopupAlert.alert('Password Reset Failure', 'Check your internet connection', "error"); 
                });

        };
     
})
.controller('ChangePasswordController', function($scope,$state,$window,$http,PopupAlert) {
  $scope.passChange={};
            $scope.isPasswordMatch=function(){
                return ($scope.passChange.password === $scope.passChange.confirmPassword)? true:false;            
            };
            
            $scope.changePassword = function(){
              
              $scope.passChange.loading = true;
                $http.post(MERCHANT_API_LINK+'?action=changepassword',
                {
                    merchantid:mid,
                    password: $scope.passChange.password,
                    otp:$scope.passChange.otp
                })
                        .success(function(data){
                            if(data.success)
                            {
                                $scope.passChange.loading = false;
                                PopupAlert.alert('Success', 'Password Changed Successfully', "signIn");
                            }
                             
                            else
                            {
                                $scope.passChange.loading = false;
                               
                                
                                    $scope.passChange.otp='';
                                    $scope.passChange.password = '';
                                    $scope.passChange.confirmPassword = '';
                                    PopupAlert.alert('Invalid Credentials', 'Check Your OTP', "login");
                            }
                })
                        .error(function (data){
                            $scope.passChange.loading = false;
                            PopupAlert.alert('Password Change Failure', 'Check your internet connection', "error");
                });
            };
           
})
.controller('StartUp_Controller', function($window, $state){ 
     if($window.localStorage['userName'])
 {
        $state.go('tab.sell');
     
    }
     else
         $state.go('signIn');
});

