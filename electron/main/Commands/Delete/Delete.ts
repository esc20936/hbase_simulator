import { databaseExists, deleteCellWithTimestamp } from "../utils";

export const deleteR = (commandInput: string[]) => {

    if(commandInput.length !== 5){
        return "ERROR: bad syntax\n\n" + "delete <table> <row id> <cf:columnFamily> <timestamp>"
    }

    let tableName = commandInput[1];

    // check if table exists
    if(tableName[0] !== "'" || tableName[tableName.length - 1] !== "'"){
        return "The name of the table has to be in ' '"
    }

    tableName = tableName.substring(1, tableName.length - 1)

    if(tableName.length === 0){
        return "The name of the table can't be empty"
    }

    if(!/^[a-zA-Z0-9_]+$/.test(tableName)){
        return "The name of the table can't have special characters"
    }

    if(!databaseExists(tableName)){
        return "The table doesn't exists"
    }

    let rowkey = commandInput[2];

    if(rowkey[0] !== "'" || rowkey[rowkey.length - 1] !== "'"){
        return "The rowkey has to be in ' '"
    }

    rowkey = rowkey.substring(1, rowkey.length - 1)

    if(rowkey.length === 0){
        return "The rowkey can't be empty"
    }

    let column = commandInput[3];

    if(column[0] !== "'" || column[column.length - 1] !== "'"){
        return "The column has to be in ' '"
    }

    column = column.substring(1, column.length - 1)

    if(column.length === 0){
        return "The column can't be empty"
    }

    // has to be in the format cf:columnFamily
    if(!column.includes(":")){
        return "The column has to be in the format columnFamily:columnName"
    }

    let columnFamily = column.split(":")[0];
    let columnName = column.split(":")[1];


    let timestamp = commandInput[4];

    if(timestamp[0] !== "'" || timestamp[timestamp.length - 1] !== "'"){
        return "The timestamp has to be in ' '"
    }

    timestamp = timestamp.substring(1, timestamp.length - 1)

    if(timestamp.length === 0){
        return "The timestamp can't be empty"
    }

    console.log("deleteR", tableName, rowkey, columnFamily,columnName, timestamp)
    return deleteCellWithTimestamp(tableName, rowkey, columnFamily, columnName, timestamp)

}

// delete 'pablo','2','personal:mascota','1681940037689'