// Import document classes.
import { ShinobiActor } from './documents/actor.mjs';
import { ShinobiItem } from './documents/item.mjs';
// Import sheet classes.
import { ShinobiActorSheet } from './sheets/actor-sheet.mjs';
import { ShinobiItemSheet } from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
import { SHINOBI } from './helpers/config.mjs';
import { chatButton } from "./helpers/chat-button.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.shinobi = {
    ShinobiActor,
    ShinobiItem,
    rollItemMacro,
  };

  // Add custom constants for configuration.
  CONFIG.SHINOBI = SHINOBI;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d10 + @initiative.value',
    decimals: 0,
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = ShinobiActor;
  CONFIG.Item.documentClass = ShinobiItem;

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('shinobi', ShinobiActorSheet, {
    makeDefault: true,
    label: 'SHINOBI.SheetLabels.Actor',
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('shinobi', ShinobiItemSheet, {
    makeDefault: true,
    label: 'SHINOBI.SheetLabels.Item',
  });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

// This helper allows to use if cases with two parameters:
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

Handlebars.registerHelper('Math', function (v1, operator, v2, options) {
  switch (operator) {
    case '+':
      return Math.trunc((Number(v1) + Number(v2)))
    case '-':
      return Math.trunc((Number(v1) - Number(v2)))
    case '*':
      return Math.trunc((Number(v1) * Number(v2)))
    case '/':
      return Math.trunc((Number(v1) / Number(v2)))
    default:
      return "Error";
  }
});

Handlebars.registerHelper('openDetails', function (id) {
  var openDetails = JSON.parse(localStorage.getItem("openDetails"))
  if (localStorage.getItem("openDetails") != null && id in openDetails)
    return "open"
});





/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));


  // Chat message button
  Hooks.on("renderChatMessage", (chatMessage, html, data) => {
    html.find(".buttonclick").click(function () {
      const button = $(this);
      const buttonType = button.data("buttontype");
      chatButton(chatMessage, buttonType);
    });
  });
  // Add listener to past message
  $(".chat-message .buttonclick").each((index, element) => {
    const messageId = $(element).closest(".message").attr("data-message-id");
    $(element).on("click", (event) => {
      const chatMessage = game.messages.get(messageId);
      const button = $(event.currentTarget);
      const buttonType = button.data("buttontype");
      chatButton(chatMessage, buttonType);
    });
  });


});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.shinobi.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'shinobi.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists,rowise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}
