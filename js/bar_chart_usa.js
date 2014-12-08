var bardata = [];

    d3.tsv('json/data.tsv', function( data ) {

        for(key in data) {
            bardata.push(data[key].value)
        }

        // SORTS BY MAX NUMBER
        // bardata.sort(function compareNumbers (a, b) {
        //     return a - b;
        // })

        var margin = { top: 0, right: 0, bottom: 0, left: 0 }

        var height = 50 - margin.top - margin.bottom,
            width = 500 - margin.left - margin.right,
            barWidth = 50,
            barOffset = 0;

        var tempColor;

        var colors = d3.scale.linear()
        .domain([0, bardata.length*.33, bardata.length*.6, bardata.length])
        .range(['#435552','#648785', '#8ED2D1'])

        var yScale = d3.scale.linear()
                .domain([0, d3.max(bardata)])
                .range([0, height]);

        var xScale = d3.scale.ordinal()
                .domain(d3.range(0, bardata.length))
                .rangeBands([0, width], .2)

        var tooltip = d3.select('body').append('div')
            .attr("class", "bottom_right_graph")
            .style('position', 'absolute')
            .style('padding', ' 2px 5px')
            .style('background', 'PowderBlue')
            .style('color', 'white')
            .style('opacity', 0)
            .style('border-radius', '0')
            .style('font-size', '12px')
            // .style('line-height', '1.5')

        var myChart = d3.select('#chart').append('svg')
            
            .style ('background', '')

            .attr('class', 'bar_chart')
            
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

            .on('mouseover', function(d) {

                tooltip.transition()
                    .style('opacity', .75)

                tooltip.html(d)
                    .style('left', (d3.event.pageX-12 ) + 'px')
                    .style('top', 55 + 'px')

                tempColor = this.style.fill;

                d3.select(this)
                    .style('opacity', 1)
                    .style('fill', 'brown')
            })

            .on('mouseout', function(d) {
                d3.select(this)
                    .style('opacity',1)
                    .style('fill', tempColor)
            })

            myChart.transition()
                .attr('height', function(d) {
                    return yScale(d);
                })
                .attr('y', function(d) {
                    return height - yScale(d);
                })
                .delay( function(d, i) {
                    return i * 35;
                })
                .duration(1000)
                .ease('elastic')

            // var vGuideScale = d3.scale.linear()
            //     .domain([0, d3.max(bardata)])
            //     .range([height, 0])

            // var vAxis = d3.svg.axis()
            //     .scale(vGuideScale)
            //     .orient('left')
            //     .ticks(10)

            // var vGuide = d3.select('svg').append('g')
            //     vAxis(vGuide)
            //     vGuide.attr('transform', 'translate(' + margin.left +', ' + margin.top + ')')
            //     vGuide.selectAll('path')
            //         .style({ fill: 'none', stroke: '#000'  })
            //     vGuide.selectAll('line')
            //         .style({ stroke: '#000'  })

            // var hAxis = d3.svg.axis()
            //     .scale(xScale)
            //     .orient('bottom')
            //     .tickValues(xScale.domain().filter(function(d, i) {
            //         return !(i % (bardata.length/5));
            //     }))

            // var hGuide = d3.select('svg').append('g')
            //     hAxis(hGuide)
            //     hGuide.attr('transform', 'translate(' + margin.left +', ' + (height + margin.top) + ')')
            //     hGuide.selectAll('path')
            //         .style({ fill: 'none', stroke: '#000'  })
            //     hGuide.selectAll('line')
            //         .style({ stroke: '#000'  })




            // ** Update data section (Called from the onclick)
            function updateData() {

                


                // Select the section we want to apply our changes to
                var svg = d3.select("body").transition();

        
                };



    });


