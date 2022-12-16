import { faker } from '@faker-js/faker';

export const createNames = (size = 100) => {
    const users = [];

    for (let i = 1; i <= size; i += 1) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();

        users.push({
            name: `${firstName} ${lastName}`
        });
    }

    return users;
};

export const createShippingAddresses = (size = 2) => {
    const addresses = [];

    for (let id = 1; id <= size; id += 1) {
        const buildingNumber = faker.address.buildingNumber();
        const streetName = faker.address.street();
        const streetAddress = `${buildingNumber} ${streetName}`;

        addresses.push({
            streetAddress
        });
    }

    return addresses;
};
