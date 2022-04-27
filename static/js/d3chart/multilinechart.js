window.addEventListener("load", function () {

    var XMLNS_SVG_2000 = "xmlns=http://www.w3.org/2000/svg";

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        linechartwidth = 600 - margin.left - margin.right,
        linechartheight = 200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg9 = d3.select("#multilinechart")
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
                .call(function (g) { g.selectAll(".tick line").remove() })
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
                call(function (g) { g.selectAll(".domain, .tick line").remove() })
                .call(function (g) {
                    g.selectAll("text")
                        .attr("font-family", "Noto Sans KR")
                        .attr("fill", "grey")
                });

            // Add the line
            svg9.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "#6cc4a0")
                .attr("stroke-width", 2.5)
                .attr("d", d3.line()
                    .x(function (d) { return linex(d.preiod_num); })
                    .y(function (d) { return liney(d.retentionvalue); })
                )
     

                //Add custom X axis

                //Add custom Y axis

        })
}

);