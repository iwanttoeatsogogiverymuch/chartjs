var multilinechart3 = (function extracted() {

    //수신일보ㆍ신규 금리현황
    //수신일보ㆍ신규  잔액 금리현황

    function multi3 (){

        var pointtext;
        var divid;
        var tooltip;
        var legend;
        var legendColorScale;
        var lengendxScale;
        var chartPoint;
        var gridlines;
        var lineColors;
        var signdatekey;
        var sumstat;
        var liney;
        var linex;
        var pnum;
        var svg9;
        var margin, linechartwidth, linechartheight;
        var svgWidth;
        var svgHeight;
        var mcgpalette0;


        //툴팁 생성함수
        function buildTooltip(){

            tooltip = d3
                .select("body")
                .append("div")
                .attr("class", "toolTip")
                .style("opacity", "0");

        }

        //마우스 오버시 툴팁관련 이벤트 처리 함수

        function onMouseOverTooltip(d) {

            //opcaity조정은 IE버전을 위해서
            tooltip.style("opacity", "1");
            tooltip.style("display",null);

            //툴팁 위치를 이벤트  xy로 변경
            tooltip.style("left", d3.event.pageX + 10 + "px");
            tooltip.style("top", d3.event.pageY + 10 + "px");

            //html로 툴팁 값 설정
            tooltip.html(Number(d.retentionvalue).toFixed(2)+"%");
        }

        //툴팁 안보이게 하는 함수
        function onMouseOutTooltip(d) {
            tooltip.style("opacity", "0");
            tooltip.style("display","none");
        }

        function onMouseOver(d) {

            var hoverdata = d;
            onMouseOverTooltip(d);

            //전체 원을 불퉄명하게 만든다
            svg9.selectAll("circle").style("opacity", ".3");

            //현재 over중인 요소에 대해서 색상 진하게 ,투명도 1로 변경 후
            // r크기 키운다
            // 요소의 순서를 가장 앞으로 가져온다
            var mouseovercircle = d3.select(this)
                .style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
                })
                .style("opacity", "1")
                .attr("r", 5).raise();

            svg9.selectAll("path")
                .filter(function (pathd) {
                    if (pathd != null) {


                        //원형이 포함된 라인을 선택한다
                        return pathd.key === hoverdata.signdate;
                    }

                })
                //색상변경
                .style("stroke", function () {
                    return d3.hsl(d3.select(this).attr("stroke").toString()).darker(1).toString();
                });

            //선택된 라인을 제외한 나머지 패스에 대해서  밝은색으로 처리
            svg9.selectAll("path")
                .filter(function (pathd) {
                    //  console.log(pathd)
                    if (pathd != null) {

                        return pathd.key !== hoverdata.signdate;
                    }


                })
                .style("stroke", function () {
                    return d3.hsl(d3.select(this).attr("stroke").toString()).brighter(1).toString();
                });
        }

        function onMouseOut(d) {

            var hoverdata = d;
            onMouseOutTooltip(d);

            svg9.selectAll("circle").style("opacity", "1");

            d3.select(this)
                .style("fill", function (d) {
                    return d3.rgb(lineColors(d.signdate));
                })
                .attr("r", "3.5").lower();

            svg9.selectAll("path")
                .filter(function (pathd) {
                    if (pathd != null) {
                        return pathd.key === hoverdata.signdate;
                    }
                })
                .style("stroke", function () {

                    //ie9 버전에서는 attr로 색상변경시 hsl 코드 변환이 제대로 이루어지지 않음
                    //style 값으로 처리해야 제대로 색상변경이가능함

                    // console.log(d3.select(this).style("stroke"))
                    // console.log(d3.select(this).attr("stroke"))
                    // console.log(d3.hsl(d3.select(this).attr("stroke").toString()).brighter(1).toString())
                    // console.log(d3.hsl(d3.select(this).style("stroke").toString()).brighter(1).toString())
                    return d3.hsl(d3.select(this).style("stroke").toString()).brighter(1).toString();
                });

            svg9.selectAll("path")
                .filter(function (pathd) {

                    if (pathd != null) {

                        return pathd.key !== hoverdata.signdate;
                    }


                })
                .style("stroke", function () {
                    return d3.hsl(d3.select(this).style("stroke").toString()).darker(1).toString();
                });
        }

        function onMouseOverPath(d) {
            var hoverdata = d;

            svg9.selectAll("path").style("opacity", ".3");
            d3.select(this)
                .style("stroke", function () {

                    return d3.hsl(d3.select(this).attr("stroke")).darker(1).toString();
                })
                .style("opacity", "1")
                .attr("r", 5);


            svg9.selectAll("circle")
                .filter(function (d) {
                    return d.signdate === hoverdata.key;
                })
                .style("fill", function (d) {
                    return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
                }).raise();


            svg9.selectAll("circle")
                .filter(function (d) {
                    return d.signdate !== hoverdata.key;
                })
                .style("fill", function (d) {
                    return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();
                }).lower();
        }

        function onMouseOutPath(d) {
            var hoverdata = d;
            svg9.selectAll("path").style("opacity", "1");
            d3.select(this)
                .style("stroke", function () {
                    return d3.hsl(d3.select(this).style("stroke")).brighter(1).toString();
                })
                .attr("r", "3.5");

            svg9.selectAll("circle")
                .filter(function (d) {
                    return d.signdate === hoverdata.key;
                })
                .style("fill", function (d) {
                    return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();
                }).lower();


            svg9.selectAll("circle")
                .filter(function (d) {
                    return d.signdate !== hoverdata.key;
                })
                .style("fill", function (d) {
                    return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
                }).raise();


        }

        function draw (id,data){

            divid = id;
            buildTooltip();
            data =JSON.parse(JSON.stringify(data));

            //색상 범위 설정
            mcgpalette0 = [
                "#8664cb",
                "#0075CC",
                "#48A0CE",
                "#44C4BE",
                "#36C35D",
                "#6079D6",
            ];

            // set the dimensions and margins of the graph
            svgWidth = 870;
            svgHeight = 500;
            margin = {top: 50, right: 30, bottom: 70, left: 60};
            linechartwidth = svgWidth - margin.left - margin.right;
            linechartheight = svgHeight - margin.top - margin.bottom;

            // append the svg object to the body of the page
            svg9 = d3
                .select("#"+divid)
                .append("svg")
                .attr("id",divid+"svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("viewBox", "0 0" + " "+ svgWidth + " " + svgHeight)
                .attr("preserveAspectRatio", "none")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            //데이터 프로세싱
            pnum = data.map(function (d, i) {

                return d.retentiondate;
            });


            // Add X axis --> it is a date format
            //x도메인 설정 함수
            linex = d3
                .scalePoint()
                .domain(pnum)
                .range([0, linechartwidth]).padding(0.5);

            //x축 범위 표시
            svg9
                .append("g")
                .attr("transform", "translate(0," + linechartheight + ")")
                .call(d3.axisBottom(linex).tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove();
                })
                .call(function (g) {
                    g.selectAll(".domain").remove()
                        .attr("stroke-width", "3")
                        .attr("stroke-opacity", "0.3");
                })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("fill", "grey");
                });

            // Add Y axis

            liney = d3
                .scaleLinear()
                .domain([0,
                d3.max(data.map(function (d){
                    return d.retentionvalue;
                }))
                ])
                .range([linechartheight, 0])
                .nice();

            svg9
                .append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .call(
                    d3.axisLeft(liney).tickSizeOuter(0).tickFormat(function (d) {
                        return( Number(d).toFixed(2 )+"%");
                        // return d3.format(",.1%")(d);
                    })
                )
                .call(function (g) {
                    g.selectAll(" .tick line").remove();
                })
                .call(function (g) {
                    g.selectAll(".domain").remove()
                        .attr("stroke-width", "3")
                        .attr("stroke-opacity", "0.3");
                })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("fill", "grey");
                });

            //json nest화
            sumstat = d3
                .nest()
                .key(function (d) {
                    return d.signdate;
                })
                .entries(data);


            //key 추출
            signdatekey = sumstat.map(function (d) {
                return d.key;
            });

            //컬러매핑함수
            lineColors = d3.scaleOrdinal().domain(signdatekey).range(mcgpalette0);

            //라인 그리는 부분
            svg9
                .selectAll("svg")
                .append("g")
                .data(sumstat)
                .enter()
                .append("path")
                .attr("fill", "none")
                .attr("stroke", function (d) {
                    return lineColors(d.key);
                })
                .attr("stroke-width", 3.5)
                .attr("ry", "3")
                .attr("d", function (d, i) {
                    return d3
                        .line()
                        .x(function (d) {
                            return linex(d.retentiondate);
                        })
                        .y(function (d) {
                            return liney(d.retentionvalue);
                        })(d.values);
                })
                .on("mouseover", onMouseOverPath)
                .on("mouseout", onMouseOutPath);

            //그리드 라인
            gridlines = d3
                .axisLeft()
                .tickFormat("")
                .tickSize(-linechartwidth)
                .scale(liney);

            svg9
                .append("g")
                .attr("class", "grid")
                .call(gridlines.ticks(10));

            // x축 라벨
            svg9
                .append("text")
                .attr(
                    "transform",
                    "translate(" +
                    linechartwidth +
                    " ," +
                    (linechartheight + margin.bottom - 3) +
                    ")"
                )
                .style("text-anchor", "middle")
                .style("font-size", "0.7rem")
                .text("시점");

            // y축 라벨
            svg9
                .append("text")
                .attr("transform", "translate(-10,-15)")
                .attr("y", -2)
                .attr("x", 0)
                .style("font-size", "0.7rem")
                .style("text-anchor", "middle")
                .text("금리");

            //  점 추가
            chartPoint = svg9
                .selectAll("svg")
                .append("g")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", 3.5)
                .on("mouseover", onMouseOver)
                .on("mouseout", onMouseOut)
                .attr("cx", function (d) {
                    return linex(d.retentiondate);
                })
                .attr("cy", function (d) {

                    return liney(d.retentionvalue);
                })
                .style("fill", function (d) {
                    return lineColors(d.signdate);
                });

            //점 위에 텍스트 추가
            pointtext = svg9.selectAll()
                .append("g")
                .data(data)
                .enter()
                .append("text")
                .attr("font-size","0.7rem")
                .attr("x",function (d) {
                    return linex(d.retentiondate)- 10;
                })
                .attr("y",function (d){
                    return liney(d.retentionvalue)-10;
                })
                .attr("dy","0.32em")
                .text(function (d) {
                    return( Number(d.retentionvalue).toFixed("2")+"%");
                });

            //범례 도메인 설정 함수
            lengendxScale = d3.scaleBand()
                .domain(signdatekey)
                .range([0,linechartwidth]);


            //범례 색상 설정 함수
            legendColorScale = d3.scaleOrdinal()
                .domain(signdatekey)
                .range(mcgpalette0);


            //범례 사각형
            legend = svg9.append("g")
                .selectAll("rect")
                .data(signdatekey)
                .enter()
                .append("rect")
                .attr("transform",function (d,i){

                    return "translate("+lengendxScale(d) + "," + (linechartheight+margin.bottom - 23) + ")";
                })
                // .attr("transform","translate(300,"+(linechartheight+margin.bottom - 23) + ")")
                .attr("width","13")
                .attr("height","13")
                .attr("fill",function (d){
                    return legendColorScale(d)
                })

            //범례 텍스트
            legend = svg9.append("g")
                .selectAll("text")
                .data(signdatekey)
                .enter()
                .append("text")
                .attr("transform",function (d,i){
                    return "translate("+lengendxScale(d) + "," + (linechartheight+margin.bottom - 23) + ")";
                })
                // .attr("transform","translate(300,"+(linechartheight+margin.bottom - 23) + ")")
                .attr("width","22")
                .attr("height","22")
                .attr("x","16")
                .attr("y","7")
                .attr("dy","0.32em")
                .attr("font-size","0.7rem")
                .attr("dy","0.32em")
                .attr("fill","grey").text(function (d){
                    return d;
                })


        }


        function update (data){

            if(tooltip === undefined){
                buildTooltip();
            }
            data =JSON.parse(JSON.stringify(data));
            d3.select("#"+divid).select("svg").remove();
            // append the svg object to the body of the page
            svg9 = d3
                .select("#"+divid)
                .append("svg")
                .attr("width", linechartwidth + margin.left + margin.right)
                .attr("height", linechartheight + margin.top + margin.bottom)
                .attr("viewBox", "0 0 500 500")
                .attr("preserveAspectRatio", "none")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            pnum = data.map(function (d, i) {

                return d.retentiondate;
            });

            //   console.log(data);
            // Add X axis --> it is a date format
            linex = d3
                .scalePoint()
                .domain(pnum)
                .range([0, linechartwidth]).padding(0.5);

            svg9
                .append("g")
                .attr("transform", "translate(0," + linechartheight + ")")
                .call(d3.axisBottom(linex).tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove();
                })
                .call(function (g) {
                    g.selectAll(".domain").remove()
                        .attr("stroke-width", "2.5")
                        .attr("stroke-opacity", "0.5");
                })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("fill", "grey");
                });

            // Add Y axis
            liney = d3
                .scaleLinear()
                .domain([
                    0,
                    d3.max(data, function (d) {
                        return Number(d.retentionvalue);
                    }),
                ])
                .range([linechartheight, 0])
                .nice();

            svg9
                .append("g")
                .attr("transform", "translate(0," + 0 + ")")
                .call(
                    d3.axisLeft(liney).tickSizeOuter(0).tickFormat(function (d) {
                        return d3.format(",.1%")(d);
                    })
                )
                .call(function (g) {
                    g.selectAll(" .tick line").remove();
                })
                .call(function (g) {
                    g.selectAll(".domain").remove()
                        .attr("stroke-width", "2.5")
                        .attr("stroke-opacity", "0.5");
                })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("fill", "grey");
                });
            sumstat = d3
                .nest()
                .key(function (d) {
                    return d.signdate;
                })
                .entries(data);
            signdatekey = sumstat.map(function (d) {
                return d.key;
            });
            lineColors = d3.scaleOrdinal().domain(signdatekey).range(mcgpalette0);

            //nest json data


            //color scale

            // Add the line
            svg9
                .selectAll("svg")
                .append("g")
                .data(sumstat)
                .enter()
                .append("path")
                .attr("fill", "none")
                .attr("stroke", function (d) {
                    return lineColors(d.key);
                })
                .attr("stroke-width", 3.5)
                .attr("ry", "3")
                .attr("d", function (d, i) {
                    return d3
                        .line()
                        .x(function (d) {
                            return linex(d.retentiondate);
                        })
                        .y(function (d) {
                            return liney(d.retentionvalue);
                        }).curve(d3.curveCardinal)(d.values);
                })
                .on("mouseover", onMouseOverPath)
                .on("mouseout", onMouseOutPath);

            gridlines = d3
                .axisLeft()
                .tickFormat("")
                .tickSize(-linechartwidth)
                .scale(liney);

            svg9
                .append("g")
                .attr("class", "grid")
                .call(gridlines.ticks(10));

            // Add the text label for the x axis
            svg9
                .append("text")
                .attr(
                    "transform",
                    "translate(" +
                    linechartwidth +
                    " ," +
                    (linechartheight + margin.bottom - 3) +
                    ")"
                )
                .style("text-anchor", "middle")
                .style("font-size", "0.7rem")
                .text("시점");

            // Add the text label for the Y axis
            svg9
                .append("text")
                .attr("transform", "translate(0,-10)")
                .attr("y", -2)
                .attr("x", 10)
                .style("font-size", "0.7rem")
                .style("text-anchor", "middle")
                .text("금리");

            //  append circle
            chartPoint = svg9
                .selectAll("svg")
                .append("g")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", 3.5)
                .on("mouseover", onMouseOver)
                .on("mouseout", onMouseOut)
                .attr("cx", function (d) {
                    return linex(d.retentiondate);
                })
                .attr("cy", function (d) {

                    return liney(d.retentionvalue);
                })
                .style("fill", function (d) {
                    return lineColors(d.signdate);
                });

            pointtext = svg9.selectAll()
                .append("g")
                .data(data)
                .enter()
                .append("text")
                .attr("font-size","0.5rem")
                .attr("x",function (d) {
                    return linex(d.retentiondate)- 10;
                })
                .attr("y",function (d){
                    return liney(d.retentionvalue)-10;
                })
                .attr("dy","0.32em")
                .text(function (d) {
                    return d3.format(",.1%")(d.retentionvalue);
                });

            lengendxScale = d3.scaleBand()
                .domain(signdatekey)
                .range([0,linechartwidth]);


            legendColorScale = d3.scaleOrdinal()
                .domain(signdatekey)
                .range(mcgpalette0);


            legend = svg9.append("g")
                .selectAll("rect")
                .data(signdatekey)
                .enter()
                .append("rect")
                .attr("transform",function (d,i){
                    return "translate("+lengendxScale(d) + "," + (linechartheight+margin.bottom - 23) + ")";
                })
                // .attr("transform","translate(300,"+(linechartheight+margin.bottom - 23) + ")")
                .attr("width","13")
                .attr("height","13")
                .attr("fill",function (d){
                    return legendColorScale(d)
                })

            legend = svg9.append("g")
                .selectAll("text")
                .data(signdatekey)
                .enter()
                .append("text")
                .attr("transform",function (d,i){

                    return "translate("+lengendxScale(d) + "," + (linechartheight+margin.bottom - 23) + ")";
                })
                // .attr("transform","translate(300,"+(linechartheight+margin.bottom - 23) + ")")
                .attr("width","22")
                .attr("height","22")
                .attr("x","16")
                .attr("y","7")
                .attr("dy","0.32em")
                .attr("font-size","0.7rem")
                .attr("dy","0.32em")
                .attr("fill","grey").text(function (d){
                    return d;
                })

        }

        return {
            draw: draw,
            update:update
        }

    }

    return multi3;

})();


