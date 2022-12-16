import chalk from 'chalk';
import chalkTable from 'chalk-table';
import { parseCsv, writeCsv } from '../utils/csv.js';

const { log } = console;
const tableOptions = {
    leftPad: 2,
    columns: [
        { field: 'routeDriver', name: 'Driver' },
        { field: 'routeAddress', name: 'Address' },
        { field: 'routeScore', name: chalk.bgGreenBright('Suitability Score') }
    ]
};

const assignRoutes = (opts) => {
    const driversPromise = parseCsv(opts.drivers);
    const addressesPromise = parseCsv(opts.addresses);

    Promise.all([driversPromise, addressesPromise])
        .then((data) => {
            const drivers = data[0];
            let addresses = data[1];

            log(chalk.yellow(`Assigning routes...`));

            addresses.forEach((address, index) => {
                addresses[index] = {
                    fullAddress: address,
                    parsedStreetName: parseStreetName(address),
                    factors: getFactors(parseStreetName(address).length)
                };
            });

            try {
                drivers.forEach((driver, index) => {
                    const numOfVowels = parseVowels(driver);
                    const numOfConsonants = driver.replace(' ', '').length - numOfVowels;
                    drivers[index] = {
                        routeDriver: driver,
                        vowels: numOfVowels,
                        consonants: numOfConsonants,
                        factors: getFactors(numOfConsonants + numOfVowels)
                    };
                    const [assignedAddress, suitabilityScore] = scoreAddresses(
                        addresses,
                        drivers[index]
                    );
                    addresses = addresses.filter((e) => e.fullAddress !== assignedAddress);
                    drivers[index].routeScore = suitabilityScore;
                    drivers[index].routeAddress = assignedAddress;
                });

                const table = chalkTable(tableOptions, drivers);
                log(table);

                writeCsv(drivers, 'assignedRoutes.csv')
                    .then((result) => {
                        log(
                            chalk.greenBright(
                                `... Successfully assigned ${result.length} drivers to addresses`
                            )
                        );
                    })
                    .catch((error) => {
                        log(chalk.redBright(error));
                    });
            } catch (error) {
                log(error);
                log(chalk.red("Error assigning routes. Check CSV's for duplicates"));
            }
        })
        .catch((err) => {
            log(chalk.redBright(err.message));
        });
};

const parseVowels = (name) => {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    let count = 0;
    const arr = name.split('');
    for (let i = 0; i < arr.length; i += 1) {
        const char = arr[i];
        if (vowels.has(char)) count += 1;
    }
    return count;
};

const parseStreetName = (streetAddress) => {
    let streetName = streetAddress.split(' ');
    streetName.shift();
    streetName = streetName.join('');
    return streetName;
};

const scoreAddresses = (addresses, driver) => {
    const scores = [];
    addresses.forEach((address) => {
        const isEvenStreetName = address.parsedStreetName.length % 2 === 0;
        let baseScore = 0;

        if (isEvenStreetName) {
            baseScore = driver.vowels * 1.5;
        } else {
            baseScore = driver.consonants * 1;
        }

        const sharedFactors = address.factors.filter((el) => driver.factors.includes(el));

        if (sharedFactors.length) {
            baseScore *= 1.5;
        }

        scores.push({
            driver,
            address: address.fullAddress,
            isEvenStreetName,
            baseScore
        });
    });

    const highestSuitabilityScore = scores.reduce((prev, current) =>
        prev.baseScore > current.baseScore ? prev : current
    );
    return [highestSuitabilityScore.address, highestSuitabilityScore.baseScore];
};

const getFactors = (integer) => {
    const factors = [];
    for (let i = 2; i < integer; i += 1) {
        if (integer % i === 0) {
            factors.push(i);
        }
    }
    return factors;
};

export default assignRoutes;
