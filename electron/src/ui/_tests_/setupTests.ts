// This file is likely already being picked up by your jest config
beforeAll(() => {
  window.scrollTo = jest.fn();
  // This is the critical line for element-level scrolling
  Element.prototype.scrollTo = jest.fn(); 
});