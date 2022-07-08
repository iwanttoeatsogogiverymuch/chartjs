var stackedbarchart = (function stack() {

    /** 수신이용현황 스택바 차트
     *
     * module function으로 multiple instance 생성함수
     * @returns {{
     * update: update,
     * draw: draw
     * }}
     */
    function stackedbarinner(){

		var g;
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
        var svgwidth;
        var svgheight;

        var margin;
        var svg;
        var mcgpalette0;
        var easetype;
        var delayfunc;
        var duration;

        var tooltip;
        var gridx;
        var gridlines;
        var gridline2;

        /**
         *
         * @param num {string}   : 3 자리 마다  ","를 추가할 숫자(string)
         * @returns {string}
         */
        function setComma(num) {
           return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        }

        function getPercentNumber (sum,values){

            if(values){
                values = Number(values);
                sum = Number(sum);
                return (values / sum) * 100;
            }

        }


        /**
         *
         * @param id {string}  :  차트 svg 요소를 담을 부모 div의 id
         * @param data {json}  :  차트에 그릴 json 데이터 JSON.stringify(data) 로 넣어주는것이 안전( draw 함수 내부에서도 stringfy 적용)
         * @param xl{string}           :  x축 라벨에 쓰일 이름
         * @param yl {string}          :  y축 라벨에 쓰일 이름
         */


        function draw(id,data,xl,yl) {

            // x축 라벨 문자열
            xlabel=xl;
            //y 축 라벨 문자열
            ylabel=yl;
            //div id 문자열
            divid = id;

            data = JSON.parse(JSON.stringify(data));

                svgwidth = 1800;
                svgheight = 500;

                console.log(data);

            mcgpalette0 = ["#0075CC", "#48A0CE", "#44C4BE", "#36C35D", "#6079D6", "#E0B63D"];
            duration = 1300;
            easetype = d3.easeSin;
            delayfunc = function (d, i) {
                return i * 10;
            };
            tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("opacity", "0");

          var  colorscale2 = d3.scaleOrdinal()
                .domain(Object.keys(data[0]).slice(1))
                .range(
                    [   "#be653e",
                        "#78bb37",
                        "#e0b63d",
                        "#ef9db5",
                        "#d46b8e",
                        "#9a9adc",
                        "#6cc4a0",
                        "#ea7f84",
                        "#E9DAC1",
                        "#18978F",
                        "#84A59D"
                    ]);

            colorscale3 = d3.scaleOrdinal()
                .domain(["전체","자동이체","카카오톡이체","예약이체","지연이체","즉시이체"])
                .range(
                    ["#be653e","#78BB37FF","#e0b63d","#ef9db5","#d46b8e","#9a9adc"]);

            svg = d3
                .select("#"+divid)
                .append("svg")
                .attr("width", svgwidth)
                .attr("height", svgheight)
                .attr("viewBox", "0 0" +" "+svgwidth + " " + svgheight)
                .attr("preserveAspectRatio", "none");

            margin = {top: 60, right: 180, bottom: 120, left: 70};
            width = svg.attr("width") - margin.left - margin.right;
            height = svg.attr("height") - margin.top - margin.bottom;

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
            keys = Object.keys(data[0]).slice(1)

            //data preprocessing
            data = data.map(function (d) {

                d.TOTAL = 0;

                keys.forEach(function (keys) {
                    d.TOTAL += Math.round(Number(d[keys]));
                    d[keys] = Math.round(Number(d[keys]));
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
                }).sort(d3.ascending));
            y.domain([
                0,
                d3.max(data, function (d) {
                    return Math.round(Number(d.TOTAL));
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
                .attr("transform","translate(" + margin.left + "," + (margin.bottom-60) +")")
                .call(gridlines);
            gridlines2 = d3
                .axisTop()
                .tickFormat("")
                .tickSize(-height)
                .scale(gridx);
            svg
                .append("g")
                .attr("class", "grid")
                .attr("transform","translate(" + margin.left + "," + (margin.bottom-60) +")")
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
                  //  console.log("키:",d.key)
                    return colorscale2(d.key);
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

                tooltip.style("opacity", "1");
                tooltip.style("display", null);
            })
                .on("mouseout", function () {
                    g.selectAll("rect").attr("opacity", "1");
                    d3.select(this).style("fill", function () {
                        return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();

                    });
                    tooltip.style("opacity", "0");
                    tooltip.style("display", "none");
                })
                .on("mousemove", function (d, i, j) {
                    var subgroupName = d3.select(this.parentNode).datum().key;
                    var subgroupValue = d.data[subgroupName];       

                    tooltip.style("left", (d3.event.pageX + 10) + "px");
                    tooltip.style("top", (d3.event.pageY - 10) + "px");
                    tooltip.html(subgroupName.toString() + "<br>" +  Math.round(Number(subgroupValue)).toLocaleString("en"));

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
                    g.selectAll(".domain")
                        .attr("stroke-width", "1")
                        .attr("stroke-opacity", "0.3")
                })
                .call(function (g) {
                    g.selectAll("text").attr("fill", "grey")
                        .attr("font-size", function (d) {
                            if (data.length <= 15) {
                                return "8px";
                            } else {
                                return (x.bandwidth() / 8).toString() + "px";
                            }
                        }).attr("dx", function (d) {
                        if ( data.length >= 16) {
                            return "7px";
                        }
                        return (x.bandwidth() / 9).toString() + "px";
                    });

                    if (data.length >= 5) {
                        g.selectAll("text").attr("transform", "rotate(-45)")
                            .attr("text-anchor", "end")
                            .attr("dx", "-0.4em");
                    }
                });
            g.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove()
                })
                .call(function (g) {
                    g.selectAll(".domain")
                        .attr("stroke-width", "1")
                        .attr("stroke-opacity", "0.3")
                })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("fill", "grey")
                })
                .append("text")
                .attr("x", 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "2em")
                .attr("fill", "grey")
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
                    return ( y(d[0])- y(d[1]) ) / 2;
                })
                .attr("font-size", function (d){
                if(data.length <=20){
                	return "15px";
                }
                    return (x.bandwidth()/4).toString() + "px";
                })
                .attr("fill", function (d, i) {
                    return "white";
                })
                .text(function (d,i) {
                    var subgroupName = d3.select(this.parentNode).datum().key;
                    var subgroupValue = d.data[subgroupName];

                    if (Math.round(Number(subgroupValue)) === 0 ){
                        return "";
                    }
                    else{
                        return Math.round(Number(subgroupValue)).toLocaleString("en");
                    }

                });

            legend = svg
                .append("g")
                .attr("font-family", "Sans serif")
                .attr("font-size", "0.7rem")
                .attr("text-anchor", "end")
                .attr("transform","translate(250, 100)")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(-20," + ( 20+( i * 23) ) + ")";
                });

            legend
                .append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", colorscale2);

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
                .attr("transform", "translate(57" + " ," + 40 + ")")
                .style("text-anchor", "middle")
                .text(xlabel);

            // x축 레이블
            svg.append("text")    .style("font-size","0.8rem").style("font-family","Noto Sans KR Regular")
                .attr("transform", "translate("+(width+100) + ","+(height+margin.bottom-30)+")")
                .attr("dy", "0.35em")
                .style("text-anchor", "middle")
                .text(ylabel);

        }
        /**
         * 기존 svg 를 삭제한 이후 다시 draw함수호출로 update함
         * @param newdata {json} : 다시 변경할 차트 데이터
         */
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
