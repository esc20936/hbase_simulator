import { databaseExists,writeRow } from "../utils";


export const put = (commandInput: string[]) => {
    if(commandInput.length<5){
        return "ERROR: the command is SHOULD contain atleast 5 words\nput 'tableName', 'rowkey', 'cf:columnName', 'value'"
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
    let column = commandInput[3];
    let hasColumnFamily = column.includes(":");
    let value = ""
    for(let i = 4; i < commandInput.length;i++){
        value += commandInput[i]+" ";
    }
    console.log(value)
    value = value.substring(0, value.length - 1)
    


    if (rowkey[0] !== "'" || rowkey[rowkey.length - 1] !== "'"){
        return "The rowkey has to be in ' '"
    }
    if(column[0] !== "'" || column[column.length - 1] !== "'"){
        return "The column has to be in ' '"
    }
    if(value[0] !== "'" || value[value.length - 1] !== "'"){
        return "The value has to be in ' quotes'"
    }


    rowkey = rowkey.substring(1, rowkey.length - 1)
    column = column.substring(1, column.length - 1)
    value = value.substring(1, value.length - 1)

    if(rowkey.length === 0){
        return "The rowkey can't be empty"
    }
    if(column.length === 0){
        return "The column can't be empty"
    }
    if(value.length === 0){
        return "The value can't be empty"
    }

    if(hasColumnFamily){
        // remove ''

        let columnFamily = column.split(":")[0];
        let columnName = column.split(":")[1];

        if(columnFamily.length === 0){
            return "The column family can't be empty"
        }

        if(columnName.length === 0){
            return "The column name can't be empty"
        }


        return writeRow(tableName, rowkey, true ,columnFamily, columnName, value);
    }
    else{
        
        return writeRow(tableName, rowkey, false, "", column, value);

    }


}
