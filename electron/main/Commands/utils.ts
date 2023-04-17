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
    let database = {
        ENABLED: true,
        columns: columns,
        rows: {

        }
    }

    fs.writeFileSync(databasePath, JSON.stringify(database));
}



