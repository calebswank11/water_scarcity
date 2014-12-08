

/*--TARGET CLICKED COUTNRY--*/
  $.getJSON('json/world-countries.json', function(data) {

    for (var i = 0; i < data.features.length; i++ ) { 
      country_abbrv = data.features[i].id;

      country_title = data.features[i].properties.name
      
      $(document).on('click', '#' + country_abbrv, function(){

        country_title = $(this).find('title').text();
        waste_water_info = $(this).find('waste').text();

        $(this).siblings().attr('class', '#aaa');
        $(this).attr('class', 'red');


        $('.project_title').find('p').remove();
        $('.project_title').append("<p>" + country_title + "</p>");

        //Append waste water ifo to header
          $('.waste_water_info'). find('h2').remove();
          $('.waste_water_info').append("<h2>" + waste_water_info + "</h2>");

          $('.percent_of_waste_water_chart').css('width', waste_water_info+'%');

        //BAR GRAPH ADDITIONAL DISPLAY
          var bardata_last = Math.round(bardata[20]);
          $('.last_bar_chart_indicator').find('h2').remove();
          $('.last_bar_chart_indicator').append("<h2 id='availability_number'>" + bardata_last + "%</h2>");
          $('.last_bar_chart_indicator_graph').css('height', bardata_last+'%');
              
          AccessToWaterData (country_title);
          environmentalIssues (country_title);
          mortalityRate(country_title);
          
      });
    }
  });
/*--END CLICKED COUNTRY--*/





