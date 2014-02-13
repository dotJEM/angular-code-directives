angular-code-directives
=======================

*NOTE:* This is a work in progress. Untill a release has been made this is mostly left here to obtain feedback and provide them as samples.

Provides a set of Angular Directives to deal with code examples on e.g. blogs, github pages etc.

Syntax highligthing is based on http://alexgorbatchev.com/SyntaxHighlighter/ with a few modifications
in order to support running the higlighter on a pr. element basis instead of a full page run, I have not had
the time to post these changes back to him as a PR but I won't for now as they are not done quite that clean, but I plan to do so at some point.

In the long run the plan is to incorporate the code from Alex Gorbatchev's syntaxhighlighter in a pure
Angular Services and Directives which will also mean we can point out brushes in a more natural way instead of how it's done with the SyntaxHighlighter, but for now the above will do.

## Three main directives is provided:

 - dx-code: Provides syntax highligting using Alex Gorbatchev's syntaxhighlighter.
 - dx-plunkr: Provides a directive that can post a sample to plunkr, this is mostly only usefull for JS/Html/CSS examples.
 - dx-code-file: Provides the means to pull an external file in, making larger code examples easier to work with. It will also push files into the dx-plunkr directive if embedded under it.

## Aditionally a number of services will be provided:

 - $syntax: Encapsulates the syntax highlighter. The service and it's provider will in the long term provide a way to hook in new brushes etc.
 - $script: Simple Script loaded, used by the $syntax service in order to load brush scripts.
 - $plunkr: Service that provides the means to post files to a plunkr sample.

## Some samples of use:

```
<pre dx-code class="brush: js">
  function sample() {
  }
</pre>
```

```
<div dx-plunkr>
  <div dx-code-file src="home.html"></div>
  <div dx-code-file src="script.js"></div>
</div>
```
