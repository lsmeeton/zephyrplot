var zephyrplot = require("./zephyrplot");

var zp = new zephyrplot("div.plot");

var params = {
    info : {
        title : "ZephyrPlot",
        n_trails : 2,
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


var n_data = 1024;
var _delta_x = (params.info.xaxis.max - params.info.xaxis.min) / n_data;

var y = 0.5;
var _delta_y = 0.05;

for (var _ = 0; _ < 2; ++_) {
    var data = [];
    for (var i = 0; i < n_data; ++i) {
        data.push({"x" : params.info.xaxis.min + (_delta_x * i), "y" : y});
        y = y + (_delta_y * (Math.random() - 0.5));
    }

    params.data = data;

    zp(params);

    setTimeout(1000)
}
