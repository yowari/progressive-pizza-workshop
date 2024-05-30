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

export async function action() {
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
Construct and return a Response with `302` status to redirect to the confirmation page. This will interpreted
by the browser.

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

TODO: validation
