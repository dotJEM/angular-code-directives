/// <reference path="_references.d.ts" />

interface ISyntaxProvider {
    root(path?: string):any;
    defaults(arg?: any):any;
    register(file: string, ...keys: string[]):ISyntaxProvider;
    preventDefaultScripts():ISyntaxProvider;
}

interface ISyntaxService {
    (elmement);
}

angular.module('dotjem.directives.code').provider('$syntax', [
    function ():ISyntaxProvider {
        var brushMapping = {},
            rootPath = '/',
            registerDefaultScripts = function() {
                function r(file:string, ...args:string[]) { internalRegister(file, false, args); }
                r('shBrushAppleScript.js', 'applescript');
                r('shBrushAS3.js', 'actionscript3', 'as3');
                r('shBrushBash.js', 'bash', 'shell');
                r('shBrushColdFusion.js', 'coldfusion', 'cf');
                r('shBrushCpp.js', 'cpp', 'c');
                r('shBrushCSharp.js', 'c#', 'c-sharp', 'csharp');
                r('shBrushCss.js', 'css');
                r('shBrushDelphi.js', 'delphi', 'pascal');
                r('shBrushDiff.js', 'diff', 'patch', 'pas');
                r('shBrushErlang.js', 'erl', 'erlang');
                r('shBrushGroovy.js', 'groovy');
                r('shBrushJava.js', 'java');
                r('shBrushJavaFX.js', 'jfx', 'javafx');
                r('shBrushJScript.js', 'js', 'jscript', 'javascript');
                r('shBrushPerl.js', 'perl', 'pl');
                r('shBrushPhp.js', 'php');
                r('shBrushPlain.js', 'text', 'plain');
                r('shBrushPython.js', 'py', 'python');
                r('shBrushRuby.js', 'ruby', 'rails', 'ror', 'rb');
                r('shBrushSass.js', 'sass', 'scss');
                r('shBrushScala.js', 'scala');
                r('shBrushSql.js', 'sql');
                r('shBrushVb.js', 'vb', 'vbnet');
                r('shBrushXml.js', 'xml', 'xhtml', 'xslt', 'html');
            },
            defaults = {
                toolbar: false,
                gutter: false
            };

        this.root = function (path?:string):any {
            if (angular.isDefined(path)) {
                rootPath = path;
                return this;
            } else {
                return rootPath;
            }
        }

        this.defaults = function (arg?:any):any {
            if (angular.isDefined(arg)) {
                defaults = arg;
                return this;
            } else {
                return defaults;
            }
        }

        this.preventDefaultScripts = function () {
            registerDefaultScripts = function() {};
            return this;
        }

        this.register = function (file:string, ...keys:string[]) {
            internalRegister(file, true, keys);
            return this;
        }

        function internalRegister(file:string, overwrite:boolean, args:string[]) {
            angular.forEach(args, function (key) {
                if (angular.isUndefined(brushMapping[key]) || overwrite) {
                    brushMapping[key] = rootPath + file;
                }
            });
        }

        function parseParams(str):any {
            var match,
                result = {},
                arrayRegex = new XRegExp("^\\[(?<values>(.*?))\\]$"),
                regex = new XRegExp(
                    "(?<name>[\\w-]+)" +
                        "\\s*:\\s*" +
                        "(?<value>" +
                        "[\\w-%#]+|" +		// word
                        "\\[.*?\\]|" +		// [] array
                        '".*?"|' +			// "" string
                        "'.*?'" +			// '' string
                        ")\\s*;?",
                    "g"
                );

            while ((match = regex.exec(str)) != null) {
                var value:any = match.value.replace(/^['"]|['"]$/g, '');
                if (value != null && arrayRegex.test(value)) {
                    var m:{ values:any
                    } = arrayRegex.exec(value);
                    value = m.values.length > 0 ? m.values.split(/\s*,\s*/) : [];
                }
                result[match.name] = value;
            }

            return result;
        }

        this.$get = [<any>'$syntax',
            function ($script:IScriptService):ISyntaxService {
                //NOTE: Default registrations.
                registerDefaultScripts();

                return function (element) {
                    var params = parseParams(element.attr('class'));
                    $script(brushMapping[params.brush]);
                    SyntaxHighlighter.highlight(params, element[0]);
                }
            }];
        return this;
    }
])