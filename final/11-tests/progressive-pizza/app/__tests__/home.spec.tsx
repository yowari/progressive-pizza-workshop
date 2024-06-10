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

test("ordering a pizza", async () => {
  render(<App initialEntries={["/"]} initialIndex={0} />);

  const mediumPizzaRadio = await screen.findByRole("radio", {
    name: /medium/i,
  });
  mediumPizzaRadio.click();

  const orderButtons = await screen.findAllByRole("button");
  orderButtons[0].click();

  expect(await screen.findByText("Confirmation")).toBeInTheDocument();
});
