(function (){
    window.addEventListener('load', function () {

        var isDauchart  = null;

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

        var parseddata = JSON.parse(JSON.stringify(testdata));
        var parseddata2 = JSON.parse(JSON.stringify(testdata2));

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

        var tooltip = d3.select("body").append("div")
            .attr("class", "toolTip")
            .style("display", "none").attr("font-size", "3rem");


        var svg2 = d3.select("#userbarchart")
            .append("svg")
            .attr("width", 1920)
            .attr("height", 400)
            .attr("viewBox", "0 0 1920 400")
            .attr("preserveAspectRatio", "none");

        var margin2 = {
            top: 10,
            right: 30,
            bottom: 30,
            left: 40
        };
        var width2 = +svg2.attr("width") - margin2.left - margin2.right;
        var height2 = +svg2.attr("height") - margin2.top - margin2.bottom;

        //positioning the svg g
        var g2 = svg2
            .append("g")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        var x0 = d3.scaleBand()
            .rangeRound([0, width2]).paddingInner(0.15);
        var x1 = d3.scaleBand()
            .padding(0.1);
        var y = d3.scaleLinear()
            .rangeRound([height2, 0]);


        var mcgpalette0 = [
            "#8664cb",
            "#0075CC",
            "#48A0CE",
            "#44C4BE",
            "#36C35D",
            "#6079D6",
        ];



        //컬러 매핑
        var z2 = d3
            .scaleOrdinal()
            .range(mcgpalette0);

        //유저통계차트용 컬러스키마
        var daucolorpallete = [
            "#8ea7e0",
            "#8ccbd2",
            "#fba597"
        ];

        //유저통계차트용 컬러매핑
        var daucolor = d3
            .scaleOrdinal()
            .range(daucolorpallete);


        //json 키값(가장처음칼럼제외)
        var keys = Object.keys(parseddata[0]).slice(1);

        //x축 키값 설정
        x0.domain(
            parseddata.map(function (d) {
                //날짜
                return d.date;
            })
        );

        //grouped bar 키값 설정

        x1.domain(keys.reverse())
            .rangeRound([0, x0.bandwidth()]);

        y.domain([
            0,
            d3.max(parseddata, function (d) {
                return d3.max(keys, function (key) {
                    return d[key];
                });
            }),
        ]).nice();

        g2.append("g")
            .selectAll("g")
            .data(parseddata)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + x0(d.date) + ",0)";
            })
            .selectAll("rect")
            .data(function (d) {
                return keys.map(function (key) {
                    return { key: key, value: d[key] };
                });
            })
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return x1(d.key);
            })
            .attr("width", x1.bandwidth())
            .attr("y", y(0))
            .on("mouseover", function () { tooltip.style("display", null); })
            .on("mouseout", function () { tooltip.style("display", "none"); })
            .on("mousemove", function (d) {

                // var subgroupName = d3.select(this.parentNode).datum().key;
                // var subgroupValue = d.data[subgroupName];

                tooltip.style("left", (d3.event.pageX + 10) + "px");
                tooltip.style("top", (d3.event.pageY - 10) + "px");
                tooltip.html(d.key.toString() + "<br>" + setComma(d.value));

            })
            .transition()
            .duration(1000)
            .delay(function (d, i) {
                return i * 100;
            }).ease(d3.easeSin)
            .attr("height", function (d) {
                return height2 - y(d.value);
            })

            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("rx",2)
            .attr("fill", function (d) {
                return daucolor(d.key);
            });


        //tooltip text top
        g2.append("g")
            .selectAll("g")
            .data(parseddata)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + x0(d.date) + ",0)";
            })
            .selectAll("text")
            .data(function (d) {
                return keys.map(function (key) {
                    return { key: key, value: d[key] };
                });
            })
            .enter()
            .append("text")
            .attr("dy", "1em")
            .attr("fill", "#000")
            .attr("font-weight", "Regular")
            .attr("font-family", "Noto Sans KR")
            .attr("font-size", "1em")
            .attr("text-anchor", "start")
            .attr("x", function (d) {
                return x1(d.key);
            })
            .attr("width", x1.bandwidth())
            .attr("height", function (d) {
                return height2 - y(d.value);
            })
            .attr("y", function (d) {
                return y(d.value) - 22;
            })
            .text(function (d) {


                return d.key;


            });




        g2.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.axisBottom(x0))
            .call(function (g) { g.selectAll(".tick line").remove() })
            .call(function (g) { g.selectAll(".domain").attr("stroke-width", "5").attr("stroke-opacity", "0.5") })
            .call(function (g) { g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey") });

        g2.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", width2 / 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "Regular")
            .attr("font-family", "Noto Sans KR")
            .attr("font-size", "0.2em")
            .attr("text-anchor", "middle");


        var legend2 = g2
            .append("g")
            .attr("font-family", "Noto Sans KR")
            .attr("font-size", "1em")
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter()
            .append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });


        legend2
            .append("rect")
            .attr("x", width2 - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", daucolor);

        legend2
            .append("text")
            .attr("x", width2 - 24)
            .attr("y", 13)
            .text(function (d) {
                return d;
            });


        function  update(newData){

            x0.domain(
                newData.map(function (d) {
                    return d.date;
                })
            );
            x1.domain(keys)
                .rangeRound([0, x0.bandwidth()]);

            y.domain([
                0,
                d3.max(newData, function (d) {
                    return d3.max(keys, function (key) {
                        return d[key];
                    });
                }),
            ]).nice();

            g2
                .selectAll("g")
                .remove()
                .exit()
                .data(newData)
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.date) + ",0)";
                })
                .selectAll("rect")
                .data(function (d) {
                    return keys.map(function (key) {
                        return { key: key, value: d[key] };
                    });
                })
                .enter()
                .append("rect")
                .attr("x", function (d) {
                    return x1(d.key);
                })
                .attr("width", x1.bandwidth())
                .attr("y", y(0))
                .on("mouseover", function () { tooltip.style("display", null); })
                .on("mouseout", function () { tooltip.style("display", "none"); })
                .on("mousemove", function (d) {

                    // var subgroupName = d3.select(this.parentNode).datum().key;
                    // var subgroupValue = d.data[subgroupName];

                    tooltip.style("left", (d3.event.pageX + 10) + "px");
                    tooltip.style("top", (d3.event.pageY - 10) + "px");
                    tooltip.html(d.key.toString() + "<br>" + setComma(d.value));

                })
                .transition()
                .duration(1000)
                .delay(function (d, i) {
                    return i * 100;
                }).ease(d3.easeSin)
                .attr("height", function (d) {
                    return height2 - y(d.value);
                })

                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("rx",2)
                .attr("fill", function (d) {
                    return daucolor(d.key);
                });


            //tooltip text top
            g2.append("g")
                .selectAll("g")
                .data(newData)
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.date) + ",0)";
                })
                .selectAll("text")
                .data(function (d) {
                    return keys.map(function (key) {
                        return { key: key, value: d[key] };
                    });
                })
                .enter()
                .append("text")
                .attr("dy", "1em")
                .attr("fill", "#000")
                .attr("font-weight", "Regular")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "1em")
                .attr("text-anchor", "start")
                .attr("x", function (d) {
                    return x1(d.key);
                })
                .attr("width", x1.bandwidth())
                .attr("height", function (d) {
                    return height2 - y(d.value);
                })
                .attr("y", function (d) {
                    return y(d.value) - 22;
                })
                .text(function (d) {
                    return d.key;

                });




            g2.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height2 + ")")
                .call(d3.axisBottom(x0))
                .call(function (g) { g.selectAll(".tick line").remove() })
                .call(function (g) { g.selectAll(".domain").attr("stroke-width", "5").attr("stroke-opacity", "0.5") })
                .call(function (g) { g.selectAll("text").attr("font-family", "Noto Sans KR").attr("fill", "grey") });



            g2.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y).ticks(null, "s"))
                .append("text")
                .attr("x", width2 / 2)
                .attr("y", y(y.ticks().pop()) + 0.5)
                .attr("dy", "0.32em")
                .attr("fill", "#000")
                .attr("font-weight", "Regular")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "0.2em")
                .attr("text-anchor", "middle");

            legend2 = g2
                .append("g")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "1em")
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys.slice().reverse())
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * 20 + ")";
                });


            legend2
                .append("rect")
                .attr("x", width2 - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", daucolor);

            legend2
                .append("text")
                .attr("x", width2 - 24)
                .attr("y", 13)
                .text(function (d) {
                    return d;
                });


            //tooltip text top
            g2.append("g")
                .selectAll("g")
                .data(newData)
                .enter()
                .append("g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.date) + ",0)";
                })
                .selectAll("text")
                .data(function (d) {
                    return keys.map(function (key) {
                        return { key: key, value: d[key] };
                    });
                })
                .enter()
                .append("text")
                .attr("dy", "1em")
                .attr("fill", "#000")
                .attr("font-weight", "Regular")
                .attr("font-family", "Noto Sans KR")
                .attr("font-size", "1em")
                .attr("text-anchor", "start")
                .attr("x", function (d) {
                    return x1(d.key);
                })
                .attr("width", x1.bandwidth())
                .attr("height", function (d) {
                    return height2 - y(d.value);
                })
                .attr("y", function (d) {
                    return y(d.value) - 22;
                })
                .text(function (d) {


                    return d.key;


                });


        }


        setTimeout(update,4000,parseddata2);
    });
})();




