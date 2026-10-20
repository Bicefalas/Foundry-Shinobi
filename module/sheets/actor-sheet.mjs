import { prepareActiveEffectCategories } from '../helpers/effects.mjs';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

/** Tabs every shinobi has. */
const COMMON_TABS = ['features', 'description', 'adv-disadv', 'martial-combat', 'items'];

/** Tabs exclusive to a class, keyed by the value of system.class.value. */
const CLASS_TABS = {
  warrior: ['tras-combat-styles'],
  ninja: ['chakra'],
  mixedNinja: ['chakra'],
  shaolin: ['ki'],
  energyShaolin: ['ki'],
  samurai: ['invocation'],
  warriorOmnyoji: ['canalization'],
  omnyoji: ['canalization'],
  henge: ['impregnate-tech'],
  kannushi: ['divine-power'],
  ronin: ['breaths-tech'],
  ryoshi: ['hunt-tech', 'blood-tech'],
};

const ALL_TABS = [...new Set([...COMMON_TABS, ...Object.values(CLASS_TABS).flat()])];

/**
 * Actor sheet for the Shinobi system (ApplicationV2).
 * @extends {ActorSheetV2}
 */
export class ShinobiActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['shinobi', 'sheet', 'actor', 'themed', 'theme-light'],
    position: { width: 1000, height: 750 },
    window: { resizable: true },
    form: { submitOnChange: true },
    actions: {
      roll: ShinobiActorSheet.#onRoll,
      createItem: ShinobiActorSheet.#onCreateItem,
      editItem: ShinobiActorSheet.#onEditItem,
      deleteItem: ShinobiActorSheet.#onDeleteItem,
      halfRest: ShinobiActorSheet.#onHalfRest,
      totalRest: ShinobiActorSheet.#onTotalRest,
    },
  };

  /** One part per actor type; _configureRenderOptions picks the right one. */
  static PARTS = {
    shinobi: {
      template: 'systems/shinobi/templates/actor/actor-shinobi-sheet.hbs',
      scrollable: ['', '.sheet-body'],
    },
    npc: {
      template: 'systems/shinobi/templates/actor/actor-npc-sheet.hbs',
      scrollable: ['', '.sheet-body'],
    },
  };

  /** @override */
  static TABS = {
    primary: {
      tabs: ALL_TABS.map((id) => ({ id })),
      initial: 'features',
    },
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    options.parts = [this.document.type in this.constructor.PARTS ? this.document.type : 'shinobi'];
  }

  /** @override */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    // Work on a prepared copy so the labels added below never touch the real document data.
    const actorData = this.actor.toObject(false);

    Object.assign(context, {
      actor: this.actor,
      system: actorData.system,
      flags: actorData.flags,
      items: actorData.items.sort((a, b) => (a.sort || 0) - (b.sort || 0)),
      editable: this.isEditable,
      owner: this.actor.isOwner,
      config: CONFIG.SHINOBI,
      // Roll data for the ProseMirror editors.
      rollData: this.actor.getRollData(),
      // Active effects of the actor and of its items.
      effects: prepareActiveEffectCategories(this.actor.allApplicableEffects()),
    });

    if (this.actor.type === 'shinobi') {
      this._prepareCharacterData(context);
      this._prepareItems(context);
      context.tabs = this.#prepareSheetTabs(context.system.class?.value);
    }
    if (this.actor.type === 'npc') {
      this._prepareNPCData(context);
    }

    return context;
  }

  /**
   * Prepare the primary tab group, falling back to "features" when the active tab
   * belongs to a class the character no longer has.
   * @param {string} classValue
   */
  #prepareSheetTabs(classValue) {
    const available = new Set([...COMMON_TABS, ...(CLASS_TABS[classValue] ?? [])]);
    if (!available.has(this.tabGroups.primary)) this.tabGroups.primary = 'features';
    return this._prepareTabs('primary');
  }

  /** @override */
  async _onFirstRender(context, options) {
    await super._onFirstRender(context, options);
    // Remember which <details> are open. The "toggle" event does not bubble, so listen
    // in the capture phase on the application root (it persists across re-renders).
    this.element.addEventListener('toggle', (event) => this.#onToggleDetails(event), true);
  }

  /** @override */
  async _onRender(context, options) {
    await super._onRender(context, options);
    if (this.actor.type === 'shinobi') this._classPoints(this.element);
  }

  /* -------------------------------------------- */
  /*  Data preparation                            */
  /* -------------------------------------------- */

  /**
   * Localized labels for the character's selectable values.
   * @param {object} context
   */
  _prepareCharacterData(context) {
    const groups = ['abilities', 'secondaries', 'classes', 'ethnicities', 'resistances'];
    for (const group of groups) this.#localizeLabels(context.system[group], CONFIG.SHINOBI[group]);
  }

  /**
   * Localized labels for NPCs.
   * @param {object} context
   */
  _prepareNPCData(context) {
    const groups = ['abilities', 'secondaries', 'resistances'];
    for (const group of groups) this.#localizeLabels(context.system[group], CONFIG.SHINOBI[group]);
  }

  /**
   * Add a localized label to every entry of a system group.
   * @param {object} entries   e.g. context.system.abilities
   * @param {object} labels    e.g. CONFIG.SHINOBI.abilities
   */
  #localizeLabels(entries, labels) {
    for (const [k, v] of Object.entries(entries ?? {})) {
      v.label = game.i18n.localize(labels?.[k] ?? k);
    }
  }

  /**
   * Organize the owned items by type for the character sheet.
   * @param {object} context
   */
  _prepareItems(context) {
    const types = ['object', 'weapon', 'armor', 'technique', 'chakra_tech', 'arcana_tech'];
    for (const type of types) context[type] = [];
    for (const item of context.items) {
      item.img = item.img || Item.DEFAULT_ICON;
      context[item.type]?.push(item);
    }
  }

  /**
   * Write the remaining class points of each characteristic into the sheet.
   * @param {HTMLElement} root   The sheet element
   */
  _classPoints(root) {
    if (this.actor.type === 'npc') return;

    // Query only inside this sheet: a global document query would write into
    // whichever actor sheet happened to be opened first.
    const characteristics = root?.querySelectorAll('.class-points') ?? [];
    if (characteristics.length < 5) return;

    const secondaries = this.actor.system.secondaries;
    const points = this.actor.system.points;
    const sum = (...keys) => keys.reduce((total, key) => total + secondaries[key].class, 0);

    const spent = {
      str: sum('athletics', 'swim'),
      dex: sum('acrobatics', 'sleightOfHand', 'stealth', 'traps', 'openLocks'),
      per: sum('search', 'track', 'notice', 'examine', 'insight'),
      int: sum('shinobiKnowledge', 'ethnicKnowledge', 'underworldKnowledge', 'science',
        'history', 'medicine', 'nature', 'religion', 'animalHandling'),
      wil: sum('persuasion', 'interpret', 'lie', 'coldness', 'intimidate'),
    };

    ['str', 'dex', 'per', 'int', 'wil'].forEach((key, i) => {
      characteristics[i].textContent = points[key].class - spent[key];
    });
  }

  /* -------------------------------------------- */
  /*  Drag and drop                               */
  /* -------------------------------------------- */

  /**
   * ActorSheetV2 already handles dropping Items/Effects onto the sheet. Here we only make
   * sure owned items (rows with data-item-id) carry their drag data, e.g. for hotbar macros.
   * @override
   */
  async _onDragStart(event) {
    const row = event.target.closest?.('[data-item-id]');
    const item = row ? this.actor.items.get(row.dataset.itemId) : null;
    if (!item) return super._onDragStart(event);
    event.dataTransfer.setData('text/plain', JSON.stringify(item.toDragData()));
  }

  /* -------------------------------------------- */
  /*  Event handlers                              */
  /* -------------------------------------------- */

  /**
   * Store the open/closed state of <details> elements (see the openDetails helper).
   * @param {Event} event
   */
  #onToggleDetails(event) {
    const details = event.target;
    if (!(details instanceof HTMLDetailsElement) || !details.id) return;

    let openDetails = {};
    try {
      openDetails = JSON.parse(localStorage.getItem('openDetails')) ?? {};
    } catch (err) { /* corrupted value: start again */ }

    if (details.open) openDetails[details.id] = true;
    else delete openDetails[details.id];
    localStorage.setItem('openDetails', JSON.stringify(openDetails));
  }

  /**
   * Find the owned Item of the row that contains the clicked element.
   * @param {HTMLElement} target
   * @returns {Item|undefined}
   */
  #getItemFromTarget(target) {
    const itemId = target.closest('[data-item-id]')?.dataset.itemId;
    return itemId ? this.actor.items.get(itemId) : undefined;
  }

  /**
   * Open the sheet of an owned item.
   * @this {ShinobiActorSheet}
   */
  static #onEditItem(event, target) {
    this.#getItemFromTarget(target)?.sheet.render({ force: true });
  }

  /**
   * Delete an owned item. The sheet re-renders by itself afterwards.
   * @this {ShinobiActorSheet}
   */
  static async #onDeleteItem(event, target) {
    if (!this.isEditable) return;
    await this.#getItemFromTarget(target)?.delete();
  }

  /**
   * Create a new owned Item using the data-* attributes of the clicked control.
   * @this {ShinobiActorSheet}
   */
  static async #onCreateItem(event, target) {
    event.preventDefault();
    if (!this.isEditable) return;
    const { type, action, ...system } = target.dataset;
    return Item.create(
      { name: `New ${type.capitalize()}`, type, system },
      { parent: this.actor }
    );
  }

  /**
   * Handle clickable rolls.
   * @this {ShinobiActorSheet}
   */
  static async #onRoll(event, target) {
    event.preventDefault();
    const dataset = target.dataset;

    // Item rolls.
    if (dataset.rollType === 'item') {
      return this.#getItemFromTarget(target)?.roll();
    }

    // Rolls that supply the formula directly.
    if (!dataset.roll) return;

    const roll = new Roll(dataset.roll, this.actor.getRollData());
    await roll.evaluate();


    const label = dataset.label
      ? `${game.i18n.localize('Check of')} ${dataset.label}`
      : '';

    const isResistance = dataset.roll?.includes('@resistances.');

    const critical = !isResistance && roll.terms[0].total >= 10 ? 1 : null;
    const fumble = !isResistance && roll.terms[0].total == 1 ? 1 : null;

    const apply = dataset.apply;

    const template = target.getAttribute('for') === 'system.combat.attack'
      ? 'systems/shinobi/templates/roll/roll-attack.hbs'
      : 'systems/shinobi/templates/roll/roll.hbs';

    const content = await foundry.applications.handlebars.renderTemplate(template, {
      formula: roll.formula,
      tooltip: await roll.getTooltip(),
      critical,
      fumble,
      total: roll.total,
      apply,
    });

    // Roll#toMessage attaches the roll and applies the user's current roll mode.
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: label,
      content,
      flags: { shinobi: { total: roll.total, apply } },
    });
    return roll;
  }

  /**
   * Half rest: recover half the regeneration (or everything with supernatural regeneration).
   * @this {ShinobiActorSheet}
   */
  static async #onHalfRest(event) {
    event.preventDefault();
    if (!this.isEditable) return;
    const { health, regeneration } = this.actor.system;
    const previousHealth = health.value;
    let newHealth = previousHealth;

    if (previousHealth < health.max) {
      if (regeneration.points >= 4 && regeneration.isSobrenatural) newHealth = health.max;
      else newHealth = Math.min(previousHealth + regeneration.value / 2, health.max);
    }

    await this.actor.update({ 'system.health.value': newHealth });

    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: game.i18n.localize('Has take a Half Rest and have recover ') + (newHealth - previousHealth) + game.i18n.localize(' Life Points.'),
    });
  }

  /**
   * Total rest: recover the full regeneration and refill every resource.
   * @this {ShinobiActorSheet}
   */
  static async #onTotalRest(event) {
    event.preventDefault();
    if (!this.isEditable) return;
    const system = this.actor.system;
    const { health, regeneration } = system;
    const previousHealth = health.value;
    const newHealth = previousHealth < health.max
      ? Math.min(previousHealth + regeneration.value, health.max)
      : previousHealth;

    const updates = { 'system.health.value': newHealth };
    const resources = {
      'system.fatigue': system.fatigue,
      'system.tiredness': system.tiredness,
      'system.attributes.bloodPower': system.attributes.bloodPower,
      'system.attributes.trascendentalShard': system.attributes.trascendentalShard,
      'system.attributes.ki': system.attributes.ki,
      'system.attributes.talisman': system.attributes.talisman,
      'system.attributes.arcana': system.attributes.arcana,
    };
    for (const [path, resource] of Object.entries(resources)) {
      if (resource?.max !== undefined) updates[`${path}.value`] = resource.max;
    }
    await this.actor.update(updates);

    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor: game.i18n.localize('Has take a Total Rest and have recover ') + (newHealth - previousHealth) + game.i18n.localize(' Life Points and all Tiredness and Fatigue Points.'),
    });
  }
}
