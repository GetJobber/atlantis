interface UUIDFunction {
  (): string;
  v1: () => string;
}

let count = 0;
const finalSection = 426655440000;

function fakeUUID() {
  count += 1;
  return `123e4567-e89b-12d3-a456-${finalSection + count}`;
}

const uuid = fakeUUID as UUIDFunction;

uuid.v1 = fakeUUID;

// eslint-disable-next-line import/no-default-export
export default uuid;
