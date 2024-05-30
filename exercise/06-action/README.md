# 06. Action

Once the form is submitted, an HTTP POST is sent to the current url but since there is a parent route
for the index page (which is `root.tsx`) and Remix cannot just use the url to know which file should
handle the request, we need to help Remix to figure this out.

update the form tag to have `action="?index"`

```jsx
<form method="POST" action="?index">
```

Now, to handle the form submition, export a function named action. Remix will automatically call the function on
POST call (non GET) on the corresponding url.

```typescript
export function action() {
  console.log('form submitted !');
  return null;
}
```

The action function can have the request informations as argument. The request contains the user form inputs.

Let use it to log the command.

```typescript
let nextOrderId = 0;

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const size = form.get('size');
  const toppings = form.getAll('toppings');

  const orderId = nextOrderId++;

  console.log(
    `[order #${orderId}] Ordering a ${size} pizza` +
      (toppings.length > 0 ? ` with ${toppings.join(', ')}!` : '')
  );

  return null;
}
```

The returned value will be sent as an HTTP Response. We can construct and return a Response object.
Construct and return a Response with `302` status to redirect to the confirmation page. This will be
interpreted by the browser.

```typescript
export async function action() {
  // ...
  return new Response(null, {
    status: 302,
    headers: {
        Location: `/confirmation?orderId=${orderId}`,
    },
  });
}
```

Remix provide a helper function that shorten all of this.

```typescript
export async function action() {
  // ...
  return redirect(`/confirmation?orderId=${orderId}`);
}
```

Before you go further, let do an experiment. Once the form page load, when you submit without modifying anything you
can see that you get redirected to the confirmation page. To prevent this, you need some form validation check.

In our case, the required form element that we want to be defined is the size. Add the condition that checks wether
the form input is defined in the action function.

```typescript
export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const size = form.get('size');
  const toppings = form.getAll('toppings');

  // form validation
  if (!size) {
    return { errors: { size: 'Veuillez selectionnez la taille de votre pizza' } };
  }

  const orderId = nextOrderId++;
  console.log(
    `[order #${orderId}] Ordering a ${size} pizza` +
      (toppings.length > 0 ? ` with ${toppings.join(', ')}!` : '')
  );

  return redirect(`/confirmation?orderId=${orderId}`);
}
```

You can see here that we are checking the size form input (the input radio) and return an object with the validation error
message. This object we need to retrieve it on the component and display a sweet message. Remix provide a hook `useActionData`
that simply returns what we return on the action function.

```tsx
export default function Index() {
  const actionData = useActionData<typeof action>();
  // ...

  return (
    <main>
    {/* ... */}
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
    {/* ... */}
    </main>
  );
}
```
