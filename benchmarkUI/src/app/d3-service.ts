import { Injectable } from '@angular/core';
import { HistoryTests } from './historyTests'
import * as d3 from "d3";

import * as moment from 'moment';
import { debug } from 'util';

declare var Chart;

@Injectable()
export class D3_Service {

    private dataForChartXSQL: number[] = [];
    private dataForChartXEF: number[] = [];

    chart(data: any) {
        var dataForChartYEF: string[] = [];
        var dataForChartYSQL: string[] = [];
        var maxY:number=0;

        for (var i = 0; i < data.filteredEF.length; i++) {

            dataForChartYEF.push(moment.parseZone(data.filteredEF[i].ExecutionTime, 'mm:ss.SSS').format('mmss.SSS'));
        }



        for (var i = 0; i < data.filteredSQL.length; i++) {

            dataForChartYSQL.push(moment.parseZone(data.filteredSQL[i].ExecutionTime, 'mm:ss.SSS').format('mmss.SSS'));
        }
        var yAxesValues = dataForChartYSQL.concat(dataForChartYEF);
        
        for (var i=0;i< yAxesValues.length;i++)
        {
            if (maxY< parseFloat(yAxesValues[i])){
                maxY=parseFloat(yAxesValues[i]);
               
            }
        }
        maxY+=0.1;
        var dataForChartEF = []
        for (var i = 0; i < this.dataForChartXEF.length; i++) {
            dataForChartEF.push({ x: this.dataForChartXEF[i], y: dataForChartYEF[i] })
        }
        var dataForChartSQL = []
        for (var i = 0; i < this.dataForChartXSQL.length; i++) {
            dataForChartSQL.push({ x: this.dataForChartXSQL[i], y: dataForChartYSQL[i] })
        }

        var lineChartData = {

            datasets: [{
                label: 'EF',
                type: 'line',
                borderColor: 'red',
                backgroundColor: 'red',
                fill: false,
                data: dataForChartEF

            },
            {
                label: 'SQL',
                type: 'line',
                borderColor: 'blue',
                backgroundColor: 'blue',
                fill: false,
                data: dataForChartSQL,

            }
            ]
        };

        var ctx = document.getElementById("myChart");
        var myChart = new Chart.Scatter(ctx, {
            data: lineChartData,
            options: {
                title: {
                    display: true,
                    text: 'Chart.js Scatter Chart'
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            max: maxY
                        }
                    }]
                }
            }
        });

    }

    drawingGraphCount(data: any): any {

        for (var i = 0; i < data.filteredEF.length; i++) {
            this.dataForChartXEF.push(data.filteredEF[i].Count);
        }

        for (var i = 0; i < data.filteredSQL.length; i++) {
            this.dataForChartXSQL.push(data.filteredSQL[i].Count);
        }

    }

    drawingGraphID(data: any): any {
        this.dataForChartXSQL = [];
        this.dataForChartXEF = [];
        for (var i = 0; i < data.filteredEF.length; i++) {
            this.dataForChartXEF.push(data.filteredEF[i].Id);
        }

        for (var i = 0; i < data.filteredSQL.length; i++) {
            this.dataForChartXSQL.push(data.filteredSQL[i].Id);
        }

    }

    sampleDataOnTransactions(historyTests: any, operationName: string, count: number): any {


        var filteredOperations: any;
        if (count != 0) {
            filteredOperations = this.filteredCount(historyTests, count);
        }
        else {
            filteredOperations = this.filteredOperations(historyTests, operationName);
        }
        var filteredSQL = this.filteredOperationsSql(filteredOperations);
        var filteredEF = this.filteredOperationsEF(filteredOperations);

        var dataForChartOnSQLAndEF = {
            filteredEF,
            filteredSQL
        };
        return dataForChartOnSQLAndEF;
    }

    filteredOperations(historyTests: any, operationName: string): any {
        function condition(value, index, array) {
            var result = false;
            if (value.OperationType.indexOf(operationName) >= 0) {
                result = true;
            }
            return result;
        };
        var filteredOperations = historyTests.filter(condition);
        return filteredOperations;
    }
    filteredCount(historyTests: any, count: number): any {
        function condition(value, index, array) {
            var result = false;
            if (value.Count == count) {
                result = true;
            }
            return result;
        };
        var filteredOperations = historyTests.filter(condition);
        return filteredOperations;
    }

    filteredOperationsSql(filteredOperations): any {
        function condition(value, index, array) {
            var result = false;
            if (value.OperationType.indexOf("SQL") >= 0) {
                result = true;
            }
            return result;
        };

        var filteredSQL = filteredOperations.filter(condition);
        return filteredSQL;
    }
    filteredOperationsEF(filteredOperations): any {
        function condition(value, index, array) {
            var result = false;
            if (value.OperationType.indexOf("EF") >= 0) {
                result = true;
            }
            return result;
        };

        var filteredEF = filteredOperations.filter(condition);
        return filteredEF;
    }

    getlistsCounts(historyTests: any, operationName: string): any {
        var counts: number[] = []

        var filteredOperations = this.filteredOperations(historyTests, operationName);
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