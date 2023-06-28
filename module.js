class Languager {
    #useLiveUpdate
    constructor({element, pageTitle}) {
        this.userlang = localStorage.getItem("language") || ((navigator.language || navigator.userLanguage).split("-")[0])
        this.element = element
        this.title = pageTitle
        console.log("This website is using Languager. Easy to use tool for making multilingual websites!")
    }
    changeLanguage(language) {
        this.language = this.supported.includes(language) ? language : this.defaultLanguage
        localStorage.setItem("language",this.language)
        if (this.#useLiveUpdate) {
            this.#liveUpdate()
        }
        else {
            window.location.reload()
        }
    }
    #liveUpdate() {
        var strings = this.strings
        var allElements = this.element.getElementsByTagName("*");
        allElements = Array.prototype.slice.call(allElements);
        allElements.forEach(element => {
            var text = element.getAttribute("defaultvalue")?.trim() || ""
            if (text[0] == "[" && text[text.length - 1] == "]") {
                text = text.slice(1, -1)
                if (strings[text] !== undefined && strings[text][this.language] !== undefined) {
                    element.innerHTML = strings[text][this.language]
                }
                else {
                    element.innerHTML = "["+text+"]"
                }
            }
        });
        this.titles[this.title] ? (this.titles[this.title][this.language] ? document.title = this.titles[this.title][this.language] : null) : null
    }
    load(path) {
        fetch(path)
        .then(res => res.json())
        .then(res => {
            if (res.languager !== true) throw new Error("Selected file is not correct json file.")
            console.log("Loading strings from project named: "+res.name)
            this._loadFinalload(res)
        })
    }
    _loadFinalload(data) {
        this.strings = data.strings
        this.supported = data.info.languages.supported
        this.defaultLanguage = data.info.languages.default
        this.language = this.supported.includes(this.userlang) ? this.userlang : this.defaultLanguage
        this.#useLiveUpdate = data.info.liveUpdate
        this.titles = data.titles
        this.titles[this.title] ? (this.titles[this.title][this.language] ? document.title = this.titles[this.title][this.language] : null) : null

        var allElements = this.element.getElementsByTagName("*");
        allElements = Array.prototype.slice.call(allElements);

        allElements.forEach(element => {
            var text = element.innerHTML?.trim()
            if (text[0] == "[" && text[text.length - 1] == "]") {
                text = text.slice(1, -1)
                this.#useLiveUpdate ? element.setAttribute("defaultvalue", element.innerHTML) : null
                if (this.strings[text] !== undefined && this.strings[text][this.language] !== undefined) {
                    element.innerHTML = this.strings[text][this.language]
                }
            }
        });
    }
}