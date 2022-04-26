window.addEventListener("load", function () {
  // Read the data
  d3.json("/resource/retention.json", function (err, data) {
    if (err) {
    //   console.error("error in heatmap json load");
      return;
    }
    // console.log(data);

    var local = d3.local();

    // set the dimensions and margins of the graph
    var margin5 = { top: 20, right: 20, bottom: 20, left: 70 },
      width5 = 600 - margin5.left - margin5.right,
      height5 = 300 - margin5.top - margin5.bottom;

    // append the svg object to the body of the page
    var svg6 = d3
      .select("#my_dataviz2")
      .append("svg")
      .attr("width", width5 + margin5.left + margin5.right)
      .attr("height", height5 + margin5.top + margin5.bottom)
      .attr("viewBox","0 0 600 300")
      .attr("prserveAspectRatio","none")

      .append("g")
      .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");

    // Labels of row and columns
    var datesettings = moment().format("YYYY-MM-DD");


    var signdates = data.map(function (d, i) {
      return d.signdate;
    });

    var preioddates = data.map(function (d, i) {
      //  return moment - new Date(d.retentiondate.toString()) ;
      var a = moment(d.retentiondate.toString());
      var b = moment(d.signdate.toString());
      data[i].preiod_num = a.diff(b, "days");
      return a.diff(b, "days");
    });

    // Build X scales and axis:
    var x5 = d3.scaleBand().range([0, width5]).domain(preioddates).padding(0.05);
    // .padding(0.01);
    svg6
      .append("g")
      .attr("transform", "translate(0," + 0 + ")")
      .call(d3.axisTop(x5).tickFormat(d3.timeFormat).tickSize(0))
      .call(function(g) {g.selectAll(".domain, .tick line").remove()})
      .call(function(g) {g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey")});

    // Build Y scales and axis:
    var y5 = d3.scaleBand().range([height5, 0]).domain(signdates).padding(0.05);
    // .padding(0.01);
    svg6.append("g")
      .call(d3.axisLeft(y5).tickSize(0))
          .call(function(g) { g.selectAll(".domain, .tick line").remove()})
    .call(function(g) {g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill","grey")});

    // Build color scale
    var myColor = d3
      .scaleSequential()
      .domain([1, 100])
      .interpolator(d3.interpolate("blue", "red"));

    var threshold = d3
      .scaleThreshold()
      .domain([0,4,10,15,20,25,30,35,40,45,50,55,60,65,70,75,95,97,100])
      .range(["#418af3","#4b90f4", "#5998f5", "#68a3f7", "#78adf8","#86b6f9","#96bffb","#a5c9fd","#bcd8ff","#fbd1d1","#fbc7c8","#fbbbbb","#fbadac","#fd9c9d","#fd8e8e","#fe7f7f","#fe7172","#ff6565","#ff5d5c"]);
     //#418af3 #4b90f4 #5998f5 #68a3f7 #78adf8 #86b6f9 #96bffb #a5c9fd #bcd8ff red #fbd1d1 #fbc7c8 #fbbbbb #fbadac
     //#fd9c9d #fd8e8e #fe7f7f #fe7172 #ff6565 #ff5d5c
    svg6
      .selectAll()
      .data(data, function (d, i) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        d;
        return x5(d.preiod_num);
      })
      .attr("y", function (d, i) {
        return y5(d.signdate);
      })
      .attr("rx",4)
      .attr("ry",4)
      .attr("width", function (d) {
        return x5.bandwidth();
      })
      .attr("height", function (d) {
        return y5.bandwidth();
      })
      .style("fill", function (d) {
        return threshold(d.retentionvalue);
      });

    svg6
      .append("g")

      .attr("font-family", "Noto Sans KR")
      .attr("font-weight", "Bold")
      .attr("font-size", "0.6rem")

      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")

      .text(function (d) {
        return d.retentionvalue + "%";
      })
      .attr("x", function (d) {
        // return (i * 20) + 40;

        return x5(d.preiod_num);
      })
      .attr("y", function (d) {
        return y5(d.signdate);
        //return (local.get(this) * 20) + 40;
      })
      .attr("dx", x5.bandwidth() / 2)
      .attr("dy", y5.bandwidth() / 2)
      .attr("dominant-baseline", "text-before-edge")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "white");
  });
});
