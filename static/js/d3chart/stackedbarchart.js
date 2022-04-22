window.onload = function () {
function setComma(num){
    var len, point, str;  
       
    num = num + "";  
    point = num.length % 3 ;
    len = num.length;  
   
    str = num.substring(0, point);  
    while (point < len) {  
        if (str != "") str += ",";  
        str += num.substring(point, point + 3);  
        point += 3;  
    }  
     
    return str;
 
};



  var tooltip = d3.select("body").append("div")
    .attr("class", "toolTip")
    .style("display", "none");
  var duration = 1300;
  var delayfunc = function (d, i) { return i * 100; };
  var easetype = d3.easeSin;

  //bar colors
  var mcgpalette0 = ["#0075CC", "#48A0CE", "#44C4BE", "#36C35D", "#6079D6", "#E0B63D", "#78BB37", "#BE653E", "#6CC4A0", "#EF9DB5"];

  var svg = d3
    .select("#stackedbar")
    .append("svg")
    .attr("width", "700")
    .attr("height", "400")
    .attr("viewBox", "0 0 700 400")
    .attr("preserveAspectRatio", "none");



  var margin = { top: 20, right: 20, bottom: 30, left: 40 };
  var width = + svg.attr("width") - margin.left - margin.right;
  var height = + svg.attr("height") - margin.top - margin.bottom;

  g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.08).align(0.1);

  //y axis scale
  var y = d3.scaleLinear().rangeRound([height, 0]);



  //bar

  var z = d3.scaleOrdinal().range(mcgpalette0);



  //read data from csv file,then get the data and index -> callback
  d3.csv(
    "/resource/data.csv",
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
        .attr("x", function (d) {
          return x(d.data.State);
        })
        .attr("y", y(0)).on("mouseover", function () {
          
            d3.select(this).style("fill", function() {
        return d3.hsl( d3.select(this).style("fill") ).darker(1).toString();
    });
          
          tooltip.style("display", null); })
        .on("mouseout", function () { 
          
            d3.select(this).style("fill", function() {
        return d3.hsl( d3.select(this).style("fill") ).brighter(1).toString();
    });
          
          tooltip.style("display", "none"); })
        .on("mousemove", function (d, i,j) {

          var subgroupName = d3.select(this.parentNode).datum().key;
          var subgroupValue = d.data[subgroupName];

          tooltip.style("left", (d3.event.pageX + 10) + "px");
          tooltip.style("top", (d3.event.pageY - 10) + "px");
          tooltip.html( subgroupName.toString() + "<br>" + setComma(subgroupValue));
          
        })
        .transition()
        .duration(duration)
        .delay(delayfunc)
        .ease(easetype)
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
        .call(d3.axisBottom(x).tickFormat(''));

      g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "2em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("");


      // g.append("g")
      //   .attr("class","textinstack")
      //   .attr("transform","translate(0," + height + ")")
      //   .attr("x", 10)
      //   .attr("y", 10)

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
