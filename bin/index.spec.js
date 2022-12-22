/* eslint-disable no-undef */
const path = require('path');
const { exec } = require('child_process');

describe('CLI Prompt', () => {
    test('should display generate and assign commands', async () => {
        const result = await routesCli([]);
        const { stderr } = result;
        expect(stderr).toContain('Generate CSV Data');
        expect(stderr).toContain('Assign routes to drivers based on CSV inputs');
    });

    test('should display generate-csv options', async () => {
        const result = await routesCli(['help generate-csv']);
        const { stdout } = result;
        expect(stdout).toContain('--names');
        expect(stdout).toContain('--addresses');
        expect(stdout).toContain('--size <number>');
    });

    test('should display generate-csv options', async () => {
        const result = await routesCli(['help assign']);
        const { stdout } = result;
        expect(stdout).toContain('--drivers');
        expect(stdout).toContain('--addresses');
    });
});

const routesCli = (args, cwd = '.') => {
    return new Promise((resolve) => {
        exec(
            `node ${path.resolve('./bin/index.js')} ${args.join(' ')}`,
            { cwd },
            (error, stdout, stderr) => {
                resolve({
                    code: error && error.code ? error.code : 0,
                    error,
                    stdout,
                    stderr
                });
            }
        );
    });
};
