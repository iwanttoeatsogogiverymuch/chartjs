var stackedbarchart = (function stack() {


    function stackedbarinner(){

        var xlabel;
        var ylabel;

        var colorscale3;
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
        function draw(id,data,xl,yl) {

            xlabel=xl;
            ylabel=yl;
            divid = id;

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


            colorscale2 = d3.scaleOrdinal()
                .domain(["e-자유적립적금","e-정기적금","e-회원정기예금(복리)","e-회원정기예금(단리)","더마니드림 e-정기예금","e-정기예금(복리)","e-정기예금(단리)"])
                .range(
                    ["#be653e","#78bb37","#e0b63d","#ef9db5","#d46b8e","#9a9adc","#6cc4a0"]);




            colorscale3 = d3.scaleOrdinal()
                .domain(["전체","자동이체","카카오톡이체","예약이체","지연이체","즉시이체"])
                .range(
                    ["#be653e","#78bb37","#e0b63d","#ef9db5","#d46b8e","#9a9adc"]);

            svg = d3
                .select("#"+divid)
                .append("svg")
                .attr("width", "1200")
                .attr("height", "500")
                .attr("viewBox", "0 0 1200 500")
                .attr("preserveAspectRatio", "true");

            margin = {top: 20, right: 100, bottom: 30, left: 50};
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
                }).sort(d3.ascending)
            );
            y.domain([
                0,
                d3.max(data, function (d) {
                    return d.TOTAL;
                }),
            ]).nice();
            z.domain(keys);





            colorscale3 = d3.scaleOrdinal()
                .domain(keys)
                .range(
                    ["#be653e","#78bb37","#e0b63d","#ef9db5","#d46b8e","#9a9adc"]);



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
                    return colorscale3(d.key);
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
                .attr("font-size", "1rem")
                .attr("fill", function (d, i) {
                    return "white";
                })
                .text(function (d) {
                    return setComma(d[1] - d[0]);
                });

            legend = svg
                .append("g")
                .attr("font-family", "Sans serif")
                .attr("font-size", "0.7rem")
                .attr("text-anchor", "end")
                .attr("transform","translate(150, 100)")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(-10," + i * 20 + ")";
                });

            legend
                .append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", colorscale3);

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


            // y축 레이블
            svg.append("g").append("text")
                .style("font-size", "0.8rem")
                .attr("transform", "translate(37" + " ," + 10 + ")")
                .style("text-anchor", "middle")
                .text(xlabel);


            // x축 레이블
            svg.append("text")    .style("font-size","0.8rem").style("font-family","Noto Sans KR")
                .attr("transform", "translate("+(width+10) + ","+(height+margin.bottom+10)+")")
                // .attr("y", 0 - margin2.left)
                // .attr("x", 0 - (height2 / 2))


                .attr("dy", "0.35em")
                .style("text-anchor", "middle")
                .text(ylabel);



        }


        function  update (newdata){

            d3.select("#"+divid).select("svg").remove().exit();
            draw(divid,newdata,xlabel);

        }

        return{

            draw:draw,
            update:update
        }


    }

    return stackedbarinner;

})();
