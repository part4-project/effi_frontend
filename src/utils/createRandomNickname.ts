import { ADJECTIVE_DATA, NOUN_DATA } from '@constants/nickname-data';
import { fakerKO as faker } from '@faker-js/faker';

export function createRandomNickName() {
  const randomAdjective = faker.helpers.arrayElement(ADJECTIVE_DATA);
  const randomNoun = faker.helpers.arrayElement(NOUN_DATA);

  const nickname = `${randomAdjective} ${randomNoun}`;
  return nickname;
}
