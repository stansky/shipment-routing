import chalk from 'chalk';
import { createNames, createShippingAddresses } from '../utils/data.js';
import { writeCsv } from '../utils/csv.js';

const { log } = console;

const generateCsv = (opts) => {
    const amountOfRecords = opts.size || 100;
    const names = createNames(amountOfRecords);
    const addresses = createShippingAddresses(amountOfRecords);

    if (!opts.addresses && !opts.name) {
        generateAddressesCsv(addresses)
            .then(generateNamesCsv(names))
            .finally(
                log(
                    chalk.greenBright(
                        `Successfully created ${amountOfRecords} names and adddresses`
                    )
                )
            );
    }
    if (opts.addresses) {
        generateAddressesCsv(addresses)
            .then((result) => {
                log(chalk.greenBright(`Successfully created ${result.length} addresses`));
            })
            .catch((error) => {
                log(chalk.redBright(error));
            });
    }

    if (opts.names) {
        generateNamesCsv(names)
            .then((result) => {
                log(chalk.greenBright(`Successfully created ${result.length} names`));
            })
            .catch((error) => {
                log(chalk.redBright(error));
            });
    }
};

const generateNamesCsv = (names) => writeCsv(names, 'names.csv');

const generateAddressesCsv = (addresses) => writeCsv(addresses, 'addresses.csv');

export default generateCsv;
