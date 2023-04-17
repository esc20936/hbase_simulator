import { databaseExists, scanDatabase, is_enabled } from "../utils";

export const scan = (commandInput: string[]) => {

    if(commandInput.length !== 2){
        return "ERROR: bad syntax\n\n" + "scan <table>"
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

    if(!is_enabled(tableName)){
        return "The table is not enabled"
    }

    // let rowkey = commandInput[2];

    return scanDatabase(tableName)


}