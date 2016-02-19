HeyCommunity

// tab.user
.controller('UserIndexCtrl', ['$scope', '$rootScope', '$translate', function($scope, $rootScope, $translate) {
    if (!localStorage.user) {
        /** auto jump to signIn page
        setTimeout(function() {
            $scope.state.go('hey.user-signIn');
        }, 800);
        */
    } else {
        $scope.user = JSON.parse(localStorage.user);
    }

    if (!localStorage.user_language) {
          localStorage.user_language = 'cn';
          $translate.use('cn');
    }
    $scope.user_language = localStorage.user_language;
    $scope.changeLanguage = function(key) {
        localStorage.user_language = key;
        $scope.user_language = key;
        $translate.use(key);
    };
}])



// tab.user-signOut
.controller('UserSignOutCtrl', ['$scope', 'UserService', function($scope, UserService) {
    UserService.signOut().then(function() {
        $scope.state.go('hey.user');
    });
}])



// tab.user-signIn
.controller('UserSignInCtrl', ['$scope', 'UserService', function($scope, UserService) {
    $scope.user = {};
    $scope.formError = {};

    $scope.signIn = function() {
        var params = {
            phone: $scope.user.phone,
            password: $scope.user.password,
        }
        UserService.signIn(params).then(function(response) {
            if (response.status === 200) {
                if ($scope.jumpRoute) {
                    $scope.state.go($scope.jumpRoute);
                } else {
                    $scope.state.go('hey.user');
                }
            } else {
                $scope.formError = {1: ['PHONE_OR_PASSWORD_ERROR']};
            }
        });
    }
}])



// tab.user-signUp
.controller('UserSignUpCtrl', ['$scope', 'UserService', function($scope, UserService) {
    $scope.user = {};
    $scope.signUpStep = 1;
    $scope.formError = {};

    $scope.setVal = function(key, val) {
        $scope[key] = val;
    }

    // get captcha
    $scope.getCaptcha = function() {
        // check phone is exists
        // seed code
        alert('next');
    }

    // sign up verify
    $scope.signUpVerifyCaptcha = function() {
        params = {
            phone: $scope.user.phone,
            captcha: $scope.user.captcha,
        }
        UserService.signUpVerifyCaptcha(params).then(function(response) {
            if (response.status === 200) {
                $scope.signUpStep = 2;
                $scope.formError = {};
            } else {
                $scope.formError = response.data;
            }
        });
    }

    // sign up
    $scope.signUp = function () {
        console.log($scope.user);
        var params = {
            nickname: $scope.user.nickname,
            phone: $scope.user.phone,
            password: $scope.user.password,
        }
        UserService.signUp(params).then(function(response) {
            if (response.status === 200) {
                $scope.state.go('hey.timeline');
            } else {
                $scope.formError = response.data;
            }
        });
    }
}])



// tab.user-info
.controller('UserInfoCtrl', ['$scope', 'UserService', function($scope, UserService) {
    $scope.user = JSON.parse(localStorage.user);
}])



// tab.user-setup
.controller('UserSetupCtrl', ['$scope', 'UserService', function($scope, UserService) {
}])
