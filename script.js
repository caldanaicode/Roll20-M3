/*
	Edit this dictionary to add new macros and associated maps.
*/
var macros = {
    "MacroName1": [ "World Map", "Town Map1" ],
    "MacroName2": [ "Town Map2" ]
};


/*
	Finds and updates a macro by name, changing the visibleto property to that given.
*/
function updateMacro(name, visibleto) {
    var macro = findObjs({ type: 'macro', name: name })[0];
    if(macro) {
        if(macro.get("visibleto") !== visibleto) {
            macro.set("visibleto", visibleto);
        }
    }
    else {
        sendChat('API', `/w gm Macro '${name}' not found...`, null, {noarchive: true});
    }
}

on("ready",function(){
    on("change:campaign:playerpageid", function(){
        var pageName = getObj("page", Campaign().get("playerpageid")).get("name");
        for(m in macros) {
            updateMacro(m, macros[m].includes(pageName) ? 'all' : '');
        }
    });
});
