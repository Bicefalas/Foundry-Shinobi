import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ShinobiActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['shinobi', 'sheet', 'actor'],
      width: 1000,
      height: 600,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'features',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return `systems/shinobi/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = context.data;

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Prepare character data and items.
    if (actorData.type == 'shinobi') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData(context) {

    // Handle ability scores.


    for (let [k, v] of Object.entries(context.system.abilities)) {
      v.label = game.i18n.localize(CONFIG.SHINOBI.abilities[k]) ?? k;
    }

    for (let [k, v] of Object.entries(context.system.secondaries)) {
      v.label = game.i18n.localize(CONFIG.SHINOBI.secondaries[k]) ?? k;
    }

    for (let [k, v] of Object.entries(context.system.classes)) {
      v.label = game.i18n.localize(CONFIG.SHINOBI.classes[k]) ?? k;
    }

    for (let [k, v] of Object.entries(context.system.ethnicities)) {
      v.label = game.i18n.localize(CONFIG.SHINOBI.ethnicities[k]) ?? k;
    }


    let secondaries = context.system.secondaries
    let abilities = context.system.abilities

    secondaries.athletics.mod =
      secondaries.swim.mod =
      abilities.str.mod

    secondaries.acrobatics.mod =
      secondaries.sleightOfHand.mod =
      secondaries.stealth.mod =
      secondaries.traps.mod =
      secondaries.openLocks.mod =
      abilities.dex.mod

    secondaries.search.mod =
      secondaries.track.mod =
      secondaries.notice.mod =
      secondaries.examine.mod =
      secondaries.insight.mod =
      abilities.per.mod

    secondaries.shinobiKnowledge.mod =
      secondaries.ethnicKnowledge.mod =
      secondaries.underworldKnowledge.mod =
      secondaries.science.mod =
      secondaries.history.mod =
      secondaries.medicine.mod =
      secondaries.nature.mod =
      secondaries.religion.mod =
      secondaries.animalHandling.mod =
      abilities.int.mod

    secondaries.persuasion.mod =
      secondaries.interpret.mod =
      secondaries.lie.mod =
      secondaries.coldness.mod =
      secondaries.intimidate.mod =
      abilities.wil.mod

    let ignorancePenalizer = 0

    let inteligenceValue = context.system.abilities.int.value;

    switch (true) {
      case (inteligenceValue <= 3):
        ignorancePenalizer = -6
        break;
      case (inteligenceValue == 4):
        ignorancePenalizer = -4
        break;
      case (inteligenceValue >= 5 && inteligenceValue <= 6):
        ignorancePenalizer = -3
        break;
      case (inteligenceValue >= 7 && inteligenceValue <= 9):
        ignorancePenalizer = -2
        break;
      case (inteligenceValue >= 10):
        ignorancePenalizer = -1
        break;
    }
    Object.values(secondaries).forEach(secondary => {
      if (secondary.ip + secondary.class + secondary.nd + secondary.others == 0) {
        secondary.final = ignorancePenalizer
      }

      else {
        secondary.final = secondary.ip + secondary.class + secondary.nd + secondary.others + secondary.mod
      }
    }
    );
  }


  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const features = [];
    const spells = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.system.spellLevel != undefined) {
          spells[i.system.spellLevel].push(i);
        }
      }
    }

    // Assign and return
    context.gear = gear;
    context.features = features;
    context.spells = spells;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
      html.on('change', '.select-field', this._updateClass.bind(this));
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `${game.i18n.localize("Check of")} ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  _updateClass(event) {
    event.preventDefault();
    return this.actor.update({ "system.class.value": this.actor.system.class.value });
  }
}
