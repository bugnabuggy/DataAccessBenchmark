import { Injectable } from '@angular/core';

@Injectable()
export class SortFunctionService {

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
}