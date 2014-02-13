/// <reference path="../_references.d.ts" />

angular.module('dotjem.routing.pages').directive('dxSampleFile', [
    <any>'$http', '$q', '$compile',
    function ($http:ng.IHttpService, $q:ng.IQService, $compile:ng.ICompileService) {
        return {
            restrict: 'ECA',
            require: '?^dxPlunkr',
            scope: {},
            link: function (scope, element, attributes, controller) {
                var file = attributes.src,
                    name = attributes.name,
                    type;

                function addFile(fileName, fileType, source) {
                    if (angular.isDefined(controller)) {
                        controller.add(fileName, fileType, source, element);
                    }
                }

                if (angular.isDefined(file)) {
                    name = file.substring(file.lastIndexOf('/') + 1);
                    type = file.substring(file.lastIndexOf('.') + 1);
                    $http.get(file, { cache: true, transformResponse: (d, h) => d })
                        .then(function (result) {
                            var container = angular.element('</dic><pre dx-code class="brush: ' + type + '"></pre>');
                            container.text(result.data);
                            element.append(angular.element('<div></div>').append(container));
                            $compile(element.contents())(scope);
                            addFile(name, type, result.data);
                        }, function (error) {
                            //TODO: Error loading source
                        });
                } else {
                    //TODO: Sample provided directly into the directive.
                    //      Read sample, embed it in a pre, require name and push it to the dxSample if present.
                }
            }
        };
    }
]);