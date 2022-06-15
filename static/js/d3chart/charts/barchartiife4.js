var barchart4 = (function barchartd(){


    //수신 이용현황 바차트
    function barchartiife2(){


        var isxAxisRoate;
        var divwidth = 570;
        var divheight = 500;

        var divid;

        var legend2;

        var keys;

        var z2;

        var mcgpalette0;

        var y;

        var x1;

        var x0;

        var g2;

        var height2;

        var width2;

        var margin2;

        var svg2;

        var tooltip;

        var parseddata2;

        var parseddata;

        var untactperfom = [
            {"AREA":"강남금융센터", "CODE":"정기예금","value":"340000"},
            {"AREA":"강남금융센터", "CODE":"정기적금","value":"34000"},
            {"AREA":"강남금융센터", "CODE":"핵심예금(개인)","value":"230000"},
            {"AREA":"강남금융센터", "CODE":"핵심예금(기업)","value":"11000"},
            {"AREA":"강남금융센터", "CODE":"기타","value":"320000"},
            {"AREA":"강남금융센터", "CODE":"전체","value":"430000"},
            {"AREA":"수유지점", "CODE":"정기예금","value":"2000"},
            {"AREA":"수유지점", "CODE":"정기적금","value":"30000"},
            {"AREA":"수유지점", "CODE":"핵심예금(개인)","value":"150000"},
            {"AREA":"수유지점", "CODE":"핵심예금(기업)","value":"20000"},
            {"AREA":"수유지점", "CODE":"기타","value":"340000"},
            {"AREA":"수유지점", "CODE":"전체","value":"340000"},

        ];




        function setComma(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        }


        function draw(id,datas,xaxisR){


            isxAxisRoate = xaxisR;
            var gridlines;
            divid = id;
            parseddata = JSON.parse(JSON.stringify(datas));


            tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("display", "none").attr("font-size", "3rem");


            svg2 = d3.select("#" + id)
                .append("svg")
                .attr("width", divwidth)
                .attr("height", divheight)
                .attr("viewBox", "0 0 " + divwidth + " "+ divheight)
                .attr("preserveAspectRatio", "none");

            margin2 = {
                top: 30,
                right: 10,
                bottom: 30,
                left: 60
            };

            width2 = +svg2.attr("width") - margin2.left - margin2.right;
            height2 = +svg2.attr("height") - margin2.top - margin2.bottom;

            //잔액기준실적 컬러매핑핑
            mcgpalette0 = [
                "#8664cb",
                "#0075CC",
                "#48A0CE",
                "#44C4BE",
                "#36C35D",
                "#6079D6",
            ];

            //컬러 매핑
            z2 = d3
                .scaleOrdinal()
                .range(mcgpalette0);


            x0 = d3.scaleBand()
                .rangeRound([0, width2 - 30]).paddingInner(0.15).paddingOuter(0.5);
            x1 = d3.scaleBand()
                .padding(0.3);
            y = d3.scaleLinear()
                .rangeRound([height2, 0]);

            //json 키값(가장처음칼럼제외)
            keys = Object.keys(parseddata[0]);

            //x축 키값 설정
            x0.domain(
                parseddata.map(function (d) {
                    //날짜
                    var datekey = Object.keys(parseddata[0])[0];
                    //   console.log(datekey);
                    return d[datekey];
                })
            );

            //grouped bar 키값 설정
            x1.domain(
                parseddata.map(function (d) {

                    var codekey = Object.keys(parseddata[0])[1];

                    return d[codekey];
                }).reverse())
                .rangeRound([0, x0.bandwidth()]);

            //y축
            y.domain([
                0,
                d3.max(parseddata, function (d) {
                    return parseInt(d.value);
                })
            ]);


            //차트 그리드라인
            gridlines = d3.axisLeft()
                .tickFormat("")
                //
                .tickSize(-width2+margin2.right).ticks(7)
                .scale(y);

            svg2.append("g")
                .attr("class", "grid")
                .attr("transform", "translate("+margin2.left+ " ," + margin2.top + ")")
                .call(gridlines);


            //positioning the svg g
            g2 = svg2
                .append("g")
                .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


            g2.append("g")
                .selectAll("g")
                .data(parseddata)
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    console.log(x0(d.AREA));
                    return "translate(" + x0(d.AREA) + ",0)";
                })
                .append("rect")
                .attr("x", function (d) {
                    return x1(d.CODE);
                })
                .attr("width", x1.bandwidth())
                .attr("y", y(0))
                .on("mouseover", function () {
                    tooltip.style("display", null);
                    tooltip.style("opacity", "1");

                })
                .on("mouseout", function () {
                    tooltip.style("display", "none");
                    tooltip.style("opacity", "0");
                })
                .on("mousemove", function (d) {

                    // var subgroupName = d3.select(this.parentNode).datum().key;
                    // var subgroupValue = d.data[subgroupName];

                    tooltip.style("left", (d3.event.pageX + 10) + "px");
                    tooltip.style("top", (d3.event.pageY - 10) + "px");
                    tooltip.html(d.CODE.toString() + "<br>" +  Math.round(Number(d.value)).toLocaleString());

                })
                .transition()
                .duration(1000)
                .delay(function (d, i) {
                    return i * 100;
                }).ease(d3.easeSin)
                .attr("height", function (d) {

                    console.log(y(d.value));

                    console.log(d.value);
                    return height2 - y(d.value);
                })

                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("rx", 2)
                .attr("fill", function (d) {
                    return z2(d.CODE);
                });


            //tooltip text top
            g2.append("g")
                .selectAll("g")
                .data(parseddata)
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.AREA) + ",0)";
                })
                .append("text")
                .attr("dy", "1em")
                .attr("fill", "#3a3a3a")
                .attr("font-weight", "Regular")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "0.8rem")
                .attr("text-anchor", "start")
                .attr("x", function (d) {
                    return x1(d.CODE);
                })
                .attr("width", x1.bandwidth())
                .attr("height", function (d) {
                    return height2 - y(parseInt(d.value));
                })
                .attr("y", function (d) {
                    return y(parseInt(d.value)) - 18;
                })
                .text(function (d) {
                    return Math.round(Number(d.value)).toLocaleString();
                    });

            g2.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height2 + ")")
                .call(d3.axisBottom(x0).tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove()
                })
                .call(function (g) {
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke", "#999999")
                })
                .call(function (g) {
                    g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#383838")
                    if(isxAxisRoate === true){
                    g.selectAll("text")
                            .style("text-anchor", "end")
                            .attr("dx", "-.8em")
                            .attr("dy", ".15em")
                            .attr("transform", "rotate(-65)" );
                    }
                });
            g2.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove()
                })
                .call(function (g) {
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke", "#999999")
                })
                .call(function (g) {
                    g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#383838");
                });


            legend2 = svg2
                .append("g")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "0.8rem")
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(x1.domain().reverse())
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(70," + i * 15 + ")";
                });


            legend2
                .append("rect")
                .attr("x", width2 - 19)
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", z2);

            legend2
                .append("text")
                .attr("x", width2 - 24)
                .attr("dy", "0.32em")
                .attr("y", 6)
                .text(function (d) {
                    return d;
                });



            // y축 레이블
            svg2.append("g").append("text")
                .attr("font-size", "0.8rem")
                .attr("transform", "translate(20" + " ," + 30 + ")")
                .style("text-anchor", "middle")
                .text("백만원");


            // x축 레이블
            svg2.append("text").style("font-size","0.8rem").style("font-family","Noto Sans KR")
                .attr("transform", "translate("+(width2+10) + ","+(height2+margin2.bottom+10)+")")
                // .attr("y", 0 - margin2.left)
                // .attr("x", 0 - (height2 / 2))
                .attr("dy", "0.35em")
                .style("text-anchor", "middle")
                .text("일자");



        }

        function  update(datas){



            parseddata = JSON.parse(JSON.stringify(datas));


            tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("display", "none").attr("font-size", "3rem");


            svg2.remove().exit();
            svg2 = d3.select("#" + id)
                .append("svg")
                .attr("width", divwidth)
                .attr("height", divheight)
                .attr("viewBox", "0 0 " + divwidth + " "+ divheight)
                .attr("preserveAspectRatio", "none");


            margin2 = {
                top: 30,
                right: 30,
                bottom: 30,
                left: 40
            };
            width2 = +svg2.attr("width") - margin2.left - margin2.right;
            height2 = +svg2.attr("height") - margin2.top - margin2.bottom;

            //positioning the svg g
            g2 = svg2
                .append("g")
                .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

            //스케일매핑함수 세팅

            //x좌표값 스케일
            x0 = d3.scaleBand()
                .rangeRound([0, width2-30]).paddingInner(0.15);

            //x좌표값 (그룹바 x좌표)
            x1 = d3.scaleBand()
                .padding(0.1);

            //y좌표값 스케일
            y = d3.scaleLinear()
                .rangeRound([height2, 0]);



            z2 = d3
                .scaleOrdinal()
                .range(mcgpalette0);


            //json 키값(가장처음칼럼제외)
            keys = Object.keys(parseddata[0]);

            //x축 키값 설정
            x0.domain(
                parseddata.map(function (d) {
                    //날짜
                    var datekey = Object.keys(parseddata[0])[0];
                    //   console.log(datekey);
                    return d[datekey];
                })
            );

            //grouped bar 키값 설정

            x1.domain(
                parseddata.map(function (d) {
                    //날짜
                    var codekey = Object.keys(parseddata[0])[1];
                    //   console.log(datekey);
                    return d[codekey];
                }).reverse())
                .rangeRound([0, x0.bandwidth()]);

            y.domain([
                0,
                d3.max(parseddata, function (d){
                    return parseInt(d.value);
                })
            ]).nice();

            //차트 그리드라인
            gridlines = d3.axisLeft()
                .tickFormat("")
                //
                .tickSize(-width2+margin2.right).ticks(7)
                .scale(y);

            svg2.append("g")
                .attr("class", "grid")
                .attr("transform", "translate("+margin2.left+ " ," + margin2.top + ")")
                .call(gridlines);


            g2.append("g")
                .selectAll("g")
                .data(parseddata)
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    console.log(x0(d.AREA));
                    return "translate(" + x0(d.AREA) + ",0)";
                })
                .append("rect")
                .attr("x", function (d) {
                    return x1(d.CODE);
                })
                .attr("width", x1.bandwidth())
                .attr("y", y(0))
                .on("mouseover", function () {
                    tooltip.style("display", null);
                })
                .on("mouseout", function () {
                    tooltip.style("display", "none");
                })
                .on("mousemove", function (d) {

                    tooltip.style("left", (d3.event.pageX + 10) + "px");
                    tooltip.style("top", (d3.event.pageY - 10) + "px");
                    tooltip.html(d.CODE.toString() + "<br>" + setComma(d.value));

                })
                .transition()
                .duration(1000)
                .delay(function (d, i) {
                    return i * 100;
                }).ease(d3.easeSin)
                .attr("height", function (d) {

                    console.log(y(d.value));

                    console.log(d.value);
                    return height2 - y(d.value);
                })

                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("rx", 2)
                .attr("fill", function (d) {
                    return z2(d.CODE);
                });

            //tooltip text top
            g2.append("g")
                .selectAll("g")
                .data(parseddata)
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.AREA) + ",0)";
                })
                .append("text")
                .attr("dy", "1em")
                .attr("fill", "#474747")
                .attr("font-weight", "Regular")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "0.5rem")
                .attr("text-anchor", "start")
                .attr("x", function (d) {
                    return x1(d.CODE);
                })
                .attr("width", x1.bandwidth())
                .attr("height", function (d) {
                    return height2 - y(parseInt(d.value));
                })
                .attr("y", function (d) {
                    return y(parseInt(d.value)) - 22;
                })
                .text(function (d) {
                    var text;
                    if(d.CODE === "ALL"){
                        text = "회원수";
                    }
                    else if(d.CODE === "DAU"){
                        text = "DAU";
                    }
                    else{
                        text = "MAU";
                    }
                        return text;

                });


            //x좌표 차트 틱 바
            g2.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height2 + ")")
                .call(d3.axisBottom(x0).tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove()
                })
                .call(function (g) {
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke", "#999999")
                })
                .call(function (g) {
                    g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#383838")
                });

            //y좌표 차트 틱 바
            g2.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s").tickSizeOuter(0))
                .call(function (g) {
                    //불필요한 라인 및 틱 제거
                    g.selectAll(".tick line").remove()
                })
                .call(function (g) {
                    //stroke설정
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke", "#999999")
                })
                .call(function (g) {
                    //텍스트설정
                    g.selectAll("text").remove();
                })
                .append("text")
                .attr("x", width2 / 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#101010")
                .attr("font-weight", "Regular")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "0.5rem")
                .attr("text-anchor", "middle");



            //범례
            legend2 = g2
                .append("g")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "0.8rem")
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(x1.domain())
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(10," + i * 13 + ")";
                });


            //범례 사각형
            legend2
                .append("rect")
                .attr("x", width2 - 19)
                .attr("width", 13)
                .attr("height", 13)
                .attr("fill", z2);

            //범례텍스트
            legend2
                .append("text")
                .attr("x", width2 - 24)
                .attr("y", 10)
                .text(function (d) {
                    return d;
                });



            // y축 레이블
            svg2.append("g").append("text")
                .attr("font-size", "2rem")
                .attr("transform", "translate(20" + " ," + 30 + ")")
                .style("text-anchor", "middle")
                .text("회원수");


            // x축 레이블
            svg2.append("text")    .style("font-size","0.5rem").style("font-family","Noto Sans KR")
                .attr("transform", "translate("+(width2+10) + ","+(height2+margin2.bottom+10)+")")
                // .attr("y", 0 - margin2.left)
                // .attr("x", 0 - (height2 / 2))
                .attr("dy", "0.35em")
                .style("text-anchor", "middle")
                .text("일자");


        }

        return {

            draw:draw,
            update:update

        }

    }


    return barchartiife2;

        })();

