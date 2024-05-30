# 09. UI

In order to get a more appealing user interface, we provide a set of ui components (that uses Tailwind behind the scenes).
From the exercise folder, copy `app/components` and the contents of `public` folders and put them in your project.

Now you can use this as the design system for your application.

Replace the template in `app/routes/_index.tsx` with the following one

```tsx
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

    <Form id="pizza-form" method="POST" action="?index">
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
```

Nowadays, it's common to have the submit button outside of the form. There is an attribute on the `button` tag that can link it to
a form called `form`. It accepts the `id` of the form. As you've guessed this attribute works as expected with Remix.

Update the contents of the `app/routes/confirmation.tsx` component with the following:

```tsx
return (
  <Layout center>
    <Message
      title="Merci pour votre commande"
      subtitle={`Commande n° ${orderId}`}
      imageUrl="/sizes/medium.svg"
      actions={
        <Button as={Link} to="/">
          Lancer une nouvelle commande
        </Button>
      }
    >
      Votre pizza sera prête dans quelques minutes. Vous serez notifié une fois
      que c&apos;est pr&ecirc;t.
    </Message>
  </Layout>
);
```

You can see here that `Button` takes the `as` attribute to switch the used tag/component under the hood. Here we want to use
the Remix `Link` component to and style it as a button. This concept of switching the used tag/component is called component polymorphism and is commonly used in component libraries like **MUI**, **Chakra UI** etc.

The page looks great but is still a little empty, let's add a preview of the pizza the customer is ordering. We can use the `PizzaPreview` component from the ui components for this:

```jsx
export default function Index() {
  const actionData = useActionData<typeof action>();
  // Add state management for the pizza preview
  const [toppings, setToppings] = useState<string[]>([]);

  const handleFormChange = (event: ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const toppings = formData.getAll('toppings') as string[];
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
      {/* ... */}
      </Form>
    </Layout>
  );
}
```
