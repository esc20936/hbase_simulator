const fs = require("fs");
const path = require("path");


export const formatArray = (array: string[]) => {
    // this function receives an array of strings with the form ["create","'string1','string2"]
    // or ["create","'string1'"]
}


const validateColumnName = (name: string) => {

    if (name === undefined) {
        return {"valid":false,"error":"You have to specify the name of the column"}
    }
    // check if the name is valid
    // is valid if it is not empty and it has to be in ' '
    if (name.length === 0) {
        return {"valid":false,"error":"The name of the column can't be empty"}
    }
    // check if the name is valid
    // is valid if it is not empty and it has to be in ' '
    if (name[0] !== "'" || name[name.length - 1] !== "'") {
        return {"valid":false,"error":"The name of the column has to be in ' '"}
    }
    // remove the ' '
    name = name.substring(1, name.length - 1)
    // check if the name is valid
    // is valid if it is not empty and it has to be in ' '
    if (name.length === 0) {
        return {"valid":false,"error":"The name of the column can't be empty"}
    }
    // check if the name of the database is valid
    // it has to be alphanumeric
    // it can't start with a number
    // it can't have special characters
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
        return {"valid":false,"error":"The name of the column can't have special characters"}
    }
    return true;
}

export const validColumns = (columns: string[]) => {
    for (let i = 0; i < columns.length; i++) {
        let column = validateColumnName(columns[i]);
        if (column.valid === false) {
            return false;
        }
    }
    return true;
}


export const addColumn = (column: string, name: string) => {

    // get the columns of the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");
    let database = JSON.parse(fs.readFileSync(databasePath, "utf8"));

    // check if the column already exists
    if (database.columns.includes(column)) {
        return "The column already exists";
    }

    // add the column
    database.columns.push(column);

    // save the database
    fs.writeFileSync(databasePath, JSON.stringify(database));

    return `Column ${column} added to database ${name} ${new Date().getTime()}`;

}


export const removeColumn = (column: string, name: string) => {
    
        // get the columns of the database
        let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");
        let database = JSON.parse(fs.readFileSync(databasePath, "utf8"));
        console.log(database.columns);
        // check if the column already exists
        if (!database.columns.includes(column)) {
            return "The column doesn't exists";
        }
    
        // remove the column
        database.columns = database.columns.filter((item) => item !== column);
    
        // save the database
        fs.writeFileSync(databasePath, JSON.stringify(database));
    
        return `Column ${column} removed from database ${name} ${new Date().getTime()}`;
    
}

export const writeRow = (tableName:string,row:string, hasColumnFamily:boolean = false, columnFamily:string, columnName:string, value:string) => {
    // get the columns of the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", tableName+".json");
    let database = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    // if(hasColumnFamily){
    //     if(database.rows[columnFamily] === undefined){
    //         database.rows[columnFamily] = {};
    //     }
    //     database.rows[columnFamily][columnName] = value;
    // }else{
    //     database.rows[row] = value;
    // }

    // check if row exists in the database
    if (database.rows[row] === undefined) {
        if(hasColumnFamily){
            database.rows[row] = {
                [columnFamily]:{
                    [columnName]:{
                        "cell1":{
                            "value":value,
                            "timestamp":new Date().getTime(),
                        }
                        
                    }
                }
            };
        }else{
            database.rows[row] = {
                [columnName]:{
                    "cell1":{
                        "value":value,
                        "timestamp":new Date().getTime(),
                    }
                }
            };
        }
    }else{
        // row exist, so we are updating

        // check if column family exists
        if(hasColumnFamily){
            if(database.rows[row][columnFamily] === undefined){
                database.rows[row][columnFamily] = {
                    [columnName]:{
                        "cell1":{
                            "value":value,
                            "timestamp":new Date().getTime(),
                        }
                    }
                };
            }else{
                // column family exists, so we are updating
                if(database.rows[row][columnFamily][columnName] === undefined){
                    database.rows[row][columnFamily][columnName] = {
                        "cell1":{
                            "value":value,
                            "timestamp":new Date().getTime(),
                        }
                    };
                }else{
                    // column name exists, so we are updating
                    // existing values
                    let existingValues = database.rows[row][columnFamily][columnName];

                    // amount of values
                    let amountOfCells= Object.keys(existingValues).length;

                    // new timestamp
                    let newCell = "cell"+(amountOfCells+1);

                    // add the new value
                    database.rows[row][columnFamily][columnName][newCell] = {
                        "value":value,
                        "timestamp": new Date().getTime(),
                    };
                }
            }
        }

    }
    

    // save the database
    fs.writeFileSync(databasePath, JSON.stringify(database));
    return `Row ${row} added to database ${tableName} ${new Date().getTime()}`;
}



