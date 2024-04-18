/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/shinobi/templates/actor/parts/actor-features.hbs',
    'systems/shinobi/templates/actor/parts/actor-items.hbs',
    'systems/shinobi/templates/actor/parts/actor-spells.hbs',
    'systems/shinobi/templates/actor/parts/actor-effects.hbs',
    'systems/shinobi/templates/actor/parts/actor-combat.hbs',
    'systems/shinobi/templates/actor/parts/actor-bio.hbs',
    'systems/shinobi/templates/actor/parts/actor-combat-magic.hbs',
    'systems/shinobi/templates/actor/parts/actor-fatigue-tiredness.hbs',
    'systems/shinobi/templates/actor/parts/actor-armor.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/warrior.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/ninja.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/energyShaolin.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/samurai.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/warriorOmnyoji.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/omnyoji.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/tras-combat-styles.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/chakra.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/invocation.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/canalization.hbs',
    // Item partials
    'systems/shinobi/templates/item/parts/item-effects.hbs',
  ]);
};
