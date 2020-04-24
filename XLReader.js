const XLSX = require('xlsx');

class xlReader{
    read_from_excel(sheetName, filePath){
        var workbook = XLSX.readFile(filePath);
        var worksheet = workbook.Sheets[sheetName];
    
        var a = XLSX.utils.sheet_to_json(worksheet);
    }
}
module.exports = new xlReader();