/*--INITIAL DRAW OF BAR CHART--*/
  var bardata = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];

  var margin = { top: 30, right: 30, bottom: 40, left:50 };

  var height = 80,
    width = 600 - margin.left - margin.right,
    barWidth = 50,
    barOffset = 5;

  var tempColor;

    var colors = d3.scale.linear()
      .domain([0, bardata.length*.33, bardata.length*.6, bardata.length])
      .range(['#435552','#648785', '#8ED2D1'])

    var yScale = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range([0, height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(0, bardata.length))
      .rangeBands([0, width], 0.2)

    var barChart = d3.select('#bar_chart').append('svg')

      .style ('background', '')
      
      .attr('width', width + margin.left + margin.right )

      .attr('height', height + margin.top + margin.bottom )

      .append('g')

      .attr('transform', 'translate(' + margin.left +', ' + margin.top + ')')

      .style('overflow', 'visible')

      .selectAll('rect').data(bardata)

      .enter().append('rect')
        .style('fill', function(d,i) {
              return colors(i);
          })
          .attr('width', xScale.rangeBand())
          .attr('x', function(d,i) {
              return xScale(i);
          })
          .attr('height', 0)
          .attr('y', height)

      barChart.transition()
        .attr('height', function(d) {
            return yScale(d);
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })
        .delay(function(d, i) {
            return i * 20;
        })
        .duration(1000)
        .ease('elastic')

      var vGuideScale = d3.scale.linear()
        .domain([0, 100])
        .range([height, 0])

      var hGuideScale = d3.scale.ordinal()
        .domain(d3.range(0, 0))
        .rangeBands([0, width], 0.2)

      var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('right')
        .ticks(5)

      var vGuide = d3.select('#bar_chart svg')
        .append('g')
        vAxis(vGuide)   

        vGuide.attr('transform', 'translate(35, 25)')   
        vGuide.selectAll('path')
          .style({fill: 'none', stroke: '#000' })     

        vGuide.selectAll('line')
          .style({fill: 'none', stroke: '#000' })

      var hAxis = d3.svg.axis()
        .scale(hGuideScale)
        .orient('bottom')
        .ticks(20)

      var hGuide = d3.select('#bar_chart svg').append('g')
        hAxis(hGuide)
        hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
        hGuide.selectAll('path')
            .style({ fill: 'none', stroke: "#000"})
        hGuide.selectAll('line')
            .style({ stroke: "#000"})
/*--END INITIAL DRAW OF BAR GRAPH--*/


/*--BAR CHART INFO--*/
  function AccessToWaterData (country_title) {

      bardata.length = 0;

       if (bardata.length != 0) {
        bardata.shift();
       }

       $.getJSON("json/access_to_water.json", function( response ) {
          
          var len = response.length;

          for (var i = 0; i < len; i++) {

                var CountryMatch = response[i].FIELD1;

                if (CountryMatch == country_title){
                    
                    for (var k in response[i]){
                        if (response[i].hasOwnProperty(k)) {
                            array_item = response[i][k];     
                            bardata.push(array_item); 
                        };
                    };

                    bardata.shift();

                    $('#bar_chart').empty();

                    var margin = { top: 30, right: 30, bottom: 40, left:50 }

                    var height = 80,
                      width = 600 - margin.left - margin.right,
                      barWidth = 50,
                      barOffset = 5;

                    var tempColor;

                      var colors = d3.scale.linear()
                        .domain([0, bardata.length*.33, bardata.length*.6, bardata.length])
                        .range(['#435552','#648785', '#8ED2D1'])

                      var yScale = d3.scale.linear()
                        .domain([0, 100])
                        .range([0, height]);

                      var xScale = d3.scale.ordinal()
                        .domain(d3.range(0, bardata.length))
                        .rangeBands([0, width], 0.2)

                      var barChart = d3.select('#bar_chart').append('svg')
                        
                        .attr('width', width + margin.left + margin.right )

                        .attr('height', height + margin.top + margin.bottom )

                        .append('g')

                        .attr('transform', 'translate(' + margin.left +', ' + margin.top + ')')

                        .style('overflow', 'visible')

                        .selectAll('rect').data(bardata)

                        .enter().append('rect')
                          .style('fill', function(d,i) {
                                return colors(i);
                            })
                            .attr('width', xScale.rangeBand())
                            .attr('x', function(d,i) {
                                return xScale(i);
                            })
                            .attr('height', 0)
                            .attr('y', height)

                        barChart.transition()
                          .attr('height', function(d) {
                              return yScale(d);
                          })
                          .attr('y', function(d) {
                              return height - yScale(d);
                          })
                          .delay(function(d, i) {
                              return i * 20;
                          })
                          .duration(1000)
                          .ease('elastic')

                        var vGuideScale = d3.scale.linear()
                          .domain([0, 100])
                          .range([height, 0])

                        var hGuideScale = d3.scale.ordinal()
                          .domain(d3.range(1980, 2012))
                          .rangeBands([0, width], 0.2)

                        var vAxis = d3.svg.axis()
                          .scale(vGuideScale)
                          .orient('right')
                          .ticks(5)

                        var vGuide = d3.select('#bar_chart svg')
                          .append('g')
                          vAxis(vGuide)   

                          vGuide.attr('transform', 'translate(35, 25)')   
                          vGuide.selectAll('path')
                            .style({fill: 'none', stroke: '#000' })     

                          vGuide.selectAll('line')
                            .style({fill: 'none', stroke: '#000' })

                        var hAxis = d3.svg.axis()
                          .scale(hGuideScale)
                          .orient('bottom')
                          .ticks(20)

                        var hGuide = d3.select('#bar_chart svg').append('g')
                          hAxis(hGuide)
                          hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
                          hGuide.selectAll('path')
                              .style({ fill: 'none', stroke: "#000"})
                          hGuide.selectAll('line')
                              .style({ stroke: "#000"})                      
          };
        };
    });  
  }
/*--END BAR CHART INFO--*/





/*--INTIAL DRAW OF CIRCLE GRAPHS--*/
  var circledata = [];

  var rp1 = radialProgress(document.getElementById('div1'))
    .label("Waste Water Treatment")
    .diameter(150)
    .value(10)
    .render();

var rp2 = radialProgress(document.getElementById('div2'))
    .label("Pesticide Regulation")
    .diameter(150)
    .value(45)
    .render();

var rp3 = radialProgress(document.getElementById('div3'))
    .label("Fish Stocks")
    .diameter(150)
    .value(50)
    .render();

var rp4 = radialProgress(document.getElementById('div4'))
    .label("Forest Coverage")
    .diameter(150)
    .value(12)
    .render();

var rp5 = radialProgress(document.getElementById('div5'))
    .label("Critical Habit Protection")
    .diameter(150)
    .value(78)
    .render();

var rp6 = radialProgress(document.getElementById('div6'))
      .label("Agricultural Subsidies")
      .diameter(150)
      .value(90)
      .render();;
/*--END INITIAL DRAW OF CIRCLE GRAPHS--*/




/*--CIRCLE GRAPH INFO--*/
  function environmentalIssues(country_title) { 
    $.getJSON( "json/environmental_issues.json", function( response ) {
      //Number of object in JSON file
          var len = response.length;  

           for (var i = 0; i < len; i++) {

            var CountryMatch = response[i].FIELD3;
            var wasteCXN = response[i].FIELD23;
            var POPS = response[i].FIELD21;
            var FSOC = response[i].FIELD14;
            var FORCH = response[i].FIELD13;
            var AZE = response[i].FIELD7;
            var AGSUB = response[i].FIELD6;

            //Get KEY value in the KEY:VALUE pair
            if (CountryMatch == country_title){
              
              var rp1 = radialProgress(document.getElementById('div1'))
                  .label("Waste Water Treatment")
                  .diameter(150)
                  .value(wasteCXN)
                  .render();

              var rp2 = radialProgress(document.getElementById('div2'))
                  .label("Pesticide Regulation")
                  .diameter(150)
                  .value(POPS)
                  .render();

              var rp3 = radialProgress(document.getElementById('div3'))
                  .label("Fish Stocks")
                  .diameter(150)
                  .value(FSOC)
                  .render();

              var rp4 = radialProgress(document.getElementById('div4'))
                  .label("Forest Coverage")
                  .diameter(150)
                  .value(FORCH)
                  .render();

              var rp5 = radialProgress(document.getElementById('div5'))
                  .label("Critical Habit Protection")
                  .diameter(150)
                  .value(AZE)
                  .render();

              var rp6 = radialProgress(document.getElementById('div6'))
                    .label("Agricultural Subsidies")
                    .diameter(150)
                    .value(AGSUB)
                    .render();
            }
         }
    });
  }
/*--END CIRCLE GRAPH INFO--*/




/*--INITIAL DRAW OF LINE GRAPH--*/
  var linedata = [ 40, 10, 5, 70];

  var m = [80, 80, 80, 80]; // margins
      var w = 700 - m[1] - m[3]; // width
      var h = 350 - m[0] - m[2]; // height

      // X scale will fit all values from data[] within pixels 0-w
      var x = d3.scale.linear().domain([0, linedata.length]).range([0, w]);

      // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
      var y = d3.scale.linear().domain([0, d3.max(linedata)]).range([h, 0]);

      // create a line function that can convert data[] into x and y points
      var line = d3.svg.line()
        // assign the X function to plot our line as we wish
        .x(function(d,i) { 

          return x(i); 
        })
        .y(function(d) { 

          return y(d); 
        })

        // Add an SVG element with the desired dimensions and margin.
        var graph = d3.select("#line_chart").append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

        // create yAxis
        var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);

        // Add the x-axis.
        graph.append("svg:g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + h + ")")
              .call(xAxis);

        // create left yAxis
        var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");

        // Add the y-axis to the left
        graph.append("svg:g")
              .attr("class", "y axis")
              .attr("transform", "translate(-25,0)")
              .call(yAxisLeft);
        
        // Add the line by appending an svg:path element with the data line we created above
        // do this AFTER the axes above so that the line is above the tick-lines
          graph.append("svg:path")
          .attr("d", line(linedata))
          .attr("stroke","steelblue")
          .attr("fill", "none")
          .transition()
          .duration(1000)
          .attrTween('d', pathTween);

          function pathTween() {
            var interpolate = d3.scale.quantile()
              .domain([0,1])
              .range(d3.range(1, linedata.length + 1));
            return function(t) {
              return line(linedata.slice(0, interpolate(t)));
            };
          }
