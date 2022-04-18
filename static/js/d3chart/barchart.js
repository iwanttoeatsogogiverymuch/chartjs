
window.addEventListener('load', function() {

  //   var width = 350;
  //   var height = 700;

  //   //font size
  //   var titlefontsize = 14;
  //   var legendfontsize = 24;
  //   var subtitlefontsize = 18;

  //   //font familly
  //   var NanumBold = "NanumSquareExtraBold";
  //   var boldfont = "";
  //   var lightfont = "";
  //   var mideuimfont = "";

  //   var barthick = 0.4;

  //   //this option is true by default, by disableing this ,1:1 size matching not apply
  //   var mantainAspectRatioOptions = false;
  //   var responsiveOptions = true;

  //   //legendOptions
  //   var legendVisible = true;
  //   var legendFontSize = 19;
  //   var legendColor = "red";
  //   var legendPostion = "center";

  //   var data = [5, 10, 12];
  //   var width = 200,
  //     scaleFactor = 10,
  //     barHeight = 20;

  //   var graph = d3
  //     .select("body")
  //     .append("svg")
  //     .attr("width", width)
  //     .attr("height", barHeight * data.length);

  //   var bar = graph
  //     .selectAll("g")
  //     .data(data)
  //     .enter()
  //     .append("g")
  //     .attr("transform", function (d, i) {
  //       return "translate(0," + i * barHeight + ")";
  //     });

  //   bar
  //     .append("rect")
  //     .attr("width", function (d) {
  //       return d * scaleFactor;
  //     })
  //     .attr("height", barHeight - 1);

  //   bar
  //     .append("text")
  //     .attr("x", function (d) {
  //       return d * scaleFactor;
  //     })
  //     .attr("y", barHeight / 2)
  //     .attr("dy", ".35em")
  //     .text(function (d) {
  //       return d;
  //     });

  //grouped bar chart

  
// using svg and g and path ,make the chart size and margin padding
// parent div and bootstrap div width and height will be applied prior to this size.

  var svg2 = d3.select("#groupedbar").append("svg").attr("width",400).attr("height",400).attr("viewBox", "0 0 400 400").attr("preserveAspectRatio","none");

  var  margin2 = { top: 20, right: 20, bottom: 30, left: 40 };

  var  width2 = +svg2.attr("width") - margin2.left - margin2.right;
  var  height2 = +svg2.attr("height") - margin2.top - margin2.bottom;



//positioning the svg g
  var  g2 = svg2
      .append("g")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  var x0 = d3.scaleBand().rangeRound([0, width2]).paddingInner(0.1);

  var x1 = d3.scaleBand().padding(0.05);

  var y = d3.scaleLinear().rangeRound([height2, 0]);

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
var easing = [
    "easeElastic",
    "easeBounce",
    "easeLinear",
    "easeSin",
    "easeQuad",
    "easeCubic",
    "easePoly",
    "easeCircle",
    "easeExp",
    "easeBack"
    ];


  var z2 = d3
    .scaleOrdinal()
    .range(mcgpalette0);

  d3.csv(
    "/resource/data.csv",
    function (d, i, columns) {
      for (var i = 1, n = columns.length; i < n; ++i)
        d[columns[i]] = +d[columns[i]];
      return d;
    },
    function (error, data) {
      if (error) throw error;

      var keys = data.columns.slice(1);

      x0.domain(
        data.map(function (d) {
          return d.State;
        })
      );
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);

      y.domain([
        0,
        d3.max(data, function (d) {
          return d3.max(keys, function (key) {
            return d[key];
          });
        }),
      ]).nice();

      g2.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          return "translate(" + x0(d.State) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
          return keys.map(function (key) {
            return { key: key, value: d[key] };
          });
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x1(d.key);
        })
        .attr("width", x1.bandwidth())
        
        .attr("y", y(0))
        .transition().duration(1000).delay(function(d, i) {
            return i * 100;
        }).ease(d3.easeSin)
        .attr("height", function (d) {
          return  height2 - y(d.value);
        })
        
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("fill", function (d) {
          return z2(d.key);
        });

      g2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(d3.axisBottom(x0));

      g2.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", width2 / 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "Regular")
        .attr("font-family", "Noto Sans KR")
        .attr("font-size", "40px")
        .attr("text-anchor", "middle");

        var legenddiv = document.createElement("div");
      var legend2 = g2
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          return "translate(0," + i * 20 + ")";
        });

      legend2
        .append("rect")
        .attr("x", width2 - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z2);

      legend2
        .append("text")
        .attr("x", width2 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
          return d;
        });
    }
  );
});




