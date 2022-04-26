window.addEventListener("load", function () {
  var salesData3 = [
    { label: "강남금융센터", color: "#be653e", value: "300" },
    { label: "삼성지점", color: "#78bb37", value: "400" },
    { label: "수유지점", color: "#e0b63d", value: "200" },
    { label: "영업본부(개인)", color: "#ef9db5", value: "200" },
    { label: "영업부", color: "#d46b8e", value: "300" },
    { label: "채권2팀", color: "#9a9adc", value: "30" },
    { label: "투자금융팀", color: "#6cc4a0", value: "120" },
  ];

  var pieData = salesData3.map(function (d) {
    return d.value;
  });
  var colors = salesData3.map(function (d) {
    return d.color;
  });
  var labels = salesData3.map(function (d) {

    return d.label;
  });

  var width3 = 400,
    height3 = 400,
    radius3 = Math.min(width3, height3) / 2;

  var piecolor = d3.scaleOrdinal().range(colors).domain(labels);

  var arc = d3
    .arc()
    .outerRadius(radius3 - 10)
    .innerRadius(0);

  var labelArc = d3
    .arc()
    .outerRadius(radius3 - 40)
    .innerRadius(radius3 - 40);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d;
    });

  var svg5 = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width3)
    .attr("height", height3)
    .attr("viewBox", "0 0 800 400")
    .attr("preserveAspectRatio", "none")
    .append("g")
    .attr("transform", "translate(" + width3 / 2 + "," + height3 / 2 + ")");

  var g4 = svg5
    .selectAll(".arc")
    .data(pie(pieData))
    .enter()
    .append("g")
    .attr("class", "arc");

  g4.append("path")
    .style("fill", function (d,i) {
      return piecolor(salesData3[i].label);
    })
    .transition()
    .duration(500)
    .attr("d", arc);
  g4.append("text")
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("font-family", "Noto Sans KR")
    .attr("font-size", "25px")
    .attr("font-weight", "Regular")
    .attr("fill","white")
    .attr("text-anchor","start")
    .text(function (d) {
      return d.data;
    });

      var legend = svg5
        .append("g")
        .attr("font-family", "Sans serif")
        .attr("font-size", 10)
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(labels)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          return "translate(0," + i * 25 + ")";
        });

      legend
        .append("rect")
        .attr("x", width3 -45)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", piecolor);

      legend
        .append("text")     
        .attr("font-family","Noto Sans KR")
        .attr("font-weight","Light")
        .attr("x", width3 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
          return d;
        });
});
