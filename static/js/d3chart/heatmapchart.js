
window.addEventListener("load", function () {


    // set the dimensions and margins of the graph
    var margin5 = { top: 30, right: 30, bottom: 30, left: 30 },
        width5 = 450 - margin5.left - margin5.right,
        height5 = 450 - margin5.top - margin5.bottom;

    // append the svg object to the body of the page
    var svg6 = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width5 + margin5.left + margin5.right)
        .attr("height", height5 + margin5.top + margin5.bottom)
        .attr("viewBox","0 0 400 400")
        .attr("preserveAspectRatio","none")
        .append("g")
        .attr("transform",
            "translate(" + margin5.left + "," + margin5.top + ")");

    // Labels of row and columns
    var myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

    // Build X scales and axis:
    var x5 = d3.scaleBand()
        .range([0, width5])
        .domain(myGroups)
        .padding(0.01);
    svg6.append("g")
        .attr("transform", "translate(0," + height5 + ")")
        .call(d3.axisBottom(x5))

    // Build X scales and axis:
    var y5 = d3.scaleBand()
        .range([height5, 0])
        .domain(myVars)
        .padding(0.01);
    svg6.append("g")
        .call(d3.axisLeft(y5));

    // Build color scale
    var myColor = d3.scaleLinear()
        .range(["white", "#69b3a2"])
        .domain([1, 100])
       
    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function (data) {

        svg6.selectAll()
            .data(data, function (d) { return d.group + ':' + d.variable; })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x5(d.group) })
            .attr("y", function (d) { return y5(d.variable) })
            .attr("width", x5.bandwidth())
            .attr("height", y5.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })

    })



});

