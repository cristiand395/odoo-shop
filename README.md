## TODO:
- Remove all `import * as React from "react"`
- Change language html from root layout
- Add hostname to `next.config.js` to allow resources.
```js
/** @type {import('next').NextConfig}*/
module.exports = {
  formats: ['image/webp', 'image/png', 'image/jpeg'],
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '',
      port: '',
      pathname: ''
    }
  ]
}
```
- Manejar error cuando se pierde conexión con Odoo.