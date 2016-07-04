(function () {
    'use strict';

    angular
        .module('angularjs-starter')
        .directive('imageLoad', ImageLoad);

    /**
     * @namespace ImageLoad
     * @desc      Calls the method when a child element changes
     * @example   <img src="url-of-image" image-load="doSomething()"></form>
     * @memberOf  App.Directives
     */
    function ImageLoad () {
        var directive = {
            restrict: 'A',
            scope: {
                imageOnLoad: '=imageload'
            },
            link: link
        };

        return directive;
        ////////////////////

        /**
         * @desc      Binds image the load image
         * @param     {Object} $scope Data of the scope
         * @param     {Object} $element Data of the element
         * @memberOf  App.Directives.ImageLoad
         */
        function link ($scope, $element) {
            $element.bind('load', function () {
                $scope.$apply(function () {
                    $scope.imageOnLoad($element);
                });
            });

            $element.bind('error', function () {});
        }
    }
})();
