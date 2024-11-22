"use client";

import { ChangeEvent, useActionState, useState } from "react";
import { PizzaPreview } from "@/components/PizzaPreview";
import { Text } from "@/components/ui/Text";
import { Layout } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Flex } from "@/components/ui/Flex";
import { Radio } from "@/components/ui/Radio";
import { Checkbox } from "@/components/ui/Checkbox";
import { Grid } from "@/components/ui/Grid";
import Form from "next/form";
import { createOrder } from "./orders/actions";

const initialState = {
  errors: {
    size: "",
  },
};

export default function Home() {
  const [toppings, setToppings] = useState<string[]>([]);

  const [state, formAction] = useActionState(createOrder, initialState);

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
        Nextez votre pizza
      </Text>

      {/* Use the state in the preview component */}
      <PizzaPreview toppings={toppings} />

      <Form
        id="pizza-form"
        action={formAction}
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

          {state?.errors.size && (
            <Text size="sm" color="danger">
              <em>{state?.errors.size}</em>
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
