import json
print("Welcome in Languager json editor\n")
def main():
    print("1 Create new project")
    print("2 Open existing project")
    print("3 Exit")
    a = input("Your choice: ").strip()
    if a == "1":
        createNewProject()
    elif a == "3":
        exit()
    elif a == "2":
        openProject()
    else:
        print("\nInvalid choice")
        main()

def openProject():
    path = input("Select path of json file: ")
    with open(path, "r",encoding='utf8') as f:
        content = f.read()
    con = json.loads(content)
    if (con.get("languager", False) == True):
        editingProject(con)
    else:
        print("\nSelected file is not Languager project!")
        main()

def createNewProject():
    name = input("Select project name: ")
    print("\nCreating new project..")
    js = {
        "languager": True,
        "name": name,
        "info": {
            "languages": {
                "supported": ["en"],
                "default": "en"
            },
            "liveUpdate": True
        },
        "strings": {},
        "titles": {}
    }
    editingProject(js)

def save(js):
    final = json.dumps(js, ensure_ascii=False)
    path = input("Select path where should be file saved (include filename): ")
    with open(path+".json", "w", encoding='utf8') as f:
        f.write(final)
    print("Project was saved!")
def editingProject(js):
    def mainMenu(js):
        print("1. Edit configuration of project")
        print("2. Edit strings")
        print("3. Edit titles")
        print("4. Save project")
        print("5. Exit without saving")
        ans = input("Your choice: ").strip()
        if ans == "1":
            projectConfiguration(js)
        elif ans == "2":
            editStrings(js)
        elif ans == "3":
            editTitles(js)
        elif ans == "4":
            save(js)
        elif ans == "5":
            exit()
        else:
            print("\nInvalid choice!")
            mainMenu(js)

    def projectConfiguration(js):
        def editLiveUpdate(js):
            liveUpdate = js["info"]["liveUpdate"]
            print("\n\nCurrent setting: "+("'do not use live update'" if liveUpdate == False else "'Use live update'"))
            print("1. "+("Disable"  if liveUpdate == True else "Enable")+" live update")
            print("2. Back")
            ans = input("Your choice: ").strip()
            if ans == "1":
                js["info"]["liveUpdate"] = not liveUpdate
                print("Live update setting changed")
                projectConfiguration(js)
            elif ans == "2":
                projectConfiguration(js)
            else:
                print("Invalid choice!")
                editLiveUpdate(js)

        def editLanguages(js):
            def editDefaultLanguage(js):
                print("\n\nCurrent default language: "+js["info"]["languages"]["default"])
                print("1. Change default language")
                print("2. Back")
                ans = input("Your choice: ").strip()
                if ans == "1":
                    print("\n")
                    defaultLanguage = input("Set default language: ").strip()
                    if defaultLanguage in js["info"]["languages"]["supported"]:
                        js["info"]["languages"]["default"] = defaultLanguage
                        print("Default language was changed.")
                        editLanguages(js)
                    else:
                        print("This language is not supported!")
                        editLanguages(js)
                elif ans == "2":
                    editLanguages(js)
                else:
                    print("Invalid choice!")
                    editDefaultLanguage(js)
            def editSupportedLanguages(js):
                print("Supported languages: "+", ".join(js["info"]["languages"]["supported"]))
                print("1. Add language")
                print("2. Remove language")
                print("3. Back")
                ans = input("Your choice: ").strip()
                if ans == "1":
                    name = input("Enter language: ")
                    if (name in js["info"]["languages"]["supported"]):
                        print("This language is already supported!")
                        editSupportedLanguages(js)
                    else:
                        js["info"]["languages"]["supported"].append(name)
                        print("Language was added!")
                        editSupportedLanguages(js)
                elif ans == "2":
                    name = input("Enter language: ")
                    if (name in js["info"]["languages"]["supported"]):
                        js["info"]["languages"]["supported"].remove(name)
                        editSupportedLanguages(js)
                    else:
                        print("This language is not supported!")
                        editSupportedLanguages(js)
                elif ans == "3":
                    editLanguages(js)
                else:
                    print("Invalid choice!")
                    editSupportedLanguages(js)
            print("1. Edit supported languages")
            print("2. Edit default language")
            print("3. Back")
            ans = input("Your choice: ").strip()
            if ans == "1":
                editSupportedLanguages(js)
            elif ans == "2":
                editDefaultLanguage(js)
            elif ans == "3":
                print("\n\n")
                projectConfiguration(js)
            else:
                print("Invalid choice!")
                editLanguages(js)

        print("\n\nProject configuration")
        print("1. Edit languages")
        print("2. Edit liveUpdate")
        print("3. Back")
        ans = input("Your choice: ").strip()
        if ans == "1":
            editLanguages(js)
        elif ans == "2":
            editLiveUpdate(js)
        elif ans == "3":
            print("\n\n")
            mainMenu(js)
        else:
            print("Invalid choice!")
            projectConfiguration(js)
    
    def editStrings(js):
        def editString(js, key):
            print("Currently selected string: "+key)
            print("Languages: "+(",".join([lang for lang in js["strings"][key]])))
            print("1. Add language to string")
            print("2. Remove language to string")
            print("3. Edit language")
            print("4. Back")
            ans = input("Your choice: ").strip()
            if ans == "1":
                lang = input("Enter language: ")
                if (lang in js["strings"][key]):
                    print("This language already exist!\n")
                    editString(js, key)
                else:
                    if lang in js["info"]["languages"]["supported"]:
                        value = input("Enter text: ")
                        js["strings"][key][lang] = value
                        print("Language was added!\n")
                        editString(js, key)
                    else:
                        print("This language is not supported in project configuration!\n")
                        editString(js, key)
            elif ans == "2":
                lang = input("Enter language: ")
                if (lang in js["strings"][key]):
                    js["strings"][key].pop(lang)
                    print("Language was removed!\n")
                    editString(js, key)
                else:
                    print("This languages does not exist\n")
                    editString(js, key)
            elif ans == "3":
                lang = input("Enter language: ")
                if (lang in js["strings"][key]):
                    value = js["strings"][key][lang]
                    print("Current text: "+value)
                    newval = input("Enter new text: ")
                    js["strings"][key][lang] = newval
                    print("Text was changed!\n")
                    editString(js, key)
                else:
                    print("This languages does not exist\n")
                    editString(js, key)
            elif ans == "4":
                editStrings(js)
            else:
                print("\nInvalid choice!")
                editString(js, key)
        print("\n1. Show strings")
        print("2. Edit string")
        print("3. Add string")
        print("4. Remove string")
        print("5. Back")
        ans = input("Your choice: ").strip()
        if ans == "1":
            print("\n\nShowing strings")
            for i in js["strings"]:
                print("Key: "+i+" Languages: "+(", ".join([lang for lang in js["strings"][i]])))
            editStrings(js)
        elif ans == "2":
            key = input("Enter key: ")
            if key in js["strings"]:
                editString(js, key)
            else:
                print("This key does not exist! ")
                editStrings(js)
        elif ans == "3":
            key = input("Enter key: ")
            if key in js["strings"]:
                print("This key already exist!")
                editStrings(js)
            else:
                js["strings"][key] = {}
                print("String was added")
                editStrings(js)
        elif ans == "4":
            key = input("Enter key: ")
            if key in js["strings"]:
                js["strings"].pop(key)
                print("String "+key+" was removed!")
                editStrings(js)
            else:
                print("This key does not exist! ")
                editStrings(js)
        elif ans == "5":
            mainMenu(js)
        else:
            print("\nInvalid choice!")
            editStrings(js)
    
    def editTitles(js):
        def editTitle(js, key):
            print("Currently selected title: "+key)
            print("Languages: "+(",".join([lang for lang in js["titles"][key]])))
            print("1. Add language to title")
            print("2. Remove language to title")
            print("3. Edit language")
            print("4. Back")
            ans = input("Your choice: ").strip()
            if ans == "1":
                lang = input("Enter language: ")
                if (lang in js["titles"][key]):
                    print("This language already exist!\n")
                    editTitle(js, key)
                else:
                    if lang in js["info"]["languages"]["supported"]:
                        value = input("Enter text: ")
                        js["titles"][key][lang] = value
                        print("Language was added!\n")
                        editTitle(js, key)
                    else:
                        print("This language is not supported in project configuration!\n")
                        editTitle(js, key)
            elif ans == "2":
                lang = input("Enter language: ")
                if (lang in js["titles"][key]):
                    js["titles"][key].pop(lang)
                    print("Language was removed!\n")
                    editTitle(js, key)
                else:
                    print("This languages does not exist\n")
                    editTitle(js, key)
            elif ans == "3":
                lang = input("Enter language: ")
                if (lang in js["titles"][key]):
                    value = js["titles"][key][lang]
                    print("Current text: "+value)
                    newval = input("Enter new text: ")
                    js["titles"][key][lang] = newval
                    print("Text was changed!\n")
                    editTitle(js, key)
                else:
                    print("This languages does not exist\n")
                    editTitle(js, key)
            elif ans == "4":
                editTitles(js)
            else:
                print("\nInvalid choice!")
                editTitle(js, key)
        print("\n1. Show titles")
        print("2. Edit title")
        print("3. Add title")
        print("4. Remove title")
        print("5. Back")
        ans = input("Your choice: ").strip()
        if ans == "1":
            print("\n\nShowing titles")
            for i in js["titles"]:
                print("Key: "+i+" Languages: "+(", ".join([lang for lang in js["titles"][i]])))
            editTitles(js)
        elif ans == "2":
            key = input("Enter key: ")
            if key in js["titles"]:
                editTitle(js, key)
            else:
                print("This key does not exist! ")
                editTitles(js)
        elif ans == "3":
            key = input("Enter key: ")
            if key in js["titles"]:
                print("This key already exist!")
                editTitles(js)
            else:
                js["titles"][key] = {}
                print("Title was added")
                editTitles(js)
        elif ans == "4":
            key = input("Enter key: ")
            if key in js["titles"]:
                js["titles"].pop(key)
                print("Title "+key+" was removed!")
                editTitles(js)
            else:
                print("This key does not exist! ")
                editTitles(js)
        elif ans == "5":
            mainMenu(js)
        else:
            print("\nInvalid choice!")
            editTitles(js)
    mainMenu(js)
        



main()