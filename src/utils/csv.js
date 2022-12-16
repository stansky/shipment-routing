import fs from 'fs';
import { stringify, parse } from 'csv';

export const writeCsv = (data, fileName) => {
    const promise = new Promise((resolve, reject) => {
        stringify(
            data,
            {
                header: false
            },
            (err, output) => {
                fs.writeFile(`./output/${fileName}`, output, (error) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(data);
                });
            }
        );
    });
    return promise;
};

export const parseCsv = (fileName) => {
    const promise = new Promise((resolve, reject) => {
        const rows = [];
        fs.createReadStream(fileName)
            .pipe(parse())
            .on('data', (row) => {
                rows.push(row[0]);
            })
            .on('end', () => {
                resolve(rows);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
    return promise;
};
