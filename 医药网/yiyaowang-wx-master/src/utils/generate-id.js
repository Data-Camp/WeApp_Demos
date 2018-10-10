export default function generateId() {
  return Date.now() + Math.random().toString().substr(2, 3);
}
