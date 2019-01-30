const XLSX = require('xlsx-style');
const fs = require('fs');
const os = require('os');
var exec = require('child_process').exec;

function datenum(v, date1904) {
    if (date1904) {
        v += 1462;
    }
    let epoch = Date.parse(v);

    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
let Workbook = function() {
    this.SheetNames = [];
    this.Sheets = {};
};


const sheet_arr = (data) => {
    let ws = {};
    let wscols = [];
    let range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};

    for (let R = 0; R !== data.length; ++R) {

        for (let C = 0; C !== data[R].length; ++C) {
            wscols.push({wch: 15});// 单元格宽度
            if (range.s.r > R) {
                range.s.r = R;
            }
            if (range.s.c > C) {
                range.s.c = C;
            }
            if (range.e.r < R) {
                range.e.r = R;
            }
            if (range.e.c < C) {
                range.e.c = C;
            }
            let cell = {v: data[R][C]};

            if (cell.v === null) {
                continue;
            }
            let cell_ref = XLSX.utils.encode_cell({c: C, r: R});

            /* TEST: proper cell types and value handling */
            if (typeof cell.v === 'number') {
                cell.t = 'n';
            } else if (typeof cell.v === 'boolean') {
                cell.t = 'b';
            } else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            } else {
                cell.t = 's';
            }
            cell.s = {
                border: {
                    left: {
                        style: 'thin',
                        color: {
                            auto: 1
                        }
                    },
                    right: {
                        style: 'thin',
                        color: {
                            auto: 1
                        }
                    },
                    top: {
                        style: 'thin',
                        color: {
                            auto: 1
                        }
                    },
                    bottom: {
                        style: 'thin',
                        color: {
                            auto: 1
                        }
                    }
                }
            };
            ws[cell_ref] = cell;
        }
    }

    if (range.s.c < 10000000) {
        ws['!ref'] = XLSX.utils.encode_range(range);
    }
    ws['!cols'] = wscols;
    return ws;
};

const excel_export = (obj) =>{
    let arr_name = obj.title;
    let arr = obj.data;
    let ws_name = obj.sheetName;
    let file = os.tmpdir() + '/' + obj.fileName + '.xlsx';
    let wb = new Workbook();

    arr.unshift(arr_name);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = sheet_arr(arr);

    XLSX.writeFile(wb, file);
    let filestream = fs.createReadStream(file);

    obj.res.setHeader('Content-Type', 'application/octet-stream');
    obj.res.setHeader('Content-Disposition', 'attachment; filename=' + obj.fileName + '.xlsx');
    filestream.pipe(obj.res);
    exec(['rm', '-rf', file].join(' '));
};

module.exports = {
    excel_export
};
