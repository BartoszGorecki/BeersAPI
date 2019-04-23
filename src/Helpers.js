export const truncWords = (s, n) => {
  let cut = s.indexOf(" ", n);
  return cut === -1 ? s : s.substring(0, cut);
};
export const throttled = (delay, fn) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};
