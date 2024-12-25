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
    'systems/shinobi/templates/actor/parts/actor-combat.hbs',
    'systems/shinobi/templates/actor/parts/actor-bio.hbs',
    'systems/shinobi/templates/actor/parts/actor-combat-magic.hbs',
    'systems/shinobi/templates/actor/parts/actor-fatigue.hbs',
    'systems/shinobi/templates/actor/parts/actor-tiredness.hbs',
    'systems/shinobi/templates/actor/parts/actor-carryArmor.hbs',
    'systems/shinobi/templates/actor/parts/actor-armor.hbs',
    'systems/shinobi/templates/actor/parts/actor-health.hbs',
    'systems/shinobi/templates/actor/parts/actor-adv-disadv.hbs',
    'systems/shinobi/templates/actor/parts/actor-initiative.hbs',
    'systems/shinobi/templates/actor/parts/actor-movementSpeed.hbs',
    'systems/shinobi/templates/actor/parts/actor-regeneration.hbs',
    'systems/shinobi/templates/actor/parts/actor-rest.hbs',
    'systems/shinobi/templates/actor/parts/actor-maxRange.hbs',
    'systems/shinobi/templates/actor/parts/actor-martial-combat.hbs',
    'systems/shinobi/templates/actor/parts/npc/npc-health.hbs',
    'systems/shinobi/templates/actor/parts/npc/npc-combat.hbs',
    'systems/shinobi/templates/actor/parts/npc/npc-fatigue.hbs',
    'systems/shinobi/templates/actor/parts/npc/npc-tiredness.hbs',
    'systems/shinobi/templates/actor/parts/npc/npc-armor.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/warrior.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/ninja.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/shaolin.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/energyShaolin.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/samurai.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/warriorOmnyoji.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/omnyoji.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/henge.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/kannushi.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/ronin.hbs',
    'systems/shinobi/templates/actor/parts/classes/resources/ryoshi.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/tras-combat-styles.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/chakra.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/ki.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/invocation.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/canalization.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/divine-power.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/impregnate-tech.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/breaths-tech.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/hunt-tech.hbs',
    'systems/shinobi/templates/actor/parts/classes/tabs/blood-tech.hbs',
    // Item partials
    'systems/shinobi/templates/item/parts/item-weapons-attributes.hbs',
    'systems/shinobi/templates/item/parts/item-armors-attributes.hbs'
  ]);
};
