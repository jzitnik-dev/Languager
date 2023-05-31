class Languager {
    constructor({domElement, supportedLanguages, defaultLanguage}) {
        var userlang = localStorage.getItem("language") || ((navigator.language || navigator.userLanguage).split("-")[0])
        this.language = supportedLanguages.includes(userlang) ? userlang : defaultLanguage
        this.element = domElement
        this.supported = supportedLanguages
        this.defaultLanguage = defaultLanguage
    }
    changeLanguage(language) {
        this.language = this.supported.includes(language) ? language : this.defaultLanguage
        localStorage.setItem("language",this.language)
        this._noReloadLoad(this.strings)
    }
    _noReloadLoad() {
        var strings = this.strings
        var allElements = this.element.getElementsByTagName("*");
        allElements = Array.prototype.slice.call(allElements);
        allElements.forEach(element => {
            var text = element.getAttribute("defaultvalue")?.trim() || ""
            if (text[0] == "[" && text[text.length - 1] == "]") {
                text = text.slice(1, -1)
                if (strings[text] !== undefined && strings[text][this.language] !== undefined) {
                    element.textContent = strings[text][this.language]
                }
                else {
                    element.textContent = "["+text+"]"
                }
            }
        });
    }
    loadFromFile(path) {
        fetch(path)
        .then(res => res.json())
        .then(res => {
            this._loadFinalload(res)
        })
    }
    _loadFinalload(strings) {
        this.strings = strings
        var allElements = this.element.getElementsByTagName("*");
        allElements = Array.prototype.slice.call(allElements);
        allElements.forEach(element => {
            var text = element.textContent?.trim()
            if (text[0] == "[" && text[text.length - 1] == "]") {
                text = text.slice(1, -1)
                element.setAttribute("defaultvalue", element.textContent)
                if (strings[text] !== undefined && strings[text][this.language] !== undefined) {
                    element.textContent = strings[text][this.language]
                }
            }
        });
    }
    load = this._loadFinalload
}