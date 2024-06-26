# 07. Progressive Enhancement

Remix is amazing. It's a fact! One of the things that makes it so awesome is the **Progressive Enhancement** principle.

Following this principle Remix applications can work without the need of JavaScript on the client side.

In the `app/root.tsx`, go ahead and comment out the `scripts` tag and navigate to the application.

```tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {/* <Scripts /> */}
      </body>
    </html>
  );
}
```

Now, the browser won't have any React script. It's just like the good old PHP days.

But wait! PHP? we are 20 years back! How could this be a good thing?

With SPA (Single Page Application), a huge amount of process that the browser was doing, and doing well, like caching,
has been abandoned, or worse, reimplemented, and reinventing the wheel is not always a good thing, it adds new complexity to manage!

SSR (Server Side Rendering) fixed some issues of the SPA, like SEO but still it kind of reinvented the wheel. After all, SSR is just generating html on the server. And that is what PHP and JSP (I saw you there Java fan boy/girl) has always been doing.

Where Remix goes further is instead of doing CSR (Client Side Rendering) and then SSR, it encourage you to go SSR first and then CSR if needed. This ensures that the application is working correctly, even when JavaScript engine is slow or disabled in the browser for some reason. JavaScript is (and has always been) here to enhance the user experience and not to be considered as a
requirement. That's how the web has been designed. That's where SPA drops the experience but thanks to Remix we are recovering it.

Currently, when submitting the form, all the page reloads instead of just retrieving the data. Remix provides a React component that have all the attributes of the `form` tag and intercept the submission. The interception is a made with JavaScript, but when there is no JavaScript, it falls back on the plain old `form` behavior that takes place. Remix is remixing and progressively enhancing. BEAUTIFUL!

Replace in `app/routes/_index.tsx` the `form` tag with the `Form` component

```tsx
  <Form method="POST" action="?index">
```

Same goes for the links, the `a` tag actually reloads all the page. Remix provides us the `Link` React component that do the interception and request only the required data to display the new page, instead of all the html document that will require more loading and parsing.

Replace `a` with `Link`

```tsx
export default function Confirmation() {
  // ...

  return (
    <main>
      {/* ... */}
      <Link to="/">Lancer une nouvelle commande</Link>
    </main>
  );
}
```
