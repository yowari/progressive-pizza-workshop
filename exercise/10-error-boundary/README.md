# 10. Error Boundary

By default, when an error occurs, Remix displays a built-in error page. In order to give the user more reassurance, we need to customize the error page and add some branding.

In `app/root.tsx`, export the component that you want to display when an error occurs and make sure it has the name `ErrorBoundary`:

```tsx
import { Layout as PizzaLayout } from "~/components/Layout";

...

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <PizzaLayout center>
      <Message
        title="Nous sommes désolé"
        subtitle="Une erreur s'est produite"
        imageUrl="/broken.png"
      >
        Réessayez ou contactez le support.
      </Message>
    </PizzaLayout>
  );
}
```

The component will render in place of the `{children}` specified in the Layout component.

The root error boundary is the last chance to catch and handle errors on your pages. But you can also set an error boundary for a specific page only.

On the confirmation page, we add an error boundary to catch errors related to this page:

```tsx
import { useRouteData } from "remix";

...

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <Layout center>
      <Message
        title="Nous sommes désolé"
        subtitle="Numéro de commande invalide"
        imageUrl="/sizes/medium.svg"
      >
        Veuillez repasser votre commande.
      </Message>
    </Layout>
  );
}

```
