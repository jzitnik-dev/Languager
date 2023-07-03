function openProject() {
    document.querySelector("#fileselect").click();
}
function loadBoilerplate() {
    var name = prompt("Enter name of the project: ")
    if (name) {
        const boilerplate = {
            languager: true,
            name: name,
            info: {
                languages: {
                    supported: ["en"],
                    default: "en"
                },
                liveUpdate: true
            },
            strings: {},
            titles: {}
        };
        projectf(boilerplate)
    }
}
var project;
function projectf(pro, file) {
    if (file) {
        var reader = new FileReader();
        reader.readAsText(pro, "UTF-8");
        reader.onload = function (evt) {
            try {
                var data = JSON.parse(evt.target.result)
                if (data.languager !== true) {
                    alert("This is not a valid project!")
                }
                else {
                    load(data)
                }
            }
            catch {
                alert("This is not a valid JSON file!")
            }
        }
        reader.onerror = function (evt) {
            alert("Error!")
        }
    }
    else {
        load(pro)
    }
}


// Strings
function removeKey(key, el) {
    delete project.strings[key]
    el.parentElement.removeChild(el)
}
function removeLanguage(lang, key, el) {
    delete project.strings[key][lang]
    el.remove()
}
function closeStringEditor() {
    document.querySelector(".stringsDiv").innerHTML = ""
    for (const [key, value] of Object.entries(project.strings)) {
        var element = document.createElement("div")
        var languages = []
        Object.entries(value).forEach(([k, v]) => {languages.push(k)});
        element.classList.add("string")
        element.innerHTML = `<div class="key">Key: <span class="k" onclick='openKey("${key}")'>${key}</span></div><div class="languages">Languages: ${languages.join(", ")}</div><box-icon onclick='removeKey(\"${key}\", this.parentElement)' style='position: absolute;right: 15px;' type='solid' name='trash-alt'></box-icon>`
        document.querySelector(".stringsDiv").appendChild(element)
    }
    
    document.querySelector(".editString").style.display = 'none'
    document.querySelector(".editString .languages").innerHTML = ""
}
function editLanguage(lang, key, el) {
    var newtext = prompt("Enter new text for this language: ", project.strings[key][lang])
    if (newtext) {
        project.strings[key][lang] = newtext
        el.innerHTML = `${lang} - ${newtext.length > 100 ? newtext.split("", 100).join("")+"..." : newtext} <div class="right"><box-icon onclick='editLanguage("${lang}", "${key}", this.parentElement.parentElement)' name="pencil" type="solid" ></box-icon><box-icon onclick='removeLanguage("${lang}", "${key}", this.parentElement.parentElement)' type="solid" name="trash-alt"></box-icon></div>`
    
    }
}
function addString() {
    var key = prompt("Enter a key: ")
    if (key) {
        project.strings[key] = {}
        openKey(key)
    }
}
function addLanguage(button) {
    var key = button.getAttribute("key")
    var language = prompt("Enter language name: ")
    if (language) {
        if (Object.keys(project.strings[key]).includes(language)) {
            alert("This language is already added!")
        }
        else if (project.info.languages.supported.includes(language)) {
            setTimeout(() => {
                var text = prompt("Enter a text for this language: ")
                if (text) {
                    project.strings[key][language] = text
                    document.querySelector(".editString .languages").innerHTML = ""
                    var languages = project.strings[key]
                    for (const [langkey, value] of Object.entries(languages)) {
                        var element = document.createElement("div")
                        element.classList.add("language")
                        const finalValue = value.length > 50 ? value.split("", 50).join("")+"..." : value
                        element.innerHTML = `${langkey} - ${finalValue} <div class="right"><box-icon onclick='editLanguage("${langkey}", "${key}", this.parentElement.parentElement)' name="pencil" type="solid" ></box-icon><box-icon onclick='removeLanguage("${langkey}", "${key}", this.parentElement.parentElement)' type="solid" name="trash-alt"></box-icon></div>`
                        document.querySelector(".editString .languages").appendChild(element)
                    
                    }
                }
            }, );
        }
        else {
            alert("This language is not supported in your project configuration!")
        }
    }
}
function openKey(key) {
    var languages = project.strings[key]
    for (const [langkey, value] of Object.entries(languages)) {
        var element = document.createElement("div")
        element.classList.add("language")
        const finalValue = value.length > 100 ? value.split("", 100).join("")+"..." : value
        element.innerHTML = `${langkey} - ${finalValue} <div class="right"><box-icon onclick='editLanguage("${langkey}", "${key}", this.parentElement.parentElement)' name="pencil" type="solid" ></box-icon><box-icon onclick='removeLanguage("${langkey}", "${key}", this.parentElement.parentElement)' type="solid" name="trash-alt"></box-icon></div>`
        document.querySelector(".editString .languages").appendChild(element)
    }
    document.querySelector(".editString").style.display = 'block'
    document.querySelector(".addBtn").setAttribute("key", key)
}





