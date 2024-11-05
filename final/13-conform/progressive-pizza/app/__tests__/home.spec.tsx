import { createRemixStub } from "@remix-run/testing";
import { default as Component, action } from "~/routes/_index";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
  const user = userEvent.setup();

  const mediumPizzaRadio = await screen.findByRole("radio", {
    name: /medium/i,
  });
  await user.click(mediumPizzaRadio);

  const orderButtons = await screen.findAllByRole("button");
  await user.click(orderButtons[0]);

  expect(await screen.findByText("Confirmation")).toBeInTheDocument();
});
