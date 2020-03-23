<div align="center">
  <img src="static/icon.png" alt="The icon of Image Compressor" width="192px" />
  <br />
  <h1>Image Compressor</h1>
  <strong>A WebAssembly-powered website to decode/encode images. 🖼</strong>
  <br />
  <br />
</div>

## About

Image Compressor is a pure frontend-only [Progressive Web App](https://web.dev/progressive-web-apps/), realized using [Nuxt.js](https://nuxtjs.org/), [WebAssembly](https://webassembly.org/) and Web Workers.

It's also working offline and offers the same look and feel as a native app, when installed locally using Chrome, Android or iOS.

### Technology

Currently the following image codecs are supported:

- **image/jpeg**: JPEG decoding/encoding, EXIF extraction, wherever possible
- **image/webp**: WebP decoding/encoding

### UI Preview

<div align="center">
  <img src="static/screenshot.png" alt="A screenshot showing the UI of Image Compressor" width="512px" />
</div>

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Contribution

This is very much a hacky project and could use some formatting-, testing- and documentation love. Feel free to reach out, if you're interested.

## License

Licensed under the MIT license.

Copyright ©️ 2020 [Sascha Zarhuber](https://sascha.work)