function removeKeyTitles(key, el) {
    delete project.titles[key]
    el.parentElement.removeChild(el)
}
function removeLanguageTitles(lang, key, el) {
    delete project.titles[key][lang]
    el.remove()
}
function closeTitleEditor() {
    document.querySelector(".titlesDiv").innerHTML = ""
    for (const [key, value] of Object.entries(project.titles)) {
        var element = document.createElement("div")
        var languages = []
        Object.entries(value).forEach(([k, v]) => {languages.push(k)});
        element.classList.add("string")
        element.innerHTML = `<div class="key">Key: <span class="k" onclick='openKeyTitles("${key}")'>${key}</span></div><div class="languages">Languages: ${languages.join(", ")}</div><box-icon onclick='removeKeyTitles(\"${key}\", this.parentElement)' style='position: absolute;right: 15px;' type='solid' name='trash-alt'></box-icon>`
        document.querySelector(".titlesDiv").appendChild(element)
    }
    
    document.querySelector(".editTitle").style.display = 'none'
    document.querySelector(".editTitle .languages").innerHTML = ""
}
function editLanguageTitles(lang, key, el) {
    var newtext = prompt("Enter new text for this language: ", project.titles[key][lang])
    if (newtext) {
        project.titles[key][lang] = newtext
        el.innerHTML = `${lang} - ${newtext.length > 100 ? newtext.split("", 100).join("")+"..." : newtext} <div class="right"><box-icon onclick='editLanguageTitles("${lang}", "${key}", this.parentElement.parentElement)' name="pencil" type="solid" ></box-icon><box-icon onclick='removeLanguageTitles("${lang}", "${key}", this.parentElement.parentElement)' type="solid" name="trash-alt"></box-icon></div>`
    
    }
}
function addStringTitles() {
    var key = prompt("Enter a key: ")
    if (key) {
        project.titles[key] = {}
        openKeyTitles(key)
    }
}
function addLanguageTitles(button) {
    var key = button.getAttribute("key")
    var language = prompt("Enter language name: ")
    if (language) {
        if (Object.keys(project.titles[key]).includes(language)) {
            alert("This language is already added!")
        }
        else if (project.info.languages.supported.includes(language)) {
            setTimeout(() => {
                var text = prompt("Enter a text for this language: ")
                if (text) {
                    project.titles[key][language] = text
                    document.querySelector(".editTitle .languages").innerHTML = ""
                    var languages = project.titles[key]
                    for (const [langkey, value] of Object.entries(languages)) {
                        var element = document.createElement("div")
                        element.classList.add("language")
                        const finalValue = value.length > 50 ? value.split("", 50).join("")+"..." : value
                        element.innerHTML = `${langkey} - ${finalValue} <div class="right"><box-icon onclick='editLanguageTitles("${langkey}", "${key}", this.parentElement.parentElement)' name="pencil" type="solid" ></box-icon><box-icon onclick='removeLanguageTitles("${langkey}", "${key}", this.parentElement.parentElement)' type="solid" name="trash-alt"></box-icon></div>`
                        document.querySelector(".editTitle .languages").appendChild(element)
                    
                    }
                }
            }, );
        }
        else {
            alert("This language is not supported in your project configuration!")
        }
    }
}
function openKeyTitles(key) {
    var languages = project.titles[key]
    for (const [langkey, value] of Object.entries(languages)) {
        var element = document.createElement("div")
        element.classList.add("language")
        const finalValue = value.length > 100 ? value.split("", 100).join("")+"..." : value
        element.innerHTML = `${langkey} - ${finalValue} <div class="right"><box-icon onclick='editLanguageTitles("${langkey}", "${key}", this.parentElement.parentElement)' name="pencil" type="solid" ></box-icon><box-icon onclick='removeLanguageTitles("${langkey}", "${key}", this.parentElement.parentElement)' type="solid" name="trash-alt"></box-icon></div>`
        document.querySelector(".editTitle .languages").appendChild(element)
    }
    document.querySelector(".editTitle").style.display = 'block'
    document.querySelector(".addBtnTitle").setAttribute("key", key)
}



