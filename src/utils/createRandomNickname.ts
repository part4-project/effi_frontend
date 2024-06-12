import { fakerKO as faker } from '@faker-js/faker';

export function createRandomNickName() {
  const adjective = faker.word.adjective();
  const noun = faker.word.noun();

  // fakerJS 3*3 랜덤
  if (adjective.length === 3 && noun.length === 3) {
    const nickname = `${adjective}${noun}`;
    return nickname;
  }

  return createRandomNickName();
}
