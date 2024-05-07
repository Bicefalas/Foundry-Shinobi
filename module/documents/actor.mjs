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
    let inteligenceValue = systemData.abilities.int.value;
    let perceptionValue = systemData.abilities.per.value;
    let dexterityValue = systemData.abilities.dex.value;



    invocation.value =
      abilities.int.mod +
      invocation.class +
      invocation.others

    ki.max =
      ki.class +
      ki.others

    kiLearning.value =
      kiLearning.class +
      kiLearning.others

    channel.value =
      abilities.pow.mod +
      channel.class +
      channel.others

    cat.value =
      (cat.base * cat.multipliers) +
      cat.others

    arcana.max =
      arcana.base +
      arcana.class +
      arcana.others

    tiredness.max =
      abilities.con.value +
      tiredness.others

    fatigue.max =
      abilities.pow.value +
      fatigue.others

    armor.phisical =
      armor.phisicalMaterial +
      armor.phisicalNatural +
      armor.phisicalSobrenatural

    armor.heat =
      armor.heatMaterial +
      armor.heatNatural +
      armor.heatSobrenatural

    armor.cold =
      armor.coldMaterial +
      armor.coldNatural +
      armor.coldSobrenatural

    armor.electrical =
      armor.electricalMaterial +
      armor.electricalNatural +
      armor.electricalSobrenatural

    armor.sobrenatural =
      armor.sobrenaturalMaterial +
      armor.sobrenaturalNatural +
      armor.sobrenaturalSobrenatural

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




    let maxRange = 0;

    switch (true) {
      case (perceptionValue <= 1):
        maxRange = "1 m"
        break;
      case (perceptionValue == 2):
        maxRange = "5 m"
        break;
      case (perceptionValue == 3):
        maxRange = "10 m"
        break;
      case (perceptionValue == 4):
        maxRange = "25 m"
        break;
      case (perceptionValue == 5):
        maxRange = "50 m"
        break;
      case (perceptionValue == 6):
        maxRange = "75 m"
        break;
      case (perceptionValue == 7):
        maxRange = "100 m"
        break;
      case (perceptionValue == 8):
        maxRange = "125 m"
        break;
      case (perceptionValue == 9):
        maxRange = "150 m"
        break;
      case (perceptionValue == 10):
        maxRange = "200 m"
        break;
      case (perceptionValue == 11):
        maxRange = "300 m"
        break;
      case (perceptionValue == 12):
        maxRange = "500 m"
        break;
      case (perceptionValue == 13):
        maxRange = "1 km"
        break;
      case (perceptionValue == 14):
        maxRange = "5 km"
        break;
      case (perceptionValue == 15):
        maxRange = "10 km"
        break;
      case (perceptionValue == 16):
        maxRange = "50 km"
        break;
      case (perceptionValue == 17):
        maxRange = "100 km"
        break;
      case (perceptionValue == 18):
        maxRange = "200 km"
        break;
      case (perceptionValue == 19):
        maxRange = "500 km"
        break;
      case (perceptionValue >= 20):
        maxRange = "Unlimited"
        break;
    }

    systemData.range = maxRange;



    let speed = 0;

    switch (true) {
      case (dexterityValue <= 1):
        speed = "1 m"
        break;
      case (dexterityValue == 2):
        speed = "4 m"
        break;
      case (dexterityValue == 3):
        speed = "8 m"
        break;
      case (dexterityValue == 4):
        speed = "12 m"
        break;
      case (dexterityValue == 5):
        speed = "16 m"
        break;
      case (dexterityValue == 6):
        speed = "20 m"
        break;
      case (dexterityValue == 7):
        speed = "24 m"
        break;
      case (dexterityValue == 8):
        speed = "28 m"
        break;
      case (dexterityValue == 9):
        speed = "32 m"
        break;
      case (dexterityValue == 10):
        speed = "36 m"
        break;
      case (dexterityValue == 11):
        speed = "40 m"
        break;
      case (dexterityValue == 12):
        speed = "48 m"
        break;
      case (dexterityValue == 13):
        speed = "80 m"
        break;
      case (dexterityValue == 14):
        speed = "160 m"
        break;
      case (dexterityValue == 15):
        speed = "240 m"
        break;
      case (dexterityValue == 16):
        speed = "520 m"
        break;
      case (dexterityValue == 17):
        speed = "1 km"
        break;
      case (dexterityValue == 18):
        speed = "4 km"
        break;
      case (dexterityValue == 19):
        speed = "20 km"
        break;
      case (dexterityValue >= 20):
        speed = "100 km"
        break;
    }

    systemData.speed.value = speed;



    let life = 0;

    let constitutionValue = systemData.abilities.con.value;

    switch (true) {
      case (constitutionValue <= 1):
        life = 5
        break;
      case (constitutionValue == 2):
        life = 15
        break;
      case (constitutionValue == 3):
        life = 30
        break;
      case (constitutionValue == 4):
        life = 55
        break;
      case (constitutionValue == 5):
        life = 65
        break;
      case (constitutionValue == 6):
        life = 75
        break;
      case (constitutionValue == 7):
        life = 85
        break;
      case (constitutionValue == 8):
        life = 95
        break;
      case (constitutionValue == 9):
        life = 110
        break;
      case (constitutionValue == 10):
        life = 125
        break;
      case (constitutionValue == 11):
        life = 140
        break;
      case (constitutionValue == 12):
        life = 155
        break;
      case (constitutionValue == 13):
        life = 175
        break;
      case (constitutionValue == 14):
        life = 195
        break;
      case (constitutionValue == 15):
        life = 215
        break;
      case (constitutionValue == 16):
        life = 240
        break;
      case (constitutionValue == 17):
        life = 265
        break;
      case (constitutionValue == 18):
        life = 300
        break;
      case (constitutionValue == 19):
        life = 340
        break;
      case (constitutionValue >= 20):
        life = 400
        break;
    }

    health.con = life;


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

    let classAttack = 0;
    let classDefense = 0;
    let classMagic = 0;
    let classArmor = 0;
    let classInitiative = 0;
    let classHealth = 0;

    switch (systemData.class.value) {
      case "warrior":
        switch (level) {
          case 1:
            classAttack = 9;
            classDefense = 8;
            classArmor = 5;
            classInitiative = 0;
            classHealth = 20;
            break;
          case 2:
            classAttack = 10;
            classDefense = 10;
            classArmor = 6;
            classInitiative = 1;
            classHealth = 40;
            break;
          case 3:
            classAttack = 11;
            classDefense = 11;
            classArmor = 7;
            classInitiative = 1;
            classHealth = 60;
            break;
          case 4:
            classAttack = 13;
            classDefense = 12;
            classArmor = 8;
            classInitiative = 2;
            classHealth = 80;
            break;
          case 5:
            classAttack = 14;
            classDefense = 13;
            classArmor = 9;
            classInitiative = 2;
            classHealth = 100;
            break;
          case 6:
            classAttack = 15;
            classDefense = 14;
            classArmor = 10;
            classInitiative = 3;
            classHealth = 120;
            break;
          case 7:
            classAttack = 16;
            classDefense = 15;
            classArmor = 11;
            classInitiative = 3;
            classHealth = 140;
            break;
          case 8:
            classAttack = 17;
            classDefense = 16;
            classArmor = 12;
            classInitiative = 4;
            classHealth = 160;
            break;
          case 9:
            classAttack = 18;
            classDefense = 17;
            classArmor = 13;
            classInitiative = 4;
            classHealth = 180;
            break;
          case 10:
            classAttack = 19;
            classDefense = 18;
            classArmor = 14;
            classInitiative = 5;
            classHealth = 200;
            break;
          case 11:
            classAttack = 20;
            classDefense = 19;
            classArmor = 15;
            classInitiative = 5;
            classHealth = 220;
            break;
          case 12:
            classAttack = 21;
            classDefense = 20;
            classArmor = 16;
            classInitiative = 6;
            classHealth = 240;
            break;
          case 13:
            classAttack = 22;
            classDefense = 21;
            classArmor = 17;
            classInitiative = 6;
            classHealth = 260;
            break;
          case 14:
            classAttack = 23;
            classDefense = 22;
            classArmor = 18;
            classInitiative = 7;
            classHealth = 280;
            break;
          case 15:
            classAttack = 24;
            classDefense = 23;
            classArmor = 19;
            classInitiative = 7;
            classHealth = 300;
            break;
          case 16:
            classAttack = 25;
            classDefense = 24;
            classArmor = 20;
            classInitiative = 8;
            classHealth = 320;
            break;
          case 17:
            classAttack = 26;
            classDefense = 25;
            classArmor = 21;
            classInitiative = 8;
            classHealth = 340;
            break;
          case 18:
            classAttack = 27;
            classDefense = 26;
            classArmor = 22;
            classInitiative = 9;
            classHealth = 360;
            break;
          case 19:
            classAttack = 28;
            classDefense = 27;
            classArmor = 23;
            classInitiative = 9;
            classHealth = 380;
            break;
          case 20:
            classAttack = 29;
            classDefense = 28;
            classArmor = 24;
            classInitiative = 10;
            classHealth = 400;
            break;
        }
        break;
      case "ronin":
        switch (level) {
          case 1:
            classAttack = 9;
            classDefense = 8;
            classInitiative = 0;
            classHealth = 20;
            break;
          case 2:
            classAttack = 10;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 40;
            break;
          case 3:
            classAttack = 11;
            classDefense = 11;
            classInitiative = 1;
            classHealth = 60;
            break;
          case 4:
            classAttack = 13;
            classDefense = 12;
            classInitiative = 2;
            classHealth = 80;
            break;
          case 5:
            classAttack = 14;
            classDefense = 13;
            classInitiative = 2;
            classHealth = 100;
            break;
          case 6:
            classAttack = 15;
            classDefense = 14;
            classInitiative = 3;
            classHealth = 120;
            break;
          case 7:
            classAttack = 16;
            classDefense = 15;
            classInitiative = 3;
            classHealth = 140;
            break;
          case 8:
            classAttack = 17;
            classDefense = 16;
            classInitiative = 4;
            classHealth = 160;
            break;
          case 9:
            classAttack = 18;
            classDefense = 17;
            classInitiative = 4;
            classHealth = 180;
            break;
          case 10:
            classAttack = 19;
            classDefense = 18;
            classInitiative = 5;
            classHealth = 200;
            break;
          case 11:
            classAttack = 20;
            classDefense = 19;
            classInitiative = 5;
            classHealth = 220;
            break;
          case 12:
            classAttack = 21;
            classDefense = 20;
            classInitiative = 6;
            classHealth = 240;
            break;
          case 13:
            classAttack = 22;
            classDefense = 21;
            classInitiative = 6;
            classHealth = 260;
            break;
          case 14:
            classAttack = 23;
            classDefense = 22;
            classInitiative = 7;
            classHealth = 280;
            break;
          case 15:
            classAttack = 24;
            classDefense = 23;
            classInitiative = 7;
            classHealth = 300;
            break;
          case 16:
            classAttack = 25;
            classDefense = 24;
            classInitiative = 8;
            classHealth = 320;
            break;
          case 17:
            classAttack = 26;
            classDefense = 25;
            classInitiative = 8;
            classHealth = 340;
            break;
          case 18:
            classAttack = 27;
            classDefense = 26;
            classInitiative = 9;
            classHealth = 360;
            break;
          case 19:
            classAttack = 28;
            classDefense = 27;
            classInitiative = 9;
            classHealth = 380;
            break;
          case 20:
            classAttack = 29;
            classDefense = 28;
            classInitiative = 10;
            classHealth = 400;
            break;
        }
        break;
      case "ninja":
        switch (level) {
          case 1:
            classAttack = 8;
            classDefense = 8;
            classInitiative = 0;
            classHealth = 10;
            break;
          case 2:
            classAttack = 9;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 20;
            break;
          case 3:
            classAttack = 10;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 30;
            break;
          case 4:
            classAttack = 11;
            classDefense = 12;
            classInitiative = 2;
            classHealth = 40;
            break;
          case 5:
            classAttack = 13;
            classDefense = 13;
            classInitiative = 2;
            classHealth = 50;
            break;
          case 6:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 3;
            classHealth = 60;
            break;
          case 7:
            classAttack = 15;
            classDefense = 16;
            classInitiative = 3;
            classHealth = 70;
            break;
          case 8:
            classAttack = 16;
            classDefense = 17;
            classInitiative = 4;
            classHealth = 80;
            break;
          case 9:
            classAttack = 17;
            classDefense = 18;
            classInitiative = 4;
            classHealth = 90;
            break;
          case 10:
            classAttack = 18;
            classDefense = 19;
            classInitiative = 5;
            classHealth = 100;
            break;
          case 11:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 5;
            classHealth = 110;
            break;
          case 12:
            classAttack = 21;
            classDefense = 22;
            classInitiative = 6;
            classHealth = 120;
            break;
          case 13:
            classAttack = 23;
            classDefense = 23;
            classInitiative = 6;
            classHealth = 130;
            break;
          case 14:
            classAttack = 24;
            classDefense = 25;
            classInitiative = 7;
            classHealth = 140;
            break;
          case 15:
            classAttack = 25;
            classDefense = 25;
            classInitiative = 7;
            classHealth = 150;
            break;
          case 16:
            classAttack = 26;
            classDefense = 27;
            classInitiative = 8;
            classHealth = 160;
            break;
          case 17:
            classAttack = 28;
            classDefense = 28;
            classInitiative = 8;
            classHealth = 170;
            break;
          case 18:
            classAttack = 29;
            classDefense = 30;
            classInitiative = 9;
            classHealth = 180;
            break;
          case 19:
            classAttack = 31;
            classDefense = 31;
            classInitiative = 9;
            classHealth = 190;
            break;
          case 20:
            classAttack = 32;
            classDefense = 33;
            classInitiative = 10;
            classHealth = 200;
            break;
        }
        break;
      case "shaolin":
        switch (level) {
          case 1:
            classAttack = 9;
            classDefense = 8;
            classInitiative = 0;
            classHealth = 5;
            break;
          case 2:
            classAttack = 10;
            classDefense = 9;
            classInitiative = 1;
            classHealth = 10;
            break;
          case 3:
            classAttack = 11;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 15;
            break;
          case 4:
            classAttack = 12;
            classDefense = 11;
            classInitiative = 2;
            classHealth = 20;
            break;
          case 5:
            classAttack = 13;
            classDefense = 12;
            classInitiative = 2;
            classHealth = 25;
            break;
          case 6:
            classAttack = 14;
            classDefense = 13;
            classInitiative = 3;
            classHealth = 30;
            break;
          case 7:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 3;
            classHealth = 35;
            break;
          case 8:
            classAttack = 16;
            classDefense = 15;
            classInitiative = 4;
            classHealth = 40;
            break;
          case 9:
            classAttack = 16;
            classDefense = 16;
            classInitiative = 4;
            classHealth = 45;
            break;
          case 10:
            classAttack = 18;
            classDefense = 17;
            classInitiative = 5;
            classHealth = 50;
            break;
          case 11:
            classAttack = 18;
            classDefense = 18;
            classInitiative = 5;
            classHealth = 55;
            break;
          case 12:
            classAttack = 20;
            classDefense = 19;
            classInitiative = 6;
            classHealth = 60;
            break;
          case 13:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 6;
            classHealth = 65;
            break;
          case 14:
            classAttack = 22;
            classDefense = 21;
            classInitiative = 7;
            classHealth = 70;
            break;
          case 15:
            classAttack = 22;
            classDefense = 22;
            classInitiative = 7;
            classHealth = 75;
            break;
          case 16:
            classAttack = 24;
            classDefense = 23;
            classInitiative = 8;
            classHealth = 80;
            break;
          case 17:
            classAttack = 24;
            classDefense = 24;
            classInitiative = 8;
            classHealth = 85;
            break;
          case 18:
            classAttack = 26;
            classDefense = 25;
            classInitiative = 9;
            classHealth = 90;
            break;
          case 19:
            classAttack = 26;
            classDefense = 26;
            classInitiative = 9;
            classHealth = 95;
            break;
          case 20:
            classAttack = 28;
            classDefense = 27;
            classInitiative = 10;
            classHealth = 100;
            break;
        }
        break;
      case "energyShaolin":
        switch (level) {
          case 1:
            classAttack = 8;
            classDefense = 8;
            classInitiative = 0;
            classHealth = 5;

            break;
          case 2:
            classAttack = 9;
            classDefense = 9;
            classInitiative = 1;
            classHealth = 10;
            break;
          case 3:
            classAttack = 11;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 15;
            break;
          case 4:
            classAttack = 11;
            classDefense = 11;
            classInitiative = 2;
            classHealth = 20;
            break;
          case 5:
            classAttack = 13;
            classDefense = 12;
            classInitiative = 2;
            classHealth = 25;
            break;
          case 6:
            classAttack = 14;
            classDefense = 13;
            classInitiative = 3;
            classHealth = 30;
            break;
          case 7:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 3;
            classHealth = 35;
            break;
          case 8:
            classAttack = 16;
            classDefense = 15;
            classInitiative = 4;
            classHealth = 40;
            break;
          case 9:
            classAttack = 17;
            classDefense = 16;
            classInitiative = 4;
            classHealth = 45;
            break;
          case 10:
            classAttack = 18;
            classDefense = 17;
            classInitiative = 5;
            classHealth = 50;
            break;
          case 11:
            classAttack = 19;
            classDefense = 18;
            classInitiative = 5;
            classHealth = 55;
            break;
          case 12:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 6;
            classHealth = 60;
            break;
          case 13:
            classAttack = 21;
            classDefense = 20;
            classInitiative = 6;
            classHealth = 65;
            break;
          case 14:
            classAttack = 22;
            classDefense = 21;
            classInitiative = 7;
            classHealth = 70;
            break;
          case 15:
            classAttack = 23;
            classDefense = 23;
            classInitiative = 7;
            classHealth = 75;
            break;
          case 16:
            classAttack = 24;
            classDefense = 24;
            classInitiative = 8;
            classHealth = 80;
            break;
          case 17:
            classAttack = 25;
            classDefense = 25;
            classInitiative = 8;
            classHealth = 85;
            break;
          case 18:
            classAttack = 27;
            classDefense = 26;
            classInitiative = 9;
            classHealth = 90;
            break;
          case 19:
            classAttack = 27;
            classDefense = 27;
            classInitiative = 9;
            classHealth = 95;
            break;
          case 20:
            classAttack = 29;
            classDefense = 28;
            classInitiative = 10;
            classHealth = 100;
            break;
        }
        break;
      case "henge":
      case "rogue":
        switch (level) {
          case 1:
            classAttack = 8;
            classDefense = 8;
            classInitiative = 1;
            classHealth = 5;
            break;
          case 2:
            classAttack = 9;
            classDefense = 10;
            classInitiative = 2;
            classHealth = 10;
            break;
          case 3:
            classAttack = 10;
            classDefense = 10;
            classInitiative = 3;
            classHealth = 15;
            break;
          case 4:
            classAttack = 11;
            classDefense = 12;
            classInitiative = 4;
            classHealth = 20;
            break;
          case 5:
            classAttack = 13;
            classDefense = 13;
            classInitiative = 5;
            classHealth = 25;
            break;
          case 6:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 6;
            classHealth = 30;
            break;
          case 7:
            classAttack = 15;
            classDefense = 16;
            classInitiative = 7;
            classHealth = 35;
            break;
          case 8:
            classAttack = 16;
            classDefense = 17;
            classInitiative = 8;
            classHealth = 40;
            break;
          case 9:
            classAttack = 17;
            classDefense = 18;
            classInitiative = 9;
            classHealth = 45;
            break;
          case 10:
            classAttack = 18;
            classDefense = 19;
            classInitiative = 10;
            classHealth = 50;
            break;
          case 11:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 11;
            classHealth = 55;
            break;
          case 12:
            classAttack = 21;
            classDefense = 22;
            classInitiative = 12;
            classHealth = 60;
            break;
          case 13:
            classAttack = 23;
            classDefense = 23;
            classInitiative = 13;
            classHealth = 65;
            break;
          case 14:
            classAttack = 24;
            classDefense = 25;
            classInitiative = 14;
            classHealth = 70;
            break;
          case 15:
            classAttack = 25;
            classDefense = 25;
            classInitiative = 15;
            classHealth = 75;
            break;
          case 16:
            classAttack = 26;
            classDefense = 27;
            classInitiative = 16;
            classHealth = 80;
            break;
          case 17:
            classAttack = 28;
            classDefense = 28;
            classInitiative = 17;
            classHealth = 85;
            break;
          case 18:
            classAttack = 29;
            classDefense = 30;
            classInitiative = 18;
            classHealth = 90;
            break;
          case 19:
            classAttack = 31;
            classDefense = 31;
            classInitiative = 19;
            classHealth = 95;
            break;
          case 20:
            classAttack = 32;
            classDefense = 33;
            classInitiative = 20;
            classHealth = 100;
            break;
        }
        break;
      case "kannushi":
        switch (level) {
          case 1:
            classAttack = 8;
            classDefense = 8;
            classInitiative = 1;
            classHealth = 5;
            break;
          case 2:
            classAttack = 9;
            classDefense = 9;
            classInitiative = 2;
            classHealth = 10;
            break;
          case 3:
            classAttack = 11;
            classDefense = 11;
            classInitiative = 3;
            classHealth = 15;
            break;
          case 4:
            classAttack = 12;
            classDefense = 12;
            classInitiative = 4;
            classHealth = 20;
            break;
          case 5:
            classAttack = 13;
            classDefense = 13;
            classInitiative = 5;
            classHealth = 25;
            break;
          case 6:
            classAttack = 13;
            classDefense = 14;
            classInitiative = 6;
            classHealth = 30;
            break;
          case 7:
            classAttack = 14;
            classDefense = 15;
            classInitiative = 7;
            classHealth = 35;
            break;
          case 8:
            classAttack = 15;
            classDefense = 16;
            classInitiative = 8;
            classHealth = 40;
            break;
          case 9:
            classAttack = 17;
            classDefense = 17;
            classInitiative = 9;
            classHealth = 45;
            break;
          case 10:
            classAttack = 17;
            classDefense = 18;
            classInitiative = 10;
            classHealth = 50;
            break;
          case 11:
            classAttack = 18;
            classDefense = 19;
            classInitiative = 11;
            classHealth = 55;
            break;
          case 12:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 12;
            classHealth = 60;
            break;
          case 13:
            classAttack = 21;
            classDefense = 21;
            classInitiative = 13;
            classHealth = 65;
            break;
          case 14:
            classAttack = 21;
            classDefense = 22;
            classInitiative = 14;
            classHealth = 70;
            break;
          case 15:
            classAttack = 22;
            classDefense = 22;
            classInitiative = 15;
            classHealth = 75;
            break;
          case 16:
            classAttack = 22;
            classDefense = 23;
            classInitiative = 16;
            classHealth = 80;
            break;
          case 17:
            classAttack = 24;
            classDefense = 24;
            classInitiative = 17;
            classHealth = 85;
            break;
          case 18:
            classAttack = 26;
            classDefense = 26;
            classInitiative = 18;
            classHealth = 90;
            break;
          case 19:
            classAttack = 27;
            classDefense = 28;
            classInitiative = 19;
            classHealth = 95;
            break;
          case 20:
            classAttack = 28;
            classDefense = 28;
            classInitiative = 20;
            classHealth = 100;
            break;
        }
        break;
      case "samurai":
        switch (level) {
          case 1:
            classAttack = 8;
            classDefense = 9;
            classArmor = 3;
            classInitiative = 0;
            classHealth = 15;

            break;
          case 2:
            classAttack = 10;
            classDefense = 11;
            classArmor = 4;
            classInitiative = 1;
            classHealth = 30;
            break;
          case 3:
            classAttack = 11;
            classDefense = 11;
            classArmor = 5;
            classInitiative = 1;
            classHealth = 45;
            break;
          case 4:
            classAttack = 13;
            classDefense = 13;
            classArmor = 6;
            classInitiative = 2;
            classHealth = 60;
            break;
          case 5:
            classAttack = 14;
            classDefense = 15;
            classArmor = 7;
            classInitiative = 2;
            classHealth = 75;
            break;
          case 6:
            classAttack = 15;
            classDefense = 15;
            classArmor = 8;
            classInitiative = 3;
            classHealth = 90;
            break;
          case 7:
            classAttack = 17;
            classDefense = 18;
            classArmor = 9;
            classInitiative = 3;
            classHealth = 105;
            break;
          case 8:
            classAttack = 18;
            classDefense = 18;
            classArmor = 10;
            classInitiative = 4;
            classHealth = 120;
            break;
          case 9:
            classAttack = 19;
            classDefense = 21;
            classArmor = 11;
            classInitiative = 4;
            classHealth = 135;
            break;
          case 10:
            classAttack = 20;
            classDefense = 21;
            classArmor = 12;
            classInitiative = 5;
            classHealth = 150;
            break;
          case 11:
            classAttack = 22;
            classDefense = 22;
            classArmor = 13;
            classInitiative = 5;
            classHealth = 165;
            break;
          case 12:
            classAttack = 24;
            classDefense = 24;
            classArmor = 14;
            classInitiative = 6;
            classHealth = 180;
            break;
          case 13:
            classAttack = 25;
            classDefense = 26;
            classArmor = 15;
            classInitiative = 6;
            classHealth = 195;
            break;
          case 14:
            classAttack = 26;
            classDefense = 26;
            classArmor = 16;
            classInitiative = 7;
            classHealth = 210;
            break;
          case 15:
            classAttack = 28;
            classDefense = 28;
            classArmor = 17;
            classInitiative = 7;
            classHealth = 225;
            break;
          case 16:
            classAttack = 29;
            classDefense = 30;
            classArmor = 18;
            classInitiative = 8;
            classHealth = 240;
            break;
          case 17:
            classAttack = 31;
            classDefense = 32;
            classArmor = 19;
            classInitiative = 8;
            classHealth = 255;
            break;
          case 18:
            classAttack = 32;
            classDefense = 32;
            classArmor = 20;
            classInitiative = 9;
            classHealth = 270;
            break;
          case 19:
            classAttack = 33;
            classDefense = 34;
            classArmor = 21;
            classInitiative = 9;
            classHealth = 285;
            break;
          case 20:
            classAttack = 35;
            classDefense = 36;
            classArmor = 22;
            classInitiative = 10;
            classHealth = 300;
            break;
        }
        break;
      case "omnyoji":
        switch (level) {
          case 1:
            classMagic = 11;
            classInitiative = 0;
            classHealth = 5;
            break;
          case 2:
            classMagic = 12;
            classInitiative = 1;
            classHealth = 10;
            break;
          case 3:
            classMagic = 14;
            classInitiative = 1;
            classHealth = 15;
            break;
          case 4:
            classMagic = 16;
            classInitiative = 2;
            classHealth = 20;
            break;
          case 5:
            classMagic = 19;
            classInitiative = 2;
            classHealth = 25;
            break;
          case 6:
            classMagic = 20;
            classInitiative = 3;
            classHealth = 30;
            break;
          case 7:
            classMagic = 22;
            classInitiative = 3;
            classHealth = 35;
            break;
          case 8:
            classMagic = 24;
            classInitiative = 4;
            classHealth = 40;
            break;
          case 9:
            classMagic = 27;
            classInitiative = 4;
            classHealth = 45;
            break;
          case 10:
            classMagic = 28;
            classInitiative = 5;
            classHealth = 50;
            break;
          case 11:
            classMagic = 30;
            classInitiative = 5;
            classHealth = 55;
            break;
          case 12:
            classMagic = 32;
            classInitiative = 6;
            classHealth = 60;
            break;
          case 13:
            classMagic = 35;
            classInitiative = 6;
            classHealth = 65;
            break;
          case 14:
            classMagic = 36;
            classInitiative = 7;
            classHealth = 70;
            break;
          case 15:
            classMagic = 38;
            classInitiative = 7;
            classHealth = 75;
            break;
          case 16:
            classMagic = 40;
            classInitiative = 8;
            classHealth = 80;
            break;
          case 17:
            classMagic = 43;
            classInitiative = 8;
            classHealth = 85;
            break;
          case 18:
            classMagic = 44;
            classInitiative = 9;
            classHealth = 90;
            break;
          case 19:
            classMagic = 46;
            classInitiative = 9;
            classHealth = 95;
            break;
          case 20:
            classMagic = 48;
            classInitiative = 10;
            classHealth = 100;
            break;
        }
        break;
      case "ryoshi":
        switch (level) {
          case 1:
            classAttack = 9;
            classDefense = 9;
            classInitiative = 1;
            classHealth = 10;
            break;
          case 2:
            classAttack = 11;
            classDefense = 10;
            classInitiative = 2;
            classHealth = 20;
            break;
          case 3:
            classAttack = 12;
            classDefense = 12;
            classInitiative = 3;
            classHealth = 30;
            break;
          case 4:
            classAttack = 14;
            classDefense = 13;
            classInitiative = 4;
            classHealth = 40;
            break;
          case 5:
            classAttack = 15;
            classDefense = 15;
            classInitiative = 5;
            classHealth = 50;
            break;
          case 6:
            classAttack = 17;
            classDefense = 16;
            classInitiative = 6;
            classHealth = 60;
            break;
          case 7:
            classAttack = 18;
            classDefense = 18;
            classInitiative = 7;
            classHealth = 70;
            break;
          case 8:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 8;
            classHealth = 80;
            break;
          case 9:
            classAttack = 22;
            classDefense = 21;
            classInitiative = 9;
            classHealth = 90;
            break;
          case 10:
            classAttack = 24;
            classDefense = 23;
            classInitiative = 10;
            classHealth = 100;
            break;
          case 11:
            classAttack = 25;
            classDefense = 24;
            classInitiative = 11;
            classHealth = 110;
            break;
          case 12:
            classAttack = 26;
            classDefense = 25;
            classInitiative = 12;
            classHealth = 120;
            break;
          case 13:
            classAttack = 28;
            classDefense = 27;
            classInitiative = 13;
            classHealth = 130;
            break;
          case 14:
            classAttack = 29;
            classDefense = 29;
            classInitiative = 14;
            classHealth = 140;
            break;
          case 15:
            classAttack = 31;
            classDefense = 30;
            classInitiative = 15;
            classHealth = 150;
            break;
          case 16:
            classAttack = 32;
            classDefense = 32;
            classInitiative = 16;
            classHealth = 160;
            break;
          case 17:
            classAttack = 33;
            classDefense = 33;
            classInitiative = 17;
            classHealth = 170;
            break;
          case 18:
            classAttack = 34;
            classDefense = 34;
            classInitiative = 18;
            classHealth = 180;
            break;
          case 19:
            classAttack = 36;
            classDefense = 35;
            classInitiative = 19;
            classHealth = 190;
            break;
          case 20:
            classAttack = 38;
            classDefense = 37;
            classInitiative = 20;
            classHealth = 200;
            break;
        }
        break;
      case "warriorOmnyoji":
        switch (level) {
          case 1:
            classAttack = 8;
            classDefense = 8;
            classInitiative = 0;
            classHealth = 10;
            break;
          case 2:
            classAttack = 9;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 20;
            break;
          case 3:
            classAttack = 11;
            classDefense = 11;
            classInitiative = 1;
            classHealth = 30;
            break;
          case 4:
            classAttack = 12;
            classDefense = 13;
            classInitiative = 2;
            classHealth = 40;
            break;
          case 5:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 2;
            classHealth = 50;
            break;
          case 6:
            classAttack = 15;
            classDefense = 16;
            classInitiative = 3;
            classHealth = 60;
            break;
          case 7:
            classAttack = 17;
            classDefense = 17;
            classInitiative = 3;
            classHealth = 70;
            break;
          case 8:
            classAttack = 18;
            classDefense = 19;
            classInitiative = 4;
            classHealth = 80;
            break;
          case 9:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 4;
            classHealth = 90;
            break;
          case 10:
            classAttack = 21;
            classDefense = 22;
            classInitiative = 5;
            classHealth = 100;
            break;
          case 11:
            classAttack = 23;
            classDefense = 23;
            classInitiative = 5;
            classHealth = 110;
            break;
          case 12:
            classAttack = 24;
            classDefense = 25;
            classInitiative = 6;
            classHealth = 120;
            break;
          case 13:
            classAttack = 26;
            classDefense = 26;
            classInitiative = 6;
            classHealth = 130;
            break;
          case 14:
            classAttack = 27;
            classDefense = 28;
            classInitiative = 7;
            classHealth = 140;
            break;
          case 15:
            classAttack = 29;
            classDefense = 29;
            classInitiative = 7;
            classHealth = 150;
            break;
          case 16:
            classAttack = 30;
            classDefense = 31;
            classInitiative = 8;
            classHealth = 160;
            break;
          case 17:
            classAttack = 32;
            classDefense = 32;
            classInitiative = 8;
            classHealth = 170;
            break;
          case 18:
            classAttack = 33;
            classDefense = 34;
            classInitiative = 9;
            classHealth = 180;
            break;
          case 19:
            classAttack = 35;
            classDefense = 35;
            classInitiative = 9;
            classHealth = 190;
            break;
          case 20:
            classAttack = 36;
            classDefense = 37;
            classInitiative = 10;
            classHealth = 200;
            break;
        }
        break;
    }
    combat.classAttack = classAttack;
    combat.classDefense = classDefense;
    combat.classMagic = classMagic;
    carryArmor.class = classArmor;
    initiative.class = classInitiative;
    health.class = classHealth;

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
