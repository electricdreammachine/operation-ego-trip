export const randomNumberInRange = (maximum, minimum) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
