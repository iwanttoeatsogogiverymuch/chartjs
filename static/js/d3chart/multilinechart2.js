window.addEventListener("load", function () {

    var XMLNS_SVG_2000 = "xmlns=http://www.w3.org/2000/svg";


    var mcgpalette0 = [
        "#8664cb",
        "#0075CC",
        "#48A0CE",
        "#44C4BE",
        "#36C35D",
        "#6079D6",
    ];


    // set the dimensions and margins of the graph

    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        linechartwidth = 600 - margin.left - margin.right,
        linechartheight = 200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg9 = d3.select("#multilinechart2")
        .append("svg")
        .attr("width", linechartwidth + margin.left + margin.right)
        .attr("height", linechartheight + margin.top + margin.bottom)
        .attr("viewBox", "0 0 600 200")
        .attr("preserveAspectRatio", "none")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    //Read the data
    d3.json("/resource/retention.json",

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
                .range([0, linechartwidth]).padding(3);


            svg9.append("g")
                .attr("transform", "translate(0," + linechartheight + ")")
                .call(d3.axisBottom(linex))
                .call(function (g) { g.selectAll(".tick line").remove() })
                .call(function (g) { g.selectAll(".domain").attr("stroke-width", "2.5").attr("stroke-opacity", "0.5") })
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
                })).
                call(function (g) { g.selectAll(" .tick line").remove() })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("fill", "grey")
                });


            //nest json data
            var sumstat = d3.nest()
                .key(d => d.signdate)
                .entries(data);
            var signdatekey = sumstat.map(function (d) { return d.key; });




            //color scale
            var lineColors = d3.scaleOrdinal().domain(signdatekey).range(mcgpalette0);

            console.log(sumstat);

            // Add the line
            svg9.selectAll("svg").append("g")
                .data(sumstat)
                .enter()
                .append("path")
                .attr("fill", "none")
                .attr("stroke", function (d) {

                    return lineColors(d.key);
                })
                .attr("stroke-width", 3.5).attr("ry", "3")
                .attr("d", function (d, i) {
                    return d3.line()
                        .x(function (d) { return linex(d.preiod_num); })
                        .y(function (d) { return liney(d.retentionvalue); })(d.values)
                }
                )

            var gridlines2 = d3.axisTop()
                .tickFormat("")
                .tickSize(-linechartheight)
                .scale(linex);

            svg9.append("g")
                .attr("class", "gridvertical")
                .call(gridlines2.tickValues([2, 4, 6, 8, 10, 12,14])) 
                .call(function (g) { g.selectAll(".domain").remove() })



            // Add the text label for the x axis
            svg9.append("text")
                .attr("transform", "translate(" + linechartwidth + " ," + (linechartheight + margin.bottom - 3) + ")")
                .style("text-anchor", "middle")
                .style("font-size", "0.5rem")
                .style("font-weight", "Bold")
                .text("재방문일");


            // Add the text label for the Y axis
            svg9.append("text")
   
                .attr("y", -10 )
                .attr("x", -20)
                .attr("dy", "1em")
                .style("font-size", "0.5rem")
                .style("font-weight", "Bold")
                .style("text-anchor", "middle")
                .text("리텐션비율");

                
            //  append circle 

            svg9.selectAll("svg").append("g")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", 3.5)
                .attr("cx", function (d) { return linex(d.preiod_num) })
                .attr("cy", function (d) { return liney(d.retentionvalue); })
                .style("fill", function (d) { return lineColors(d.signdate) })


        })
}

);