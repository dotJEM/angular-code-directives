/// <reference path="../_references.d.ts" />

angular.module('dotjem.directives.code').directive('dxPlunkr', [
    <any>function () {
        return {
            restrict: 'ECA',
            transclude: true,
            controller: 'dxPlunkrController',
            templateUrl: '/dxPlunkr.html',
            scope: {}
        };
    }
]);

angular.module('dotjem.directives.code').controller('dxPlunkrController', [
    <any>'$scope', '$attrs', '$plunkr', function ($scope, $attrs, $plunkr) {
        var files = [],
            title = $attrs.tags || 'Plunkr Example',
            tags = $.map(($attrs.tags || 'Sample').split(';'), (item, index) => item.trim());

        $scope.scrollable = $attrs.scrollable;
        $scope.files = {};
        $scope.edit = function () {
            $plunkr(files, title, tags);
        };
        $scope.show = function (file) {
            $scope.current.elm.hide();
            $scope.current = file;
            $scope.current.elm.show();
        };

        var categories = {
            css: { icon: 'icon-css3', title: 'Styles'},
            js: { icon: 'icon-code', title: 'Scripts'},
            html: { icon: 'icon-html5', title: 'Html'}
        };

        return {
            add: function (fileName, fileType, source, element) {
                var file, cat, list;
                cat = categories[fileType];
                file = {
                    name: fileName,
                    type: fileType,
                    source: source,
                    elm: element
                };

                files.push(file);

                list = $scope.files[fileType] || { files: [], title: cat.title, icon: cat.icon};
                list.files.push(file);
                $scope.files[fileType] = list;

                if (angular.isDefined($scope.current)) {
                    element.hide();
                }
                else {
                    $scope.current = file;
                }
            }
        }
    }
]);