# 07. Loader

Once we get redirected to the confirmation page, we provide the `orderId` as query param. We want to display the `orderId` to
the user since that the only way for the pizza maker to know who to notify when the pizza is ready.

So from this, we understand that the `orderId` is required and should be checked at load time (before we render the page).
To do so, in Remix, we can export a function named `loader` which will be called before the component is rendered. As the
`action` function, we can retrieve the request informations througth the function argument. We do that to retrieve the `orderId`
query param and check wether the `orderId` is present, if not, we throw and HTTP response with status `400` and Remix will prevent
the component rendering.

```typescript
export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get('orderId');

  if (!orderId) {
    throw new Response('Missing orderId', { status: 400 });
  }

  return { orderId };
}
```

Same as for `action`, we can retrieve the returned data from the `loader` using a hook `useLoaderData`.

```tsx
export default function Confirmation() {
  const { orderId } = useLoaderData<typeof loader>();

  return (
    <main>
      <h2>Merci pour votre commande</h2>
      <p>Commande n° {orderId}</p>
      <p>
        Votre pizza sera prête dans quelques minutes. Vous serez notifié une
        fois que c&apos;est pr&ecirc;t.
      </p>
      <a href="/">Lancer une nouvelle commande</a>
    </main>
  );
}
```