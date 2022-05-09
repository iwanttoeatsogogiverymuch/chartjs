var verticalbarchart = (function vertical(){
function extracted(){

  var divid;
  var legend2;
  var keys;
  var z2;
  var easing;
  var mcgpalette0;
  var verticalx;
  var verticaly1;
  var verticaly0;
  var g2;
  var height2;
  var width2;
  var margin2;
  var svg2;
  var tooltip;
  var gridline;

  var testdata = [
    {"date": "2022-03-01", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-02", "DAU": "14000", "MAU": "500000", "ALL": "400000"},
    {"date": "2022-03-03", "DAU": "24000", "MAU": "700000", "ALL": "400000"},
    {"date": "2022-03-04", "DAU": "44000", "MAU": "200000", "ALL": "400000"},
    {"date": "2022-03-05", "DAU": "25300", "MAU": "100000", "ALL": "400000"},
    {"date": "2022-03-06", "DAU": "38900", "MAU": "300000", "ALL": "400000"}
  ];

  var testdata2 = [
    {"date": "2022-03-01", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-02", "DAU": "34000", "MAU": "200000", "ALL": "400000"},
    {"date": "2022-03-03", "DAU": "34000", "MAU": "300000", "ALL": "400000"},
    {"date": "2022-03-04", "DAU": "34000", "MAU": "100000", "ALL": "400000"},
    {"date": "2022-03-05", "DAU": "34000", "MAU": "250000", "ALL": "400000"},
    {"date": "2022-03-06", "DAU": "34000", "MAU": "23000", "ALL": "400000"},
    {"date": "2022-03-07", "DAU": "34000", "MAU": "10000", "ALL": "400000"},
    {"date": "2022-03-08", "DAU": "34000", "MAU": "200000", "ALL": "400000"},
    {"date": "2022-03-09", "DAU": "34000", "MAU": "356000", "ALL": "400000"},
    {"date": "2022-03-10", "DAU": "34000", "MAU": "240000", "ALL": "400000"},
    {"date": "2022-03-11", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-12", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-13", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-14", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-15", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-16", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-17", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-18", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-19", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-21", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-22", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-23", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-24", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-25", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-26", "DAU": "34000", "MAU": "400000", "ALL": "400000"},
    {"date": "2022-03-27", "DAU": "34000", "MAU": "400000", "ALL": "400000"},

  ];

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

  function draw(id,data) {

    divid = id;

    tooltip = d3.select("body").append("div")
        .attr("class", "toolTip")
        .style("display", "none").attr("font-size", "3rem");


    svg2 = d3.select("#"+divid)
        .append("svg")
        .attr("width", 550)
        .attr("height", 500)
        .attr("viewBox", "0 0 550 500")
        .attr("preserveAspectRatio", "none");

    margin2 = {top: 30, right: 30, bottom: 30, left: 60};
    width2 = +svg2.attr("width") - margin2.left - margin2.right;
    height2 = +svg2.attr("height") - margin2.top - margin2.bottom;



    verticaly0 = d3.scaleBand()
        .rangeRound([0, height2]).paddingOuter(0.2);
    verticaly1 = d3.scaleBand()
        .padding(0.1);
    verticalx = d3.scaleLinear().domain([0, 30000000])
        .rangeRound([0, width2 - 50]);


    mcgpalette0 = [
      "#8664cb",
      "#0075CC",
      "#48A0CE",
      "#44C4BE",
      "#36C35D",
      "#6079D6",
    ];

    easing = [
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
    z2 = d3
        .scaleOrdinal()
        .range(mcgpalette0);


    keys = Object.keys(data[0]).slice(1);
    verticaly0.domain(
        data.map(function (d) {
          return d.date;
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


    //grid line drawing
    //grid line should be below the chart rect svg

    //차트 그리드라인
    gridlines = d3.axisTop()
        .tickFormat("")
        //
        .tickSize(-width2+margin2.right).ticks(7)
        .scale(verticalx);

    svg2.append("g")
        .attr("class", "grid")
        .attr("transform", "translate("+margin2.left+ " ," + margin2.top + ")")
        .call(gridlines);


    gridline = d3.axisTop(verticalx).tickSize(-height2);

    //positioning the svg g
    g2 = svg2
        .append("g")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");




    g2.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          return "translate(" + "0," + verticaly0(d.date) + ")";
        })
        .selectAll("rect")
        .data(function (d) {
          return keys.map(function (key) {
            return {key: key, value: d[key]};
          });
        })
        .enter()
        .append("rect")
        .attr("x", verticalx(0))
        .attr("height", verticaly1.bandwidth())

        .attr("y", function (d) {
          return verticaly1(d.key);
        }).on("mouseover", function () {
      tooltip.style("display", null);
    })
        .on("mouseout", function () {
          tooltip.style("display", "none");
        })
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
          return verticalx(d.value);
        })

        .attr("x", function (d) {
          return 0;
        })
        .attr("rx", 2)
        .attr("fill", function (d) {
          return z2(d.key);
        });


    //  tooltip text top
    g2.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          return "translate(0," + verticaly0(d.date) + ")";
        })
        .selectAll("text")
        .data(function (d) {
          return keys.map(function (key) {
            return {key: key, value: d[key]};
          });
        })
        .enter()
        .append("text")
        .attr("dy", "0.35em")
        .attr("fill", "grey")
        .attr("font-family", "Noto Sans KR")
        .attr("font-size", "1rem")
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("x", function (d) {
          return verticalx(d.value) + 6;
        })
        .attr("y", function (d) {
          return verticaly1(d.key) + 3;
        })
        .text(function (d) {
          return setComma(d.value);
        });


    g2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(d3.axisBottom(verticalx).tickSizeOuter(0).ticks(7))
        .call(function (g) {
          g.selectAll(".tick line").remove()
        })
        .call(function (g) {
          g.selectAll(".domain").attr("stroke-width", "2.5").attr("stroke-opacity", "0.9").style("stroke", "grey")
        })
        .call(function (g) {
          g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey")
        });

    g2.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(verticaly0).ticks(null, "s").tickSizeOuter(0)).call(function (g) {
      g.selectAll(".tick line").remove()
    })
        .call(function (g) {
          g.selectAll(".domain").attr("stroke-width", "2.5").attr("stroke-opacity", "0.9").style("stroke", "grey")
        })
        .append("text")
        .attr("x", 300)
        .attr("y", height2 / 2)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "Regular")
        .attr("font-family", "Noto Sans KR")
        .attr("font-size", "0.2em")
        .attr("text-anchor", "middle");


    legend2 = g2
        .append("g")
        .attr("font-family", "Noto Sans KR")
        .attr("font-size", "1em")
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
        .attr("y", 13)
        .text(function (d) {
          return d;
        });






  }

  return{
    draw:draw
  }



}
  return extracted;

})();





