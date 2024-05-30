import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <h2>Remixez votre pizza</h2>

      <form method="POST">
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
