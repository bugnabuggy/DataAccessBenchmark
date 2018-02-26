import { Injectable } from '@angular/core';
import { TestsHistory } from '../models/testsHistory'
import * as moment from 'moment';
import { debug } from 'util';
import { SortFunctionService } from './sortFunctionService'
declare var Chart;

@Injectable()
export class ChartService {

    private dataForChartXSQL: number[] = [];
    private dataForChartXEF: number[] = [];
    private dataForChartYEF: string[] = [];
    private dataForChartYSQL: string[] = [];
    private lineChartData:any;
    private myChart:any;
    private labelStringX:string;
    private typeChart:string;

    constructor(private sortFunctionService:SortFunctionService){

    }
    getChart(data: any) {
        var maxY:number=0;
        var scaleType:string="ss.SSS";
        var maxTicksLimit:number;
        var labelStringY:string="Seconds";
        if (this.isMinute(data)==true)
        {
            labelStringY="minutes";
            scaleType="mm.ss";
        }
        this.dataForChartYEF=[];
        this.dataForChartYSQL=[];
        for (var i = 0; i < data.filteredEF.length; i++) {

            this.dataForChartYEF.push(moment.parseZone(data.filteredEF[i].ExecutionTime, 'HH:mm:ss.SSS').format(scaleType));
        }

        for (var i = 0; i < data.filteredSQL.length; i++) {

            this.dataForChartYSQL.push(moment.parseZone(data.filteredSQL[i].ExecutionTime, 'HH:mm:ss.SSS').format(scaleType));
        }

        var yAxesValues = this.dataForChartYSQL.concat(this.dataForChartYEF);
        
        for (var i=0;i< yAxesValues.length;i++)
        {
            if (maxY< parseFloat(yAxesValues[i])){
                maxY=parseFloat(yAxesValues[i]);
               
            }
        }
        maxY += maxY*0.15;

        if (this.dataForChartXSQL>this.dataForChartXEF){
            maxTicksLimit = this.dataForChartXSQL.length;
        }
        else{
            maxTicksLimit = this.dataForChartXEF.length;
        }

        var dataForChartEF = []
        for (var i = 0; i < this.dataForChartXEF.length; i++) {
            dataForChartEF.push({ x: this.dataForChartXEF[i], y: this.dataForChartYEF[i] })
        }
        var dataForChartSQL = []
        for (var i = 0; i < this.dataForChartXSQL.length; i++) {
            dataForChartSQL.push({ x: this.dataForChartXSQL[i], y: this.dataForChartYSQL[i] })
        }

        this.lineChartData = {

            datasets: [{
                label: 'EF',
                type: this.typeChart,
                borderColor: 'red',
                backgroundColor: 'red',
                fill: false,
                data: dataForChartEF

            },
            {
                label: 'SQL',
                type: this.typeChart,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth:4,
                fill: false,
                data: dataForChartSQL,

            }
            ]
        };

        var ctx = document.getElementById("myChart");
        this.myChart = new Chart(ctx, {
            data: this.lineChartData,
            options: {

                title: {
                    display: true,
                    text: 'Chart.js Scatter Chart',
                    
                },
                
                scales: {
                    xAxes: [{
                        type: 'linear',
                        scaleLabel: {
                            display: true,
                            labelString:this.labelStringX,
                        },
  
                        ticks: {
                            suggestedMin: 1,
                            suggestedMax:1,
                            maxTicksLimit:maxTicksLimit,
                        }
                    }],
                    yAxes: [{
                        type: 'linear',
                        scaleLabel: {
                            display: true,
                            labelString:labelStringY,
                        },
                        ticks: {
                            suggestedMin:0,
                            suggestedMax: maxY,
                        }
                    }]
                }
            }
        });

    }

    drawingGraphCount(data: any): any {
        this.dataForChartXSQL = [];
        this.dataForChartXEF = [];
        for (var i = 0; i < data.filteredEF.length; i++) {
            this.dataForChartXEF.push(data.filteredEF[i].Count);
        }

        for (var i = 0; i < data.filteredSQL.length; i++) {
            this.dataForChartXSQL.push(data.filteredSQL[i].Count);
        }
        this.labelStringX="Count";

    }

    drawingGraphID(data: any): any {
        this.dataForChartXSQL = [];
        this.dataForChartXEF = [];
        debugger
        for (var i = 0; i < data.filteredEF.length; i++) {
            this.dataForChartXEF.push(i+0.003);
        }

        for (var i = 0; i < data.filteredSQL.length; i++) {
            this.dataForChartXSQL.push(i+0.003);
        }
        this.labelStringX="Number tests"
    }

    isCreateChart(){
        
        if(this.myChart!=undefined)
        {
            this.myChart.destroy();
        }
    }

    isMinute(data:any):boolean{
        function condition(value, index, array) {
            var result = false;
            if (value.ExecutionTime >="00:01:00.000") {
                result = true;
            }
            return result;
        };
        var result:string[]=[];
        result=data.filteredEF.concat(data.filteredSQL)

        return result.some(condition); 
    }

    sampleDataOnTransactions(historyTests: any, operationName: string, count: number): any {


        var filteredOperations: any;
        if (count != 0) {
            filteredOperations = this.sortFunctionService.filteredOperations(historyTests, operationName);
            filteredOperations = this.sortFunctionService.filteredCount(filteredOperations, count);
            this.typeChart="line";
        }
        else {
            this.typeChart="bubble";
            filteredOperations = this.sortFunctionService.filteredOperations(historyTests, operationName);
        }
        var filteredSQL = this.sortFunctionService.filteredOperationsSql(filteredOperations);
        var filteredEF = this.sortFunctionService.filteredOperationsEF(filteredOperations);

        var dataForChartOnSQLAndEF = {
            filteredEF,
            filteredSQL
        };
        return dataForChartOnSQLAndEF;
    }

    getlistsCounts(historyTests: any, operationName: string): any {
        var counts: number[] = []

        var filteredOperations = this.sortFunctionService.filteredOperations(historyTests, operationName);
        for (var i = 0; i < filteredOperations.length; i++) {
            counts.push(filteredOperations[i].Count);
        }
        counts.sort(); // сортируем массив
        for (var i = counts.length - 1; i > 0; i--) {
            if (counts[i] == counts[i - 1]) counts.splice(i, 1);
        }
        return counts;
    }

}