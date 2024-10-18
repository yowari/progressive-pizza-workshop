# 08. Tailwind

To style our project we'd like to use Tailwind CSS.
The default Remix template comes with Tailwind preconfigured but remember we disabled the Tailwind styling. It now time
to put it back.

On `app/tailwind.css` put back the Tailwind directives

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

And that it!

If for some reason you hate Tailwind and you don't want to use it on your personal or professional project, you can
remove it completely. After all, a Remix project is just a Vite project. You can reverse the Tailwind setup as showed in
the guide on [Installing Tailwind CSS with Remix](https://tailwindcss.com/docs/guides/remix).

For more integration like css-in-js solutions, you can check the
[examples repository](https://github.com/remix-run/examples).
