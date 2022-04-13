window.onload = function () {

  var BarChart = function(width,height,margin,data,options){

  

    var svg = d3.select("#stackedbar")
    .append("svg")
    .attr("viewbox", "0 0 400 400"); 


    return svg;

  };




  var svg = d3
    .select("#stackedbar")
    .append("svg")
    .attr("width", "400")
    .attr("height", "400")
    .attr("viewBox", "0 0 400 400");



  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  width = +svg.attr("width") - margin.left - margin.right;
  height = +svg.attr("height") - margin.top - margin.bottom;

  g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.08).align(0.1);

  //y axis scale
  var y = d3.scaleLinear().rangeRound([height, 0]);

  //bar colors
  var mcgpalette0 = [
    "#edf2fd",
    "#d1dffb",
    "#b2caf9",
    "#93b5f6",
    "#7ca5f4",
    "#6595f2",
    "#5d8df0",
    "#5382ee",
    "#4978ec",
    "#3767e8",
    "#ffffff",
    "#fefeff",
    "#cbd8ff",
    "#b2c5ff",
  ];

  //bar

  var z = d3.scaleOrdinal().range(mcgpalette0);

  //read data from csv file,then get the data and index -> callback
  d3.csv(
    "data.csv",
    function (d, i, columns) {
      for (i = 1, t = 0; i < columns.length; ++i)
        t += d[columns[i]] = +d[columns[i]];
      d.total = t;
      return d;
    },
    function (error, data) {
      if (error) throw error;

      var keys = data.columns.slice(1);

      //data sort
      data.sort(function (a, b) {
        return b.total - a.total;
      });

      x.domain(
        data.map(function (d) {
          return d.State;
        })
      );
      y.domain([
        0,
        d3.max(data, function (d) {
          return d.total;
        }),
      ]).nice();
      z.domain(keys);

      g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter()
        .append("g")
        .attr("fill", function (d) {
          return z(d.key);
        })
        .selectAll("rect")
        .data(function (d) {
          return d;
        })
        .enter()
        .append("rect")
        .transition()
        .duration(700)
        .attr("x", function (d) {
          return x(d.data.State);
        })
        .attr("y", function (d) {
          return y(d[1]);
        })
        .attr("height", function (d) {
          return y(d[0]) - y(d[1]);
        })

        .attr("width", x.bandwidth());

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Population");

        var test = 3
        console.log("`${test}`");

      // var legend = g
      //   .append("g")
      //   .attr("font-family", "Noto Sans KR")
      //   .attr("font-size", 10)
      //   .attr("text-anchor", "end")
      //   .selectAll("g")
      //   .data(keys.slice().reverse())
      //   .enter()
      //   .append("g")
      //   .attr("transform", function (d, i) {
      //     return "translate(0," + i * 20 + ")";
      //   });

      // legend
      //   .append("rect")
      //   .attr("x", width - 19)
      //   .attr("width", 19)
      //   .attr("height", 19)
      //   .attr("fill", z);

      // legend
      //   .append("text")
      //   .attr("x", width - 24)
      //   .attr("y", 9.5)
      //   .attr("dy", "0.32em")
      //   .text(function (d) {
      //     return d;
      //   });
    }
  );
};
