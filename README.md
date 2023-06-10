# Languager

Languager is ease to use JavaScript program that will make ease to create websites with multiple languages

## Installation

Just put this code inside `<head>`

```html
<script src='https://raw.githubusercontent.com/JZITNIK-github/Languager/master/module.js'></script>
```

## Usage

First you need to construct a class

```javascript
var languager = new Languager({
    domElement: document.body,
    supportedLanguages: ["en", "cs"],
    defaultLanguage: "en"
})
```

You need to set dom element witch will be your main element where is your website located. If you have #root div you can put that in.

Now you just run this command to load strings from json file.

```javascript
languager.loadFromFile("strings.json")
```

Json file should look like this:

```json
{
    "titleMyWebsite": {
        "en": "This is my website",
        "cs": "Toto je moje webová stránka"
    }
}
```

Or you can load strings from your script like this:

```javascript
languager.load({
    "titleMyWebsite": {
        "en": "This is my website",
        "cs": "Toto je moje webová stránka"
    }
})
```

## Language change button

If you want to add language change button you just put this button inside your html:

```html
<button onclick="languager.changeLanguage('en')">English</button>
```
