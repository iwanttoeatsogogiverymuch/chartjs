window.addEventListener('load', function() {


    var piesvg = d3.select("#piechart").append("svg");

    var pieg = piesvg.pie().value(function(d){

        return d.percent;
    });








});