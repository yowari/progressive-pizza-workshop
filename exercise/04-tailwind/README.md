# 04. Tailwind

To style our project we'd like to use Tailwind CSS.
Since Remix uses Vite, most of the setup of Tailwind CSS is the same as the setup on the Vite project.

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init --ts -p
```

In `tailwind.config.ts`, add the paths of the template files

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"], // Add the template files
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

Create `./app/tailwind.css` and add the tailwind directives

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In `./app/root.tsx` import the newly-created `./app/tailwind.css` file

```typescript
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
```

And that's it!

For more integration like css-in-js solutions, you can check the
[examples repository](https://github.com/remix-run/examples).
