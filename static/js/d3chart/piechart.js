var piechart = (function extracted() {


    var divid;

  var piechart = {};

  var key;

  var tooltip;

  var labels;

  var colors;

  var pieData;

  var legend;

  var g4;

  var svg5;

  var pie;

  var transitionArc;

  var tooltipArc;

  var outerArc;

  var arc;

  var piecolor;

  var pie2 = d3
      .pie()
      .sort(null)
      .value(function (d) {
          return d.value;
      });


  var width3,
      height3,
      radius3;

    var polyline;
    var text;

  var salesData3;
  var salesData4;


  salesData3 = [
    {label: "강남금융센터", color: "#be653e", value: "300"},
    {label: "삼성지점", color: "#78bb37", value: "400"},
    {label: "수유지점", color: "#e0b63d", value: "200"},
    {label: "영업본부(개인)", color: "#ef9db5", value: "200"},
    {label: "영업부", color: "#d46b8e", value: "300"},
    {label: "채권2팀", color: "#9a9adc", value: "30"},
    {label: "투자금융팀", color: "#6cc4a0", value: "120"},
  ];

  salesData4 = [
    {label: "강남금융센터", color: "#be653e", value: "300"},
    {label: "삼성지점", color: "#78bb37", value: "400"},
    {label: "수유지점", color: "#e0b63d", value: "200"},
    {label: "영업본부(개인)", color: "#ef9db5", value: "200"},
  ];


  function getPercent(d) {
    return d.endAngle - d.startAngle > 0.1
        ? Math.round((1000 * (d.endAngle - d.startAngle)) / (Math.PI * 2)) /
        10 +
        "%"
        : "";
  }

  function onMouseOut() {
    return function (d) {
      tooltip.style("opacity", "0");
      d3.select(this).style("fill", function (d) {
        return d3.hsl(d3.select(this).style("fill")).brighter(0.5).toString();
      });
    };
  }

  function onMouseMove() {
    return function (d) {
      // var subgroupName = d3.select(this.parentNode).datum().key;
      //  var subgroupValue = d.data.signdate;

      tooltip.style("left", d3.event.pageX + 10 + "px");
      tooltip.style("top", d3.event.pageY - 10 + "px");
      tooltip.html("dd");
    };
  }

  function onMouseOver() {
    return function (d) {
      tooltip.style("opacity", "1");

      d3.select(this).style("fill", function (d) {
        return d3.hsl(d3.select(this).style("fill")).darker(0.5).toString();
      });
    };
  }


    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }


    function initPie2Calc(){

      pie2 = d3
          .pie()
          .sort(null)
          .value(function (d) {
              return d.value;
          });
      key = function (d) {
          return d.data.label;
      };

  }


    function builTooltip() {

      if(tooltip === undefined)
      {

          tooltip = d3
              .select("body")
              .append("div")
              .attr("class", "toolTip")
              .style("opacity", "0")
              .attr("font-size", "3rem");
      }

    }

    function draw(){



        salesData3 = [
            {label: "강남금융센터", color: "#be653e", value: "300"},
            {label: "삼성지점", color: "#78bb37", value: "400"},
            {label: "수유지점", color: "#e0b63d", value: "200"},
            {label: "영업본부(개인)", color: "#ef9db5", value: "200"},
            {label: "영업부", color: "#d46b8e", value: "300"},
            {label: "채권2팀", color: "#9a9adc", value: "30"},
            {label: "투자금융팀", color: "#6cc4a0", value: "120"},
        ];





        builTooltip();


        initPie2Calc();
    pieData = salesData3.map(function (d) {
      return d.value;
    });
    colors = salesData3.map(function (d) {
      return d.color;
    });
    labels = salesData3.map(function (d) {
      return d.label;
    });

    width3 = 800;
    height3 = 400;
    radius3 = Math.min(width3, height3) / 3;

    piecolor = d3.scaleOrdinal().range(colors).domain(labels);

    arc = d3
        .arc()
        .outerRadius(radius3 - 10)
        .innerRadius(0);

    outerArc = d3
        .arc()
        .innerRadius(radius3)
        .outerRadius(radius3);

    tooltipArc = d3
        .arc()
        .innerRadius(radius3 * 0.75)
        .outerRadius(radius3 * 0.75);

    transitionArc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius3 * 0.75);

    pie = d3
        .pie()
        .sort(null)
        .value(function (d) {
          return d;
        });

        pie2 = d3
            .pie()
            .sort(null)
            .value(function (d) {
                return d.value;
            });
        key = function (d) {
            return d.data.label;
        };



    svg5 = d3
        .select("#piechart")
        .append("svg")
        .attr("width", width3)
        .attr("height", height3)
        .attr("viewBox", "0 0 800 400")
        .attr("preserveAspectRatio", "none")
        .append("g")
        .attr("transform", "translate(" + width3 / 3 + "," + height3 / 2 + ")");

        svg5.append("g").attr("class", "lines");
        svg5.append("g").attr("class", "slices");
        svg5.append("g").attr("class", "labels");

    g4 = svg5
        .selectAll(".arc")
        .data(pie(pieData))
        .enter()
        .append("g")
        .attr("class", "arc");





    g4.append("path")
        .style("fill", function (d, i) {
          return piecolor(salesData3[i].label);
        })
        .on("mouseover", onMouseOver())
        .on("mousemove", onMouseMove())
        .on("mouseout", onMouseOut())
        .transition()
        .duration(500)
        .attr("d", arc);


    g4.append("text")
        .attr("transform", function (d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .attr("font-family", "Noto Sans KR")
        .attr("font-size", "0.5rem")
        .attr("font-weight", "Regular")
        .attr("fill", "white")
        .attr("text-anchor", "start")
        .text(function (d) {
          return d.data;
        })
        .on("mouseover", onMouseOver())
        .on("mousemove", onMouseMove())
        .on("mouseout", onMouseOut());


    legend = d3
        .select("#piechart")
        .select("svg")
        .append("g")
        .attr("font-family", "Noto Sans KR")
        .attr("font-size", "1.5rem")
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(labels)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {

          var initY = 70;
          var legendmargin = 30 * i;
          var legendtrans = initY + legendmargin;

          return "translate(-200," + legendtrans + ")";
        });

    legend
        .append("rect")
        .attr("x", width3 - 45)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", piecolor);

    legend
        .append("text")
        .attr("font-family", "Noto Sans KR")
        .attr("font-weight", "Light")
        .attr("x", width3 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
          return d;
        });


              text = svg5
                  .select(".labels")
                  .selectAll("text")
                  .data(pie2(salesData3));

           text =  text.enter()
                  .append("text")
                  .attr("dy", ".35em");


      text
          .html(function(d) {
              return d.data.label;
          })
          .attr('transform', function(d) {
              var pos = outerArc.centroid(d);
              pos[0] = radius3 * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
              return 'translate(' + pos + ')';
          })
          .style('text-anchor', function(d) {
              return (midAngle(d)) < Math.PI ? 'start' : 'end';
          });


      //text.exit().remove();

      /* ------- SLICE TO TEXT POLYLINES -------*/


      polyline = svg5
          .select(".lines")
          .selectAll("polyline")
          .data(pie2(salesData3),key);

        polyline.enter().append("polyline")
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 2)
          .attr('points', function(d) {

              var posA = arc.centroid(d); // line insertion in the slice
              var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
              var posC = outerArc.centroid(d); // Label position = almost the same as posB
              var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
              posC[0] = radius3 * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
              return [posA, posB, posC];
          });
          // .attr("points", function (d) {
          //     this._current = this._current || d;
          //     var interpolate = d3.interpolate(this._current, d);
          //     this._current = interpolate(0);
          //     return function (t) {
          //         var d2 = interpolate(t);
          //         var pos = outerArc.centroid(d2);
          //         pos[0] = radius3 * 1.2 * (midAngle(d2) < Math.PI ? 1 : -1);
          //         return [tooltipArc.centroid(d2), outerArc.centroid(d2), pos];
          //     };
          // });

      //polyline.exit().remove();


  }


  //update
     function update (data) {




         initPie2Calc();
      
     var values = data.map(function (d) {
        return d.value;
      });
      
      



      /* ------- PIE SLICES -------*/

      // svg5.selectAll(".arc")
      //   .data(pie(values)).enter().append("g").attr("class","arc")
      //   .append("path")
      //   .transition()
      //   .duration(500)
      //   .style("fill", function (d, i) {
      //     return piecolor(data[i].label);
      //   })
      //   .attr("d", arc);

       
       //기존차트 비우기
         if(g4 != null){




             g4.remove().exit();

             g4 = svg5
                 .selectAll(".arc")
                 .data(pie(values))
                 .enter()
                 .append("g")
                 .attr("class", "arc");


             g4.append("path")
                 .on("mouseover", onMouseOver())
                 .on("mousemove", onMouseMove())
                 .on("mouseout", onMouseOut())
                 .style("fill", function (d, i) {
                     return piecolor(salesData3[i].label);
                 })
                 .attr("d", transitionArc)
                 .transition()
                 .ease(d3.easeSin)
                 .duration(500)
                 .attr("d", arc);


             g4.append("text")
                 .attr("transform", function (d) {
                     return "translate(" + arc.centroid(d) + ")";
                 })
                 .attr("font-family", "Noto Sans KR")
                 .attr("font-size", "0.7rem")
                 .attr("font-weight", "Regular")
                 .attr("fill", "white")
                 .attr("text-anchor", "start")
                 .text(function (d) {
                     return getPercent(d);
                 });


             //slice.exit().remove();

             /* ------- TEXT LABELS -------*/

         var    text2 = svg5
                 .select(".labels")
                 .selectAll("text")
                 .data(pie2(data), key);

             text2.enter()
                 .append("text")
                 .attr("dy", ".35em");

             text2
                 .transition()
                 .duration(1000)
                 .text(function (d) {

                     return d.data.label;
                 })
                 .attrTween("transform", function (d) {
                     this._current = this._current || d;
                     var interpolate = d3.interpolate(this._current, d);
                     this._current = interpolate(0);
                     return function (t) {
                         var d2 = interpolate(t);
                         var pos = outerArc.centroid(d2);
                         pos[0] = radius3 * (midAngle(d2) < Math.PI ? 1 : -1);
                         return "translate(" + pos + ")";
                     };
                 })
                 .styleTween("text-anchor", function (d) {
                     this._current = this._current || d;
                     var interpolate = d3.interpolate(this._current, d);
                     this._current = interpolate(0);
                     return function (t) {
                         var d2 = interpolate(t);
                         return midAngle(d2) < Math.PI ? "start" : "end";
                     };
                 });

             text2.exit().remove();

             /* ------- SLICE TO TEXT POLYLINES -------*/

             polyline = svg5
                 .select(".lines")
                 .selectAll("polyline")
                 .data(pie2(data), key);


             polyline.enter().append("polyline");



             polyline
                 .transition()
                 .duration(1000)
                 .attrTween("points", function (d) {
                     this._current = this._current || d;
                     var interpolate = d3.interpolate(this._current, d);
                     this._current = interpolate(0);
                     return function (t) {
                         var d2 = interpolate(t);
                         var pos = outerArc.centroid(d2);
                         pos[0] = radius3 * 0.9 * (midAngle(d2) < Math.PI ? 1 : -1);
                         return [tooltipArc.centroid(d2), outerArc.centroid(d2), pos];
                     };
                 });

             polyline.exit().remove();

         }

    }

    //update(salesData3);
    //update(salesData3);

    // setTimeout(function () {
    //   update(salesData3);
    // }, 2000);
    //

    // update(salesData3);


//전역에 노출시킬 퍼블릭 함수
return {

  draw:draw,
  update:update

}

})();
