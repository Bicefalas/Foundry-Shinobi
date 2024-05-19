import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ShinobiItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['shinobi', 'sheet', 'item'],
      width: 700,
      height: 600,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    const path = 'systems/shinobi/templates/item';
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.hbs`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.hbs`.
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {

    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.data;

    // Retrieve the roll data for TinyMCE editors.
    context.rollData = this.item.getRollData();

    // Add the item's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    context.flags = itemData.flags;


    // Preparing Item Data
    this._prepareItemData(context);


    // Prepare active effects for easier access
    context.effects = prepareActiveEffectCategories(this.item.effects);

    return context;
  }

  /**
  * Organize and classify Items for Character sheets.
  *
  * @param {Object} itemData The actor to prepare.
  *
  * @return {undefined}
  */

  _prepareItemData(context) {
    const itemData = context.data;

    // Handle rarity scores.
    if (itemData.type != 'technique') {
      for (let [k, v] of Object.entries(context.system.rarities)) {
        v.label = game.i18n.localize(CONFIG.SHINOBI.rarities[k]) ?? k;
      }
    }
    if (itemData.type == 'weapon') {
      for (let [k, v] of Object.entries(context.system.types)) {
        v.label = game.i18n.localize(CONFIG.SHINOBI.types[k]) ?? k;
      }
    }
    if (itemData.type == 'technique') {
      for (let [k, v] of Object.entries(context.system.classes)) {
        v.label = game.i18n.localize(CONFIG.SHINOBI.classes[k]) ?? k;
      }
    }
  }



  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.

    // Active Effect management
    html.on('click', '.effect-control', (ev) =>
      onManageActiveEffect(ev, this.item)
    );
  }
}
