
window.addEventListener('load', function () {

  function setComma(num) {
    var len, point, str;

    num = num + "";
    point = num.length % 3;
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
    .style("display", "none").attr("font-size", "3rem");


  var svg2 = d3.select("#verticalbarchart")
    .append("svg")
    .attr("width", 400)
    .attr("height", 600)
    .attr("viewBox", "0 0 400 600")
    .attr("preserveAspectRatio", "none");

  var margin2 = { top: 10, right: 70, bottom: 30, left: 40 };
  var width2 = +svg2.attr("width") - margin2.left - margin2.right;
  var height2 = +svg2.attr("height") - margin2.top - margin2.bottom;

  //positioning the svg g
  var g2 = svg2
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  var verticaly0 = d3.scaleBand()
    .rangeRound([0, height2]).paddingInner(0.15);
  var verticaly1 = d3.scaleBand()
    .padding(0.1);
  var verticalx = d3.scaleLinear()
    .rangeRound([width2, 0]);


  var mcgpalette0 = [
    "#8664cb",
    "#0075CC",
    "#48A0CE",
    "#44C4BE",
    "#36C35D",
    "#6079D6",
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


  //color scale 
  var z2 = d3
    .scaleOrdinal()
    .range(mcgpalette0);

  //csv to json format
  d3.csv(
    "/resource/data.csv",
    function (d, i, columns) {
      console.log(d)
      for (var i = 1, n = columns.length; i < n; ++i)
        d[columns[i]] = +d[columns[i]];
      return d;

    },
    function (error, data) {
      if (error) throw error;
      var keys = data.columns.slice(1);
      verticaly0.domain(
        data.map(function (d) {
          return d.State;
        })
      );
      verticaly1.domain(keys)
        .rangeRound([0, verticaly0.bandwidth()]);

      verticalx.domain([
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
          return "translate(" + "0," +  verticaly0(d.State)+")";})
        .selectAll("rect")
        .data(function (d) {
          return keys.map(function (key) {
            return { key: key, value: d[key] };
          });
        })
        .enter()
        .append("rect")
        .attr("x", verticalx(0))
        .attr("height", verticaly1.bandwidth())

        .attr("y",function (d) { return verticaly1(d.key);  }).on("mouseover", function () { tooltip.style("display", null); })
        .on("mouseout", function () { tooltip.style("display", "none"); })
        .on("mousemove", function (d) {


          tooltip.style("left", (d3.event.pageX + 10) + "px");
          tooltip.style("top", (d3.event.pageY - 10) + "px");
          tooltip.html(d.key.toString() + "<br>" + setComma(d.value));

        })
        .transition()
        .duration(1000)
        .delay(function (d, i) {
          return i * 100;
        }).ease(d3.easeSin)
        .attr("width", function (d) {
          return width2 - verticalx(d.value)  ;
        })

        .attr("x", function (d) {
          return 0;
        })
        .attr("rx",2)
        .attr("fill", function (d) {
          return z2(d.key);
        });


      //tooltip text top
      // g2.append("g")
      //   .selectAll("g")
      //   .data(data)
      //   .enter()
      //   .append("g")
      //   .attr("transform", function (d) {
      //     return "translate(" + x0(d.State) + ",0)";
      //   })
      //   .selectAll("text")
      //   .data(function (d) {
      //     return keys.map(function (key) {
      //       return { key: key, value: d[key] };
      //     });
      //   })
      //   .enter()
      //   .append("text")
      //   .attr("dy", "1em")
      //   .attr("fill", "#000")
      //   .attr("font-weight", "Regular")
      //   .attr("font-family", "Noto Sans KR")
      //   .attr("font-size", "1em")
      //   .attr("text-anchor", "start")
      //   .attr("x", function (d) {
      //     return x1(d.key);
      //   })
      //   .attr("width", x1.bandwidth())
      //   .attr("height", function (d) {
      //     return height2 - y(d.value);
      //   })
      //   .attr("y", function (d) {
      //     return y(d.value) - 22;
      //   })
      //   .text(function (d) {

      //     if (d.key == "전체") {
      //       return setComma(d.value);
      //     }
      //     else {


      //     }


      //   });




      // g2.append("g")
      //   .attr("class", "axis")
      //   .attr("transform", "translate(0," + height2 + ")")
      //   .call(d3.axisBottom(verticalx))
      //   .call(function (g) { g.selectAll(".tick line").remove() })
      //   .call(function (g) { g.selectAll(".domain").attr("stroke-width", "5").attr("stroke-opacity", "0.5") })
      //   .call(function (g) { g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey") });

      // g2.append("g")
      //   .attr("class", "axis")
      //   .call(d3.axisLeft(verticaly1).ticks(null, "s"))
      //   .append("text")
      //   .attr("x", 300 )
      //   .attr("y", height2 / 2 )
      //   .attr("dy", "0.32em")
      //   .attr("fill", "#000")
      //   .attr("font-weight", "Regular")
      //   .attr("font-family", "Noto Sans KR")
      //   .attr("font-size", "0.2em")
      //   .attr("text-anchor", "middle");


      // var legend2 = g2
      //   .append("g")
      //   .attr("font-family", "Noto Sans KR")
      //   .attr("font-size", "1em")
      //   .attr("text-anchor", "end")
      //   .selectAll("g")
      //   .data(keys.slice().reverse())
      //   .enter()
      //   .append("g")
      //   .attr("transform", function (d, i) {
      //     return "translate(0," + i * 20 + ")";
      //   });


      // legend2
      //   .append("rect")
      //   .attr("x", width2 - 19)
      //   .attr("width", 19)
      //   .attr("height", 19)
      //   .attr("fill", z2);

      // legend2
      //   .append("text")
      //   .attr("x", width2 - 24)
      //   .attr("y", 13)
      //   .text(function (d) {
      //     return d;
      //   });







    }
  );
});




