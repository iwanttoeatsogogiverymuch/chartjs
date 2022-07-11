//iife함수사용
//d3 v4.js , momentjs 의존
//tablechart 의존
var linechart = (function () {

    var divid;
    var gridlines;
    var liney;
    var linex;
    var pnum;
    var svg9;
    var tooltip;
    var margin, linechartwidth, linechartheight;
    var data2;
    var data;
    var svgwidth = 1800;
    var svgheight = 350;

    var cohortdata2 = [

        {"APP_LOGIN_DT": "전체", "PERIOD": "1", "RETENTION_RATE": "0.97", "ALL":"4500"},

    ];


    function draw(id,parsedData) {

        divid = id;

        if(svg9 !== undefined){

            d3.select("#"+divid).select("svg").remove();

        }

        data = JSON.parse(JSON.stringify(parsedData));


        // 차트 마진설정
        margin = { top: 10, right: 30, bottom: 90, left: 70 };
        linechartwidth = svgwidth - margin.left - margin.right;
        linechartheight = svgheight - margin.top - margin.bottom;

        //툴팁 (차트당 1개씩 중복되고있음)
        tooltip = d3.select("body").append("div")
            .attr("class", "toolTip")
            .style("opacity", "0").attr("font-size", "3rem");


        // div 태그에 svg 요소 생성 및 위치시킴

        svg9 = d3.select("#"+divid)
            .append("svg")
            .attr("width", linechartwidth + margin.left + margin.right)
            .attr("height", linechartheight + margin.top + margin.bottom)
            .attr("viewBox", "0 0 "+svgwidth .toString()+" "+ svgheight.toString())
            .attr("preserveAspectRatio", "none")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        //json포맷으로 파일을 읽어옴
        //ie9버전에서는 cors문제로 크로스도메됨 안됨 (라이브러리 사용 필요)


        //일자로되어있는 데이터를 일별기준으로 연산해서 날짜간격 계산
        pnum = data.map(function (d, i) {


            return parseInt(d.PERIOD);
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
                return d.RETENTION_RATE;
            })])
            .range([linechartheight, 0]).nice();


        svg9.append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .call(d3.axisLeft(liney).tickFormat(function (d) {
                return d3.format(",.1%")(d);
            }).ticks(5)).call(function (g) {
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
                    return linex(d.PERIOD);
                })
                .y(function (d) {
                    return liney(d.RETENTION_RATE);
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
                return linex(d.PERIOD);
            })
            .attr("cy", function (d) {
                return liney(d.RETENTION_RATE);
            })
            .style("fill", "#2FA4FF")
            .on("mouseover", function () {

                svg9.selectAll("circle").attr("opacity", ".4");
                d3.select(this).style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
                }).attr("opacity", "1");

                tooltip.style("opacity", "100");
                tooltip.style("display",null);
            })
            .on("mouseout", function () {
                svg9.selectAll("circle").attr("opacity", "1");
                d3.select(this).style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();
                });
                tooltip.style("opacity", "0");
                tooltip.style("display","none");
            })
            .on("mousemove", function (d, i, j) {

                tooltip.style("left", (d3.event.pageX + 10) + "px");
                tooltip.style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(d3.format(",.1%")(d.RETENTION_RATE));

            })


        //차트 그리드라인
        gridlines = d3.axisLeft()
            .tickFormat("")
            .tickSize(-linechartwidth)
            .scale(liney);

        svg9.append("g")
            .attr("class", "grid")
            .call(gridlines.ticks(5));

        // x축 레이블
        svg9.append("text")
            .attr("transform", "translate(" + (linechartwidth / 2) + " ," + (linechartheight+27) + ")")
            .style("text-anchor", "middle")
            .attr("font-size","0.5rem")
            .text("Date");


        // y축 레이블
        svg9.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", (-linechartheight/2))
            .attr("font-size","0.7rem")
            .attr("dy", "0.32em")
            .style("text-anchor", "middle")
            .text("비율");

        tablechart2.draw(divid,data,svg9);

    }

    function update(newdata) {


        data = JSON.parse(JSON.stringify(newdata));

        d3.selectAll("#"+divid).selectAll("svg").remove();

        tablechart2.update(data);


        // 차트 마진설정
        margin = { top: 10, right: 30, bottom: 30, left: 70 };
        linechartwidth = svgwidth - margin.left - margin.right;
        linechartheight = svgheight - margin.top - margin.bottom;

        //툴팁 (차트당 1개씩 중복되고있음)
        tooltip = d3.select("body").append("div")
            .attr("class", "toolTip")
            .style("opacity", "0").attr("font-size", "3rem");


        // div태그에 svg요소 생성 및 위치시킴

        svg9 = d3.select("#"+divid)
            .append("svg")
            .attr("width", linechartwidth + margin.left + margin.right)
            .attr("height", linechartheight + margin.top + margin.bottom)
            .attr("viewBox", "0 0 "+svgwidth .toString()+" "+ svgheight.toString())
            .attr("preserveAspectRatio", "none")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        //json포맷으로 파일을 읽어옴
        //ie9버전에서는 cors문제로 크로스도메됨 안됨 (라이브러리 사용 필요)


        //일자로되어있는 데이터를 일별기준으로 연산해서 날짜간격 계산
        pnum = data.map(function (d, i) {


            return parseInt(d.PERIOD);
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
                return d.RETENTION_RATE;
            })])
            .range([linechartheight, 0]).nice();


        svg9.append("g")
            .attr("transform", "translate(0," + 0 + ")")
            .call(d3.axisLeft(liney).tickFormat(function (d) {
                return d3.format(",.1%")(d);
            }).ticks(5)).call(function (g) {
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
                    return linex(d.PERIOD);
                })
                .y(function (d) {
                    return liney(d.RETENTION_RATE);
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
                return linex(d.PERIOD);
            })
            .attr("cy", function (d) {
                return liney(d.RETENTION_RATE);
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
                tooltip.html(d3.format(",.1%")(d.RETENTION_RATE));

            })


        //차트 그리드라인
        gridlines = d3.axisLeft()
            .tickFormat("")
            .tickSize(-linechartwidth)
            .scale(liney);

        svg9.append("g")
            .attr("class", "grid")
            .call(gridlines.ticks(5));



        // x축 레이블
        svg9.append("text")
            .attr("transform", "translate(" + (linechartwidth / 2) + " ," + (linechartheight+27) + ")")
            .style("text-anchor", "middle")
            .attr("font-size","0.5rem")
            .text("일자");


        // y축 레이블
        svg9.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", (-linechartheight/2))
            .attr("font-size","0.7rem")
            .attr("dy", "0.32em")
            .style("text-anchor", "middle")
            .text("y축");



    }


    // setTimeout(function () {
    //     data2 = JSON.parse(JSON.stringify(cohortdata2));
    //     linechart.update(data2);

    // }, 2000);


    return {

        draw:draw,
        update:update

        

    }

})();