# Shipment Routes Coding Exercise

## Installation

---

### Install Node version `>=14.16`

-   [Install using Installer](https://nodejs.org/en/download/)
-   [Install Using NVM](https://github.com/nvm-sh/nvm#install--update-script)

---

Install Dependecies

-   [Clone Repository](https://github.com/stansky/shipment-routing)
-   `cd` to source code directory
-   Run `npm install` in the command line
-   Run `npm link` to create a symlink for `routes` available in your terminal
-   Verify by running `routes` in your terminal

---

## Create Sample Data

> Optionally create a generated CSV of addresses and names using the `routes generate-csv` command.

-   To create a file of names, use the `--names` flag.
-   To create a file of just addresses, use the `--addresses` flag.
-   Specify the amount of records to create using the `--size` flag

---

## Assign Routes to Drivers

Simple run `routes assign` to assign shipping route addresses to drivers.

-   Specify path to a CSV file containing a list of drivers by using the `--drivers` flag
-   Specify path to a CSV file containing a list of addresses by using the `--addresses` flag

## Example

```
npm link
routes generate-csv -s 1000
routes assign -d './output/names.csv' -a './output/addresses.csv'
```
