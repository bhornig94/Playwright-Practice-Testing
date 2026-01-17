
import { faker } from '@faker-js/faker';

export const createUserRegistrationData = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dob: '1990-01-01', // Matching YYYY-MM-DD format
    street: faker.location.streetAddress(),
    postalCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: 'United States', // Matches dropdown
    phone: faker.phone.number(),
    email: faker.internet.email(),
    // Password meets all 4 requirements 
    password: 'Password123!', 
  };
};