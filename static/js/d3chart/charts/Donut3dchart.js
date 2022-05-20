!(function ddd() {

  var  Donut3D = {};
  var svg;
  var height3 = 400;
  var width3 = 570;
  var piedcolor;
  var colorscale;
  var divid;

  var duration = 1300;
  var legend;
  var config;
  var delayfunc = function (d, i) {
    return i * 100;
  };
  var easetype = d3.easeSin;
  var d3floatFormatter = d3.format("0.1f");
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
  }

  function pieTop(d, rx, ry, ir) {
    if (d.endAngle - d.startAngle === 0) return "M 0 0";
    var sx = rx * Math.cos(d.startAngle),
      sy = ry * Math.sin(d.startAngle),
      ex = rx * Math.cos(d.endAngle),
      ey = ry * Math.sin(d.endAngle);

    var ret = [];
    ret.push(
      "M",
      sx,
      sy,
      "A",
      rx,
      ry,
      "0",
      d.endAngle - d.startAngle > Math.PI ? 1 : 0,
      "1",
      ex,
      ey,
      "L",
      ir * ex,
      ir * ey
    );
    ret.push(
      "A",
      ir * rx,
      ir * ry,
      "0",
      d.endAngle - d.startAngle > Math.PI ? 1 : 0,
      "0",
      ir * sx,
      ir * sy,
      "z"
    );
    return ret.join(" ");
  }

  function pieOuter(d, rx, ry, h) {
    var startAngle = d.startAngle > Math.PI ? Math.PI : d.startAngle;
    var endAngle = d.endAngle > Math.PI ? Math.PI : d.endAngle;

    var sx = rx * Math.cos(startAngle),
      sy = ry * Math.sin(startAngle),
      ex = rx * Math.cos(endAngle),
      ey = ry * Math.sin(endAngle);

    var ret = [];
    ret.push(
        "M",
        sx,
        h + sy,
        "A",
        rx,
        ry,
        "0 0 1",
        ex,
        h + ey,
        "L",
        ex,
        ey,
        "A",
        rx,
        ry,
        "0 0 0",
        sx,
        sy,
        "z"
    );
    return ret.join(" ");
  }

  function pieInner(d, rx, ry, h, ir) {
    var startAngle = d.startAngle < Math.PI ? Math.PI : d.startAngle;
    var endAngle = d.endAngle < Math.PI ? Math.PI : d.endAngle;

    var sx = ir * rx * Math.cos(startAngle),
      sy = ir * ry * Math.sin(startAngle),
      ex = ir * rx * Math.cos(endAngle),
      ey = ir * ry * Math.sin(endAngle);

    var ret = [];
    ret.push(
      "M",
      sx,
      sy,
      "A",
      ir * rx,
      ir * ry,
      "0 0 1",
      ex,
      ey,
      "L",
      ex,
      h + ey,
      "A",
      ir * rx,
      ir * ry,
      "0 0 0",
      sx,
      h + sy,
      "z"
    );
    return ret.join(" ");
  }

  function getPercent(d) {
    return d.endAngle - d.startAngle > 0.1
      ? Math.round((1000 * (d.endAngle - d.startAngle)) / (Math.PI * 2)) / 10 +
          "%"
      : "";
  }
  function midAngle(d) {
    return d.oldEndAngle
      ? d.oldSartAngle + (d.oldEndAngle - d.oldSartAngle) / 2
      : d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  function labelPath(d, rx, ry, h) {
    var x1 = rx * Math.cos(midAngle(d));
    var y1 = ry * Math.sin(midAngle(d));
    var labelPathLength = 1 + h / rx / 2;
    var path = [];

    path.push("M", x1, y1, "L", x1 * labelPathLength, y1 * labelPathLength);
    path.push(
      "L",
      (rx + 14) *
        (midAngle(d) > (3 / 2) * Math.PI || midAngle(d) < Math.PI / 2 ? 1 : -1),
      y1 * labelPathLength
    );
    path.push("L", x1 * labelPathLength, y1 * labelPathLength, "z");

    return path.join(" ");
  }

  Donut3D.transition = function (id, data, rx, ry, h, ir) {

    function arcTweenInner(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return pieInner(i(t), rx + 0.5, ry + 0.5, h, ir);
      };
    }

    function arcTweenTop(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return pieTop(i(t), rx, ry, ir);
      };
    }

    function arcTweenOuter(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return pieOuter(i(t), rx - 0.5, ry - 0.5, h);
      };
    }

    function textTweenX(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return 0.6 * rx * Math.cos(0.5 * (i(t).startAngle + i(t).endAngle));
      };
    }

    function textTweenY(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return 0.6 * rx * Math.sin(0.5 * (i(t).startAngle + i(t).endAngle));
      };
    }



    var _data = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      })(data);


    d3.select("#" + id).selectAll("g")
      .selectAll(".innerSlice")
      .data(_data)
      .transition()
      .duration(duration)
      .ease(easetype)
      .attrTween("d", arcTweenInner);


    d3.select("#" + id).select("g")
      .selectAll(".topSlice")
      .data(_data)
      .transition()
      .duration(duration)
      .ease(easetype)
      .attrTween("d", arcTweenTop);


    d3.select("#" + id).select("g")
      .selectAll(".outerSlice")
      .data(_data)
      .transition()
      .duration(duration)
      .ease(easetype)
      .attrTween("d", arcTweenOuter);


    d3.select("#" + id)
      .selectAll(".percent")
      .data(_data)
      .transition()
      .duration(duration)
      .attrTween("x", textTweenX)
      .attrTween("y", textTweenY)
      .text(getPercent);


    // d3.select("#fullpie")
    //   .selectAll(".donutlegend")
    //   .data(_data)
    //   .transition()
    //   .duration(duration)
    //   .text(function (d) {
    //     return (
    //       d.data.label +
    //       "  [" +
    //       setComma(Math.round(d.data.value)) +
    //       "원" +
    //       "  ]"
    //     );
    //   });


    d3.select("#"+id ).append("g")
        .attr("class", "labels");
    d3.select("#"+id ).append("g")
        .attr("class", "lines");


    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
          return d.value;
        });


    var key = function(d){ return d.data.label; };

      newFunction();

    function newFunction() {

      var text = d3.select("#"+id)
        .select(".labels")
        .selectAll("text")
        .data(_data, key);

      console.log(text);

      text
        .enter()
        .append("text")
        .attr("dy", ".24em");

      text
        .transition()
        .duration(1000).text(function (d) {
            console.log(d.data.value);
            return setComma(Math.round(d.data.value));
          })
        .attrTween("transform", function (d) {
          this.current = this.current || d;
          var i = d3.interpolate(this.current, d);

          return function (t) {
            i(t).endAngle = d.startAngle + (d.endAngle - d.startAngle) * t;
            var labelPathLength = 1 + h / rx / 2;
            var xxx = (rx + 13) *
              (midAngle(i(t)) > (3 / 2) * Math.PI ||
                midAngle(i(t)) < Math.PI / 2
                ? 1
                : -1);
            var yyy = ry * Math.sin(midAngle(i(t))) * labelPathLength + 3;
            return "translate(" + xxx + "," + yyy + ")";
          };
        })
        .styleTween("text-anchor", function (d) {
          this.current = this.current || d;
          var i = d3.interpolate(this.current, d);
          return function (t) {
            i(t).endAngle = d.startAngle + (d.endAngle - d.startAngle) * t;
            return midAngle(i(t)) > (3 / 2) * Math.PI ||
              midAngle(i(t)) < Math.PI / 2
              ? "start"
              : "end";
          };
        });

  /* ------- SLICE TO TEXT POLYLINES -------*/


      //draw polyline
      // if(config.polyline === true){
      //
      //
      // }
      //
      // if(config.polylinetext === true){
      //
      //
      // }
      //

      var polyline = d3.select("#" + id)
        .select(".lines")
        .selectAll("path")
        .data(_data, key);

      polyline.enter().append("path");
      polyline
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          return function () {
            return labelPath(d, rx + -0.5, ry + -0.5, h);
          };
        });
    }
    //  polyline.remove().exit();

    d3.select("#"+id).selectAll(".legend").remove();

    legend = d3
        .select("#"+id).select("svg")
        .append("g")
        .attr("transform","translate(-50,20)")
        .attr("class","legend")
        .attr("font-family", "Noto Sans KR")
        .attr("font-size", "0.8rem")
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(_data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {

          var initY = 137;
          var legendmargin = 15 * i;
          var legendtrans = initY + legendmargin;

          return "translate(-150," + legendtrans + ")";
        });

    legend
        .append("rect")
        .attr("x", width3 - 45)
        .attr("y",3)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill",function (d) {

          return colorscale(d.data.label)}
        );

    legend
        .append("text")
        .attr("font-family", "Noto Sans KR")
        .attr("font-weight", "Light")
        .attr("x", width3 - 28)
        .attr("y", 9.5)
        .attr("dy", "0.35em")
        .text(function (d) {
          return d.data.label + " [" + d.data.value + "]";
        });





  };

  Donut3D.draw = function (
    id,
    data,
    x /*center x*/,
    y /*center y*/,
    rx /*radius x*/,
    ry /*radius y*/,
    h /*height*/,
    ir /*inner radius*/
  ) {


    svg = d3
        .select("#"+id)
        .append("svg")
        .attr("width", width3)
        .attr("height", height3)
        .attr("viewBox", "0 0 " + width3.toString() + " "  + height3.toString() );


    // 강남금융센터 #be653e
    // 삼성지점 #78bb37
    // 수유지점 #e0b63d
    // 영업본부(개인) #ef9db5
    // 영업부 #d46b8e
    // 채권2팀 #9a9adc
    // 투자금융팀 #6cc4a0

    var labels = data.map(function (d) {
      return d.label;
    });

    colorscale = d3.scaleOrdinal()
        .domain(labels)
        .range(
            ["#be653e","#78bb37","#e0b63d","#ef9db5","#d46b8e","#9a9adc","#6cc4a0"]);



    var _data = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      })(data);

    var slices = svg
      .append("g")
      .attr("transform", "translate(" + x + "," + y + ")")
      .attr("class", "slices");

    slices
      .selectAll(".innerSlice")
      .data(_data)
      .enter()
      .append("path")
      .attr("class", "innerSlice")
      .style("fill", function (d) {
        return d3.hsl(colorscale(d.data.label)).darker(0.7).toString();
      })
      .attr("d", function (d) {
        return pieInner(d, rx + 0.5, ry + 0.5, h, ir);
      })
      .each(function (d) {
        this._current = d;
      });

    slices
      .selectAll(".topSlice")
      .data(_data)
      .enter()
      .append("path")
      .attr("class", "topSlice")
      .style("fill", function (d) {
        return colorscale(d.data.label);
      })
      .style("stroke", function (d) {
        return colorscale(d.data.label);
      })
      .attr("d", function (d) {
        return pieTop(d, rx, ry, ir);
      })
      .each(function (d) {
        this._current = d;
      });

    slices
      .selectAll(".outerSlice")
      .data(_data)
      .enter()
      .append("path")
      .attr("class", "outerSlice")
      .style("fill", function (d) {
        return d3.hsl(colorscale(d.data.label)).darker(0.7).toString();
      })
      .attr("d", function (d) {
        return pieOuter(d, rx - 0.5, ry - 0.5, h);
      })
      .each(function (d) {
        this._current = d;
      });

    slices
      .selectAll(".percent")
      .data(_data)
      .enter()
      .append("text")
      .attr("class", "percent")
      .attr("x", function (d) {
        return 0.6 * rx * Math.cos(0.5 * (d.startAngle + d.endAngle));
      })
      .attr("y", function (d) {
        return 0.6 * ry * Math.sin(0.5 * (d.startAngle + d.endAngle));
      })
      .text(getPercent)
      .each(function (d) {
        this._current = d;
      });

    legend = svg
        .append("g")
        .attr("class","legend")
        .attr("transform","translate(-50,20)")
        .attr("font-family", "Noto Sans KR")
        .attr("font-size", "0.8rem")
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(_data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {

          var initY = 137;
          var legendmargin = 15 * i;
          var legendtrans = initY + legendmargin;

          return "translate(-150," + legendtrans + ")";
        });

    legend
        .append("rect")
        .attr("x", width3 - 45)
        .attr("y",3)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill",function (d) {

          return colorscale(d.data.label);
        }
        );

    legend
        .append("text")
        .attr("font-family", "Noto Sans KR")
        .attr("font-weight", "Light")
        .attr("x", width3 - 28)
        .attr("y", 9.5)
        .attr("dy", "0.35em")
        .text(function (d) {
          return d.data.label + " [" + d.data.value + "]";
        });



    slices.append("g").attr("class", "labels");
    slices.append("g").attr("class", "lines");

    var pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      });

    var key = function (d) {
      return d.data.label;
    };

    change(data);
    change(data);


    function change(newData) {
      var text = slices
        .select(".labels")
        .selectAll("text")
        .data(pie(newData), key);

      var pathcircle = slices
        .select(".labels")
        .selectAll("text")
        .data(pie(newData), key);

      text
        .enter()
        .append("text")
        .attr("dy", ".24em")
        .text(function (d) {
          return setComma(Math.round(d.data.value));
        });

      text
        .transition()
        .duration(1000)
        .attrTween("transform", function (d) {
          var i = d3.interpolate(this.current, d);
          return function (t) {
            i(t).endAngle = d.startAngle + (d.endAngle - d.startAngle) * t;
            var labelPathLength = 1 + h / rx / 2;
            var xxx =
              (rx + 13) *
              (midAngle(i(t)) > (3 / 2) * Math.PI ||
              midAngle(i(t)) < Math.PI / 2
                ? 1
                : -1);
            var yyy = ry * Math.sin(midAngle(i(t))) * labelPathLength + 3;
            return "translate(" + xxx + "," + yyy + ")";
          };
        })
        .styleTween("text-anchor", function (d) {
          var i = d3.interpolate(this.current, d);
          return function (t) {
            i(t).endAngle = d.startAngle + (d.endAngle - d.startAngle) * t;
            return midAngle(i(t)) > (3 / 2) * Math.PI ||
              midAngle(i(t)) < Math.PI / 2
              ? "start"
              : "end";
          };
        });

      text.exit().remove();
      /* ------- SLICE TO TEXT POLYLINES -------*/

      var polyline = slices
        .select(".lines")
        .selectAll("path")
        .data(pie(newData), key);

      polyline.enter().append("path");

      polyline
        .transition()
        .duration(1000)
        .attrTween("d", function (d) {
          return function () {
            return labelPath(d, rx + -0.5, ry + -0.5, h);
          };
        });

      polyline.exit().remove();
    }

  };


  this.Donut3D = Donut3D;
})();
