function drawTemperaturePlot(dataReceived, yMinValue) {
  // Set the dimensions of the canvas / graph

var margin = {top: 30, right: 20, bottom: 30, left: 50},
  width = 1000 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

 var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

  // Set the ranges
  var x = d3.time.scale()
        .range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x)
                  .orient("bottom").ticks(4)
                  .tickFormat(d3.time.format("%m-%d-%Y %H:%M:%S"));

  var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

  // Define the line
  var valueline = d3.svg.line()
  .x(function(d) { return x(d.Xvalue); })
  .y(function(d) { return y(d.Yvalue); });

  // Adds the svg canvas
  var svg = d3.select(".linechart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

  var data = dataReceived;

    var d = data;


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.Xvalue; }));
    y.domain([yMinValue, d3.max(data, function(d) { return d.Yvalue; })]);


    // Add the valueline path.
    svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));


    // Add the X Axis
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("text")
         .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
         .style("text-anchor", "middle")
         .text("Date");

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .text("Temperature vs. Time");

    // Add the Y Axis
    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);


    svg.append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 0 - margin.left)
           .attr("x",0 - (height / 2))
           .attr("dy", "1em")
           .style("text-anchor", "middle")
           .text("Degrees (°C)");


  }
