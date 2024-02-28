import { preLocalize } from "./utils.mjs";
export const shinobi = {};

shinobi.attributes = {
    str: {
        label: "shinobi.AttributeStr",
        abbreviation: "shinobi.AttributeStrAbbr",
        fullkey: "strength"
    }
};

shinobi.weapon = {
    damage: {
        label: "shinobi.weapon.damage",
        abbreviation: "shinobi.weapon.damageAbbr",
        fullkey: "WeaponDamage"
    },

    initiative: {
        label: "shinobi.weapon.initiative",
        abbreviation: "shinobi.weapon.initiativeAbbr",
        fullkey: "InitiativeWeapon"
    },

    requiredStrengh: {
        label: "shinobi.weapon.requiredStrengh",
        abbreviation: "shinobi.weapon.requiredStrenghAbbr",
        fullkey: "RequiredStrengh"
    },

    size: {
        label: "shinobi.weapon.size",
        abbreviation: "shinobi.weapon.sizeAbbr",
        fullkey: "Size"
    },

    reload: {
        label: "shinobi.weapon.reload",
        abbreviation: "shinobi.weapon.reloadAbbr",
        fullkey: "Reload"
    },

    range: {
        label: "shinobi.weapon.range",
        abbreviation: "shinobi.weapon.rangeAbbr",
        fullkey: "Range"
    },

    special: {
        label: "shinobi.weapon.special",
        abbreviation: "shinobi.weapon.specialAbbr",
        fullkey: "Special"
    }

};

shinobi.weaponTypes = {
    simpleM: "shinobi.weaponTypes.simpleM",
    simpleR: "shinobi.weaponTypes.simpleR",
    martialM: "shinobi.weaponTypes.martialM",
    martialR: "shinobi.weaponTypes.martialR",
    shield: "shinobi.weaponTypes.shield"
};

preLocalize("weaponTypes");