function load(data) {
    project = data;
    if (Object.keys(data.strings).length > 0) {
        document.querySelector(".stringsDiv").innerHTML = ""
    }
    for (const [key, value] of Object.entries(data.strings)) {
        var element = document.createElement("div")
        var languages = []
        Object.entries(value).forEach(([k, v]) => {languages.push(k)});
        element.classList.add("string")
        element.innerHTML = `<div class="key">Key: <span class="k" onclick='openKey("${key}")'>${key}</span></div><div class="languages">Languages: ${languages.join(", ")}</div><box-icon onclick='removeKey(\"${key}\", this.parentElement)' style='position: absolute;right: 15px;' type='solid' name='trash-alt'></box-icon>`
        document.querySelector(".stringsDiv").appendChild(element)
    }
    if (Object.keys(data.titles).length > 0) {
        document.querySelector(".titlesDiv").innerHTML = ""
    }
    for (const [key, value] of Object.entries(data.titles)) {
        var element = document.createElement("div")
        var languages = []
        Object.entries(value).forEach(([k, v]) => {languages.push(k)});
        element.classList.add("string")
        element.innerHTML = `<div class="key">Key: <span class="k" onclick='openKeyTitles("${key}")'>${key}</span></div><div class="languages">Languages: ${languages.join(", ")}</div><box-icon onclick='removeKeyTitles(\"${key}\", this.parentElement)' style='position: absolute;right: 15px;' type='solid' name='trash-alt'></box-icon>`
        document.querySelector(".titlesDiv").appendChild(element)
    }
    document.querySelector(".project header .name").textContent = "Editing: "+data.name
    document.querySelector(".open-project").style.display = "none"
    document.querySelector(".project").style.display = "block"
}
function searchStrings() {
    var allElements = document.querySelectorAll(".stringsDiv .string")
    setTimeout(() => {
        var search = document.querySelector(".search").value
        allElements.forEach(element => {
            if (search === "") {
                element.style.display = "flex"
            }
            else if (element.querySelector(".k").textContent.indexOf(search) !== -1) {
                element.style.display = "flex"
            }
            else {
                element.style.display = "none"
            }
        })
    });
}

function openmenu() {
    document.querySelector("menu").classList.toggle("opened")
}
function openConfig() {
    document.querySelector("#supportedlanguagesinput").value = project.info.languages.supported.join(", ")
    document.querySelector("#useliveupdate").setAttribute("checked", project.info.liveUpdate)
    document.querySelector("#defaultlanguagetext").textContent = project.info.languages.default
    document.querySelector(".config").style.display = "block"
    openmenu()
}
function changeLiveUpdate(el) {
    setTimeout(() => {
        project.info.liveUpdate = el.checked
    }, 200);
}
function changeDefaultLanguage() {
    var newlanguage = prompt("Enter a default language:", project.info.languages.default)
    if (newlanguage) {
        if (project.info.languages.supported.includes(newlanguage)) {
            project.info.languages.default = newlanguage
            document.querySelector("#defaultlanguagetext").textContent = newlanguage
        }
        else {
            alert("This language is not supported!")
        }
    }
}
function changeSupportedLanguages(value) {
    var noSpaces = value.replaceAll(" ","")
    var final = noSpaces.indexOf(",") !== -1 ? noSpaces.split(",") : [noSpaces]
    if (final[0] == "") {
        alert("You need to have at least one supported language!")
    }
    else {
        project.info.languages.supported = final
        alert("Supported languages updated successfully!")
    }
}
function closeConfig() {
    document.querySelector(".config").style.display = "none"
}
function exit() {
    openmenu()
    ans = confirm("Are you sure you want to exit?")
    if (ans) {
        project = undefined;
        document.querySelector(".project").style.display = "none"
        document.querySelector(".open-project").style.display = "flex"
    }
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
function saveProject() {
    var text = JSON.stringify(project)
    download("strings.json", text)
}