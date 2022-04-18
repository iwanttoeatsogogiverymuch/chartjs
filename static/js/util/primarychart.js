window.onload = function(){

//global chartjs options to adjust all the charts below
      //Chart.defaults.font.size = 11;
      //Chart.register(ChartDataLabels);

      var width = 500;
      var height = 500;

      //font size
      var titlefontsize = 14;
      var legendfontsize = 24;
      var subtitlefontsize = 18;

      //font familly
      var NanumBold = "NanumSquareExtraBold";
      var boldfont = "";
      var lightfont = "";
      var mideuimfont = "";

      //maincolor

      var maincolor = '';
      //change color to rgba
       function hexToRgb(hex, alpha) {
        hex = hex.replace("#", "");
        var r = parseInt(
          hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
          16
        );
        var g = parseInt(
          hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
          16
        );
        var b = parseInt(
          hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
          16
        );
        if (alpha) {
          return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
          return "rgb(" + r + ", " + g + ", " + b + ")";
        }
      }

      var barthick = 0.4;

      //this option is true by default, by disableing this ,1:1 size matching not apply
      var mantainAspectRatioOptions = false;
      var responsiveOptions = true;

      //legendOptions
      var legendVisible = true;
      var legendFontSize = 19;
      var legendColor = "red";
      var legendPostion = "center";

      //ajax call
      function getData() {}

      function veiwmodel() {}

      function chart(ctx, data, config) {
        if (data != null && config != null) {
          var newChart = new Chart(ctx, config);
        } else {
          console.log("chart data or config is empty....");

          return;
        }
      }

      //canvas
      var ctx = document.getElementById("myChart").getContext("2d");
      var ctx2 = document.getElementById("myChart2").getContext("2d");

      // var stackedBarCtx = document
      //   .getElementById("stackedBar")
      //   .getContext("2d");

      var pieCtx = document.getElementById("pieChart").getContext("2d");
      var pieCtx2 = document.getElementById("piechart2").getContext("2d");

      var datasets = [
        {
          label: "# of Votes",
          data: [1100, 1000, 3470, 5460],
          backgroundColor: ["rgba(255, 99, 132, 1)"],
          barPercentage: barthick,
        },
        {
          label: "another",
          data: [7000, 8000, 3678, 896],
          backgroundColor: ["rgba(54, 162, 235,1)"],

          barPercentage: barthick,
        },
        {
          label: "another2",
          data: [7677, 8666, 3888, 5678],
          backgroundColor: ["rgba(75, 192, 192,1)"],

          barPercentage: barthick,
        },
        {
          label: "another3",
          data: [7867, 8766, 3888, 5678],
          backgroundColor: ["rgba(75, 192, 192,1)"],

          barPercentage: barthick,
        },
        {
          label: "another4",
          data: [7867, 8266, 1888, 2678],
          backgroundColor: ["rgba(75, 192, 192,1)"],

          barPercentage: barthick,
        },
        {
          label: "another5",
          data: [7867, 8666, 3888, 5678],
          backgroundColor: ["rgba(75, 192, 192,1)"],

          barPercentage: barthick,
        },
      ];

      var config = {
        type: "bar",
        data: {
          labels: ["강남금융센터", "삼성지점", "수유지점", "영업점"],
          datasets: datasets,
        },
        options: {

            title: {
                display: true,
                text: "대면실적(단위:백만원)",
              },
          maintainAspectRatio: false,


          plugins: {
            datalabels: {
              align: "end",
              anchor: "end",
              color: "rgba(75, 192, 192,1)",
              font: {
                size: 11,
                family: NanumBold,
              },
            },

            title: {
              display: true,
              font: {
                size: titlefontsize,
                family: NanumBold,
              },
              text: "비대면실적(단위:백만원)",


            },
            legend: {
              display: false,
              position: "bottom",
              align: "end",
            },
          },
          scales: {
              
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        },
      };

      var config2 = {
        type: "bar",
        data: {
          labels: [
            "강남금융센터",
            "삼성지점",
            "수유지점",
            "영업점",
          ],
          datasets: datasets,
        },
        options: {
            title: {
              display: true,
              text: "대면실적(단위:백만원)",
            },
            

            maintainAspectRatio: false,
     
        //   responsive:true,
        //   maintainAspectRatio: false,
          plugins: {
            datalabels: {
              align: "end",
              anchor: "end",
              color: "rgba(75, 192, 192,1)",
              font: 1,
            },

            title: {
              display: true,
              text: "대면실적(단위:백만원)",
            //   font: {
            //     size: titlefontsize,
            //     family: NanumBold,
            //   },


            },
            legend: {
              display: true,
              position: "bottom",
              align: "end",
            },
          },
          scales: {
            x: {
              grid: {
                display: false
              },
            },
            y: {
              grid: {
                display: false
              },
            },
          },
        },
      };

      // var stackedBar = new Chart(stackedBarCtx, {
      //   type: "bar",
      //   data: {
      //     labels: ["강남금융센터", "삼성지점", "수유지점", "영업점"],
      //     datasets: datasets,
      //   },
      //   options: {
      //     plugins: {
      //       title: {
      //         display: true,
      //         text: "스택바",
      //       },
      //     },
      //     scales: {
      //       x: {
      //         stacked: true,
      //       },

      //     },

      //   },

      // });

      //pie charts
      // <block:setup:1>
      var data = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      };
      // </block:setup>

      // <block:config:0>
      var config4 = {
        type: "pie",
        data: data,
        options: {

            title: {
                display: true,
                text: "대면실적(단위:백만원)",
              },


          maintainAspectRatio: false,

          plugins: {
            title: {
              display: true,
              text: "비대면총합계",
              align: "center",
              font: {
                size: titlefontsize,
                weight: "bold",
              },

              padding: {
                top: 50,
                bottom: 13,
              },
            },

            legend: {
              position: "right",
              align: "center",
            },
          },
        },
      };

      var myChart = new Chart(ctx2, config2);
      var myChart2 = new Chart(ctx, config);

      var piechart_test = new Chart(pieCtx, config4);
      var piechart2_test = new Chart(pieCtx2, config4);

};

