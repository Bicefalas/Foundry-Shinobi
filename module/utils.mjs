/* -------------------------------------------- */
/*  Config Pre-Localization                     */
/* -------------------------------------------- */

const _preLocalizationRegistrations = {};

export function preLocalize(configKeyPath, { key, keys = [], sort = false } = {}) {
    if (key) keys.unshift(key);
    _preLocalizationRegistrations[configKeyPath] = { keys, sort };
};

export function performPreLocalization(config) {
    for (const [keyPath, settings] of Object.entries(_preLocalizationRegistrations)) {
        const target = foundry.utils.getProperty(config, keyPath);
        if (!target) continue;
        _localizeObject(target, settings.keys);
        if (settings.sort) foundry.utils.setProperty(config, keyPath, sortObjectEntries(target, settings.keys[0]));
    };

    CONFIG.statusEffects.forEach(s => s.name = game.i18n.localize(s.name));
    CONFIG.statusEffects.sort((lhs, rhs) =>
        lhs.id === "dead" ? -1 : rhs.id === "dead" ? 1 : lhs.name.localeCompare(rhs.name, game.i18n.lang)
    );
};

function _localizeObject(obj, keys) {
    for (const [k, v] of Object.entries(obj)) {
        const type = typeof v;
        if (type === "string") {
            obj[k] = game.i18n.localize(v);
            continue;
        }

        if (type !== "object") {
            console.error(new Error(
                `Pre-localized configuration values must be a string or object, ${type} found for "${k}" instead.`
            ));
            continue;
        }
        if (!keys?.length) {
            console.error(new Error(
                "Localization keys must be provided for pre-localizing when target is an object."
            ));
            continue;
        }

        for (const key of keys) {
            const value = foundry.utils.getProperty(v, key);
            if (!value) continue;
            foundry.utils.setProperty(v, key, game.i18n.localize(value));
        }
    }
}