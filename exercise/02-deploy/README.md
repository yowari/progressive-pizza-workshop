# 02. Deploy

Next we prepare a build for production

```
npm run build
```

Once the project built, you can launch the server and access the Remix web application

```
npm run start
```

Remix is **platform agnostic**. When you build a Remix application, it produces 2 folders inside the `build` folder:

- **client**: it contains all public files (script, styles, assets, etc.) that can be downloaded by the browser
- **server**: it has the modules that contains the functions handlers. It's just a brunch of JavaScript functions

The production build does not include a server! So you still need a server that calls the server handlers.

`@remix-run/serve` provides a production ready express based server.

```
npx remix-serve ./build/server/index.js
```

And that's exactly what is in the `start` script in `package.json`.
