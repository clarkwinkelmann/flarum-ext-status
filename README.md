# Status

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/clarkwinkelmann/flarum-ext-status.svg)](https://packagist.org/packages/clarkwinkelmann/flarum-ext-status)

User status for Flarum.

> This extension was written live on YouTube. Watch the video on the [Clark writes code channel](https://www.youtube.com/watch?v=iRVyF6BuotY). Support me on [Patreon](https://www.patreon.com/clark_writes_code)!

### Installation

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually with composer:

```sh
composer require clarkwinkelmann/flarum-ext-status
```

### Updating

```sh
composer update clarkwinkelmann/flarum-ext-status
```

### Emoji list

The emoji lists for PHP were generated from the `simple-emoji-map` node package via those javascript commands:

```
console.log(JSON.stringify(Object.keys(emojiMap))); // all.json
console.log(JSON.stringify(Object.keys(emojiMap).filter(emoji => emojiMap[emoji][0].indexOf('flag_') === 0))); // flags.json
```

### Links

- [Packagist](https://packagist.org/packages/clarkwinkelmann/flarum-ext-status)

