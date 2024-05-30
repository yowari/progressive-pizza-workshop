import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

let nextOrderId = 0;

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const size = form.get("size");
  const toppings = form.getAll("toppings");

  // form validation
  if (!size) {
    return {
      errors: { size: "Veuillez selectionnez la taille de votre pizza" },
    };
  }

  const orderId = nextOrderId++;
  console.log(
    `[order #${orderId}] Ordering a ${size} pizza` +
      (toppings.length > 0 ? ` with ${toppings.join(", ")}!` : "")
  );

  return redirect(`/confirmation?orderId=${orderId}`);
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <main>
      <h2>Remixez votre pizza</h2>

      <form method="POST" action="?index">
        <fieldset>
          <legend>Selectionnez la taille</legend>

          <label htmlFor="small">
            <input id="small" type="radio" name="size" value="small" />
            Small
          </label>

          <label htmlFor="medium">
            <input id="medium" type="radio" name="size" value="medium" />
            Medium
          </label>

          <label htmlFor="large">
            <input id="large" type="radio" name="size" value="large" />
            Large
          </label>
          {actionData?.errors?.size && (
            <p>
              <em>{actionData?.errors?.size}</em>
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend>Choisissez votre garniture</legend>

          <label htmlFor="anchovy">
            <input
              id="anchovy"
              type="checkbox"
              name="toppings"
              value="anchovy"
            />
            Anchois
          </label>

          {/* do the same and create checkboxes for: bacon, basil, chili, mozzarella, mushroom, olive, onion, pepper, pepperoni, sweetcorn, tomato */}
        </fieldset>
        <button type="submit">Commander</button>
      </form>
    </main>
  );
}
