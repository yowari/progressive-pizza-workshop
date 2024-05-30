import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { ChangeEvent, useState } from "react";
import { PizzaPreview } from "~/components/PizzaPreview";
import { Button } from "~/components/ui/Button";
import { Checkbox } from "~/components/ui/Checkbox";
import { Flex } from "~/components/ui/Flex";
import { Grid } from "~/components/ui/Grid";
import { Layout } from "~/components/ui/Layout";
import { Radio } from "~/components/ui/Radio";
import { Text } from "~/components/ui/Text";

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
  // Add state management for the pizza preview
  const [toppings, setToppings] = useState<string[]>([]);

  const handleFormChange = (event: ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const toppings = formData.getAll("toppings") as string[];
    setToppings(toppings);
  };

  return (
    <Layout
      bottomSheet={
        <Button form="pizza-form" type="submit" fullWidth>
          Commander
        </Button>
      }
    >
      <Text className="mb-4" as="h2" size="2xl" weight="bold">
        Remixez votre pizza
      </Text>

      {/* Use the state in the preview component */}
      <PizzaPreview toppings={toppings} />

      <Form
        id="pizza-form"
        method="POST"
        action="?index"
        onChange={handleFormChange} // update the pizza preview on every form change
      >
        <fieldset className="my-4">
          <Text className="mb-4" as="legend" size="lg" weight="bold">
            Selectionnez la taille
          </Text>

          <Flex>
            <Radio
              type="radio"
              name="size"
              value="small"
              imageUrl="/sizes/small.svg"
            >
              Small
            </Radio>

            <Radio
              type="radio"
              name="size"
              value="medium"
              imageUrl="/sizes/medium.svg"
            >
              Medium
            </Radio>

            <Radio
              type="radio"
              name="size"
              value="large"
              imageUrl="/sizes/large.svg"
            >
              Large
            </Radio>
          </Flex>

          {actionData?.errors?.size && (
            <Text size="sm" color="danger">
              <em>{actionData?.errors?.size}</em>
            </Text>
          )}
        </fieldset>

        <fieldset className="my-4">
          <Text className="mb-4" as="legend" size="lg" weight="bold">
            Choisissez votre garniture
          </Text>

          <Grid>
            <Checkbox
              name="toppings"
              value="anchovy"
              imageUrl="/toppings/anchovy.svg"
            >
              Anchois
            </Checkbox>

            <Checkbox
              name="toppings"
              value="bacon"
              imageUrl="/toppings/bacon.svg"
            >
              Bacon
            </Checkbox>

            <Checkbox
              name="toppings"
              value="basil"
              imageUrl="/toppings/basil.svg"
            >
              Basilic
            </Checkbox>

            <Checkbox
              name="toppings"
              value="chili"
              imageUrl="/toppings/chili.svg"
            >
              Piment
            </Checkbox>

            <Checkbox
              name="toppings"
              value="mozzarella"
              imageUrl="/toppings/mozzarella.svg"
            >
              Mozzarella
            </Checkbox>

            <Checkbox
              name="toppings"
              value="mushroom"
              imageUrl="/toppings/mushroom.svg"
            >
              Champignon
            </Checkbox>

            <Checkbox
              name="toppings"
              value="olive"
              imageUrl="/toppings/olive.svg"
            >
              Olive
            </Checkbox>

            <Checkbox
              name="toppings"
              value="onion"
              imageUrl="/toppings/onion.svg"
            >
              Oignon
            </Checkbox>

            <Checkbox
              name="toppings"
              value="pepper"
              imageUrl="/toppings/pepper.svg"
            >
              Poivre
            </Checkbox>

            <Checkbox
              name="toppings"
              value="pepperoni"
              imageUrl="/toppings/pepperoni.svg"
            >
              Pepperoni
            </Checkbox>

            <Checkbox
              name="toppings"
              value="sweetcorn"
              imageUrl="/toppings/sweetcorn.svg"
            >
              Maïs
            </Checkbox>

            <Checkbox
              name="toppings"
              value="tomato"
              imageUrl="/toppings/tomato.svg"
            >
              Tomate
            </Checkbox>
          </Grid>
        </fieldset>

        <Button className="hidden md:inline-block" type="submit">
          Commander
        </Button>
      </Form>
    </Layout>
  );
}
