import { Injectable } from '@angular/core';
import { HistoryTests } from './historyTests'
import * as d3 from "d3";
import { debug } from 'util';

@Injectable()
export class D3_Service {

    constructor(
    ) { }

    SvgDrawingGraph(data : any) {
        var height = 500,
            width = 500,
            padding = 50;
         var xScale = d3.scaleLinear()
                        .domain([0, d3.max(d3.entries(data), function(d){ return d.value.Count+2})])
                        .range([padding, width - padding * 3]);
            
         var yScale = d3.scaleLinear()
                        .domain([0, d3.max(d3.entries(data), function(d){ return parseInt( d.value.Id)+2 })])
                        .range([height - padding, padding]);
       
        var svg = d3.select("app-history").select("div.history")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
        svg.selectAll("circle")
            .data(d3.entries(data))
            .enter()
            .append("circle")
            .attr("cx", function(d){
                return xScale(d.value.Count);
                })
            .attr("cy",function(d){
                return  yScale(d.value.Id); 
                })
            .attr("r", 5
                );     
        
        svg.selectAll("text")
            .data(d3.entries(data))
            .enter()
            .append("text")
        
            .text(function(d){
                 return "" + d.value.ExecutionTime;
                })
// 3. then fix the position (x & y)
            .attr("x", function(d){
                return xScale(d.value.Count);
                })
            .attr("y",function(d){
                return yScale(d.value.Id);
                })

            .attr("font-family", "monospace")
            .attr("font-size", "1rem")
            .attr("fill", "lightsalmon");
             
            //** Adding Axes
      

      
      // X Axis
        var xAxis = d3.axisBottom(xScale)
                    .ticks(10); //set rough # of ticks      

        svg.append("g")
            .attr("class", "axis") //assign "axis" class
            .attr("transform", "translate(0, "+ (height - padding) +")")
            .call(xAxis);

//Y Axis
        var yAxis = d3.axisLeft(yScale)
                    .ticks(10);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate("+ padding +", 0)")
            .call(yAxis);


        //** One more thing: Formatting Tick Labels
        var formatAsPercentage = d3.format(".1%");
        xAxis.tickFormat(formatAsPercentage);



    }

    SampleData( historyTests : any, nameOperation:string): any {
        function condition(value, index, array) {
            var result = false;
            if (value.TypeOperation.indexOf(nameOperation) >= 0) {
                result = true;
            }
            return result;
        };

        var filteredOperations = historyTests.filter(condition);
        var filteredSQL = this.filteredOperationsSql(filteredOperations);
        var filteredEF = this.filteredOperationsEF(filteredOperations);

        var dataOnSQLAndEF=  {
            filteredSQL,
            filteredEF
        };
        return dataOnSQLAndEF;
    }

    filteredOperationsSql(filteredOperations):any{
        function condition(value, index, array) {
            var result = false;
            if (value.TypeOperation.indexOf("SQL") >= 0) {
                result = true;
            }
            return result;
        };

        var filteredSQL = filteredOperations.filter(condition);
        return filteredSQL;
    }
    filteredOperationsEF(filteredOperations):any{
        function condition(value, index, array) {
            var result = false;
            if (value.TypeOperation.indexOf("EF") >= 0) {
                result = true;
            }
            return result;
        };

        var filteredEF = filteredOperations.filter(condition);
        return filteredEF;
    }

    parseData(){

    }

}