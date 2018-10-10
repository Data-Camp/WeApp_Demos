export function add(a, b) {
  return a + b;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
