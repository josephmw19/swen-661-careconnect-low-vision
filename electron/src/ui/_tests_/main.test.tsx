import { createRoot } from "react-dom/client";

jest.mock("react-dom/client", () => {
  const render = jest.fn();
  return {
    createRoot: jest.fn(() => ({ render })),
  };
});

const createRootMock = createRoot as unknown as jest.Mock;

test("main mounts the React app", async () => {
  document.body.innerHTML = `<div id="root"></div>`;

  // IMPORTANT: import inside the async test, no top-level await
  await import("../../main");

  expect(createRootMock).toHaveBeenCalled();
  const rootInstance = createRootMock.mock.results[0].value;
  expect(rootInstance.render).toHaveBeenCalled();
});