beforeAll(() => {
  // JSDOM does not implement scrollTo, so we mock it globally
  window.scrollTo = jest.fn();
  Element.prototype.scrollTo = jest.fn();
});