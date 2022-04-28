window.addEventListener("load", function () {

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        linechartwidth = 600 - margin.left - margin.right,
        linechartheight = 200 - margin.top - margin.bottom;

    var tooltip = d3.select("body").append("div")
        .attr("class", "toolTip")
        .style("opacity", "0").attr("font-size", "3rem");

    // append the svg object to the body of the page
    var svg9 = d3.select("#linechart")
        .append("svg")
        .attr("width", linechartwidth + margin.left + margin.right)
        .attr("height", linechartheight + margin.top + margin.bottom)
        .attr("viewBox", "0 0 600 200")
        .attr("preserveAspectRatio", "none")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    //Read the data
    d3.json("/resource/retentionline.json",

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
                }).tickValues([0, 20, 40, 60, 80, 100])).
                call(function (g) { g.selectAll(".domain, .tick line").remove() })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("fill", "grey")
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

            var gridlines = d3.axisLeft()
                .tickFormat("")
                .tickSize(-linechartwidth)
                .scale(liney);

            svg9.append("g")
                .attr("class", "grid")
                .call(gridlines.tickValues([0, 20, 40, 60, 80, 100]));



            // Add the text label for the x axis
            svg.append("text")
                .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text("Date");


            // Add the text label for the Y axis
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Value");


        })
}

);