import { databaseExists, getRow } from "../utils";
export const get = (commandInput: string[]) => {

    if(commandInput.length !== 3){
        return "ERROR: bad syntax\n\n" + "get <table> <row id>"
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

    return getRow(tableName, rowkey)


}