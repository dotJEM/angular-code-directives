/// <reference path="../_references.d.ts" />

angular.module('dotjem.directives.code').directive('dxCode', [
    <any>'$syntax', function($syntax: ISyntaxService){
        return {
            restrict: 'ECA',
            link: function (scope, element) {
                $syntax(element);
            }
        };
    }
]);