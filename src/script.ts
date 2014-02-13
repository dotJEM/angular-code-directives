/// <reference path="_references.d.ts" />

interface IScriptService {
    (url:string);
}

angular.module('dotjem.directives.code').service('$script', [<any>
    function ():IScriptService {
        var loaded = {};
        return function (url:string) {
            if (!(url in loaded)) {
                $.ajax(url, {
                    dataType: "script",
                    success: () => {
                        loaded[url] = url;
                    },
                    async: false,
                    cache: true
                });
            }
        };
    }]);