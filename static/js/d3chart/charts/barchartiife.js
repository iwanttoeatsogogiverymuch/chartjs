var barchart = (function barchart(){

    function barchartiife(){



        var config;

        var divid;

        var legend2;

        var keys;

        var daucolor;

        var daucolorpallete;

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
        var testdata = [
            {"date": "2022-03-01" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-02" , "DAU":"14000", "MAU":"500000", "ALL":"400000"},
            {"date": "2022-03-03" , "DAU":"24000", "MAU":"700000", "ALL":"400000"},
            {"date": "2022-03-04" , "DAU":"44000", "MAU":"200000", "ALL":"400000"},
            {"date": "2022-03-05" , "DAU":"25300", "MAU":"100000", "ALL":"400000"},
            {"date": "2022-03-06" , "DAU":"38900", "MAU":"300000", "ALL":"400000"}
        ];

        var testdata2 = [
            {"date": "2022-03-01" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-02" , "DAU":"34000", "MAU":"200000", "ALL":"400000"},
            {"date": "2022-03-03" , "DAU":"34000", "MAU":"300000", "ALL":"400000"},
            {"date": "2022-03-04" , "DAU":"34000", "MAU":"100000", "ALL":"400000"},
            {"date": "2022-03-05" , "DAU":"34000", "MAU":"250000", "ALL":"400000"},
            {"date": "2022-03-06" , "DAU":"34000", "MAU":"23000", "ALL":"400000"},
            {"date": "2022-03-07" , "DAU":"34000", "MAU":"10000", "ALL":"400000"},
            {"date": "2022-03-08" , "DAU":"34000", "MAU":"200000", "ALL":"400000"},
            {"date": "2022-03-09" , "DAU":"34000", "MAU":"356000", "ALL":"400000"},
            {"date": "2022-03-10" , "DAU":"34000", "MAU":"240000", "ALL":"400000"},
            {"date": "2022-03-11" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-12" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-13" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-14" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-15" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-16" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-17" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-18" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-19" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-21" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-22" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-23" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-24" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-25" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-26" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},
            {"date": "2022-03-27" , "DAU":"34000", "MAU":"400000", "ALL":"400000"},

        ];


        function setComma(num) {
            var len, point, str;
            num = num + "";
            point = num.length % 3;
            len = num.length;

            str = num.substring(0, point);
            while (point < len) {
                if (str !== "") str += ",";
                str += num.substring(point, point + 3);
                point += 3;
            }
            return str;


        }



        function draw(id,datas){



            divid = id;
            parseddata = JSON.parse(JSON.stringify(datas));


            tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("display", "none").attr("font-size", "3rem");




            svg2 = d3.select("#"+id)
                .append("svg")
                .attr("width", 400)
                .attr("height", 400)
                .attr("viewBox", "0 0 400 400")
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

            x0 = d3.scaleBand()
                .rangeRound([0, width2-30]).paddingInner(0.15);
            x1 = d3.scaleBand()
                .padding(0.1);
            y = d3.scaleLinear()
                .rangeRound([height2, 0]);


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

            //유저통계차트용 컬러스키마
            daucolorpallete = [
                "#8ea7e0",
                "#8ccbd2",
                "#fba597"
            ];

            //유저통계차트용 컬러매핑
            daucolor = d3
                .scaleOrdinal()
                .range(daucolorpallete);


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
            }))
                .rangeRound([0, x0.bandwidth()]);

            y.domain([
                0,
                d3.max(parseddata, function (d){
                    return d.value;
                }),
            ]).nice();

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

                    // var subgroupName = d3.select(this.parentNode).datum().key;
                    // var subgroupValue = d.data[subgroupName];

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
                .attr("fill", "#3a3a3a")
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
                    return y(parseInt(d.value)) - 18;
                })
                .text(function (d) {

                    if(config && config.value === true){
                        return d.CODE;
                    }

                    else if (config && config.label === true){
                        return d.CODE;
                    }
                    else{
                        return d.value;

                    }



                });


            g2.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height2 + ")")
                .call(d3.axisBottom(x0).tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove()
                })
                .call(function (g) {
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke","#999999")
                })
                .call(function (g) {
                    g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#383838")
                });

            g2.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s").tickSizeOuter(0))
                .call(function (g) {
                g.selectAll(".tick line").remove()
                 })
                .call(function (g) {
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke","#999999")
                })
                .call(function (g) {
                    g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#4b5154")
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


            legend2 = g2
                .append("g")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "0.5rem")
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(x1.domain())
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(10," + i * 13 + ")";
                });


            legend2
                .append("rect")
                .attr("x", width2 - 19)
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", z2);

            legend2
                .append("text")
                .attr("x", width2 - 20)
                .attr("dy","0.32em")
                .attr("y", 5)
                .text(function (d) {
                    return d;
                });



        }

        function  update(datas){



            parseddata = JSON.parse(JSON.stringify(datas));


            tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("display", "none").attr("font-size", "3rem");


            svg2.remove().exit();
            svg2 = d3.select("#"+divid)
                .append("svg")
                .attr("width", 400)
                .attr("height", 400)
                .attr("viewBox", "0 0 400 400")
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

            x0 = d3.scaleBand()
                .rangeRound([0, width2-30]).paddingInner(0.15);
            x1 = d3.scaleBand()
                .padding(0.1);
            y = d3.scaleLinear()
                .rangeRound([height2, 0]);


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

            //유저통계차트용 컬러스키마
            daucolorpallete = [
                "#8ea7e0",
                "#8ccbd2",
                "#fba597"
            ];

            //유저통계차트용 컬러매핑
            daucolor = d3
                .scaleOrdinal()
                .range(daucolorpallete);


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
                }))
                .rangeRound([0, x0.bandwidth()]);

            y.domain([
                0,
                d3.max(parseddata, function (d){
                    return d.value;
                }),
            ]).nice();

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

                    // var subgroupName = d3.select(this.parentNode).datum().key;
                    // var subgroupValue = d.data[subgroupName];

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

                    if(config && config.value === true){
                        return d.value;
                    }

                    else if (config && config.label === true){
                        return d.CODE;
                    }
                    else{
                        return d.CODE;

                    }



                });

            g2.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height2 + ")")
                .call(d3.axisBottom(x0).tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove()
                })
                .call(function (g) {
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke","#999999")
                })
                .call(function (g) {
                    g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#383838")
                });

            g2.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s").tickSizeOuter(0))
                .call(function (g) {
                    g.selectAll(".tick line").remove()
                })
                .call(function (g) {
                    g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke","#999999")
                })
                .call(function (g) {
                    g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#4b5154")
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

            legend2 = g2
                .append("g")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "0.5rem")
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(x1.domain())
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(10," + i * 13 + ")";
                });


            legend2
                .append("rect")
                .attr("x", width2 - 19)
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", z2);

            legend2
                .append("text")
                .attr("x", width2 - 20)
                .attr("dy","0.32em")
                .attr("y", 5)
                .text(function (d) {
                    return d;
                });


        }

        function readJson(){

            parseddata2 = JSON.parse(JSON.stringify(testdata2));


        }

        // setTimeout(function () {
        //
        //     readJson();
        //     update(parseddata2);
        // },4000);
        // setTimeout(update,4000,parseddata2);


        return {

            draw:draw,
            update:update

        }

    }


    return barchartiife;

        })();

