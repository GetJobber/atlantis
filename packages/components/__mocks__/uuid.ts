interface UUIDFunction {
  (): string;
  v1: () => string;
}

function fakeUUID() {
  return "123e4567-e89b-12d3-a456-426655440000";
}

const uuid = fakeUUID as UUIDFunction;

uuid.v1 = fakeUUID;

// eslint-disable-next-line import/no-default-export
export default uuid;
