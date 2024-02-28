import { shinobi } from "./module/config.mjs";
import * as applications from "./module/applications/_module.mjs";
import * as utils from "./module/utils.mjs";

globalThis.shinobi = {
    applications
}

Hooks.once("init", function () {
    globalThis.shinobi = game.shinobi = Object.assign(game.system, globalThis.shinobi);
    console.log("shinobi | Initializing Shinobi - Tierras Ocultas System");

    CONFIG.shinobi = shinobi;

    DocumentSheetConfig.unregisterSheet(Item, "core", ItemSheet);
    DocumentSheetConfig.registerSheet(Item, "shinobi", applications.item.itemSheetShinobi, {
        makeDefault: true,
        label: "Shinobi.SheetClassItem"
    });

});

Hooks.once("i18nInit", () => utils.performPreLocalization(CONFIG.shinobi));