function stringifyJson(jsonObj:any, prefix:string = '') {
    let result = '';
    for (let key in jsonObj) {
      if (typeof jsonObj[key] === 'object') {
        result += stringifyJson(jsonObj[key], prefix + key + ':');
      } else {
        result += prefix + key + ' \t' + jsonObj[key] + '\n';
      }
    }
    return result;
  }


  function stringifyJson2(jsonObj: any, prefix: string = ''): string {
    let result = '';
    const INDENTATION = '...';
    const keys = Object.keys(jsonObj);
  
    keys.forEach((key, index) => {
      const value = jsonObj[key];
      const isLast = index === keys.length - 1;
  
      if (typeof value === 'object') {
        result += `${prefix}${key}:\n`;
        result += `${stringifyJson2(value, prefix + INDENTATION)}${isLast ? '' : '\n'}`;
      } else {
        result += `${prefix}${key}: ${value}${isLast ? '' : '\n'}`;
      }
    });
  
    return result;
  }


export const getRow = (tableName:string,row:string ) => {
    // get the columns of the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", tableName+".json");
    let database = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    row = row.substring(1, row.length-1);
    let rowFromFile = database.rows[row];
    console.log(rowFromFile)
    if(rowFromFile === undefined){
        return "Row not found";
    }

    let res = "";
    // headers
    res= "Cols\tValue\n"
    res += stringifyJson2(rowFromFile,'');
    res += "\n\n";

    return res
}



// get the columns of a database
export const getColumns = (name: string) => {
    // get the columns of the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");
    let database = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    return database.columns;
}



// check if file exists
export const databaseExists = (name: string) => {
    // check if file exists
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");
    return fs.existsSync(databasePath);

}

export const createDatabase = (name: string) => {
    // create the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");

    // check if the folder exists
    let databasesFolder = path.join(__dirname, "..", "..", "..", "databases");
    if (!fs.existsSync(databasesFolder)) {
        fs.mkdirSync(databasesFolder);
    }
    let database = {
        ENABLED: true,
        columns: [],
        rows: {
        }

    }
    fs.writeFileSync(databasePath, JSON.stringify(database));
}

// create database with columns
export const createDatabaseWithColumns = (name: string, columns: string[]) => {
    // create the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");

    // check if the folder exists
    let databasesFolder = path.join(__dirname, "..", "..", "..", "databases");
    if (!fs.existsSync(databasesFolder)) {
        fs.mkdirSync(databasesFolder);
    }

    // remove '' from the columns
    columns = columns.map((item) => item.substring(1, item.length - 1));


    let database = {
        ENABLED: true,
        columns: columns,
        rows: {

        }
    }

    fs.writeFileSync(databasePath, JSON.stringify(database));
}



export const scanDatabase = (name: string) => {
    // get the columns of the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");
    let database = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    let res = "";
    // headers
    res= "Cols\tValue\n"
    res += stringifyJson2(database.rows,'');

    return res
}


export const getAmountOfRows = (name: string) => {
    // get the columns of the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");
    let database = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    return Object.keys(database.rows).length;
}


export const deleteRowWithKey = (name: string, key: string) => {
    // get the columns of the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");
    let database = JSON.parse(fs.readFileSync(databasePath, "utf8"));

    // remove the row
    delete database.rows[key];

    // save the database
    fs.writeFileSync(databasePath, JSON.stringify(database));
    return `Row ${key} deleted from database ${name}`;
}

export const deleteCellWithTimestamp = (name: string, key: string, columnFamily: string, columnName: string, timestamp: string) => {
    // get the columns of the database
    let databasePath = path.join(__dirname, "..", "..", "..", "databases", name+".json");
    let database = JSON.parse(fs.readFileSync(databasePath, "utf8"));

    // look for the cells object
    let Cells = database.rows[key][columnFamily][columnName];
    // count amount of keys in the cells
    let amountOfKeys = Object.keys(Cells).length;
    let newCells = {};

    console.log(timestamp)


    for(let i = 0; i < amountOfKeys; i++){
        let tempKey = `cell${i+1}`;
        if(database.rows[key][columnFamily][columnName][tempKey].timestamp == timestamp){
            console.log("found")
            delete database.rows[key][columnFamily][columnName][tempKey];
        }
    }

    // console.log(newCells)
    
    // update the cells value
    // database.rows[key][columnFamily][columnName] = newCells;
    // save the database
    fs.writeFileSync(databasePath, JSON.stringify(database));
    return `Cell ${key} deleted from database ${name}`;
}