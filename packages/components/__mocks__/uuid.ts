let count = 0;
const finalSection = 426655440000;

function fakeUUID() {
  count += 1;
  return `123e4567-e89b-12d3-a456-${finalSection + count}`;
}

export const v1 = fakeUUID;
