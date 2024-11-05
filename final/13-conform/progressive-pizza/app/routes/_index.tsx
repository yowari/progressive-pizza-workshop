import { redirect, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { ChangeEvent, useState } from "react";
import { PizzaPreview } from "~/components/PizzaPreview";
import { Button } from "~/components/ui/Button";
import { Checkbox } from "~/components/ui/Checkbox";
import { Flex } from "~/components/ui/Flex";
import { Grid } from "~/components/ui/Grid";
import { Layout } from "~/components/ui/Layout";
import { Radio } from "~/components/ui/Radio";
import { Text } from "~/components/ui/Text";
import { z } from "zod";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { setTimeout } from "node:timers/promises";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

let nextOrderId = 0;

const pizzaToppings = [
  "anchovy",
  "bacon",
  "basil",
  "chili",
  "mozzarella",
  "mushroom",
  "olive",
  "onion",
  "pepper",
  "pepperoni",
  "sweetcorn",
  "tomato",
] as const;

const pizzaSize = ["small", "medium", "large"] as const;

const schema = z.object({
  size: z.enum(pizzaSize, {
    required_error: "Veuillez selectionnez la taille de votre pizza",
    message: "Veuillez selectionnez une taille de pizza valide",
  }),
  toppings: z.array(z.enum(pizzaToppings)),
  firstname: z
    .string({ required_error: "Veuillez entrer votre prénom" })
    .min(0, "Votre prénom doit contenir au moins 2 caractères"),
  lastname: z
    .string({ required_error: "Veuillez entrer votre nom" })
    .min(2, "Votre nom doit contenir au moins 2 caractères"),
  email: z
    .string({ required_error: "Veuillez entrer une adresse email valide" })
    .email("Veuillez entrer une adresse email valide")
    .refine(
      (email) => {
        return !email.endsWith("@example.com");
      },
      { message: "User email is not allowed" }
    ),
  phone: z.string({ required_error: "Veuillez entrer votre numéro de téléphone" }),
});

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();

  const submission = await parseWithZod(form, {
    schema: schema.superRefine(async ({ email }, ctx) => {
      if (email.endsWith("@slow.com")) {
        await setTimeout(3000);
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "User email is too slow",
          path: ["email"],
        });
      }
    }),
    async: true,
  });

  if (submission.status !== "success") {
    console.error(submission.error);
    return submission.reply();
  }

  const { size, toppings, firstname, lastname, email, phone } = submission.value;
  const orderId = nextOrderId++;
  console.log(
    `[order #${orderId}] Ordering a ${size} pizza` +
      (toppings.length > 0 ? ` with ${toppings.join(", ")} for ${firstname} ${lastname} at ${email} / ${phone}!` : "")
  );

  return redirect(`/confirmation?orderId=${orderId}`);
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  // Add state management for the pizza preview
  const [toppings, setToppings] = useState<string[]>([]);
  const navigation = useNavigation();

  const [form, fields] = useForm({
    id: "pizza-form",
    lastResult: actionData,
    constraint: getZodConstraint(schema),
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {},
  });

  const handleFormChange = (event: ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const toppings = formData.getAll("toppings") as string[];
    setToppings(toppings);
  };

  const inputClasses =
    "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none  aria-[invalid]:border-pink-500 aria-[invalid]:text-pink-600 focus:aria-[invalid]:border-pink-500 focus:aria-[invalid]:ring-pink-500";

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
        {...getFormProps(form)}
        method="POST"
        action="?index"
        onChange={handleFormChange} // update the pizza preview on every form change
      >
        <fieldset className="my-4">
          <Text className="mb-4" as="legend" size="lg" weight="bold">
            Selectionnez la taille
          </Text>

          <Flex>
            {pizzaSize.map((size) => (
              <Radio
                {...getInputProps(fields.size, { type: "radio" })}
                key={size}
                value={size}
                imageUrl={`/sizes/${size}.svg`}
              >
                <span className="capitalize">{size}</span>
              </Radio>
            ))}
          </Flex>
          {fields.size.errors && (
            <Text size="sm" color="danger">
              <em>{fields.size.errors.join(", ")}</em>
            </Text>
          )}
        </fieldset>

        <fieldset className="my-4">
          <Text className="mb-4" as="legend" size="lg" weight="bold">
            Choisissez votre garniture
          </Text>
          <Grid>
            {pizzaToppings.map((topping) => (
              <Checkbox
                {...getInputProps(fields.toppings, { type: "checkbox" })}
                key={topping}
                value={topping}
                imageUrl={`/toppings/${topping}.svg`}
              >
                <span className="capitalize">{topping}</span>
              </Checkbox>
            ))}
          </Grid>
          {fields.toppings.errors && (
            <Text size="sm" color="danger">
              <em>{fields.toppings.errors.join(", ")}</em>
            </Text>
          )}
        </fieldset>

        <fieldset className="my-4">
          <Text className="mb-4" as="legend" size="lg" weight="bold">
            Vos coordonnées
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={fields.firstname.id}>
                <span className="block text-sm font-medium text-slate-700">Prénom</span>
              </label>
              <input
                {...getInputProps(fields.firstname, { type: "text" })}
                key={fields.firstname.key}
                className={inputClasses}
              />
              {fields.firstname.errors && (
                <Text size="sm" color="danger">
                  <em>{fields.firstname.errors.join(", ")}</em>
                </Text>
              )}
            </div>
            <div>
              <label htmlFor={fields.lastname.id}>
                <span className="block text-sm font-medium text-slate-700">Nom</span>
              </label>
              <input
                {...getInputProps(fields.lastname, { type: "text" })}
                key={fields.lastname.key}
                className={inputClasses}
              />

              {fields.lastname.errors && (
                <Text size="sm" color="danger">
                  <em>{fields.lastname.errors.join(", ")}</em>
                </Text>
              )}
            </div>
            <div>
              <label htmlFor={fields.email.id}>
                <span className="block text-sm font-medium text-slate-700">Email</span>
              </label>
              <input
                {...getInputProps(fields.email, { type: "email" })}
                key={fields.email.key}
                className={inputClasses}
              />
              {fields.email.errors && (
                <Text size="sm" color="danger">
                  <em>{fields.email.errors.join(", ")}</em>
                </Text>
              )}
            </div>
            <div>
              <label htmlFor={fields.phone.id}>
                <span className="block text-sm font-medium text-slate-700">Téléphone</span>
              </label>
              <input
                {...getInputProps(fields.phone, { type: "tel" })}
                key={fields.phone.key}
                className={inputClasses}
              />
              {fields.phone.errors && (
                <Text size="sm" color="danger">
                  <em>{fields.phone.errors.join(", ")}</em>
                </Text>
              )}
            </div>
          </div>
        </fieldset>
        <div className="flex gap-2">
          <Button
            className="hidden md:inline-block disabled:bg-orange-200"
            type="submit"
            disabled={navigation.state === "submitting"}
          >
            Commander
            {navigation.state === "submitting" && <span className="ml-2 animate-pulse">🍕</span>}
          </Button>
          <Button className="hidden md:inline-block" type="reset">
            Reset
          </Button>
        </div>
      </Form>
    </Layout>
  );
}
