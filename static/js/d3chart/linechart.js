window.addEventListener("load", function () {

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        linechartwidth = 460 - margin.left - margin.right,
        linechartheight = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#linechart")
        .append("svg")
        .attr("width", linechartwidth + margin.left + margin.right)
        .attr("height", linechartheight + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    //Read the data
    d3.json("/resource/retentionline.json",
        // // preprocess
        // function (d) {

        //     return { retentiondate: d3.timeParse("%Y-%m-%d")(d.retentiondate), retentionvalue: d.retentionvalue }
        // },

        // Now I can use this dataset:
        function (data) {


            console.log(data);
            // Add X axis --> it is a date format
            var linex = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return new Date(d.retentiondate); }))
                .range([0, linechartwidth]);
            svg.append("g")
                .attr("transform", "translate(0," + linechartheight + ")")
                .call(d3.axisBottom(linex));

            // Add Y axis
            var liney = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return d.retentionvalue; })])
                .range([linechartheight, 0]);
            svg.append("g")
                .call(d3.axisLeft(liney));

            // Add the line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) { return linex(new Date(d.retentiondate)); })
                    .y(function (d) { return liney(d.retentionvalue) })
                )

        })
}

);