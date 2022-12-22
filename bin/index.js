#! /usr/bin/env node
import { program } from 'commander';
import { generateCsv } from '../src/commands/generateCsv.js';
import { assignRoutes } from '../src/commands/assignRoutes.js';

program
    .command('generate-csv')
    .description('Generate CSV Data')
    .option('-n, --names', 'Generate CSV file containing first and last name')
    .option('-a, --addresses', 'Generate CSV file street address information')
    .option('-s, --size <number>', 'Amount of records to create default: 100)')
    .action(generateCsv);

program
    .command('assign')
    .description('Assign routes to drivers based on CSV inputs')
    .requiredOption('-d --drivers <pathToFile>', 'Generate CSV file containing first and last name')
    .requiredOption('-a, --addresses <pathToFile>', 'Generate CSV file street address information')
    .action(assignRoutes);

program.parse();
