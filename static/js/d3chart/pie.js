
window.addEventListener("load",function(){


    var mcgpalette0 = [
        "#edf2fd",
        "#d1dffb",
        "#b2caf9",
        "#93b5f6",
        "#7ca5f4",
        "#6595f2",
        "#5d8df0",
        "#5382ee",
        "#4978ec",
        "#3767e8",
        "#ffffff",
        "#fefeff",
        "#cbd8ff",
        "#b2c5ff",
      ];


    var data3 = [10, 20, 100];

    var width3 = 400,
        height3 = 400,
        radius3 = Math.min(width3, height3) / 2;
    
    var color = d3.scaleOrdinal()
        .range([mcgpalette0[2], mcgpalette0[6],mcgpalette0[7]]);
    
    var arc = d3.arc()
        .outerRadius(radius3 - 10)
        .innerRadius(0);
    
    var labelArc = d3.arc()
        .outerRadius(radius3 - 40)
        .innerRadius(radius3 - 40);
    
    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d; });
    
    var svg5 = d3.select("#donutpie2").append("svg")
        .attr("width", width3)
        .attr("height", height3)
        .attr("viewBox","0 0 400 400")
        .attr("preserveAspectRatio","none")
        .append("g")
        .attr("transform", "translate(" + width3 / 2 + "," + height3 / 2 + ")");
    
      var g4 = svg5.selectAll(".arc")
          .data(pie(data3))
        .enter().append("g")
          .attr("class", "arc");
    
      g4.append("path")
           .style("fill", function(d) { return color(d.data); })
          .transition().duration(500).attrTween("d", 
              function(d) { 

                var datas = undefined;
                  return datas;
        
        })
          .attr("d", arc);
;
    
      g4.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.data; });
});
