import { fakerKO as faker } from '@faker-js/faker';

export function createRandomNickName() {
  const nickname = `${faker.word.adjective()} ${faker.word.noun()}`;
  return nickname;
}
