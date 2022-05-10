

var tablechart2 = (function heatmap(){

    //차트를 그릴 div id
    var divid;
    //svg 가로값
    var width = 1200;
    //svg 세로값
    var height = 50;
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

    //가입일? , retention 측정 기간
    // ex) 4월 20일 가입자 : APP_LOGIN_DT:2022-04-20
    var APP_LOGIN_DTs, preioddates;

    //x축 y축 스케일 매핑 (단순값x)
    var x5, y5;


    function onMouseOutRect() {
        return function (d) {
            var mouseoverdata = d;
            tooltip.style("opacity", "0");

            svg6.selectAll("rect")
                .filter(function (d) {
                    return d.APP_LOGIN_DT === mouseoverdata.APP_LOGIN_DT
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
            //  var subgroupValue = d.data.APP_LOGIN_DT;


            tooltip.style("left", (d3.event.pageX + 10) + "px");
            tooltip.style("top", (d3.event.pageY - 10) + "px");
            tooltip.html(d3.format(",.1%")(d.RETENTION_RATE)+ "<br>" + d.APP_LOGIN_DT);

        };
    }

    function onMouseOverRect() {
        return function (d) {
            var mouseoverdata = d;
            tooltip.style("opacity", "1");
            svg6.selectAll("rect")
                .filter(function (d) {
                    return d.APP_LOGIN_DT === mouseoverdata.APP_LOGIN_DT
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

        margin5 = {top: 20, right: 20, bottom: 5, left: 30};
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
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", "0 0 1200 50")
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

        APP_LOGIN_DTs = data.map(function (d) {
            return d.APP_LOGIN_DT;
        });

        preioddates = data.map(function (d, i) {

            return parseInt(d.PERIOD);
        });

        // Build X scales and axis:
        x5 = d3.scaleBand()
            .range([margin5.left, width5])
            .domain(preioddates.sort(d3.ascending)).padding(0.02);


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
            .domain(APP_LOGIN_DTs.sort(d3.ascending)).padding(0.02);



        svg6.append("g")
            .attr("transform", "translate(" +margin5.left+","+ 0 + ")")
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
            .attr("x", function (d) {

                return x5(d.PERIOD);
            })
            .attr("y", function (d) {
                return y5(d.APP_LOGIN_DT);
            })
            .style("stroke-width","1")
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
                        if(d.APP_LOGIN_DT !== undefined){
                            return  d.APP_LOGIN_DT === mouseoverdata.APP_LOGIN_DT;
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
                    .filter(function (d) {return d.APP_LOGIN_DT === mouseoverdata.APP_LOGIN_DT})
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

                // var subgroupName = d3.select(this.parentNode).datum().key;
                //  var subgroupValue = d.data.APP_LOGIN_DT;

                tooltip.style("left", (d3.event.pageX + 10) + "px");
                tooltip.style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(d3.format(",.1%")(d.RETENTION_RATE) +"<br>"+d.APP_LOGIN_DT);

            })
        svg6
            .append("g")
            .attr("font-family", "Noto Sans KR")
            .attr("font-weight", "Light")
            .attr("font-size", "0.6rem")
            .append("g")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function (d) {
                return d3.format(",.1%")(d.RETENTION_RATE);
            })
            .attr("x", function (d) {
                // return (i * 20) + 40;

                return x5(d.PERIOD);
            })
            .attr("y", function (d) {
                return y5(d.APP_LOGIN_DT);
                //return (local.get(this) * 20) + 40;
            })
            .attr("dx", x5.bandwidth() / 2)
            .attr("dy", y5.bandwidth() / 2)
            .attr("dominant-baseline", "text-before-edge")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", "grey")
            .attr("pointer-events","none");



    }
    function update(newData){

        svg6.selectAll("g").remove().exit();
        svg6.selectAll("rect").remove().exit();

        APP_LOGIN_DTs = newData.map(function (d) {
            return d.APP_LOGIN_DT;
        });

        preioddates = newData.map(function (d, i) {
            //  return moment - new Date(d.retentiondate.toString()) ;


           return parseInt(d.PERIOD);
        });

        // Build X scales and axis:
        x5 = d3.scaleBand()
            .range([margin5.left, width5])
            .domain(preioddates.sort(d3.ascending));



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

        // svg6
        //     .append("g")
        //     .attr("transform", "translate(0," + 0 + ")")
        //     .call(d3.axisTop(x5).tickFormat(d3.timeFormat).tickSize(0))
        //     .call(function (g) {
        //         g.selectAll(".domain, .tick line").remove()
        //     })
        //     .call(function (g) {
        //         g.selectAll("text")
        //             .attr("font-family", "Noto Sans KR")
        //             .attr("fill", "grey")
        //     });




        // Build Y scales and axis:
        y5 = d3.scaleBand()
            .range([height5, 0])
            .domain(APP_LOGIN_DTs.sort(d3.ascending));




        // .padding(0.01);
        svg6.append("g")
            .attr("transform", "translate(" +margin5.left+","+ 0 + ")")
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
            .style("stroke-width","1")
            .style("stroke","lightgrey")
            .attr("x", function (d) {

                return x5(d.PERIOD);
            })
            .style("fill", "white")
            .on("mouseover", onMouseOverRect())
            .on("mouseout", onMouseOutRect())
            .on("mousemove", onMouseMoveRect())
            .transition().delay(function (d,i) {return  i*15;}).ease(d3.easeSin)

            .attr("y", function (d) {
                return y5(d.APP_LOGIN_DT);
            })
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
            .attr("font-size", "0.6rem")
            .append("g")
            .selectAll("text")
            .data(newData)
            .enter()
            .append("text")
            .text(function (d) {
                return d3.format(",.1%")(d.RETENTION_RATE);
            })
            .attr("x", function (d) {
                return x5(d.PERIOD);
            })
            .attr("y", function (d) {
                return y5(d.APP_LOGIN_DT);
            })
            .attr("dx", x5.bandwidth() / 2)
            .attr("dy", y5.bandwidth() / 2)
            .attr("dominant-baseline", "text-before-edge")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill","grey")
            .attr("pointer-events","none");


    }


    //init inside test

    // setTimeout(function(){
    //
    //     draw();
    // },1000);
    //
    //
    //
    // setTimeout(function(){
    //
    //             update(cohortdata2test);
    //         },3000);
    //

    //public area
    return {
        update: update,
        draw:draw
    };



})();






