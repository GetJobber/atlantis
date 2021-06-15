export async function wait(milliseconds = 0) {
  await new Promise(resolve => setTimeout(resolve, milliseconds));
}
