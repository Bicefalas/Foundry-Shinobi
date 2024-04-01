/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class ShinobiActor extends Actor {
  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the actor source data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.shinobi || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'shinobi' && actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(systemData.abilities)) {
      // Calculate the modifier.
      switch (ability.value) {
        case 1:
          // if this case is allowed
          ability.mod = -8;
          break;

        case 2:
          // if this case is allowed
          ability.mod = -4;
          break;

        case 3:
          // if this case is allowed
          ability.mod = -2;
          break;

        case 4:
          // if this case is allowed
          ability.mod = -1;
          break;

        default:
          //if none of the cases doesn't fit
          ability.mod = Math.floor((ability.value - 5) / 3);
      };
    };
    let secondaries = systemData.secondaries
    let abilities = systemData.abilities
    let resistances = systemData.resistances
    let level = systemData.attributes.level.value

    secondaries.athletics.mod =
      secondaries.swim.mod =
      resistances.phy.mod =
      abilities.str.mod

    secondaries.acrobatics.mod =
      secondaries.sleightOfHand.mod =
      secondaries.stealth.mod =
      secondaries.traps.mod =
      secondaries.openLocks.mod =
      resistances.ref.mod =
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

    resistances.moo.mod =
      abilities.pow.mod

    secondaries.persuasion.mod =
      secondaries.interpret.mod =
      secondaries.lie.mod =
      secondaries.coldness.mod =
      secondaries.intimidate.mod =
      resistances.wil.mod =
      abilities.wil.mod

    resistances.phy.level =
      resistances.ref.level =
      resistances.moo.level =
      resistances.wil.level =
      level

    let ignorancePenalizer = 0

    let inteligenceValue = systemData.abilities.int.value;

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

    let ipCostStr = 0
    let ipCostDex = 0
    let ipCostPer = 0
    let ipCostInt = 0
    let ipCostWil = 0
    let ipCost = 0

    switch (true) {
      case (systemData.class.value == "warrior"):
        ipCostStr = 2
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 3
        ipCostWil = 2
        break;
      case (systemData.class.value == "rogue"):
        ipCostStr = 3
        ipCostDex = 1
        ipCostPer = 1
        ipCostInt = 2
        ipCostWil = 2
        break;
      case (systemData.class.value == "ninja"):
        ipCostStr = 2
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 3
        ipCostWil = 2
        break;
      case (systemData.class.value == "shaolin"):
        ipCostStr = 2
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 3
        ipCostWil = 2
        break;
      case (systemData.class.value == "samurai"):
        ipCostStr = 2
        ipCostDex = 3
        ipCostPer = 2
        ipCostInt = 2
        ipCostWil = 1
        break;
      case (systemData.class.value == "omnyoji"):
        ipCostStr = 3
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 2
        ipCostWil = 2
        break;
      case (systemData.class.value == "henge"):
        ipCostStr = 3
        ipCostDex = 1
        ipCostPer = 1
        ipCostInt = 2
        ipCostWil = 2
        break;
      case (systemData.class.value == "kannushi"):
        ipCostStr = 3
        ipCostDex = 1
        ipCostPer = 1
        ipCostInt = 2
        ipCostWil = 2
        break;
      case (systemData.class.value == "ryoshi"):
        ipCostStr = 2
        ipCostDex = 1
        ipCostPer = 2
        ipCostInt = 2
        ipCostWil = 2
        break;
      case (systemData.class.value == "warriorOmnyoji"):
        ipCostStr = 2
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 2
        ipCostWil = 2
        break;
      case (systemData.class.value == "ronin"):
        ipCostStr = 2
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 3
        ipCostWil = 2
        break;
      case (systemData.class.value == "energyShaolin"):
        ipCostStr = 2
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 3
        ipCostWil = 2
        break;
    }

    Object.values(secondaries).forEach(secondary => {

      switch (true) {
        case (secondary.long == "Athletics" || secondary.long == "Swim"):
          ipCost = ipCostStr
          break;
        case (secondary.long == "Acrobatics" || secondary.long == "SleightOfHand" || secondary.long == "Stealth" || secondary.long == "Traps" || secondary.long == "OpenLocks"):
          ipCost = ipCostDex
          break;
        case (secondary.long == "Search" || secondary.long == "track" || secondary.long == "notice" || secondary.long == "examine" || secondary.long == "insight"):
          ipCost = ipCostPer
          break;
        case (secondary.long == "ShinobiKnowledge" || secondary.long == "ethnicKnowledge" || secondary.long == "underworldKnowledge" || secondary.long == "science" || secondary.long == "history" || secondary.long == "medicine" || secondary.long == "nature" || secondary.long == "religion" || secondary.long == "animalHandling"):
          ipCost = ipCostInt
          break;
        case (secondary.long == "Persuasion" || secondary.long == "interpret" || secondary.long == "lie" || secondary.long == "coldness" || secondary.long == "intimidate"):
          ipCost = ipCostWil
          break;
      }

      if (Math.trunc(secondary.ip / ipCost + secondary.class + secondary.nd + secondary.others) == 0) {
        secondary.final = ignorancePenalizer + secondary.mod
      }

      else {
        secondary.final = Math.trunc(secondary.ip / ipCost + secondary.class + secondary.nd + secondary.others + secondary.mod)
      }

    });


    Object.values(resistances).forEach(resistance => {
      resistance.final = resistance.level + resistance.mod + resistance.others
    }
    );

  };



  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    systemData.xp = systemData.cr * systemData.cr * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    // Starts off by populating the roll data with `this.system`
    const data = { ...super.getRollData() };

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'shinobi') return;

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    if (data.secondaries) {
      for (let [k, v] of Object.entries(data.secondaries)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    if (data.resistances) {
      for (let [k, v] of Object.entries(data.resistances)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    if (data.attributes.level) {
      data.lvl = data.attributes.level.value ?? 0;
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

    // Process additional NPC data here.
  }
}
