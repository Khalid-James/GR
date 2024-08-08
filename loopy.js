
const csvStringOne = "Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232";

const csvStringTwo=`ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26`;

function organizeCSV(str) {
    let table_cells = '';
    let table_rows = [];
    let table = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === ',') {
            table_rows.push(table_cells);
            table_cells = '';
        } else if (str[i] === '\n') {
            table_rows.push(table_cells);
            table.push(table_rows);
            table_rows = [];
            table_cells = '';
        } else {
            table_cells += str[i];
        }
    }
    // Log each row of data
    table.forEach(row => {
        console.log(row[0], row[1], row[2], row[3]);
    });
}

organizeCSV(csvStringOne);
console.log(`\n----\n`)
organizeCSV(csvStringTwo);


const csvStringThree = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26"

function organizeCSV2(str){
    let strArr = ""
    let arr = []
    let resultArr = []
    for (let i = 0; i < str.length; i++){
        if (str[i] === "\n"){
            resultArr.push(arr)
            arr.push(strArr)
            arr=[]
            strArr=""
        }else{
            strArr += str[i]

        }
    }

    console.log(`\n------\n`)
    console.log(resultArr)
}

organizeCSV2(csvStringThree)