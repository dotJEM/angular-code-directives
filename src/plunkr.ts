/// <reference path="_references.d.ts" />

interface IPlunkrFile{
    name: string;
    source: string;
}

interface IPlunkrService {
    (files: IPlunkrFile[], title: string, tags: string[])
}

angular.module('dotjem.directives.code').service('$plunkr', [
        <any>'$document', function($document):IPlunkrService{
            function post(fields) {
                var form = <any>angular.element('<form style="display: none;" method="post" action="http://plnkr.co/edit/?p=preview" target="_blank"></form>');
                angular.forEach(fields, function(value, name) {
                    var input = angular.element('<input type="hidden" name="' + name + '">');
                    input.attr('value', value);
                    form.append(input);
                });
                $document.find('body').append(form);
                form[0].submit();
                form.remove();
            }

            return function(files: IPlunkrFile[], title: string, tags: string[]){
                var postData = <any>{};

                angular.forEach(files, function(file: IPlunkrFile) {
                    postData['files[' + file.name + ']'] = file.source;
                });

                angular.forEach(tags, function(tag, index){
                    postData['tags['+index+']'] = tag;
                });

                postData.private = true;
                postData.description = title;
                post(postData);
            };
        }
    ]);
