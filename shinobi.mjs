import * as applications from "./module/applications/_module.mjs";

globalThis.shinobi = {
    applications
}

Hooks.once("init", function () {
    globalThis.shinobi = game.shinobi = Object.assign(game.system, globalThis.shinobi);
    console.log("shinobi | Initializing Shinobi - Tierras Ocultas System");

    DocumentSheetConfig.unregisterSheet(Item, "core", ItemSheet);
    DocumentSheetConfig.registerSheet(Item, "shinobi", applications.item.itemSheetShinobi, {
        makeDefault: true,
        label: "Shinobi.SheetClassItem"
    });

});
