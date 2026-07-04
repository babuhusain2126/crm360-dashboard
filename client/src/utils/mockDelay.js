export function mockDelay(data, ms = 350) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
