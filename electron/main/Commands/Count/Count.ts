import { databaseExists, getAmountOfRows } from "../utils"
export const count = (commandInput: string[]) => {

    if(commandInput.length !== 2){
        return "ERROR: bad syntax\n\n" + "count <table>"
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

    if(!databaseExists(tableName)){
        return "The table doesn't exists"
    }

    return `Amount of rows in '${tableName}': ${getAmountOfRows(tableName)}`



}
