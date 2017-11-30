# zephyrplot
An application for plotting frequency trails. Implemented in Javascript

Inspired by the frequency trail waterfall plots produced by Brendan Gregg to illustrate latency distributions from production servers.
http://www.brendangregg.com/frequencytrails.html

Using browserify to build the bundle.js;
node '.\node_modules\browserify\bin\cmd' src/js/app.js -o src/js/bundle.js
