//iife함수사용
//d3 v4.js , momentjs 의존
var linechart = (function () {

    var config;
    var tablebottom ;


    var gridlines;
    var liney;
    var linex;
    var pnum;
    var svg9;
    var tooltip;
    var margin, linechartwidth, linechartheight;
    var data2;
    var data;
    var width = 800;
    var height = 400;

    //테스트데이터(임의가공)
    var cohortdata = [
        { "signdate": "2022-04-02", "retentiondate": "2022-04-03", "retentionvalue": "97" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-04", "retentionvalue": "96" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-05", "retentionvalue": "95" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-06", "retentionvalue": "93" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-07", "retentionvalue": "92" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-08", "retentionvalue": "88" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-09", "retentionvalue": "79" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-10", "retentionvalue": "77" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-11", "retentionvalue": "65" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-12", "retentionvalue": "50" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-13", "retentionvalue": "42" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-14", "retentionvalue": "33" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-15", "retentionvalue": "32" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-16", "retentionvalue": "30" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-17", "retentionvalue": "29" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-18", "retentionvalue": "28" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-19", "retentionvalue": "25" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-20", "retentionvalue": "20" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-21", "retentionvalue": "18" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-22", "retentionvalue": "15" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-23", "retentionvalue": "13" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-24", "retentionvalue": "12" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-25", "retentionvalue": "11" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-26", "retentionvalue": "10" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-27", "retentionvalue": "9" },
        { "signdate": "2022-04-02", "retentiondate": "2022-04-28", "retentionvalue": "8" }
    ];


    //테스트데이터(임의가공)
    var cohortdata2 = [

        { "signdate": "2022-04-03", "retentiondate": "2022-04-04", "retentionvalue": "88" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-05", "retentionvalue": "87" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-06", "retentionvalue": "78" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-07", "retentionvalue": "76" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-08", "retentionvalue": "72" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-09", "retentionvalue": "70" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-10", "retentionvalue": "68" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-11", "retentionvalue": "64" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-12", "retentionvalue": "63" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-13", "retentionvalue": "62" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-14", "retentionvalue": "60" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-15", "retentionvalue": "55" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-16", "retentionvalue": "52" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-17", "retentionvalue": "48" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-18", "retentionvalue": "44" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-19", "retentionvalue": "42" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-20", "retentionvalue": "40" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-21", "retentionvalue": "38" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-22", "retentionvalue": "36" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-23", "retentionvalue": "30" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-24", "retentionvalue": "28" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-25", "retentionvalue": "25" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-26", "retentionvalue": "23" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-27", "retentionvalue": "21" },
        { "signdate": "2022-04-03", "retentiondate": "2022-04-28", "retentionvalue": "20" }
    ];


    function setConfig(){

        if(config === undefined){

            config = {

                isxAxisTitleVisible:true,
                isyAxisTitleVisible:true,
                isTable: true,
                gridline:{
                    x:true,
                    y:false,
                }

            };

        }
        else{

        }

    }
    function onMouseOut() {
        svg9.selectAll("circle").attr("opacity", "1");
        d3.select(this).style("fill", function () {
            return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();
        });
        tooltip.style("opacity", "0");
    }
    function onMouseOver() {

        svg9.selectAll("circle").attr("opacity", ".4");
        d3.select(this).style("fill", function () {
            return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
        }).attr("opacity", "1");

        tooltip.style("opacity", "100");
    }

    function onMouseMove(d, i, j) {

        tooltip.style("left", (d3.event.pageX + 10) + "px");
        tooltip.style("top", (d3.event.pageY - 10) + "px");
        tooltip.html(d.retentionvalue + "%");

    }
    function preprocessing (parseData){

        if(paseData !== undefined){


        }
    }

    function draw(id,parsedData,config) {

        if(config !== undefined){
            this.config = config;
        }
       else{
            setConfig();
        }
        data = JSON.parse(JSON.stringify(JSON.parse((parsedData))));
        //test data
        //not used
        data2 = JSON.parse(JSON.stringify(cohortdata2));

        // 차트 마진설정
        margin = { top: 10, right: 30, bottom: 30, left: 40 };
        linechartwidth = 600 - margin.left - margin.right;
        linechartheight = 200 - margin.top - margin.bottom;

        //툴팁 (차트당 1개씩 중복되고있음)
        tooltip = d3.select("body").append("div")
            .attr("class", "toolTip")
            .style("opacity", "0").attr("font-size", "3rem");


        // div태그에 svg요소 생성 및 위치시킴

        svg9 = d3.select("#linechart")
            .append("svg")
            .attr("width", linechartwidth + margin.left + margin.right)
            .attr("height", linechartheight + margin.top + margin.bottom)
            .attr("viewBox", "0 0 600 200")
            .attr("preserveAspectRatio", "none")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        //json포맷으로 파일을 읽어옴
        //ie9버전에서는 cors문제로 크로스도메됨 안됨 (라이브러리 사용 필요)


        //일자로되어있는 데이터를 일별기준으로 연산해서 날짜간격 계산
        pnum = data.map(function (d, i) {

            var a = moment(d.retentiondate.toString());
            var b = moment(d.signdate.toString());
            data[i].preiod_num = a.diff(b, "days");
            return a.diff(b, "days");
        });

        //   console.log(data);
        // 스케일밴드가 아닌 스케일포인트로해야 추후 path를 그릴시에 x,y 포인트 위치가 정확히 맞음 (rect는 band로)
        linex = d3.scalePoint()
            .domain(pnum.sort(d3.ascending))
            .range([0, linechartwidth]);


        //x축 (기본설정에서 tick domain line 제거)
        svg9.append("g")
            .attr("transform", "translate(0," + linechartheight + ")")
            .call(d3.axisBottom(linex))
            .call(function (g) {
                g.selectAll(".domain, .tick line").remove()
            })
            .call(function (g) {
                g.selectAll("text")
                    .attr("font-family", "Noto Sans KR")
                    .attr("fill", "grey")
            });

        // Add Y axis
        liney = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) {
                return d.retentionvalue;
            })])
            .range([linechartheight, 0]).nice();


        svg9.append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .call(d3.axisLeft(liney).tickFormat(function (d) {
                return d + "%"
            }).tickValues([0, 20, 40, 60, 80, 100])).call(function (g) {
                g.selectAll(".domain, .tick line").remove()
            })
            .call(function (g) {
                g.selectAll("text")
                    .attr("font-family", "Noto Sans KR")
                    .attr("fill", "grey")
            });


        // path그리는 부분
        // linex liney로 축 계산
        svg9.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#94B3FD")
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
                .x(function (d) {
                    return linex(d.preiod_num);
                })
                .y(function (d) {
                    return liney(d.retentionvalue);
                })
            )


        // add the dots with tooltips
        svg9.selectAll(".circle")
            .data(data)
            .enter().append("circle")
            .attr("class", "circle")
            .attr("border", "1px solid")
            .attr("r", 3.5)
            .attr("pointer-event", "none")
            .attr("cx", function (d) {
                return linex(d.preiod_num);
            })
            .attr("cy", function (d) {
                return liney(d.retentionvalue);
            })
            .style("fill", "#2FA4FF")
            .on("mouseover", function () {

                svg9.selectAll("circle").attr("opacity", ".4");
                d3.select(this).style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
                }).attr("opacity", "1");

                tooltip.style("opacity", "100");
            })
            .on("mouseout", function () {
                svg9.selectAll("circle").attr("opacity", "1");
                d3.select(this).style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();
                });
                tooltip.style("opacity", "0");
            })
            .on("mousemove", function (d, i, j) {

                tooltip.style("left", (d3.event.pageX + 10) + "px");
                tooltip.style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(d.retentionvalue + "%");

            })


        //차트 그리드라인
        gridlines = d3.axisLeft()
            .tickFormat("")
            .tickSize(-linechartwidth)
            .scale(liney);

        svg9.append("g")
            .attr("class", "grid")
            .call(gridlines.tickValues([0, 20, 40, 60, 80, 100]));



        // x축 레이블
        svg9.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
            .style("text-anchor", "middle")
            .text("Date");


        // y축 레이블
        svg9.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Value");





    }

    function update(data) {




        d3.selectAll("#linechart").selectAll("svg").remove();

        var svg9 = d3.select("#linechart")
            .append("svg")
            .attr("width", linechartwidth + margin.left + margin.right)
            .attr("height", linechartheight + margin.top + margin.bottom)
            .attr("viewBox", "0 0 600 200")
            .attr("preserveAspectRatio", "none")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var pnum = data.map(function (d, i) {

            var a = moment(d.retentiondate.toString());
            var b = moment(d.signdate.toString());
            data[i].preiod_num = a.diff(b, "days");
            return a.diff(b, "days");
        });

        //   console.log(data);
        // Add X axis --> it is a date format
        var linex = d3.scalePoint()
            .domain(pnum.sort(d3.ascending))
            .range([0, linechartwidth]);


        svg9.append("g")
            .attr("transform", "translate(0," + linechartheight + ")")
            .call(d3.axisBottom(linex))
            .call(function (g) { g.selectAll(".domain, .tick line").remove() })
            .call(function (g) {
                g.selectAll("text")
                    .attr("font-family", "Noto Sans KR")
                    .attr("fill", "grey")
            });

        // Add Y axis
        var liney = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.retentionvalue; })])
            .range([linechartheight, 0]).nice();



        svg9.append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .call(d3.axisLeft(liney).tickFormat(function (d) {
                return d + "%"
            }).tickValues([0, 20, 40, 60, 80])).
            call(function (g) { g.selectAll(".domain, .tick line").remove() })
            .call(function (g) {
                g.selectAll("text")
                    .attr("font-family", "Noto Sans KR")
                    .attr("fill", "grey")
                    .attr("font-size", "0.5rem")
                    .attr("text-anchor", "middle")
            });


        // Build color scale
        var mylineColorblue = d3
            .scaleSequential()
            .domain([100, 50])
            .interpolator(d3.interpolate("#418af3", "white"));
        var mylineColorred = d3.scaleSequential()
            .domain([50, 0])
            .interpolator(d3.interpolate("white", "#ff5d5c"));



        // Add the line
        svg9.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#94B3FD")
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
                .x(function (d) { return linex(d.preiod_num); })
                .y(function (d) { return liney(d.retentionvalue); })
            )



        // add the dots with tooltips
        svg9.selectAll(".circle")
            .data(data)
            .enter().append("circle")
            .attr("class", "circle")
            .attr("border", "1px solid")
            .attr("r", 3.5)
            .attr("pointer-event", "none")
            .attr("cx", function (d) {
                return linex(d.preiod_num);
            })
            .attr("cy", function (d) {
                return liney(d.retentionvalue);
            })
            .style("fill", "#2FA4FF")
            .on("mouseover", function () {

                svg9.selectAll("circle").attr("opacity", ".4");
                d3.select(this).style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
                }).attr("opacity", "1");

                tooltip.style("opacity", "100");
            })
            .on("mouseout", function () {
                svg9.selectAll("circle").attr("opacity", "1");
                d3.select(this).style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();
                });
                tooltip.style("opacity", "0");
            })
            .on("mousemove", function (d, i, j) {

                tooltip.style("left", (d3.event.pageX + 10) + "px");
                tooltip.style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(d.retentionvalue + "%");

            })



        //차트 그리드라인
        gridlines = d3.axisLeft()
            .tickFormat("")
            .tickSize(-linechartwidth)
            .scale(liney);

        svg9.append("g")
            .attr("class", "grid")
            .call(gridlines.tickValues([0, 20, 40, 60, 80, 100]));



        // x축 레이블
        svg9.append("g").append("text")
            .style("font-size", "0.5rem")
            .attr("transform", "translate(-20" + " ," + 0 + ")")
            .style("text-anchor", "middle")
            .text("x축");


        // // y축 레이블
        // svg9.append("text")    .style("font-size","0.5rem").style("font-family","Noto Sans KR")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 0 - margin.left)
        //     .attr("x", 0 - (linechartheight / 2))
        //     .attr("dy", "0.35em")
        //     .style("text-anchor", "middle")
        //     .text("y축");









    };


    // setTimeout(function () {
    //     data2 = JSON.parse(JSON.stringify(cohortdata2));
    //     linechart.update(data2);

    // }, 2000);


    return {

        draw:draw,
        update:update

        

    }

})();