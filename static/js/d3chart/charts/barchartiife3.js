var barchart2 = (function barchart(){


    //수신 우리WON 저축은행 앱
    // mau dau 차트
    function barchartiife(){


        var divwidth;
        var divheight;

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


        };



        function draw(id,datas){


            var gridlines;
            divid = id;
            parseddata = JSON.parse(JSON.stringify(datas));


            tooltip = d3.select("body").append("div")
                .attr("class", "toolTip")
                .style("display", "none").attr("font-size", "3rem");


            if(svg2 !== undefined){
                d3.select("#"+id).select("svg").remove();
            }

            svg2 = d3.select("#" + id)
                .append("svg")
                .attr("width", 1200)
                .attr("height", 250)
                .attr("viewBox", "0 0 1200 250")
                .attr("preserveAspectRatio", "none");

            margin2 = {
                top: 30,
                right: 30,
                bottom: 30,
                left: 40
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

            x0 = d3.scaleBand()
                .rangeRound([0, width2 - 30]).paddingInner(0.15);
            x1 = d3.scaleBand()
                .padding(0.1);
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

            y.domain([
                0,
                d3.max(parseddata, function (d) {
                    return Number(d.value);
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
                    tooltip.style("opacity","1");
                })
                .on("mouseout", function () {
                    tooltip.style("display", "none");
                    tooltip.style("opacity","0");
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
                    return i * 10;
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
                    return daucolor(d.CODE);
                });


            if (datas.length < 100){
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
                      
                        return d.CODE;

                    });


            }



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
	 						g.selectAll("text")
								.attr("fill", "#383838");
					if(datas.length >= 700){
						 g.selectAll("text").remove();
					}
					else if(datas.length < 30){
						 g.selectAll("text").attr("font-size","10px");
					}
					else{
						 g.selectAll("text")
							.attr("font-size",function (d){
								return (x1.bandwidth()/3).toString() + "px";
							});
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
                    g.selectAll("text").remove();
                });
                


            legend2 = g2
                .append("g")
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
                .attr("fill", daucolor);

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
                .style("font-size", "0.5rem")
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

        // function  update(datas){
        //
        //
        //
        //     parseddata = JSON.parse(JSON.stringify(datas));
        //
        //
        //     tooltip = d3.select("body").append("div")
        //         .attr("class", "toolTip")
        //         .style("display", "none").attr("font-size", "3rem");
        //
        //
        //     svg2.remove().exit();
        //     svg2 = d3.select("#"+divid)
        //         .append("svg")
        //         .attr("width", 1200)
        //         .attr("height", 250)
        //         .attr("viewBox", "0 0 1200 250")
        //         .attr("preserveAspectRatio", "none");
        //
        //     margin2 = {
        //         top: 30,
        //         right: 30,
        //         bottom: 30,
        //         left: 40
        //     };
        //     width2 = +svg2.attr("width") - margin2.left - margin2.right;
        //     height2 = +svg2.attr("height") - margin2.top - margin2.bottom;
        //
        //
        //     x0 = d3.scaleBand()
        //         .rangeRound([0, width2-30]).paddingInner(0.15);
        //     x1 = d3.scaleBand()
        //         .padding(0.1);
        //     y = d3.scaleLinear()
        //         .rangeRound([height2, 0]);
        //
        //
        //
        //
        //     //대면비대면
        //     z2 = d3
        //         .scaleOrdinal()
        //         .range(mcgpalette0);
        //
        //     //유저통계차트용 컬러스키마
        //     daucolorpallete = [
        //         "#8ea7e0",
        //         "#8ccbd2",
        //         "#fba597"
        //     ];
        //
        //     //유저통계차트용 컬러매핑
        //     daucolor = d3
        //         .scaleOrdinal()
        //         .range(daucolorpallete);
        //
        //
        //     //json 키값(가장처음칼럼제외)
        //     keys = Object.keys(parseddata[0]);
        //
        //     //x축 키값 설정
        //     x0.domain(
        //         parseddata.map(function (d) {
        //             //날짜
        //             var datekey = Object.keys(parseddata[0])[0];
        //             //   console.log(datekey);
        //             return d[datekey];
        //         })
        //     );
        //
        //     //grouped bar 키값 설정
        //
        //     x1.domain(
        //         parseddata.map(function (d) {
        //             //날짜
        //             var codekey = Object.keys(parseddata[0])[1];
        //             //   console.log(datekey);
        //             return d[codekey];
        //         }).reverse())
        //         .rangeRound([0, x0.bandwidth()]);
        //
        //     y.domain([
        //         0,
        //         d3.max(parseddata, function (d){
        //             return parseInt(d.value);
        //         })
        //     ]).nice();
        //
        //     //차트 그리드라인
        //     gridlines = d3.axisLeft()
        //         .tickFormat("")
        //         //
        //         .tickSize(-width2+margin2.right).ticks(7)
        //         .scale(y);
        //
        //     svg2.append("g")
        //         .attr("class", "grid")
        //         .attr("transform", "translate("+margin2.left+ " ," + margin2.top + ")")
        //         .call(gridlines);
        //
        //
        //     //positioning the svg g
        //     g2 = svg2
        //         .append("g")
        //         .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
        //
        //
        //     g2.append("g")
        //         .selectAll("g")
        //         .data(parseddata)
        //         .enter()
        //         .append("g")
        //         .attr("transform", function (d) {
        //             console.log(x0(d.AREA));
        //             return "translate(" + x0(d.AREA) + ",0)";
        //         })
        //         .append("rect")
        //         .attr("x", function (d) {
        //             return x1(d.CODE);
        //         })
        //         .attr("width", x1.bandwidth())
        //         .attr("y", y(0))
        //         .on("mouseover", function () {
        //             tooltip.style("display", null);
        //         })
        //         .on("mouseout", function () {
        //             tooltip.style("display", "none");
        //         })
        //         .on("mousemove", function (d) {
        //
        //             // var subgroupName = d3.select(this.parentNode).datum().key;
        //             // var subgroupValue = d.data[subgroupName];
        //
        //             tooltip.style("left", (d3.event.pageX + 10) + "px");
        //             tooltip.style("top", (d3.event.pageY - 10) + "px");
        //             tooltip.html(d.CODE.toString() + "<br>" + setComma(d.value));
        //
        //         })
        //         .transition()
        //         .duration(1000)
        //         .delay(function (d, i) {
        //             return i * 100;
        //         }).ease(d3.easeSin)
        //         .attr("height", function (d) {
        //
        //             console.log(y(d.value));
        //
        //             console.log(d.value);
        //             return height2 - y(d.value);
        //         })
        //
        //         .attr("y", function (d) {
        //             return y(d.value);
        //         })
        //         .attr("rx", 2)
        //         .attr("fill", function (d) {
        //             return daucolor(d.CODE);
        //         });
        //
        //
        //     //tooltip text top
        //     g2.append("g")
        //         .selectAll("g")
        //         .data(parseddata)
        //         .enter()
        //         .append("g")
        //         .attr("transform", function (d) {
        //             return "translate(" + x0(d.AREA) + ",0)";
        //         })
        //         .append("text")
        //         .attr("dy", "1em")
        //         .attr("fill", "#474747")
        //         .attr("font-weight", "Regular")
        //         .attr("font-family", "Noto Sans KR")
        //         .attr("font-size", "0.5rem")
        //         .attr("text-anchor", "start")
        //         .attr("x", function (d) {
        //             return x1(d.CODE);
        //         })
        //         .attr("width", x1.bandwidth())
        //         .attr("height", function (d) {
        //             return height2 - y(parseInt(d.value));
        //         })
        //         .attr("y", function (d) {
        //             return y(parseInt(d.value)) - 22;
        //         })
        //         .text(function (d) {
        //             var text;
        //             if(d.CODE === "ALL"){
        //                 text = "회원수";
        //             }
        //             else if(d.CODE === "DAU"){
        //                 text = "DAU";
        //             }
        //             else{
        //                 text = "MAU";
        //             }
        //                 return text;
        //
        //
        //         });
        //
        //
        //
        //     g2.append("g")
        //         .attr("class", "axis")
        //         .attr("transform", "translate(0," + height2 + ")")
        //         .call(d3.axisBottom(x0).tickSizeOuter(0))
        //         .call(function (g) {
        //             g.selectAll(".tick line").remove()
        //         })
        //         .call(function (g) {
        //             g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke", "#999999")
        //         })
        //         .call(function (g) {
        //             g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "#383838")
        //         });
        //
        //     g2.append("g")
        //         .attr("class", "axis")
        //         .call(d3.axisLeft(y).ticks(null, "s").tickSizeOuter(0))
        //         .call(function (g) {
        //             g.selectAll(".tick line").remove()
        //         })
        //         .call(function (g) {
        //             g.selectAll(".domain").attr("stroke-width", "2").attr("stroke-opacity", "1").style("stroke", "#999999")
        //         })
        //         .call(function (g) {
        //             g.selectAll("text").remove();
        //         })
        //         .append("text")
        //         .attr("x", width2 / 2)
        //         .attr("y", y(y.ticks().pop()) + 0.5)
        //         .attr("dy", "0.32em")
        //         .attr("fill", "#101010")
        //         .attr("font-weight", "Regular")
        //         .attr("font-family", "Noto Sans KR")
        //         .attr("font-size", "0.5rem")
        //         .attr("text-anchor", "middle");
        //
        //
        //
        //     legend2 = g2
        //         .append("g")
        //         .attr("font-family", "Noto Sans KR")
        //         .attr("font-size", "0.5rem")
        //         .attr("text-anchor", "end")
        //         .selectAll("g")
        //         .data(x1.domain())
        //         .enter()
        //         .append("g")
        //         .attr("transform", function (d, i) {
        //             return "translate(10," + i * 15 + ")";
        //         });
        //
        //
        //     legend2
        //         .append("rect")
        //         .attr("x", width2 - 19)
        //         .attr("width", 13)
        //         .attr("height", 13)
        //         .attr("fill", daucolor);
        //
        //     legend2
        //         .append("text")
        //         .attr("x", width2 - 24)
        //         .attr("y", 10)
        //         .text(function (d) {
        //             return d;
        //         });
        //
        //
        //
        //     // y축 레이블
        //     svg2.append("g").append("text")
        //         .style("font-size", "0.5rem")
        //         .attr("transform", "translate(20" + " ," + 30 + ")")
        //         .style("text-anchor", "middle")
        //         .text("회원수");
        //
        //
        //     // x축 레이블
        //     svg2.append("text")    .style("font-size","0.5rem").style("font-family","Noto Sans KR")
        //         .attr("transform", "translate("+(width2+10) + ","+(height2+margin2.bottom+10)+")")
        //         // .attr("y", 0 - margin2.left)
        //         // .attr("x", 0 - (height2 / 2))
        //         .attr("dy", "0.35em")
        //         .style("text-anchor", "middle")
        //         .text("일자");
        //
        //
        // }


        return {
            draw:draw

        }

    }


    return barchartiife;

        })();

