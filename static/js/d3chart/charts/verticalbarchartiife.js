var verticalbarchart = (function vertical(){
function extracted(){

  var svgWidth;
  var svgHeight;
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

    svgWidth = 870;
    svgHeight = 500;

    svg2 = d3.select("#"+divid)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("viewBox", "0 0 "+svgWidth + " " +svgHeight)
        .attr("preserveAspectRatio", "none");

    margin2 = {top: 30, right: 80, bottom: 30, left: 60};
    width2 = +svg2.attr("width") - margin2.left - margin2.right;
    height2 = +svg2.attr("height") - margin2.top - margin2.bottom;



    verticaly0 = d3.scaleBand()
        .rangeRound([0, height2]).paddingOuter(0.2);
    verticaly1 = d3.scaleBand()
        .padding(0.1);
    verticalx = d3.scaleLinear()
        .rangeRound([0, width2 - 50]);


    mcgpalette0 = [
      "#8664cb",
      "#0075CC",
      "#48A0CE",
      "#44C4BE",
      "#36C35D",
      "#6079D6",
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
    ).padding("0.08");
    verticaly1.domain(keys)
        .rangeRound([0, verticaly0.bandwidth()]).padding("0.3");

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
        .tickSize(-height2).ticks(7)
        .scale(verticalx);

    svg2.append("g")
        .attr("class", "grid")
        .attr("transform", "translate("+margin2.left+ "," + (margin2.bottom) + ")")
        .call(gridlines);


    gridline = d3.axisTop(verticalx).tickSize(-height2);

    //positioning the svg g
    g2 = svg2
        .append("g")
        .attr("transform", "translate(" + margin2.left + "," + (margin2.top) + ")");

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
      tooltip.style("opacity", "1");

    })
        .on("mouseout", function () {
          tooltip.style("display", "none");
          tooltip.style("opacity", "0");
        })
        .on("mousemove", function (d) {


          tooltip.style("left", (d3.event.pageX + 10) + "px");
          tooltip.style("top", (d3.event.pageY - 10) + "px");
          tooltip.html(d.key.toString() + "<br>" + Math.round(Number(d.value)).toLocaleString("en"));

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


    //  tooltip text right
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
        .attr("font-size", "0.7rem")
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("x", function (d) {
          return verticalx(d.value) + 6;
        })
        .attr("y", function (d) {
          return verticaly1(d.key) + 3;
        })
        .text(function (d) {
            if( Math.round(Number(d.value)) !== 0){
                return Math.round(Number(d.value)).toLocaleString("en");
            }

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
          g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey").attr("font-size","0.5rem")
        });

    g2.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(verticaly0).ticks(null, "s").tickSizeOuter(0)).call(function (g) {
      g.selectAll(".tick line").remove()
    })
        .call(function (g) {
          g.selectAll(".domain").attr("stroke-width", "2.5").attr("stroke-opacity", "0.9").style("stroke", "grey")
        })
        .call(function (g) {
          g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey").attr("font-size","0.8rem")
        });



    legend2 = svg2
        .append("g")
        .attr("font-family", "Noto Sans KR")
        .attr("font-size", "0.7em")
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice())
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          return "translate(130," +( 20 + ( i * 15 ) ) + ")";
        });


    legend2
        .append("rect")
        .attr("x", width2 - 19)
        .attr("width", 11)
        .attr("height", 11)
        .attr("fill", z2);

    legend2
        .append("text")
        .attr("x", width2 - 24)
        .attr("y", 10)
        .text(function (d) {
          return d;
        });

    // x축 레이블
    svg2.append("g").append("text").style("font-size","0.8rem").style("font-family","Noto Sans KR Regular")
        .attr("transform", "translate("+(width2+50) + ","+ (height2+40) +")")
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .text("백만원");

  }
  function update(data){
    d3.select("#"+divid).select("svg").remove();
    draw(divid,data);

  }

  return{
    draw:draw,
    update:update
  }

}
  return extracted;

})();





