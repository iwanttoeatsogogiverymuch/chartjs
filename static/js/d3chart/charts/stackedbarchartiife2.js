//수신일보
/**
 *  - 사용안하는 차트
 * @type {{draw: draw}}
 */
var stackedbarchart2 = (function stack() {

    var divid;
    var legend;
    var keys;
    var z;
    var y;
    var x;
    var height;
    var width;
    var margin;
    var svg;
    var mcgpalette0;
    var easetype;
    var delayfunc;
    var duration;
    var tooltip;
    var gridx;
    var gridline;
    var gridline2;

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
/**
* - 차트 그리는 함수
* @param id {string}  :  차트 svg 요소를 담을 부모 div의 id
 * @param data {json}  :  차트에 그릴 json 데이터 JSON.stringify(data) 로 넣어주는것이 안전( draw 함수 내부에서도 stringfy 적용)
*/
function draw(id,data) {

    divid = id;
    if (svg !== undefined){

        d3.selectAll("#stackedbar").select("svg").remove();

    }

    data = JSON.parse(JSON.stringify(data));

    var gridlines;
    tooltip = d3.select("body").append("div")
        .attr("class", "toolTip")
        .style("opacity", "0");
    duration = 1300;
    delayfunc = function (d, i) {
        return i * 100;
    };
    easetype = d3.easeSin;

    //bar colors
    mcgpalette0 = ["#0075CC", "#48A0CE", "#44C4BE", "#36C35D", "#6079D6", "#E0B63D"];

    svg = d3
        .select("#"+divid)
        .append("svg")
        .attr("width", "700")
        .attr("height", "400")
        .attr("viewBox", "0 0 700 400")
        .attr("preserveAspectRatio", "true");

    margin = {top: 20, right: 20, bottom: 30, left: 40};
    width = +svg.attr("width") - margin.left - margin.right;
    height = +svg.attr("height") - margin.top - margin.bottom;



    x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.08)
        .align(0.1);

    gridx = d3.scaleBand()
        .rangeRound([0, width]).paddingOuter(0.08).align(0.1);

    gridx.domain(
        data.map(function (d) {
            return d.date;
        })
    );

    //y axis scale
    y = d3.scaleLinear().rangeRound([height, 0]);

    //bar

    z = d3.scaleOrdinal().range(mcgpalette0);

    //read data from csv file,then get the data and index -> callback

    keys = Object.keys(data[0]).slice(1);

    //data preprocessing

    data = data.map(function (d) {

        d.TOTAL = 0;
        keys.forEach(function (keys) {

            d.TOTAL += parseInt(d[keys]);

        });

        return d;
    });

    //data sort
    data.sort(function (a, b) {
        return b.TOTAL - a.TOTAL;
    });

    x.domain(
        data.map(function (d) {
            return d.date;
        })
    );
    y.domain([
        0,
        d3.max(data, function (d) {
            return d.TOTAL;
        }),
    ]).nice();
    z.domain(keys);


    gridlines = d3
        .axisLeft()
        .tickFormat("")
        .tickSize(-width)
        .ticks(5)
        .scale(y);

    svg
        .append("g")
        .attr("class", "grid")
        .attr("transform","translate(" + margin.left + "," + (margin.bottom-9) +")")
        .call(gridlines);


    gridlines2 = d3
        .axisTop()
        .tickFormat("")
        .tickSize(-height)
        .scale(gridx);

    svg
        .append("g")
        .attr("class", "grid")
        .attr("transform","translate(" + margin.left + "," + (margin.bottom-9) +")")
        .call(gridlines2);

    g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
            return x(d.data.date);
        })
        .attr("y", y(0)).on("mouseover", function () {

        g.selectAll("rect").attr("opacity", ".2");
        d3.select(this).style("fill", function () {
            return d3.hsl(d3.select(this).style("fill")).darker(1).toString();


        }).attr("opacity", "1");

        tooltip.style("opacity", "100");
    })


        .on("mouseout", function () {
            g.selectAll("rect").attr("opacity", "1");
            d3.select(this).style("fill", function () {
                return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();

            });
            tooltip.style("opacity", "0");
        })


        .on("mousemove", function (d, i, j) {

            var subgroupName = d3.select(this.parentNode).datum().key;
            var subgroupValue = d.data[subgroupName];

            tooltip.style("left", (d3.event.pageX + 10) + "px");
            tooltip.style("top", (d3.event.pageY - 10) + "px");
            tooltip.html(subgroupName.toString() + "<br>" + setComma(subgroupValue));


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
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call(function (g) {
            g.selectAll(".tick line").remove()
        })
        .call(function (g) {
            g.selectAll(".domain").attr("stroke-width", "1").attr("stroke-opacity", "0.3")
        })
        .call(function (g) {
            g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey")
        });


    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0))
        .call(function (g) {
            g.selectAll(".tick line").remove()
        })
        .call(function (g) {
            g.selectAll(".domain").attr("stroke-width", "1").attr("stroke-opacity", "0.3")
        })
        .call(function (g) {
            g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "lightgrey")
        })
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "2em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("");


    g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter()
        .append("g").attr("transform", "translate(0," + 0 + ")")
        .selectAll("text")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("text")
        .attr("y", function (d) {
            return y(d[1]);
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "Noto Sans KR")
        .attr("font-weight", "Light")
        .attr("alignment-baseline", "middle")
        .attr("dx", function (d, i) {
            return x(d.data.date) + x.bandwidth() / 2;
        })
        .attr("dy", function (d) {
            return (y(d[0]) - y(d[1])) / 2;
        })
        .attr("font-size", "0.66em")
        .attr("fill", function (d, i) {
            return "white";
            // return d3.hsl(z(d3.select(this.parentNode).key)).darker(3).toString();
        })
        .text(function (d) {
            return setComma(d[1] - d[0]);
        });


    legend = g
        .append("g")
        .attr("font-family", "Sans serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend
        .append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

    legend
        .append("text")
        .attr("font-family","Noto Sans KR")
        .attr("font-weight","Light")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });

}

  return{

    draw:draw
  }

})();
