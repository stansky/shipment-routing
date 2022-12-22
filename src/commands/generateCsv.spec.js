/* eslint-disable no-undef */
import * as generator from './generateCsv';
import * as data from '../utils/data.js';
import * as csv from '../utils/csv.js';

describe('Program should generate CSV size based on input', () => {
    test('should generate 100 names and addresses by default', () => {
        const opts = {};
        const amountOfRecords = opts.size || 100;
        const generatedRecords = generateRecords(amountOfRecords);
        const generatorLogSpy = jest.spyOn(console, 'log');
        const generatorNameSpy = jest.spyOn(data, 'createNames').mockReturnValue(generatedRecords);
        const generatorAddressesSpy = jest
            .spyOn(data, 'createShippingAddresses')
            .mockReturnValue(generatedRecords);
        const csvWriterSpy = jest.spyOn(csv, 'writeCsv');

        generator.generateCsv(opts);
        expect(generatorLogSpy).toBeCalledTimes(1);
        expect(generatorLogSpy).toBeCalledWith(
            expect.stringContaining('Successfully created 100 names and addresses')
        );
        expect(generatorNameSpy).toBeCalled();
        expect(generatorAddressesSpy).toBeCalled();
        expect(csvWriterSpy).toBeCalledWith(generatedRecords, 'addresses.csv');
        expect(csvWriterSpy).toBeCalledWith(generatedRecords, 'names.csv');
    });

    test('should generate records base on user input', () => {
        const opts = {};
        opts.size = 5;
        const generatedNamesSpy = jest.spyOn(data, 'createNames');
        const generatedAddressesSpy = jest.spyOn(data, 'createShippingAddresses');

        generator.generateCsv(opts);

        expect(generatedNamesSpy).toBeCalledWith(5);
        expect(generatedAddressesSpy).toBeCalledWith(5);
    });
});

function generateRecords(size = 100) {
    const records = [];
    for (let index = 0; index < size; index += 1) {
        records[index] = { record: `${Date.now()}FirstName LastName` };
    }
    return records;
}
