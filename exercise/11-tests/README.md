# 11. Tests

We will eventually need to test our Remix application and here we use Vitest and React Testing Library for this purpose. We will also use the super fast [Happy DOM](https://github.com/capricorn86/happy-dom) to simulate the browser environment in our tests.
Finally, Remix provides a testing library that we will use to test our routes, let's install these dependencies:

`npm i -D @remix-run/testing @testing-library/jest-dom @testing-library/react @testing-library/user-event @vitejs/plugin-react happy-dom vitest`

We'll need to add a test script to our package.json file.

```json
"scripts": {
  "test": "vitest"
},
```

Vitest needs a setup file. We create the file in a folder called `test` in the root of our project:

`test/setup-test-env.ts`:

```typescript
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
```

In the root of the project we create a file called `vitest.config.ts` and add the following code:

```typescript
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: { postcss: { plugins: [] } },
  test: {
    include: ["./app/**/*.spec.{ts,tsx}"],
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test/setup-test-env.ts"],
  },
});
```

And that's it for the setup! If all is well setup you can run the tests with the following command:

`npm test`

You will notice there are no tests yet, so let's add some.

In the `app` folder create a new folder called `__tests__` and inside it create a file called `home.spec.tsx` add the following code:

```tsx
import { createRemixStub } from "@remix-run/testing";
import { default as Component, action } from "~/routes/_index";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

const App = createRemixStub([
  {
    path: "/",
    Component,
    action,
  },
  {
    path: "/confirmation",
    Component() {
      return <h1>Confirmation</h1>;
    },
  },
]);

test("rendering the order page", async () => {
  render(<App initialEntries={["/"]} initialIndex={0} />);

  expect(await screen.findByText("Remixez votre pizza")).toBeInTheDocument();
});
```

We declare our application using the `createRemixStub`, and in the test we render the resulting `App` and check if the heading "Remixez votre pizza" is present in the document.

Now let's simulate ordering a pizza with the following test:

```tsx
import userEvent from "@testing-library/user-event";

// ...

test("ordering a pizza", async () => {
  render(<App initialEntries={["/"]} initialIndex={0} />);
  const user = userEvent.setup();

  const mediumPizzaRadio = await screen.findByRole("radio", {
    name: /medium/i,
  });
  await user.click(mediumPizzaRadio);

  const orderButtons = await screen.findAllByRole("button");
  await user.click(orderButtons[0]);

  expect(await screen.findByText("Confirmation")).toBeInTheDocument();
});
```

After we click the order button we verify that we have indeed been redirected to the confirmation page.
We could have added the actual confirmation route page to the stub but we intentionally left it out to keep the tests focused on the home page.