/*--END INITIAL DRAW OF LINE DATA GRAPH--*/





/*--LINE CHART INFO--*/
  function mortalityRate(country_title) { 

    linedata.length = 0;

     if (linedata.length != 0) {
      linedata.shift();
     }

    $.getJSON( "json/health_impacts_child_mortality.json", function(response ) {
      //Number of object in JSON file
          var len = response.length;  

           for (var i = 0; i < len; i++) {

                var CountryMatch = response[i].val0;

                if (CountryMatch == country_title){
                   for (var k in response[i]){

                        if (response[i].hasOwnProperty(k)) {
                              array_item = response[i][k]*100;     
                              linedata.push(array_item); 
                        };
                    }
                };
            };

            $('#line_chart').empty();

            var m = [80, 80, 80, 80]; // margins
            var w = 700 - m[1] - m[3]; // width
            var h = 350 - m[0] - m[2]; // height

            // X scale will fit all values from data[] within pixels 0-w
            var x = d3.scale.linear().domain([0, linedata.length]).range([0, w]);

            // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
            var y = d3.scale.linear().domain([0, d3.max(linedata)]).range([h, 0]);

            // create a line function that can convert data[] into x and y points
            var line = d3.svg.line()
              // assign the X function to plot our line as we wish
              .x(function(d,i) { 
                return x(i); 
              })
              .y(function(d) { 
                return y(d); 
              })

              // Add an SVG element with the desired dimensions and margin.
              var graph = d3.select("#line_chart").append("svg:svg")
                  .attr("width", w + m[1] + m[3])
                  .attr("height", h + m[0] + m[2])
                  .append("svg:g")
                  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

              // create yAxis
              var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);

              // Add the x-axis.
              graph.append("svg:g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + h + ")")
                    .call(xAxis);

              // create left yAxis
              var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");

              // Add the y-axis to the left
              graph.append("svg:g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(-25,0)")
                    .call(yAxisLeft);
              
                // Add the line by appending an svg:path element with the data line we created above
        // do this AFTER the axes above so that the line is above the tick-lines
          graph.append("svg:path")
          .attr("d", line(linedata))
          .attr("stroke","steelblue")
          .attr("fill", "none")
          .transition()
          .duration(1000)
          .attrTween('d', pathTween);

          function pathTween() {
            var interpolate = d3.scale.quantile()
              .domain([0,1])
              .range(d3.range(1, linedata.length + 1));
            return function(t) {
              return line(linedata.slice(0, interpolate(t)));
            };
          }

          });
};
/*--END LINE CHAR INFO--*/







