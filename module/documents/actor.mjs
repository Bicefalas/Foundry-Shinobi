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
    this._prepareNPCData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'shinobi') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(systemData.abilities)) {
      // Calculate the modifier.
      switch (ability.value) {
        case 1:
          ability.mod = -8;
          break;

        case 2:
          ability.mod = -4;
          break;

        case 3:
          ability.mod = -2;
          break;

        case 4:
          ability.mod = -1;
          break;

        default:
          ability.mod = Math.floor((ability.value - 5) / 3);
      };
    };
    let secondaries = systemData.secondaries
    let abilities = systemData.abilities
    let resistances = systemData.resistances
    let level = systemData.attributes.level.value
    let initiative = systemData.initiative

    initiative.value =
      abilities.dex.mod +
      initiative.class +
      initiative.weapon +
      initiative.armor +
      initiative.others

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

    let ipCostStr = 2
    let ipCostDex = 2
    let ipCostPer = 2
    let ipCostInt = 2
    let ipCostWil = 2
    let ipCost = 2

    switch (systemData.class.value) {
      case "warrior":
      case "ninja":
      case "shaolin":
      case "ronin":
      case "energyShaolin":
        ipCostStr = 2
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 3
        ipCostWil = 2
        break;
      case "rogue":
      case "henge":
      case "kannushi":
        ipCostStr = 3
        ipCostDex = 1
        ipCostPer = 1
        ipCostInt = 2
        ipCostWil = 2
        break;
      case "samurai":
        ipCostStr = 2
        ipCostDex = 3
        ipCostPer = 2
        ipCostInt = 2
        ipCostWil = 1
        break;
      case "omnyoji":
        ipCostStr = 3
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 2
        ipCostWil = 2
        break;
      case "ryoshi":
        ipCostStr = 2
        ipCostDex = 1
        ipCostPer = 2
        ipCostInt = 2
        ipCostWil = 2
        break;
      case "warriorOmnyoji":
        ipCostStr = 2
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 2
        ipCostWil = 2
        break;
    }

    Object.values(secondaries).forEach(secondary => {

      switch (secondary.long) {
        case "Athletics":
        case "Swim":
          ipCost = ipCostStr
          break;
        case "Acrobatics":
        case "Sleight Of Hand":
        case "Stealth":
        case "Traps":
        case "Open Locks":
          ipCost = ipCostDex
          break;
        case "Search":
        case "Track":
        case "Notice":
        case "Examine":
        case "Insight":
          ipCost = ipCostPer
          break;
        case "Shinobi Knowledge":
        case "Ethnic Knowledge":
        case "Underworld Knowledge":
        case "Science":
        case "History":
        case "Medicine":
        case "Nature":
        case "Religion":
        case "Animal Handling":
          ipCost = ipCostInt
          break;
        case "Persuasion":
        case "Interpret":
        case "Lie":
        case "Coldness":
        case "Intimidate":
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


  _prepareNPCData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(systemData.abilities)) {
      // Calculate the modifier.
      switch (ability.value) {
        case 1:
          ability.mod = -8;
          break;

        case 2:
          ability.mod = -4;
          break;

        case 3:
          ability.mod = -2;
          break;

        case 4:
          ability.mod = -1;
          break;

        default:
          ability.mod = Math.floor((ability.value - 5) / 3);
      };
    };
  };

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
    if (data.combat) {
      for (let [k, v] of Object.entries(data.combat)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

    // Process additional NPC data here.

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
    if (data.combat) {
      for (let [k, v] of Object.entries(data.combat)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }
  }
}
