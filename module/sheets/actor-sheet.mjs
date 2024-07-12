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
      height: 750,
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
      this._prepareCharacterData(context);
      this._prepareItems(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareNPCData(context);
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

    for (let [k, v] of Object.entries(context.system.resistances)) {
      v.label = game.i18n.localize(CONFIG.SHINOBI.resistances[k]) ?? k;
    }
  }

  _prepareNPCData(context) {

    // Handle ability scores.


    for (let [k, v] of Object.entries(context.system.abilities)) {
      v.label = game.i18n.localize(CONFIG.SHINOBI.abilities[k]) ?? k;
    }

    for (let [k, v] of Object.entries(context.system.secondaries)) {
      v.label = game.i18n.localize(CONFIG.SHINOBI.secondaries[k]) ?? k;
    }

    for (let [k, v] of Object.entries(context.system.resistances)) {
      v.label = game.i18n.localize(CONFIG.SHINOBI.resistances[k]) ?? k;
    }
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
    const object = [];
    const weapon = [];
    const armor = [];
    const technique = [];

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to object.
      if (i.type === 'object') {
        object.push(i);
      }
    }
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to weapon.
      if (i.type === 'weapon') {
        weapon.push(i);
      }
    }
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to armor.
      if (i.type === 'armor') {
        armor.push(i);
      }
    }
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to technique.
      if (i.type === 'technique') {
        technique.push(i);
      }
    }

    // Assign and return
    context.object = object;
    context.weapon = weapon;
    context.armor = armor;
    context.technique = technique;
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

    html.on('click', 'summary', this._openedDetails.bind(this));

    html.on('click', '.half-rest', this._halfRest.bind(this));
    html.on('click', '.total-rest', this._totalRest.bind(this));

    html.ready(this._classPoints.bind(this));
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

  async _onRoll(event) {
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
      const rollData = this.actor.getRollData();

      let roll = new Roll(dataset.roll, rollData);
      await roll.evaluate();

      let label = dataset.label ? `${game.i18n.localize("Check of")} ${dataset.label}` : '';

      let chatData = {
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get("core", "rollMode"),
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        rolls: [roll],
      };

      let chatCritical = null;
      let chatFumble = null;
      if (roll.terms[0].total >= 10) chatCritical = 1;
      if (roll.terms[0].total == 1) chatFumble = 1;

      let chatapply = dataset.apply;
      chatData.flags = {
        total: roll.total,
        apply: chatapply,
      };

      if (element.attributes.for.nodeValue == "system.combat.attack") {
        chatData.content = await renderTemplate(
          "systems/shinobi/templates/roll/roll-attack.hbs",
          {
            formula: roll.formula,
            tooltip: await roll.getTooltip(),
            critical: chatCritical,
            fumble: chatFumble,
            total: roll.total,
            apply: chatapply,
          }
        );
      }


      if (element.attributes.for.nodeValue !== "system.combat.attack") {
        chatData.content = await renderTemplate(
          "systems/shinobi/templates/roll/roll.hbs",
          {
            formula: roll.formula,
            tooltip: await roll.getTooltip(),
            critical: chatCritical,
            fumble: chatFumble,
            total: roll.total,
            apply: chatapply,
          }
        );
      }



      ChatMessage.create(chatData);

      return roll;
    }
  };

  // Manage the data of opened details elements.
  _openedDetails(event) {
    var currentDetail = event.currentTarget.parentElement.id;

    let previous = '{}';
    if (localStorage.getItem("openDetails") == null)
      localStorage.setItem("openDetails", previous)

    previous = JSON.parse(localStorage.getItem("openDetails"))

    if (currentDetail in previous)
      delete previous[currentDetail];
    else
      previous[currentDetail] = true;

    localStorage.setItem("openDetails", JSON.stringify(previous));
  }

  _halfRest(event) {
    event.preventDefault();
    const health = this.actor.system.health
    const previousHealth = this.actor.system.health.value
    const regeneration = this.actor.system.regeneration
    if (health.value < health.max) {
      let regenerationCap = health.value + regeneration.value / 2
      if (regenerationCap < health.max) health.value = health.value + regeneration.value / 2;
      else health.value = health.max
      this.actor.sheet.render();
    }
    // Chat message
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    let label = game.i18n.localize("Has take a Half Rest and have recover ") + (health.value - previousHealth) + game.i18n.localize(" Life Points.");

    let chatData = {
      speaker: speaker,
      flavor: label,
    };

    ChatMessage.create(chatData);
  }
  _totalRest(event) {
    event.preventDefault();
    const actorClass = this.actor.system.class.value;
    const health = this.actor.system.health;
    const fatigue = this.actor.system.fatigue;
    const tiredness = this.actor.system.tiredness;
    const regeneration = this.actor.system.regeneration;
    const previousHealth = this.actor.system.health.value;
    const bloodPower = this.actor.system.attributes.bloodPower;
    const trascendentalShard = this.actor.system.attributes.trascendentalShard;
    const ki = this.actor.system.attributes.ki;
    const talisman = this.actor.system.attributes.talisman;
    const arcana = this.actor.system.attributes.arcana;

    fatigue.value = fatigue.max;
    tiredness.value = tiredness.max;
    bloodPower.value = bloodPower.max;
    trascendentalShard.value = trascendentalShard.max;
    ki.value = ki.max;
    talisman.value = talisman.max;
    arcana.value = arcana.max;


    if (health.value < health.max) {
      let regenerationCap = health.value + regeneration.value
      if (regenerationCap < health.max) health.value = health.value + regeneration.value;
      else health.value = health.max
    }


    this.actor.sheet.render();
    // Chat message
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    let label = game.i18n.localize("Has take a Total Rest and have recover ") + (health.value - previousHealth) + game.i18n.localize(" Life Points and all Tiredness and Fatigue Points.");

    let chatData = {
      speaker: speaker,
      flavor: label,
    };

    ChatMessage.create(chatData);
  }

  _classPoints() {
    let actorData = super.getData()
    if (actorData.document.type == 'npc') return;

    const characteristics = document.getElementsByClassName("class-points");
    const secondaries = this.actor.system.secondaries;
    const points = this.actor.system.points;
    const str = points.str.class;
    const dex = points.dex.class;
    const per = points.per.class;
    const int = points.int.class;
    const wil = points.wil.class;


    const strInverted =
      secondaries.athletics.class +
      secondaries.swim.class;

    const dexInverted =
      secondaries.acrobatics.class +
      secondaries.sleightOfHand.class +
      secondaries.stealth.class +
      secondaries.traps.class +
      secondaries.openLocks.class;

    const perInverted =
      secondaries.search.class +
      secondaries.track.class +
      secondaries.notice.class +
      secondaries.examine.class +
      secondaries.insight.class;

    const intInverted =
      secondaries.shinobiKnowledge.class +
      secondaries.ethnicKnowledge.class +
      secondaries.underworldKnowledge.class +
      secondaries.science.class +
      secondaries.history.class +
      secondaries.medicine.class +
      secondaries.nature.class +
      secondaries.religion.class +
      secondaries.animalHandling.class;

    const wilInverted =
      secondaries.persuasion.class +
      secondaries.interpret.class +
      secondaries.lie.class +
      secondaries.coldness.class +
      secondaries.intimidate.class;


    characteristics[0].firstChild.data = str - strInverted;
    characteristics[1].firstChild.data = dex - dexInverted;
    characteristics[2].firstChild.data = per - perInverted;
    characteristics[3].firstChild.data = int - intInverted;
    characteristics[4].firstChild.data = wil - wilInverted;
  }
}
