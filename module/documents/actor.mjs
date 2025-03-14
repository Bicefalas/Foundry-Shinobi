/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
import * as tables from './tables.mjs';
import { lifeValues } from "./tables.mjs";

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
      ability.mod = tables.abilityMod[ability.value];
    };


    let secondaries = systemData.secondaries;
    let abilities = systemData.abilities;
    let resistances = systemData.resistances;
    let level = systemData.attributes.level.value;
    let initiative = systemData.initiative;
    let carryArmor = systemData.attributes.carryArmor
    let armor = systemData.armor;
    let combat = systemData.combat;
    let health = systemData.health;
    let fatigue = systemData.fatigue;
    let tiredness = systemData.tiredness;
    let arcana = systemData.attributes.arcana;
    let cat = systemData.attributes.cat;
    let channel = systemData.attributes.channel;
    let kiLearning = systemData.attributes.kiLearning;
    let ki = systemData.attributes.ki;
    let invocation = systemData.attributes.invocation;
    let talisman = systemData.attributes.talisman;
    let infusion = systemData.attributes.infusion;
    let bloodPower = systemData.attributes.bloodPower;
    let bloodPowerLearning = systemData.attributes.bloodPowerLearning;
    let strengthValue = systemData.abilities.str.value
    let inteligenceValue = systemData.abilities.int.value;
    let perceptionValue = systemData.abilities.per.value;
    let dexterityValue = systemData.abilities.dex.value;
    let powerValue = systemData.abilities.pow.value;
    let constitutionValue = systemData.abilities.con.value;
    let regeneration = systemData.regeneration;
    let points = systemData.points;
    let objects = systemData.objects;

    systemData.adv.total = 0;
    systemData.disadv.total = 0;

    for (let i = 1; i <= 4; i++) {
      systemData.adv.total += systemData[`adv${i}`].cost;
      systemData.disadv.total += systemData[`disadv${i}`].gain
    }
    if (systemData.advDisadv.advanced) {
      systemData.adv.total += systemData.adv.ip;
      systemData.disadv.total += systemData.disadv.ip;
    }

    tiredness.max = abilities.con.value + tiredness.others

    fatigue.max = abilities.pow.value + fatigue.others

    const armorTypes = ["phisical", "heat", "cold", "electrical", "sobrenatural"];
    const armorMaterials = ["Material", "Natural", "Sobrenatural"];
    for (let type of armorTypes) {
      armor[type] = 0;
      for (let material of armorMaterials) {
        armor[type] += armor[`${type}${material}`];
      }
    }

    secondaries.athletics.mod =
      secondaries.swim.mod =
      abilities.str.mod

    resistances.phy.mod =
      abilities.con.mod

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

    systemData.range = tables.maxRange[perceptionValue - 1] || "Unlimited";
    systemData.speed.value = tables.speedValues[dexterityValue - 1] || "100 km";
    health.con = tables.lifeValues[constitutionValue - 1] || 400;
    objects.carryWeight = tables.carryWeights[strengthValue - 1] || "100.000 Kg";
    arcana.base = tables.baseArcanaValues[powerValue - 1] || 420;
    cat.base = tables.baseCATValues[powerValue - 1] || 35;

    let baseTalisman = 0;

    baseTalisman = 3 * abilities.wil.mod;

    if (baseTalisman <= 1) baseTalisman = 1;

    talisman.base = baseTalisman;

    let baseBloodPower = 0;

    baseBloodPower = 3 * abilities.con.mod;

    if (baseBloodPower <= 1) baseBloodPower = 1;

    bloodPower.base = baseBloodPower;


    let ignorancePenalizer = 0;

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
      case "energyShaolin":
        ipCostInt = 3
        break;
      case "rogue":
      case "henge":
      case "kannushi":
        ipCostStr = 3
        ipCostDex = 1
        ipCostPer = 1
        break;
      case "samurai":
        ipCostDex = 3
        ipCostWil = 1
        break;
      case "omnyoji":
        ipCostStr = 3
        break;
      case "ryoshi":
        ipCostDex = 1
        break;
      case "ronin":
        ipCostWil = 3
        break;
      case "warriorOmnyoji":
    }

    let classAttack = 0;
    let classDefense = 0;
    let classMagic = 0;
    let classArmor = 0;
    let classInitiative = 0;
    let classHealth = 0;
    let classKi = 0;
    let classKiLearning = 0;
    let classArcana = 0;
    let classChannel = 0;
    let classCAT = 0;
    let classInvocation = 0;
    let classTalisman = 0;
    let classInfusion = 0;
    let classBloodPowerLearning = 0;
    let classStr = 0;
    let classDex = 0;
    let classPer = 0;
    let classInt = 0;
    let classWil = 0;
    let classIp = 0;

    switch (systemData.class.value) {
      case "warrior":
        classAttack = tables.warriorAttack[level - 1];
        classDefense = tables.warriorDefense[level - 1];
        classArmor = tables.warriorArmor[level - 1];
        classInitiative = tables.warriorInitiative[level - 1];
        classHealth = tables.warriorHealth[level - 1];
        classStr = tables.warriorStr[level - 1];
        classIp = tables.warriorIp[level - 1];
        break;
      case "ronin":
        classAttack = tables.roninAttack[level - 1];
        classDefense = tables.roninDefense[level - 1];
        classInitiative = tables.roninInitiative[level - 1];
        classHealth = tables.roninHealth[level - 1];
        classStr = tables.roninStr[level - 1];
        classDex = tables.roninDex[level - 1];
        classIp = tables.roninIp[level - 1];
        break;
      case "ninja":
        classAttack = tables.ninjaAttack[level - 1];
        classDefense = tables.ninjaDefense[level - 1];
        classInitiative = tables.ninjaInitiative[level - 1];
        classHealth = tables.ninjaHealth[level - 1];
        classKi = tables.ninjaKi[level - 1];
        classIp = tables.ninjaIp[level - 1];
        break;
      case "shaolin":
        classAttack = tables.shaolinAttack[level - 1];
        classDefense = tables.shaolinDefense[level - 1];
        classInitiative = tables.shaolinInitiative[level - 1];
        classHealth = tables.shaolinHealth[level - 1];
        classKi = tables.shaolinKi[level - 1];
        classKiLearning = tables.shaolinKiLearning[level - 1];
        classDex = tables.shaolinDex[level - 1];
        classIp = tables.shaolinIp[level - 1];
        break;
      case "energyShaolin":
        classAttack = tables.energyShaolinAttack[level - 1];
        classDefense = tables.energyShaolinDefense[level - 1];
        classInitiative = tables.energyShaolinInitiative[level - 1];
        classHealth = tables.energyShaolinHealth[level - 1];
        classKi = tables.energyShaolinKi[level - 1];
        classDex = tables.energyShaolinDex[level - 1];
        classIp = tables.energyShaolinIp[level - 1];
        break;
      case "henge":
        classAttack = tables.hengeAttack[level - 1];
        classDefense = tables.hengeDefense[level - 1];
        classInitiative = tables.hengeInitiative[level - 1];
        classHealth = tables.hengeHealth[level - 1];
        classInfusion = tables.hengeInfusion[level - 1];
        classDex = tables.hengeDex[level - 1];
        classPer = tables.hengePer[level - 1];
        classWil = tables.hengeWil[level - 1];
        classIp = tables.hengeIp[level - 1];
        break;
      case "rogue":
        classAttack = tables.rogueAttack[level - 1];
        classDefense = tables.rogueDefense[level - 1];
        classInitiative = tables.rogueInitiative[level - 1];
        classHealth = tables.rogueHealth[level - 1];
        classDex = tables.rogueDex[level - 1];
        classPer = tables.roguePer[level - 1];
        classWil = tables.rogueWil[level - 1];
        classIp = tables.rogueIp[level - 1];
        break;
      case "kannushi":
        classAttack = tables.kannushiAttack[level - 1];
        classDefense = tables.kannushiDefense[level - 1];
        classInitiative = tables.kannushiInitiative[level - 1];
        classHealth = tables.kannushiHealth[level - 1];
        classTalisman = tables.kannushiTalisman[level - 1];
        classDex = tables.kannushiDex[level - 1];
        classPer = tables.kannushiPer[level - 1];
        classWil = tables.kannushiWil[level - 1];
        classIp = tables.kannushiIp[level - 1];
        break;
      case "samurai":
        classAttack = tables.samuraiAttack[level - 1];
        classDefense = tables.samuraiDefense[level - 1];
        classArmor = tables.samuraiArmor[level - 1];
        classInitiative = tables.samuraiInitiative[level - 1];
        classHealth = tables.samuraiHealth[level - 1];
        classArcana = tables.samuraiArcana[level - 1];
        classInvocation = tables.samuraiInvocation[level - 1];
        classWil = tables.samuraiWil[level - 1];
        classIp = tables.samuraiIp[level - 1];
        break;
      case "omnyoji":
        classAttack = tables.omnyojiAttack[level - 1];
        classInitiative = tables.omnyojiInitiative[level - 1];
        classHealth = tables.omnyojiHealth[level - 1];
        classArcana = tables.omnyojiArcana[level - 1];
        classChannel = tables.omnyojiChannel[level - 1];
        classCAT = tables.omnyojiCAT[level - 1];
        classInt = tables.omnyojiInt[level - 1];
        classIp = tables.omnyojiIp[level - 1];
        break;
      case "ryoshi":
        classAttack = tables.ryoshiAttack[level - 1];
        classDefense = tables.ryoshiDefense[level - 1];
        classInitiative = tables.ryoshiInitiative[level - 1];
        classHealth = tables.ryoshiHealth[level - 1];
        classBloodPowerLearning = tables.ryoshiBloodPowerLearning[level - 1];
        classDex = tables.ryoshiDex[level - 1];
        classPer = tables.ryoshiPer[level - 1];
        classInt = tables.ryoshiInt[level - 1];
        classIp = tables.ryoshiIp[level - 1];
        break;
      case "warriorOmnyoji":
        classAttack = tables.warriorOmnyojiAttack[level - 1];
        classDefense = tables.warriorOmnyojiDefense[level - 1];
        classInitiative = tables.warriorOmnyojiInitiative[level - 1];
        classHealth = tables.warriorOmnyojiHealth[level - 1];
        classArcana = tables.warriorOmnyojiArcana[level - 1];
        classChannel = tables.warriorOmnyojiChannel[level - 1];
        classCAT = tables.warriorOmnyojiCAT[level - 1];
        classInt = tables.warriorOmnyojiInt[level - 1];
        classIp = tables.warriorOmnyojiIp[level - 1];
        break;
    }
    combat.classAttack = classAttack;
    combat.classDefense = classDefense;
    combat.classMagic = classMagic;
    carryArmor.class = classArmor;
    initiative.class = classInitiative;
    health.class = classHealth;
    ki.class = classKi;
    kiLearning.class = classKiLearning;
    arcana.class = classArcana;
    channel.class = classChannel;
    cat.multipliers = classCAT;
    invocation.class = classInvocation;
    talisman.class = classTalisman;
    infusion.class = classInfusion;
    if (abilities.con.mod >= 1) bloodPowerLearning.class = classBloodPowerLearning * abilities.con.mod;
    else bloodPowerLearning.class = classBloodPowerLearning * 0.5;
    combat.attack =
      abilities.dex.mod +
      combat.classAttack +
      combat.othersAttack

    combat.defense =
      abilities.dex.mod +
      combat.classDefense +
      combat.othersDefense

    combat.magic =
      abilities.dex.mod +
      combat.classMagic +
      combat.othersMagic

    carryArmor.value =
      abilities.str.mod +
      carryArmor.class +
      carryArmor.others

    initiative.value =
      abilities.dex.mod +
      initiative.class +
      initiative.weapon +
      initiative.armor +
      initiative.others

    health.max =
      health.class +
      health.con +
      health.others

    ki.max =
      ki.class +
      ki.others

    kiLearning.value =
      kiLearning.class +
      kiLearning.others

    arcana.max =
      arcana.base +
      arcana.class +
      arcana.others

    channel.value =
      abilities.pow.mod +
      channel.class +
      channel.others

    cat.value =
      (cat.base * cat.multipliers) +
      cat.others

    invocation.value =
      abilities.int.mod +
      invocation.class +
      invocation.others

    talisman.max =
      talisman.base +
      talisman.class +
      talisman.others;

    infusion.max =
      infusion.class +
      infusion.others;

    bloodPower.max =
      bloodPower.base +
      bloodPower.others;

    bloodPowerLearning.max =
      bloodPowerLearning.class +
      bloodPowerLearning.others;

    points.str.class = classStr;
    points.dex.class = classDex;
    points.per.class = classPer;
    points.int.class = classInt;
    points.wil.class = classWil;


    points.obtained.nd = abilities.per.value * level;

    Object.values(secondaries).forEach(secondary => {
      points.spentSecondaries.nd += secondary.nd
    })

    points.remaining.nd = points.obtained.nd - points.spentSecondaries.nd;

    points.obtained.ip = classIp;

    Object.values(secondaries).forEach(secondary => {
      points.spentSecondaries.ip += secondary.ip
    })

    if (systemData.advDisadv.advanced) points.remaining.ip =
      points.obtained.ip +
      systemData.adv.ip -
      points.spentSecondaries.ip -
      systemData.disadv.ip;

    else
      points.remaining.ip =
        points.obtained.ip -
        points.spentSecondaries.ip;


    if (abilities.con.value < 14 && regeneration.sobrenatural == false) {
      regeneration.isSobrenatural = false
      regeneration.time = "per day"
      if (abilities.con.value < 8) regeneration.mod = 10
      if (abilities.con.value >= 8 && abilities.con.value < 11) regeneration.mod = 20
      if (abilities.con.value >= 11 && abilities.con.value < 14) regeneration.mod = 40
      regeneration.value = regeneration.mod + regeneration.others
    }
    else {
      regeneration.isSobrenatural = true
      regeneration.points =
        abilities.con.mod +
        regeneration.otherPoints

      if (regeneration.points <= 7) regeneration.time = "per day"
      else regeneration.time = "per turn"

      switch (regeneration.points) {
        case 1:
          regeneration.value = 100 + regeneration.others
          break
        case 2:
          regeneration.value = 250 + regeneration.others
          break
        case 3:
          regeneration.value = 500 + regeneration.others
          break
        case 4:
        case 5:
        case 6:
        case 7:
          regeneration.value = health.max
          break
        case 8:
          regeneration.value = 5
          break
        case 9:
          regeneration.value = 10
          break
        case 10:
          regeneration.value = 50
          break
      }
    }


    // function damage(event) {
    //   event.preventDefault();
    //   const a = event.currentTarget.parentElement;
    //   // const li = a.closest('item');
    //   // const effect = li.dataset.effectId
    //   //   ? owner.effects.get(li.dataset.effectId)
    //   //   : null;
    //   // switch (a.dataset.action) {
    //   //   case 'edit':
    //   //     return effect.sheet.render(true);
    //   //   case 'delete':
    //   //     return effect.delete();
    //   //   case 'toggle':
    //   //     return effect.update({ disabled: !effect.disabled });
    //   // }
    // }

    //   // Bring Damage data to Actorsheet
    //   document.on('load', '.item-control', (ev) => damage(ev)
    //   );

    // if (i.system.equipped) system.damage = systemData.items.system.damage;


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
      ability.mod = tables.abilityMod[ability.value];
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
