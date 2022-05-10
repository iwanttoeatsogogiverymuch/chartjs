
//우리WON저축은행앱 전용 테이블차트
var tablechart = (function heatmap(){

    function table(){

        var config;
        //지역변수

        //차트를 그릴 div id
        var divid;

        //svg 가로값
        var width = 600;
        //svg 세로값
        var height = 200;
        //컬러스케일값 빨간색 부분 지정
        var myColorred;

        //컬러스케일값 파란색 부분 지정
        var myColor;

        //툴팁
        var tooltip;

        //데이터
        var data;

        //차트 마진(빈공간)
        var margin5;

        //차트의 가로값,세로값 (svg값이랑 다름)
        var width5, height5;

        //svg와 그안의 g값을 참조 ( 경우에따라 다를 수 있음, svg값만 참조하는것이아님)
        var svg6;

        var xIndexs, y0Indexs;

        //x축 y축 스케일 매핑 (단순값x)
        var x5, y5;

        function onMouseOutRect() {
            return function (d) {
                var mouseoverdata = d;
                tooltip.style("opacity", "0");

                svg6.selectAll("rect")
                    .filter(function (d) {
                        return d.xIndex
                            === mouseoverdata.xIndex

                    })
                    .style("fill", function () {
                        return d3.hsl(d3.select(this).style("fill")).brighter(0.5).toString();
                    });
                d3.select(this).attr("width", function () {
                    return x5.bandwidth();
                }).attr("height", function () {
                    return y5.bandwidth();
                });

            };
        }


        //지역함수

        function onMouseMoveRect() {
            return function (d) {

                // var subgroupName = d3.select(this.parentNode).datum().key;
                //  var subgroupValue = d.data.xIndex
                //  ;


                tooltip.style("left", (d3.event.pageX + 10) + "px");
                tooltip.style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(d.retentionvalue.toString() + "<br>" + d.xIndex
                );

            };
        }

        function onMouseOverRect() {
            return function (d) {
                var mouseoverdata = d;
                tooltip.style("opacity", "1");
                svg6.selectAll("rect")
                    .filter(function (d) {
                        return d.xIndex
                            === mouseoverdata.xIndex

                    })
                    .style("fill", function () {
                        return d3.hsl(d3.select(this).style("fill")).darker(0.5).toString();
                    })
                d3.select(this).attr("width", function () {
                    return x5.bandwidth() + 5;
                }).attr("height", function () {
                    return y5.bandwidth() + 5;
                });


            };
        }


        function buildTooltip() {

            tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("opcaity", "0").attr("font-size", "3rem");
        }

        function setSize() {

            margin5 = {top: 10, right: 30, bottom: 30, left: 80};
            width5 = width - margin5.left - margin5.right;
            height5 = height - margin5.top - margin5.bottom;
        }


        function getData(jsondata) {
            return JSON.parse(JSON.stringify(jsondata));
        }

        function buildSvg() {


            // div를 선택하여 svg요소를 붙여넣는다
            // view box, preserveAsepectRatio 를통해 반응형 차트로 제작
            svg6 = d3
                .select("#" + divid)
                .append("svg")
                .attr("width", width5 + margin5.left + margin5.right)
                .attr("height", height5 + margin5.top + margin5.bottom)
                .attr("viewBox", "0 0 700 200")
                .attr("prserveAspectRatio", "none")
                .append("g")
                .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");
        }

        function initChart (jsondata){

            buildTooltip();
            data = getData(jsondata);
            setSize();
            buildSvg();

        }

        //public function
        function draw(id,jsondata) {

            divid = id;

            initChart(jsondata);

            xIndexs = data.map(function (d) {
                return d.xIndex;
            });

            y0Indexs = data.map(function (d, i) {
                //  return moment - new Date(d.retentiondate.toString()) ;


                var a = moment(d.y0Index.toString());
                var b = moment(d.xIndex.toString());
                data[i].y0Index = a.diff(b, "days");
                return a.diff(b, "days");
            });

            // Build X scales and axis:
            x5 = d3.scaleBand()
                .range([0, width5 + 100])
                .domain(y0Indexs.sort(d3.ascending)).padding(0.02);


            svg6
                .append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .call(d3.axisTop(x5).tickFormat(d3.timeFormat).tickSize(0))
                .call(function (g) {
                    g.selectAll(".domain, .tick line").remove()
                })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("fill", "grey")
                });


            y5 = d3.scaleBand()
                .range([height5, 0])
                .domain(xIndexs.sort(d3.ascending)).padding(0.02);



            svg6.append("g")
                .call(d3.axisLeft(y5).tickSize(0))
                .call(function (g) {
                    g.selectAll(".domain, .tick line")
                        .remove()
                })
                .call(function (g) {
                    //g.append("rect").attr("fill","white").attr("storke","grey").attr("stroke-width","1");
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("dy","0.32em")
                        .attr("text-anchor","end")
                        .attr("fill", "grey")
                });



            svg6
                .selectAll()
                .append("g")
                .data(data, function (d) {
                    return d;
                })
                .enter()
                .append("rect")
                .attr("class","values")
                .attr("x", function (d) {

                    return x5(d.y0Index);
                })
                .attr("y", function (d) {
                    return y5(d.xIndex
                    );
                })
                .attr("rx","3")
                .style("stroke-width","0.2")
                .style("stroke","lightgrey")
                .attr("width", function () {
                    return x5.bandwidth();
                })
                .attr("height", function () {
                    return y5.bandwidth();
                })
                .style("fill", "white")
                .on("mouseover", function (d) {

                    var mouseoverdata = d;
                    tooltip.style("opacity", "1");
                    svg6.selectAll("rect")
                        .filter(function (d) {
                            if(d.xIndex
                                !== undefined){
                                return  d.xIndex
                                    === mouseoverdata.xIndex
                                    ;
                            }
                        })

                        .style("fill",function () {
                            return d3.hsl(d3.select(this).style("fill")).darker(0.5).toString();
                        });


                })
                .on("mouseout", function (d) {
                    var mouseoverdata = d;
                    tooltip.style("opacity", "0");

                    svg6.selectAll("rect")
                        .filter(function (d) {return d.xIndex
                            === mouseoverdata.xIndex
                        })
                        .style("fill",function () {
                            return d3.hsl(d3.select(this).style("fill")).brighter(0.5).toString();
                        });
                    d3.select(this).attr("width",function () {
                        return x5.bandwidth();
                    }).attr("height",function () {
                        return y5.bandwidth();
                    });

                })
                .on("mousemove", function (d) {

                    tooltip.style("left", (d3.event.pageX + 10) + "px");
                    tooltip.style("top", (d3.event.pageY - 10) + "px");
                    tooltip.html(d.retentionvalue.toString() +"<br>"+d.xIndex
                    );

                })
            svg6
                .append("g")
                .attr("font-family", "Noto Sans KR")
                .attr("font-weight", "Light")
                .attr("font-size", "0.5rem")
                .append("g")
                .selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function (d) {
                    return d.retentionvalue + "%";
                })
                .attr("x", function (d) {
                    // return (i * 20) + 40;

                    return x5(d.y0Index);
                })
                .attr("y", function (d) {
                    return y5(d.xIndex
                    );
                    //return (local.get(this) * 20) + 40;
                })
                .attr("dx", x5.bandwidth() / 2)
                .attr("dy", y5.bandwidth() / 2)
                .attr("dominant-baseline", "text-before-edge")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("fill", function (d) {

                    var textcolor;
                    if (d.retentionvalue >= 30 && d.retentionvalue < 60) {
                        textcolor = "grey";
                    } else {
                        textcolor = "grey";
                    }
                    return textcolor;

                })
                .attr("pointer-events","none");



        }
        function update(newData){

            svg6.selectAll("g").remove().exit();
            svg6.selectAll("rect").remove().exit();

            xIndex
            s = newData.map(function (d) {
                return d.xIndex
                    ;
            });

            y0Indexs = newData.map(function (d, i) {
                //  return moment - new Date(d.retentiondate.toString()) ;

                if ( d.xIndex
                    .toString() === "전체") {

                    return newData[i].y0Index = d.retentiondate;
                }

                var a = moment(d.retentiondate.toString());
                var b = moment(d.xIndex
                    .toString());
                newData[i].y0Index = a.diff(b, "days");
                return a.diff(b, "days");
            });

            // Build X scales and axis:
            x5 = d3.scaleBand()
                .range([0, width5 + 100])
                .domain(y0Indexs.sort(d3.ascending));



            svg6
                .append("g")
                .attr("transform", "translate(0,"  + 0 + ")")
                .call(d3.axisTop(x5).tickFormat(d3.timeFormat).tickSize(0))
                .call(function (g) {
                    g.selectAll(".domain, .tick line").remove()
                })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("fill", "grey")
                });



            // Build Y scales and axis:
            y5 = d3.scaleBand()
                .range([height5, 0])
                .domain(xIndexs.sort(d3.ascending));


            // .padding(0.01);
            svg6.append("g")
                .call(d3.axisLeft(y5).tickSize(0))
                .call(function (g) {
                    g.selectAll(".domain, .tick line")
                        .remove()
                })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("fill", "grey")
                });


            svg6
                .selectAll().append("g")
                .data(newData, function (d) {
                    return d;
                })
                .enter()
                .append("rect")
                // .attr("x", "0")
                // .attr("y", "0")
                .attr("x", function (d) {

                    return x5(d.y0Index);
                })
                .style("fill", function (d) {
                    if (d.retentionvalue > 50) {
                        return myColor(d.retentionvalue);
                    } else {
                        return myColorred(d.retentionvalue);
                    }
                })
                .on("mouseover", onMouseOverRect())
                .on("mouseout", onMouseOutRect())
                .on("mousemove", onMouseMoveRect())
                .transition().delay(function (d,i) {return  i*15;}).ease(d3.easeSin)

                .attr("y", function (d) {
                    return y5(d.xIndex
                    );
                })
                .attr("rx", 10)
                .attr("ry", 10)
                .attr("width", function () {
                    return x5.bandwidth();
                })
                .attr("height", function () {
                    return y5.bandwidth();
                });


            svg6
                .append("g")
                .attr("font-family", "Noto Sans KR")
                .attr("font-weight", "Light")
                .attr("font-size", "0.3rem")
                .append("g")
                .selectAll("text")
                .data(newData)
                .enter()
                .append("text")
                .text(function (d) {
                    return d.retentionvalue + "%";
                })
                .attr("x", function (d) {
                    return x5(d.y0Index);
                })
                .attr("y", function (d) {
                    return y5(d.xIndex
                    );
                })
                .attr("dx", x5.bandwidth() / 2)
                .attr("dy", y5.bandwidth() / 2)
                .attr("dominant-baseline", "text-before-edge")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("fill", function (d) {

                    var textcolor;
                    if (d.retentionvalue >= 30 && d.retentionvalue < 60) {
                        textcolor = "grey";
                    } else {
                        textcolor = "grey";
                    }
                    return textcolor;
                })
                .attr("pointer-events","none");


        }


        //public area
        return {
            update: update,
            draw:draw
        };


    }

 return table;

})();






