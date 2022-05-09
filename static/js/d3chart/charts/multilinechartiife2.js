var multilinechart2 = (function extracted() {

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

    var mcgpalette0;

    var XMLNS_SVG_2000 = "xmlns=http://www.w3.org/2000/svg";

    function buildTooltip(){

        tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "toolTip")
            .style("opacity", "0");

    }

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
                //console.log(pathd)
                if (pathd != null) {

                    return pathd.key == hoverdata.signdate;
                }

            })
            .style("stroke", function () {
                return d3.hsl(d3.select(this).attr("stroke").toString()).darker(1).toString();
            });

        svg9.selectAll("path")
            .filter(function (pathd) {
              //  console.log(pathd)
                if (pathd != null) {

                    return pathd.key != hoverdata.signdate;
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


    // .style("fill", function (d) {
    //         return d3.hsl(d3.select(this).style("fill")).brighter(1).toString();
    //     }).lower();
    //    
        
        svg9.selectAll("path")
            .filter(function (pathd) {

                if (pathd != null) {

                    return pathd.key == hoverdata.signdate;
                }


            })
            .style("stroke", function () {

                //ie9 버전에서는 attr로 색상변경시 hsl 코드 변환이 제대로 이루어지지 않음
                //style 값으로 처리해야 제대로 색상변경이가능함

                console.log(d3.select(this).style("stroke"))
                console.log(d3.select(this).attr("stroke"))
                console.log(d3.hsl(d3.select(this).attr("stroke").toString()).brighter(1).toString())
                console.log(d3.hsl(d3.select(this).style("stroke").toString()).brighter(1).toString())
                return d3.hsl(d3.select(this).style("stroke").toString()).brighter(1).toString();
            });

        svg9.selectAll("path")
            .filter(function (pathd) {
                console.log(pathd)
                if (pathd != null) {

                    return pathd.key != hoverdata.signdate;
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

    function draw (id, data){

        buildTooltip();

        divid =id;

        data =JSON.parse(JSON.stringify(data));


        mcgpalette0 = [
            "#8664cb",
            "#0075CC",
            "#48A0CE",
            "#44C4BE",
            "#36C35D",
            "#6079D6",
        ];

        // set the dimensions and margins of the graph
        margin = {top: 50, right: 30, bottom: 50, left: 40};
        linechartwidth = 1150 - margin.left - margin.right;
        linechartheight = 370 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        svg9 = d3
            .select("#"+divid)
            .append("svg")
            .attr("width", linechartwidth + margin.left + margin.right)
            .attr("height", linechartheight + margin.top + margin.bottom)
            .attr("viewBox", "0 0 1150 370")
            .attr("preserveAspectRatio", "none")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




        pnum = data.map(function (d, i) {
            //  return moment - new Date(d.retentiondate.toString()) ;
            var a = moment(d.retentiondate.toString());
            var b = moment(d.signdate.toString());
            data[i].preiod_num = a.diff(b, "days");
            return a.diff(b, "days");
        });

        //   console.log(data);
        // Add X axis --> it is a date format
        linex = d3
            .scalePoint()
            .domain(pnum.sort(d3.ascending))
            .range([0, linechartwidth]);


        var gridlines2 = d3.axisTop()
            .tickFormat("")
            .tickSize(-linechartheight)
            .scale(linex);




        svg9.append("g")
            .attr("class", "gridvertical")
            .call(gridlines2.tickValues([2,4,6,8,10,12,14]))
            .call(function (g) { g.selectAll(".domain").remove() })






        svg9
            .append("g")
            .attr("transform", "translate(0," + linechartheight + ")")
            .call(d3.axisBottom(linex).tickSizeOuter(0))
            .call(function (g) {
                g.selectAll(".tick line").remove();
            })
            .call(function (g) {
                g.selectAll(".domain")
                    .attr("stroke-width", "3")
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
                }).tickSizeOuter(0)
            )
            .call(function (g) {
                g.selectAll(" .tick line").remove();
            })
            .call(function (g) {
                g.selectAll(".domain")
                    .attr("stroke-width", "3")
                    .attr("stroke-opacity", "0.5");
            })
            .call(function (g) {
                g.selectAll("text").remove()
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
            .attr("stroke-width", 7)
            .style("stroke-linecap","round")
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

        // gridlines = d3
        //     .axisLeft()
        //     .tickFormat("")
        //     .tickSize(-linechartwidth)
        //     .scale(liney);
        //
        // svg9
        //     .append("g")
        //     .attr("class", "grid")
        //     .call(gridlines.tickValues([0, 20, 40, 60, 80, 100]));


        // y축 레이블
        svg9.append("g").append("text")
            .style("font-size", "1rem")
            .attr("transform", "translate(15" + " ," + -15 + ")")
            .style("text-anchor", "middle")
            .text("백만원");


        lengendxScale = d3.scaleBand()
            .domain(signdatekey)
            .range([linechartwidth/4,linechartwidth/4*3]);


        legendColorScale = d3.scaleOrdinal()
            .domain(signdatekey)
            .range(mcgpalette0);


        legend = svg9.append("g")
            .selectAll("rect")
            .data(signdatekey)
            .enter()
            .append("rect")
            .attr("transform",function (d,i){
              console.log(lengendxScale(d))
                return "translate("+lengendxScale(d) + "," + (linechartheight+margin.bottom - 23) + ")";
            })
           // .attr("transform","translate(300,"+(linechartheight+margin.bottom - 23) + ")")
            .attr("width","22")
            .attr("height","22")
            .attr("fill",function (d){
                return legendColorScale(d)
            })

        legend = svg9.append("g")
            .selectAll("text")
            .data(signdatekey)
            .enter()
            .append("text")
            .attr("transform",function (d,i){
                console.log(lengendxScale(d))
                return "translate("+lengendxScale(d) + "," + (linechartheight+margin.bottom - 23) + ")";
            })
            // .attr("transform","translate(300,"+(linechartheight+margin.bottom - 23) + ")")
            .attr("width","22")
            .attr("height","22")
            .attr("x","25")
            .attr("y","12")
            .attr("font-size","1rem")
            .attr("dy","0.32em")
            .attr("fill","grey").text(function (d){
                return d;
            })





        // //  append circle
        // chartPoint = svg9
        //     .selectAll("svg")
        //     .append("g")
        //     .data(data)
        //     .enter()
        //     .append("circle")
        //     .attr("r", 3.5)
        //     .on("mouseover", onMouseOver)
        //     .on("mouseout", onMouseOut)
        //     .attr("cx", function (d) {
        //         return linex(d.preiod_num);
        //     })
        //     .attr("cy", function (d) {
        //
        //         return liney(d.retentionvalue);
        //     })
        //     .style("fill", function (d) {
        //         return lineColors(d.signdate);
        //     });

        //범례

        // lengendxScale = d3.scaleOrdinal()
        //     .domain(signdates)
        //     .range(linechartwidth);
        //
        // legendColorScale = d3.scaleOrdinal()
        //     .domain(signdates)
        //     .range(["blue", "red", "yellow", "orange", "grey"]);
        //
        // legend = svg9.append("g").selectAll("rect").data(data).join().append("rect");
        //


    }


    function update (data){

        if(tooltip === undefined){
            buildTooltip();
        }

        data =JSON.parse(JSON.stringify(data));

        mcgpalette0 = [
            "#8664cb",
            "#0075CC",
            "#48A0CE",
            "#44C4BE",
            "#36C35D",
            "#6079D6",
        ];
        // set the dimensions and margins of the graph
        margin = {top: 30, right: 30, bottom: 30, left: 40};
        linechartwidth = 1100 - margin.left - margin.right;
        linechartheight = 400 - margin.top - margin.bottom;

        //delete previous chart svg
        d3.select("#multilinechart").selectAll("svg").remove();

        // append the svg object to the body of the page
        svg9 = d3
            .select("#"+divid)
            .append("svg")
            .attr("width", linechartwidth + margin.left + margin.right)
            .attr("height", linechartheight + margin.top + margin.bottom)
            .attr("viewBox", "0 0 1150 400")
            .attr("preserveAspectRatio", "none")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        pnum = data.map(function (d, i) {
            //  return moment - new Date(d.retentiondate.toString()) ;
            var a = moment(d.retentiondate.toString());
            var b = moment(d.signdate.toString());
            data[i].preiod_num = a.diff(b, "days");
            return a.diff(b, "days");
        });

        //   console.log(data);
        // Add X axis --> it is a date format
        linex = d3
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
        liney = d3
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
                        return linex(d.preiod_num);
                    })
                    .y(function (d) {
                        return liney(d.retentionvalue);
                    })(d.values);
            })
            .on("mouseover", onMouseOverPath)
            .on("mouseout", onMouseOutPath);

        // gridlines = d3
        //     .axisLeft()
        //     .tickFormat("")
        //     .tickSize(-linechartwidth)
        //     .scale(liney);
        //
        // svg9
        //     .append("g")
        //     .attr("class", "grid")
        //     .call(gridlines.tickValues([0, 20, 40, 60, 80, 100]));


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
                return linex(d.preiod_num);
            })
            .attr("cy", function (d) {

                return liney(d.retentionvalue);
            })
            .style("fill", function (d) {
                return lineColors(d.signdate);
            });

        //범례




    }


    return {

        draw: draw,
        update:update
    }

})();


