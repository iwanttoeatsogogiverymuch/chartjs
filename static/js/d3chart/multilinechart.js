(function extracted() {
    window.addEventListener("load", function () {

        var XMLNS_SVG_2000 = "xmlns=http://www.w3.org/2000/svg";

        var tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "toolTip")
            .style("opacity", "0");

        function onMouseOverTooltip(d) {
            tooltip.style("opacity", "1");
            tooltip.style("left", d3.event.pageX + 10 + "px");
            tooltip.style("top", d3.event.pageY + 10 + "px");
            tooltip.html(d.retentionvalue.toString());
        }

        function onMouseOutTooltip(d) {
            tooltip.style("opacity", "0");
        }

        function onMouseOver(d) {

            var hoverdata = d;
            onMouseOverTooltip(d);

            svg9.selectAll("circle").style("opacity", ".3");

            var mouseovercircle = d3.select(this)
                .style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
                })
                .style("opacity", "1")
                .attr("r", 5).raise();

            svg9.selectAll("path")
                .filter(function (pathd) {
                    console.log(pathd)
                    if (pathd != null) {

                        return pathd.key == hoverdata.signdate;
                    }


                })
                .style("stroke", function (d) {
                    return d3.hsl(d3.select(this).style("stroke")).darker(1).toString();
                });

            svg9.selectAll("path")
                .filter(function (pathd) {
                    console.log(pathd)
                    if (pathd != null) {

                        return pathd.key != hoverdata.signdate;
                    }


                })
                .style("stroke", function (d) {
                    return d3.hsl(d3.select(this).style("stroke")).brighter(1).toString();
                });
        }

        function onMouseOut(d) {

            var hoverdata = d;
            onMouseOutTooltip(d);

            svg9.selectAll("circle").style("opacity", "1");

            d3.select(this)
                .style("fill", function () {
                    return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();
                })
                .attr("r", "3.5").lower();


            svg9.selectAll("path")
                .filter(function (pathd) {
                    console.log(pathd)
                    if (pathd != null) {

                        return pathd.key == hoverdata.signdate;
                    }


                })
                .style("stroke", function (d) {
                    return d3.hsl(d3.select(this).style("stroke")).brighter(1).toString();
                });

            svg9.selectAll("path")
                .filter(function (pathd) {
                    console.log(pathd)
                    if (pathd != null) {

                        return pathd.key != hoverdata.signdate;
                    }


                })
                .style("stroke", function (d) {
                    return d3.hsl(d3.select(this).style("stroke")).darker(1).toString();
                });
        }

        function onMouseOverPath(d) {
            var hoverdata = d;

            svg9.selectAll("path").style("opacity", ".3");
            d3.select(this)
                .style("stroke", function () {
                    return d3.hsl(d3.select(this).style("stroke")).darker(1).toString();
                })
                .style("opacity", "1")
                .attr("r", 5);


            svg9.selectAll("circle")
                .filter(function (d) {
                    return d.signdate == hoverdata.key;
                })
                .style("fill", function (d) {
                    return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
                }).raise();


            svg9.selectAll("circle")
                .filter(function (d) {
                    return d.signdate != hoverdata.key;
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
                    return d.signdate == hoverdata.key;
                })
                .style("fill", function (d) {
                    return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();
                }).lower();


            svg9.selectAll("circle")
                .filter(function (d) {
                    return d.signdate != hoverdata.key;
                })
                .style("fill", function (d) {
                    return d3.hsl(d3.select(this).style("fill")).darker(1).toString();
                }).raise();


        }

        var mcgpalette0 = [
            "#8664cb",
            "#0075CC",
            "#48A0CE",
            "#44C4BE",
            "#36C35D",
            "#6079D6",
        ];

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 40},
            linechartwidth = 600 - margin.left - margin.right,
            linechartheight = 200 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg9 = d3
            .select("#multilinechart")
            .append("svg")
            .attr("width", linechartwidth + margin.left + margin.right)
            .attr("height", linechartheight + margin.top + margin.bottom)
            .attr("viewBox", "0 0 600 200")
            .attr("preserveAspectRatio", "none")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Read the data
        d3.json(
            "/resource/retention.json",

            function (err, data) {
                if (err) {
                    // document.write("error in json load");
                }
                var pnum = data.map(function (d, i) {
                    //  return moment - new Date(d.retentiondate.toString()) ;
                    var a = moment(d.retentiondate.toString());
                    var b = moment(d.signdate.toString());
                    data[i].preiod_num = a.diff(b, "days");
                    return a.diff(b, "days");
                });

                //   console.log(data);
                // Add X axis --> it is a date format
                var linex = d3
                    .scalePoint()
                    .domain(pnum.sort(d3.ascending))
                    .range([0, linechartwidth]);

                svg9
                    .append("g")
                    .attr("transform", "translate(0," + linechartheight + ")")
                    .call(d3.axisBottom(linex))
                    .call(function (g) {
                        g.selectAll(".tick line").remove();
                    })
                    .call(function (g) {
                        g.selectAll(".domain")
                            .attr("stroke-width", "2.5")
                            .attr("stroke-opacity", "0.5");
                    })
                    .call(function (g) {
                        g.selectAll("text")
                            .attr("font-family", "Noto Sans KR")
                            .attr("fill", "grey");
                    });

                // Add Y axis
                var liney = d3
                    .scaleLinear()
                    .domain([
                        0,
                        d3.max(data, function (d) {
                            return d.retentionvalue;
                        }),
                    ])
                    .range([linechartheight, 0])
                    .nice();

                svg9
                    .append("g")
                    .attr("transform", "translate(0," + 0 + ")")
                    .call(
                        d3.axisLeft(liney).tickFormat(function (d) {
                            return d + "%";
                        })
                    )
                    .call(function (g) {
                        g.selectAll(" .tick line").remove();
                    })
                    .call(function (g) {
                        g.selectAll("text")
                            .attr("font-family", "Noto Sans KR")
                            .attr("fill", "grey");
                    });
                var sumstat = d3
                    .nest()
                    .key(function (d) {
                        return d.signdate;
                    })
                    .entries(data);
                var signdatekey = sumstat.map(function (d) {
                    return d.key;
                });
                var lineColors = d3.scaleOrdinal().domain(signdatekey).range(mcgpalette0);

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
                                return linex(d.preiod_num);
                            })
                            .y(function (d) {
                                return liney(d.retentionvalue);
                            })(d.values);
                    })
                    .on("mouseover", onMouseOverPath)
                    .on("mouseout", onMouseOutPath);

                var gridlines = d3
                    .axisLeft()
                    .tickFormat("")
                    .tickSize(-linechartwidth)
                    .scale(liney);

                svg9
                    .append("g")
                    .attr("class", "grid")
                    .call(gridlines.tickValues([0, 20, 40, 60, 80, 100]));

                // Add the text label for the x axis
                svg9
                    .append("text")
                    .attr(
                        "transform",
                        "translate(" +
                        linechartwidth / 2 +
                        " ," +
                        (linechartheight + margin.bottom - 3) +
                        ")"
                    )
                    .style("text-anchor", "middle")
                    .style("font-size", "0.5rem")
                    .style("font-weight", "Bold")
                    .text("재방문일");

                // Add the text label for the Y axis
                svg9
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left)
                    .attr("x", -30)
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("Value");

                //  append circle
                var chartPoint = svg9
                    .selectAll("svg")
                    .append("g")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("r", 3.5)
                    .on("mouseover", onMouseOver)
                    .on("mouseout", onMouseOut)
                    .attr("cx", function (d) {
                        return linex(d.preiod_num);
                    })
                    .attr("cy", function (d) {
                        return liney(d.retentionvalue);
                    })
                    .style("fill", function (d) {
                        return lineColors(d.signdate);
                    });

                //범례

                var lengendxScale = d3.scaleOrdinal()
                    .domain(signdates)
                    .range(linechartwidth);

                var legendColorScale = d3.scaleOrdinal()
                    .domain(signdates)
                    .range(["blue","red","yellow","orange","grey"]);

                var legend = svg9.append("g").selectAll("rect").data(data).join().append("rect");

            }
        );
    });
})();


