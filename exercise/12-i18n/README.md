# 12. I18n

To make our project international, we are going to use react-i18n.
To do so we are leveraging the work of [Sergio Xalambrí](https://github.com/sergiodxa) a heavy contributor to remix who created the [remix-18next](https://github.com/sergiodxa/remix-i18next) package.

## package install

```cli
npm install remix-i18next i18next react-i18next i18next-browser-languagedetector
```

## Common configuration

Create `./app/locales/fr/common.json` and `./app/locales/en/common.json` with this initial translation:

```json fr
{
  "title": "Remixez votre pizza"
}
```

```json en
{
  "title": "Remix your pizz"
}
```

Create `./app/i18n.ts` and add the following configuration

```typescript
import { InitOptions } from "i18next";
import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";

export const i18nConfig = {
  supportedLngs: ["en", "fr"],
  fallbackLng: "en",
  defaultNS: "common",
  resources: {
    en: { common: en },
    fr: { common: fr },
  },
} satisfies InitOptions;
```

Create `./app/i18next.server.ts` with the following configuration

```ts
import { createCookie } from "@remix-run/node";
import { RemixI18Next } from "remix-i18next/server";
import { i18nConfig } from "./i18n";

export const i18nCookie = createCookie("i18n", {
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

let i18next = new RemixI18Next({
  detection: {
    cookie: i18nCookie,
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng,
  },
  i18next: {
    ...i18nConfig,
  },
});

export default i18next;
```

With this basic configuration we now need to add the I18nextProvider to both the `entry.client.tsx` and `entry.server.tsx`.

Copy those files from the directory.

Lastly, we need to load know the current local and save it. For that we are going to add a loader in our `./app/root.tsx`. This loader will check for the cookie and set it to the correct locale.

Add this :

```ts
export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  return json(
    { locale },
    { headers: { "Set-Cookie": await i18nCookie.serialize(locale) } }
  );
}
```

Then we can update our Layout component inside `./app/root.tsx` to get the translation and use that locale.

```tsx
export function Layout({ children }: { children: React.ReactNode }) {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  useChangeLanguage(locale);
  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

## Usage

Now we can start translating everything.
On the client we will use the hook `useTranslation` and on the server with `await i18next.getFixedT(request)`.

Example client :

```tsx
export default MyComponent() {
  const { t } = useTranslation();

  return (
    <h1>{t("mytitle")}</h1>
  )
}
```

Example server :

```ts
export async function loader({ request }: LoaderFunctionArgs) {
  let t = await i18next.getFixedT(request);

  return json({ myTranslation: t("myTranslation") });
}
```

## Bonus: how to extract translations.

First install i18next-parse:

```cli
npm install --save-dev i18next-parser
```

We can then copy the configuration file `i18next-parser.config.js` in our base folder.

This package will when run extract all the missing translation from our translation files and add them to it.

Usage:

```cli
npx i18next
```
