# Lifterly

https://apeshitfuckjacked.herokuapp.com/

*yeah, it's heroku, give it a minute to spin up*

This is more or less my TODOMVC app, in that I just keep rewriting it using different frameworks and technologies to get a sense how they work. The basic flow of the app allows you to login, create, and edit workouts. This forces me to solve some problems that expose some strengths and weaknesses of frameworks as I work with them. It gives me a better sense of what's going on than a simple todo list or the author's tutorial, which usually only caters to the frameworks strengths *cough* angular phonecat *cough*.

## Isomorphic Javascript leveraging Flux / React

This iteration I'm leveraging flux & react and really enjoying it. Luckily the folks at Yahoo are doing a ton of work so I've been able to leverage a number of their libraries to help me out along the way. So far so good, it's performant and I can turn off JS and still have a (somewhat) functioning app. 

### Version

0.1.0

### Tech

Here's the stack as it sits right now:

* [React] - Amazeballs
* [Flux] - (not a) MVC for React
* [Express-state] - helper to move application state from server to client
* [Dispatchr] - Y! flavor of dispatcher that lends itself to isomorphism (maybe a word, maybe not)
* [Fetchr] - handles if/else server/client handling of REST requests
* [Webpack] - build tool, basically allows you to require anything into a bundle


### Todo's

 - Make mogodb schema stuff less of a shit show
 - Convert from React Addon immutable lib to immutable-js
 - Test Coverage
 - Mobile styling

License
----

MIT


**Free Software, Hell Yeah!**

[React]:http://facebook.github.io/react/
[Flux]:http://facebook.github.io/flux/
[YahooFluxExamples]:https://github.com/yahoo/flux-examples
[Express-state]:https://github.com/yahoo/express-state
[Fetchr]:https://github.com/yahoo/fetchr
[Dispatchr]:https://github.com/yahoo/dispatchr
[Webpack]:http://webpack.github.io/
