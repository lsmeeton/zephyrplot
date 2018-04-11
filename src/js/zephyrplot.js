var d3 = require("d3");

var _ = require("lodash");

var _default_params = {
    info : {
        title : "ZephyrPlot",
        n_trails : 1,
        persist : true,
        xaxis : {
            min : 0,
            max : 1,
            title : "x"
        },
        yaxis : {
            min : 0,
            max : 1,
            title : "y"
        }
    },
    view : {
        width : 600,
        height: 300,
        padding : 20,
        xaxis : {
            ticks : 5
        },
        yaxis : {
            ticks : 6
        }
    },
    data : []
}
 
var _index = 0;

var _prepareAxes = function(info, view, svg) {
    if (!info || !view || !svg)
        return;

    // Create xaxis scale
    var x_scale = d3.scaleLinear()
                    .domain([info.xaxis.min,info.xaxis.max])
                    .range([view.padding, view.width - view.padding * 2])
                    .nice();
    
    // Create yaxis scale
    var y_scale = d3.scaleLinear()
                    .domain([info.yaxis.min,info.yaxis.max])
                    .range([view.height - view.padding, view.padding])
                    .nice();

    // Create the xaxis!
    var x_axis = d3.axisBottom()
                    .scale(x_scale)
                    .ticks(view.xaxis.ticks);

    var y_axis = d3.axisRight()
                    .scale(y_scale)
                    .ticks(view.yaxis.ticks);

    // svg.append("g")
    //     .attr("class", "axis y")
    //     .attr("transform", "translate(" + (view.width - view.padding * 2) + ",0)")
    //     .call(y_axis);

    svg.append("g")
       .attr("class", "axis x")
       .attr("transform", "translate(0," + (view.height - view.padding) + ")")
       .call(x_axis);
       
    return;
};

var _createSVG = function(view, el) {

    if (!el)
        return;

    if (!this.svg) {
        this.svg = el.append("svg")
             .attr("width", view.width)
                     .attr("height", view.height)
}

    return ;
}

var _create_frequency_trail = function(info, view, data, index) {
    // Create scales (again...)

    // Create xaxis scale
    var x_scale = d3.scaleLinear()
    .domain([info.xaxis.min,info.xaxis.max])
    .range([view.padding, view.width - view.padding * 2])
    .nice();
    var y_range_min = (view.height - view.padding) * (index / info.n_trails);//(view.height * index / info.n_trails) - view.padding;
    var y_range_max = view.padding * (1 - (index / info.n_trails));// index;//view.padding * 100;
    console.log(info.n_trails,y_range_min, y_range_max);
    // Create yaxis scale
    var y_scale = d3.scaleLinear()
        .domain([info.yaxis.min,info.yaxis.max])
        .range([y_range_min, y_range_max])
        .nice();

    //Define line generator
    var line = d3.line()
                 .x(function(d) { return x_scale(d.x); })
                 .y(function(d) { return y_scale(d.y); });

    return line;
}

var init = function(el) {

    if (!el)
        return;
    
    var plt = d3.select(el);

    var zephyrplot = function(params) {
        this.params = _default_params;
        if (params && typeof(params) === "object") {
            _.extend(this.params.info, _default_params.info, params.info );
            _.extend(this.params.view, _default_params.view, params.view);
        }


        _createSVG(this.params.view, plt);
        
        if (params && params.data) {
            // Concentrate on plotting a single line first...
            var ft = _create_frequency_trail(this.params.info, this.params.view, params.data, _index);
            this.svg.append("path")
                    .datum(params.data)
                    .attr("class", "line line_index" + _index)
                    .attr("d", ft);

            ++_index;
        } 
        
        _prepareAxes(this.params.info, this.params.view, this.svg);

        }
    
    return zephyrplot;

}


module.exports = init;


