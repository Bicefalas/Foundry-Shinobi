import { prepareActiveEffectCategories } from '../helpers/effects.mjs';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;

const TEMPLATE_PATH = 'systems/shinobi/templates/item';

/** Item types that have their own template (item-<type>-sheet.hbs). */
const ITEM_TYPES = ['object', 'weapon', 'armor', 'technique', 'chakra_tech', 'arcana_tech'];

/**
 * Item sheet for the Shinobi system (ApplicationV2).
 * @extends {ItemSheetV2}
 */
export class ShinobiItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['shinobi', 'sheet', 'item', 'themed', 'theme-light'],
    position: { width: 700, height: 600 },
    window: { resizable: true },
    form: { submitOnChange: true },
  };

  /**
   * One part per item type plus a generic fallback; _configureRenderOptions picks one.
   * Declaring them all here lets Foundry preload every template.
   */
  static PARTS = {
    generic: { template: `${TEMPLATE_PATH}/item-sheet.hbs`, scrollable: ['', '.sheet-body'] },
    ...Object.fromEntries(ITEM_TYPES.map((type) => [type, {
      template: `${TEMPLATE_PATH}/item-${type}-sheet.hbs`,
      scrollable: ['', '.sheet-body'],
    }])),
  };

  /** Only weapons and armors use tabs; other templates simply ignore this. */
  static TABS = {
    primary: {
      tabs: [{ id: 'attributes' }, { id: 'descriptions' }],
      initial: 'attributes',
    },
  };

  /* -------------------------------------------- */

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    options.parts = [ITEM_TYPES.includes(this.item.type) ? this.item.type : 'generic'];
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Work on a prepared copy so the labels added below never touch the real document data.
    const itemData = this.item.toObject(false);

    Object.assign(context, {
      item: this.item,
      system: itemData.system,
      flags: itemData.flags,
      editable: this.isEditable,
      owner: this.item.isOwner,
      config: CONFIG.SHINOBI,
      // Roll data for the ProseMirror editors.
      rollData: this.item.getRollData(),
      effects: prepareActiveEffectCategories(this.item.effects),
      tabs: this._prepareTabs('primary'),
    });

    this._prepareItemData(context, itemData.type);
    return context;
  }

  /**
   * Add localized labels to the selectable values of each item type.
   * @param {object} context
   * @param {string} type     The item type
   */
  _prepareItemData(context, type) {
    const groupsByType = {
      object: ['rarities'],
      weapon: ['rarities', 'types'],
      armor: ['rarities'],
      technique: ['classes'],
      chakra_tech: ['trees'],
      arcana_tech: ['arcanaTypes'],
    };
    for (const group of groupsByType[type] ?? []) {
      // Build labels for selectOptions without mutating source values.
      context.system[group] = Object.fromEntries(
        Object.keys(context.system[group] ?? CONFIG.SHINOBI[group] ?? {}).map((key) => [
          key,
          game.i18n.localize(CONFIG.SHINOBI[group]?.[key] ?? key),
        ])
      );
    }
  }
}
