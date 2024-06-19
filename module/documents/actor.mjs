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
    let talisman = systemData.attributes.talisman;
    let bloodPower = systemData.attributes.bloodPower;
    let bloodPowerLearning = systemData.attributes.bloodPowerLearning;
    let inteligenceValue = systemData.abilities.int.value;
    let perceptionValue = systemData.abilities.per.value;
    let dexterityValue = systemData.abilities.dex.value;
    let powerValue = systemData.abilities.pow.value;
    let constitutionValue = systemData.abilities.con.value;
    let regeneration = systemData.regeneration


    switch (systemData.advDisadv.advanced) {
      case true:
        systemData.adv.total =
          systemData.adv1.cost +
          systemData.adv2.cost +
          systemData.adv3.cost +
          systemData.adv4.cost +
          systemData.adv.ip

        systemData.disadv.total =
          systemData.disadv1.gain +
          systemData.disadv2.gain +
          systemData.disadv3.gain +
          systemData.disadv4.gain +
          systemData.disadv.ip
        break;

      case false:
        systemData.adv.total =
          systemData.adv1.cost +
          systemData.adv2.cost +
          systemData.adv3.cost +
          systemData.adv4.cost

        systemData.disadv.total =
          systemData.disadv1.gain +
          systemData.disadv2.gain +
          systemData.disadv3.gain +
          systemData.disadv4.gain
        break;
    }
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

    let baseArcana = 0;



    switch (true) {
      case (powerValue <= 4):
        baseArcana = 0
        break;
      case (powerValue == 5):
        baseArcana = 70
        break;
      case (powerValue == 6):
        baseArcana = 75
        break;
      case (powerValue == 7):
        baseArcana = 80
        break;
      case (powerValue == 8):
        baseArcana = 90
        break;
      case (powerValue == 9):
        baseArcana = 100
        break;
      case (powerValue == 10):
        baseArcana = 115
        break;
      case (powerValue == 11):
        baseArcana = 130
        break;
      case (powerValue == 12):
        baseArcana = 150
        break;
      case (powerValue == 13):
        baseArcana = 170
        break;
      case (powerValue == 14):
        baseArcana = 195
        break;
      case (powerValue == 15):
        baseArcana = 220
        break;
      case (powerValue == 16):
        baseArcana = 250
        break;
      case (powerValue == 17):
        baseArcana = 280
        break;
      case (powerValue == 18):
        baseArcana = 320
        break;
      case (powerValue == 19):
        baseArcana = 360
        break;
      case (powerValue >= 20):
        baseArcana = 420
        break;
    }

    arcana.base = baseArcana;

    let baseCAT = 0;

    switch (true) {
      case (powerValue <= 4):
        baseCAT = 0
        break;
      case (powerValue >= 5 && powerValue <= 7):
        baseCAT = 5
        break;
      case (powerValue >= 8 && powerValue <= 11):
        baseCAT = 10
        break;
      case (powerValue >= 12 && powerValue <= 14):
        baseCAT = 15
        break;
      case (powerValue == 15):
        baseCAT = 20
        break;
      case (powerValue >= 16 && powerValue <= 17):
        baseCAT = 25
        break;
      case (powerValue >= 18 && powerValue <= 19):
        baseCAT = 30
        break;
      case (powerValue >= 20):
        baseCAT = 35
        break;
    }

    cat.base = baseCAT;

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
      case "ronin":
        ipCostStr = 2
        ipCostDex = 2
        ipCostPer = 2
        ipCostInt = 2
        ipCostWil = 3
        break;
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
    let classBloodPowerLearning = 0;

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
            classInitiative = 1;
            classHealth = 15;
            break;
          case 2:
            classAttack = 10;
            classDefense = 9;
            classInitiative = 2;
            classHealth = 30;
            break;
          case 3:
            classAttack = 11;
            classDefense = 10;
            classInitiative = 3;
            classHealth = 45;
            break;
          case 4:
            classAttack = 12;
            classDefense = 12;
            classInitiative = 4;
            classHealth = 60;
            break;
          case 5:
            classAttack = 13;
            classDefense = 13;
            classInitiative = 5;
            classHealth = 75;
            break;
          case 6:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 6;
            classHealth = 90;
            break;
          case 7:
            classAttack = 16;
            classDefense = 15;
            classInitiative = 7;
            classHealth = 105;
            break;
          case 8:
            classAttack = 17;
            classDefense = 15;
            classInitiative = 8;
            classHealth = 120;
            break;
          case 9:
            classAttack = 18;
            classDefense = 16;
            classInitiative = 9;
            classHealth = 135;
            break;
          case 10:
            classAttack = 18;
            classDefense = 18;
            classInitiative = 10;
            classHealth = 150;
            break;
          case 11:
            classAttack = 19;
            classDefense = 19;
            classInitiative = 11;
            classHealth = 165;
            break;
          case 12:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 12;
            classHealth = 180;
            break;
          case 13:
            classAttack = 21;
            classDefense = 21;
            classInitiative = 13;
            classHealth = 195;
            break;
          case 14:
            classAttack = 22;
            classDefense = 22;
            classInitiative = 14;
            classHealth = 210;
            break;
          case 15:
            classAttack = 23;
            classDefense = 23;
            classInitiative = 15;
            classHealth = 225;
            break;
          case 16:
            classAttack = 24;
            classDefense = 24;
            classInitiative = 16;
            classHealth = 240;
            break;
          case 17:
            classAttack = 25;
            classDefense = 25;
            classInitiative = 17;
            classHealth = 255;
            break;
          case 18:
            classAttack = 26;
            classDefense = 26;
            classInitiative = 18;
            classHealth = 270;
            break;
          case 19:
            classAttack = 27;
            classDefense = 27;
            classInitiative = 19;
            classHealth = 285;
            break;
          case 20:
            classAttack = 28;
            classDefense = 28;
            classInitiative = 20;
            classHealth = 300;
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
            classKi = 40;
            break;
          case 2:
            classAttack = 9;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 20;
            classKi = 40;
            break;
          case 3:
            classAttack = 10;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 30;
            classKi = 50;
            break;
          case 4:
            classAttack = 11;
            classDefense = 12;
            classInitiative = 2;
            classHealth = 40;
            classKi = 50;
            break;
          case 5:
            classAttack = 13;
            classDefense = 13;
            classInitiative = 2;
            classHealth = 50;
            classKi = 60;
            break;
          case 6:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 3;
            classHealth = 60;
            classKi = 60;
            break;
          case 7:
            classAttack = 15;
            classDefense = 16;
            classInitiative = 3;
            classHealth = 70;
            classKi = 70;
            break;
          case 8:
            classAttack = 16;
            classDefense = 17;
            classInitiative = 4;
            classHealth = 80;
            classKi = 700;
            break;
          case 9:
            classAttack = 17;
            classDefense = 18;
            classInitiative = 4;
            classHealth = 90;
            classKi = 80;
            break;
          case 10:
            classAttack = 18;
            classDefense = 19;
            classInitiative = 5;
            classHealth = 100;
            classKi = 80;
            break;
          case 11:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 5;
            classHealth = 110;
            classKi = 90;
            break;
          case 12:
            classAttack = 21;
            classDefense = 22;
            classInitiative = 6;
            classHealth = 120;
            classKi = 90;
            break;
          case 13:
            classAttack = 23;
            classDefense = 23;
            classInitiative = 6;
            classHealth = 130;
            classKi = 100;
            break;
          case 14:
            classAttack = 24;
            classDefense = 25;
            classInitiative = 7;
            classHealth = 140;
            classKi = 100;
            break;
          case 15:
            classAttack = 25;
            classDefense = 25;
            classInitiative = 7;
            classHealth = 150;
            classKi = 110;
            break;
          case 16:
            classAttack = 26;
            classDefense = 27;
            classInitiative = 8;
            classHealth = 160;
            classKi = 110;
            break;
          case 17:
            classAttack = 28;
            classDefense = 28;
            classInitiative = 8;
            classHealth = 170;
            classKi = 120;
            break;
          case 18:
            classAttack = 29;
            classDefense = 30;
            classInitiative = 9;
            classHealth = 180;
            classKi = 120;
            break;
          case 19:
            classAttack = 31;
            classDefense = 31;
            classInitiative = 9;
            classHealth = 190;
            classKi = 130;
            break;
          case 20:
            classAttack = 32;
            classDefense = 33;
            classInitiative = 10;
            classHealth = 200;
            classKi = 130;
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
            classKi = 30;
            classKiLearning = 4;
            break;
          case 2:
            classAttack = 10;
            classDefense = 9;
            classInitiative = 1;
            classHealth = 10;
            classKi = 30;
            classKiLearning = 7;
            break;
          case 3:
            classAttack = 11;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 15;
            classKi = 30;
            classKiLearning = 11;
            break;
          case 4:
            classAttack = 12;
            classDefense = 11;
            classInitiative = 2;
            classHealth = 20;
            classKi = 30;
            classKiLearning = 15;
            break;
          case 5:
            classAttack = 13;
            classDefense = 12;
            classInitiative = 2;
            classHealth = 25;
            classKi = 30;
            classKiLearning = 19;
            break;
          case 6:
            classAttack = 14;
            classDefense = 13;
            classInitiative = 3;
            classHealth = 30;
            classKi = 30;
            classKiLearning = 23;
            break;
          case 7:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 3;
            classHealth = 35;
            classKi = 30;
            classKiLearning = 27;
            break;
          case 8:
            classAttack = 16;
            classDefense = 15;
            classInitiative = 4;
            classHealth = 40;
            classKi = 30;
            classKiLearning = 31;
            break;
          case 9:
            classAttack = 16;
            classDefense = 16;
            classInitiative = 4;
            classHealth = 45;
            classKi = 30;
            classKiLearning = 35;
            break;
          case 10:
            classAttack = 18;
            classDefense = 17;
            classInitiative = 5;
            classHealth = 50;
            classKi = 30;
            classKiLearning = 39;
            break;
          case 11:
            classAttack = 18;
            classDefense = 18;
            classInitiative = 5;
            classHealth = 55;
            classKi = 30;
            classKiLearning = 43;
            break;
          case 12:
            classAttack = 20;
            classDefense = 19;
            classInitiative = 6;
            classHealth = 60;
            classKi = 30;
            classKiLearning = 47;
            break;
          case 13:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 6;
            classHealth = 65;
            classKi = 30;
            classKiLearning = 51;
            break;
          case 14:
            classAttack = 22;
            classDefense = 21;
            classInitiative = 7;
            classHealth = 70;
            classKi = 30;
            classKiLearning = 55;
            break;
          case 15:
            classAttack = 22;
            classDefense = 22;
            classInitiative = 7;
            classHealth = 75;
            classKi = 30;
            classKiLearning = 59;
            break;
          case 16:
            classAttack = 24;
            classDefense = 23;
            classInitiative = 8;
            classHealth = 80;
            classKi = 30;
            classKiLearning = 63;
            break;
          case 17:
            classAttack = 24;
            classDefense = 24;
            classInitiative = 8;
            classHealth = 85;
            classKi = 30;
            classKiLearning = 67;
            break;
          case 18:
            classAttack = 26;
            classDefense = 25;
            classInitiative = 9;
            classHealth = 90;
            classKi = 30;
            classKiLearning = 71;
            break;
          case 19:
            classAttack = 26;
            classDefense = 26;
            classInitiative = 9;
            classHealth = 95;
            classKi = 30;
            classKiLearning = 75;
            break;
          case 20:
            classAttack = 28;
            classDefense = 27;
            classInitiative = 10;
            classHealth = 100;
            classKi = 30;
            classKiLearning = 79;
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
            classKi = 30;
            break;
          case 2:
            classAttack = 9;
            classDefense = 9;
            classInitiative = 1;
            classHealth = 10;
            classKi = 30;
            break;
          case 3:
            classAttack = 11;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 15;
            classKi = 40;
            break;
          case 4:
            classAttack = 11;
            classDefense = 11;
            classInitiative = 2;
            classHealth = 20;
            classKi = 40;
            break;
          case 5:
            classAttack = 13;
            classDefense = 12;
            classInitiative = 2;
            classHealth = 25;
            classKi = 50;
            break;
          case 6:
            classAttack = 14;
            classDefense = 13;
            classInitiative = 3;
            classHealth = 30;
            classKi = 50;
            break;
          case 7:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 3;
            classHealth = 35;
            classKi = 60;
            break;
          case 8:
            classAttack = 16;
            classDefense = 15;
            classInitiative = 4;
            classHealth = 40;
            classKi = 60;
            break;
          case 9:
            classAttack = 17;
            classDefense = 16;
            classInitiative = 4;
            classHealth = 45;
            classKi = 70;
            break;
          case 10:
            classAttack = 18;
            classDefense = 17;
            classInitiative = 5;
            classHealth = 50;
            classKi = 70;
            break;
          case 11:
            classAttack = 19;
            classDefense = 18;
            classInitiative = 5;
            classHealth = 55;
            classKi = 80;
            break;
          case 12:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 6;
            classHealth = 60;
            classKi = 80;
            break;
          case 13:
            classAttack = 21;
            classDefense = 20;
            classInitiative = 6;
            classHealth = 65;
            classKi = 90;
            break;
          case 14:
            classAttack = 22;
            classDefense = 21;
            classInitiative = 7;
            classHealth = 70;
            classKi = 90;
            break;
          case 15:
            classAttack = 23;
            classDefense = 23;
            classInitiative = 7;
            classHealth = 75;
            classKi = 100;
            break;
          case 16:
            classAttack = 24;
            classDefense = 24;
            classInitiative = 8;
            classHealth = 80;
            classKi = 100;
            break;
          case 17:
            classAttack = 25;
            classDefense = 25;
            classInitiative = 8;
            classHealth = 85;
            classKi = 110;
            break;
          case 18:
            classAttack = 27;
            classDefense = 26;
            classInitiative = 9;
            classHealth = 90;
            classKi = 110;
            break;
          case 19:
            classAttack = 27;
            classDefense = 27;
            classInitiative = 9;
            classHealth = 95;
            classKi = 120;
            break;
          case 20:
            classAttack = 29;
            classDefense = 28;
            classInitiative = 10;
            classHealth = 100;
            classKi = 120;
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
            classTalisman = 0;
            break;
          case 2:
            classAttack = 9;
            classDefense = 9;
            classInitiative = 2;
            classHealth = 10;
            classTalisman = 1;
            break;
          case 3:
            classAttack = 11;
            classDefense = 11;
            classInitiative = 3;
            classHealth = 15;
            classTalisman = 1;
            break;
          case 4:
            classAttack = 12;
            classDefense = 12;
            classInitiative = 4;
            classHealth = 20;
            classTalisman = 1;
            break;
          case 5:
            classAttack = 13;
            classDefense = 13;
            classInitiative = 5;
            classHealth = 25;
            classTalisman = 2;
            break;
          case 6:
            classAttack = 13;
            classDefense = 14;
            classInitiative = 6;
            classHealth = 30;
            classTalisman = 2;
            break;
          case 7:
            classAttack = 14;
            classDefense = 15;
            classInitiative = 7;
            classHealth = 35;
            classTalisman = 2;
            break;
          case 8:
            classAttack = 15;
            classDefense = 16;
            classInitiative = 8;
            classHealth = 40;
            classTalisman = 3;
            break;
          case 9:
            classAttack = 17;
            classDefense = 17;
            classInitiative = 9;
            classHealth = 45;
            classTalisman = 3;
            break;
          case 10:
            classAttack = 17;
            classDefense = 18;
            classInitiative = 10;
            classHealth = 50;
            classTalisman = 3;
            break;
          case 11:
            classAttack = 18;
            classDefense = 19;
            classInitiative = 11;
            classHealth = 55;
            classTalisman = 4;
            break;
          case 12:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 12;
            classHealth = 60;
            classTalisman = 4;
            break;
          case 13:
            classAttack = 21;
            classDefense = 21;
            classInitiative = 13;
            classHealth = 65;
            classTalisman = 4;
            break;
          case 14:
            classAttack = 21;
            classDefense = 22;
            classInitiative = 14;
            classHealth = 70;
            classTalisman = 4;
            break;
          case 15:
            classAttack = 22;
            classDefense = 22;
            classInitiative = 15;
            classHealth = 75;
            classTalisman = 4;
            break;
          case 16:
            classAttack = 22;
            classDefense = 23;
            classInitiative = 16;
            classHealth = 80;
            classTalisman = 4;
            break;
          case 17:
            classAttack = 24;
            classDefense = 24;
            classInitiative = 17;
            classHealth = 85;
            classTalisman = 5;
            break;
          case 18:
            classAttack = 26;
            classDefense = 26;
            classInitiative = 18;
            classHealth = 90;
            classTalisman = 5;
            break;
          case 19:
            classAttack = 27;
            classDefense = 28;
            classInitiative = 19;
            classHealth = 95;
            classTalisman = 6;
            break;
          case 20:
            classAttack = 28;
            classDefense = 28;
            classInitiative = 20;
            classHealth = 100;
            classTalisman = 6;
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
            classArcana = 120;
            classInvocation = 7;
            break;
          case 2:
            classAttack = 10;
            classDefense = 11;
            classArmor = 4;
            classInitiative = 1;
            classHealth = 30;
            classArcana = 140;
            classInvocation = 10;
            break;
          case 3:
            classAttack = 11;
            classDefense = 11;
            classArmor = 5;
            classInitiative = 1;
            classHealth = 45;
            classArcana = 160;
            classInvocation = 13;
            break;
          case 4:
            classAttack = 13;
            classDefense = 13;
            classArmor = 6;
            classInitiative = 2;
            classHealth = 60;
            classArcana = 180;
            classInvocation = 16;
            break;
          case 5:
            classAttack = 14;
            classDefense = 15;
            classArmor = 7;
            classInitiative = 2;
            classHealth = 75;
            classArcana = 200;
            classInvocation = 19;
            break;
          case 6:
            classAttack = 15;
            classDefense = 15;
            classArmor = 8;
            classInitiative = 3;
            classHealth = 90;
            classArcana = 220;
            classInvocation = 22;
            break;
          case 7:
            classAttack = 17;
            classDefense = 18;
            classArmor = 9;
            classInitiative = 3;
            classHealth = 105;
            classArcana = 240;
            classInvocation = 25;
            break;
          case 8:
            classAttack = 18;
            classDefense = 18;
            classArmor = 10;
            classInitiative = 4;
            classHealth = 120;
            classArcana = 260;
            classInvocation = 28;
            break;
          case 9:
            classAttack = 19;
            classDefense = 21;
            classArmor = 11;
            classInitiative = 4;
            classHealth = 135;
            classArcana = 280;
            classInvocation = 31;
            break;
          case 10:
            classAttack = 20;
            classDefense = 21;
            classArmor = 12;
            classInitiative = 5;
            classHealth = 150;
            classArcana = 300;
            classInvocation = 34;
            break;
          case 11:
            classAttack = 22;
            classDefense = 22;
            classArmor = 13;
            classInitiative = 5;
            classHealth = 165;
            classArcana = 320;
            classInvocation = 37;
            break;
          case 12:
            classAttack = 24;
            classDefense = 24;
            classArmor = 14;
            classInitiative = 6;
            classHealth = 180;
            classArcana = 340;
            classInvocation = 40;
            break;
          case 13:
            classAttack = 25;
            classDefense = 26;
            classArmor = 15;
            classInitiative = 6;
            classHealth = 195;
            classArcana = 360;
            classInvocation = 43;
            break;
          case 14:
            classAttack = 26;
            classDefense = 26;
            classArmor = 16;
            classInitiative = 7;
            classHealth = 210;
            classArcana = 380;
            classInvocation = 46;
            break;
          case 15:
            classAttack = 28;
            classDefense = 28;
            classArmor = 17;
            classInitiative = 7;
            classHealth = 225;
            classArcana = 400;
            classInvocation = 49;
            break;
          case 16:
            classAttack = 29;
            classDefense = 30;
            classArmor = 18;
            classInitiative = 8;
            classHealth = 240;
            classArcana = 420;
            classInvocation = 52;
            break;
          case 17:
            classAttack = 31;
            classDefense = 32;
            classArmor = 19;
            classInitiative = 8;
            classHealth = 255;
            classArcana = 440;
            classInvocation = 55;
            break;
          case 18:
            classAttack = 32;
            classDefense = 32;
            classArmor = 20;
            classInitiative = 9;
            classHealth = 270;
            classArcana = 460;
            classInvocation = 58;
            break;
          case 19:
            classAttack = 33;
            classDefense = 34;
            classArmor = 21;
            classInitiative = 9;
            classHealth = 285;
            classArcana = 480;
            classInvocation = 61;
            break;
          case 20:
            classAttack = 35;
            classDefense = 36;
            classArmor = 22;
            classInitiative = 10;
            classHealth = 300;
            classArcana = 500;
            classInvocation = 64;
            break;
        }
        break;
      case "omnyoji":
        switch (level) {
          case 1:
            classMagic = 11;
            classInitiative = 0;
            classHealth = 5;
            classArcana = 225;
            classChannel = 8;
            classCAT = 4;
            break;
          case 2:
            classMagic = 12;
            classInitiative = 1;
            classHealth = 10;
            classArcana = 350;
            classChannel = 10;
            classCAT = 5;
            break;
          case 3:
            classMagic = 14;
            classInitiative = 1;
            classHealth = 15;
            classArcana = 425;
            classChannel = 11;
            classCAT = 5;
            break;
          case 4:
            classMagic = 16;
            classInitiative = 2;
            classHealth = 20;
            classArcana = 600;
            classChannel = 13;
            classCAT = 5;
            break;
          case 5:
            classMagic = 19;
            classInitiative = 2;
            classHealth = 25;
            classArcana = 675;
            classChannel = 15;
            classCAT = 5;
            break;
          case 6:
            classMagic = 20;
            classInitiative = 3;
            classHealth = 30;
            classArcana = 800;
            classChannel = 17;
            classCAT = 6;
            break;
          case 7:
            classMagic = 22;
            classInitiative = 3;
            classHealth = 35;
            classArcana = 875;
            classChannel = 18;
            classCAT = 6;
            break;
          case 8:
            classMagic = 24;
            classInitiative = 4;
            classHealth = 40;
            classArcana = 1050;
            classChannel = 20;
            classCAT = 6;
            break;
          case 9:
            classMagic = 27;
            classInitiative = 4;
            classHealth = 45;
            classArcana = 1125;
            classChannel = 22;
            classCAT = 6;
            break;
          case 10:
            classMagic = 28;
            classInitiative = 5;
            classHealth = 50;
            classArcana = 1250;
            classChannel = 24;
            classCAT = 7;
            break;
          case 11:
            classMagic = 30;
            classInitiative = 5;
            classHealth = 55;
            classArcana = 1325;
            classChannel = 25;
            classCAT = 7;
            break;
          case 12:
            classMagic = 32;
            classInitiative = 6;
            classHealth = 60;
            classArcana = 1500;
            classChannel = 27;
            classCAT = 7;
            break;
          case 13:
            classMagic = 35;
            classInitiative = 6;
            classHealth = 65;
            classArcana = 1575;
            classChannel = 29;
            classCAT = 7;
            break;
          case 14:
            classMagic = 36;
            classInitiative = 7;
            classHealth = 70;
            classArcana = 1700;
            classChannel = 31;
            classCAT = 8;
            break;
          case 15:
            classMagic = 38;
            classInitiative = 7;
            classHealth = 75;
            classArcana = 1775;
            classChannel = 32;
            classCAT = 8;
            break;
          case 16:
            classMagic = 40;
            classInitiative = 8;
            classHealth = 80;
            classArcana = 1950;
            classChannel = 34;
            classCAT = 8;
            break;
          case 17:
            classMagic = 43;
            classInitiative = 8;
            classHealth = 85;
            classArcana = 2025;
            classChannel = 36;
            classCAT = 8;
            break;
          case 18:
            classMagic = 44;
            classInitiative = 9;
            classHealth = 90;
            classArcana = 2150;
            classChannel = 38;
            classCAT = 9;
            break;
          case 19:
            classMagic = 46;
            classInitiative = 9;
            classHealth = 95;
            classArcana = 2225;
            classChannel = 39;
            classCAT = 9;
            break;
          case 20:
            classMagic = 48;
            classInitiative = 10;
            classHealth = 100;
            classArcana = 2400;
            classChannel = 41;
            classCAT = 9;
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
            classBloodPowerLearning = 2;
            break;
          case 2:
            classAttack = 11;
            classDefense = 10;
            classInitiative = 2;
            classHealth = 20;
            classBloodPowerLearning = 2;
            break;
          case 3:
            classAttack = 12;
            classDefense = 12;
            classInitiative = 3;
            classHealth = 30;
            classBloodPowerLearning = 3;
            break;
          case 4:
            classAttack = 14;
            classDefense = 13;
            classInitiative = 4;
            classHealth = 40;
            classBloodPowerLearning = 3;
            break;
          case 5:
            classAttack = 15;
            classDefense = 15;
            classInitiative = 5;
            classHealth = 50;
            classBloodPowerLearning = 4;
            break;
          case 6:
            classAttack = 17;
            classDefense = 16;
            classInitiative = 6;
            classHealth = 60;
            classBloodPowerLearning = 4;
            break;
          case 7:
            classAttack = 18;
            classDefense = 18;
            classInitiative = 7;
            classHealth = 70;
            classBloodPowerLearning = 5;
            break;
          case 8:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 8;
            classHealth = 80;
            classBloodPowerLearning = 5;
            break;
          case 9:
            classAttack = 22;
            classDefense = 21;
            classInitiative = 9;
            classHealth = 90;
            classBloodPowerLearning = 6;
            break;
          case 10:
            classAttack = 24;
            classDefense = 23;
            classInitiative = 10;
            classHealth = 100;
            classBloodPowerLearning = 6;
            break;
          case 11:
            classAttack = 25;
            classDefense = 24;
            classInitiative = 11;
            classHealth = 110;
            classBloodPowerLearning = 7;
            break;
          case 12:
            classAttack = 26;
            classDefense = 25;
            classInitiative = 12;
            classHealth = 120;
            classBloodPowerLearning = 7;
            break;
          case 13:
            classAttack = 28;
            classDefense = 27;
            classInitiative = 13;
            classHealth = 130;
            classBloodPowerLearning = 7;
            break;
          case 14:
            classAttack = 29;
            classDefense = 29;
            classInitiative = 14;
            classHealth = 140;
            classBloodPowerLearning = 8;
            break;
          case 15:
            classAttack = 31;
            classDefense = 30;
            classInitiative = 15;
            classHealth = 150;
            classBloodPowerLearning = 9;
            break;
          case 16:
            classAttack = 32;
            classDefense = 32;
            classInitiative = 16;
            classHealth = 160;
            classBloodPowerLearning = 10;
            break;
          case 17:
            classAttack = 33;
            classDefense = 33;
            classInitiative = 17;
            classHealth = 170;
            classBloodPowerLearning = 11;
            break;
          case 18:
            classAttack = 34;
            classDefense = 34;
            classInitiative = 18;
            classHealth = 180;
            classBloodPowerLearning = 11;
            break;
          case 19:
            classAttack = 36;
            classDefense = 35;
            classInitiative = 19;
            classHealth = 190;
            classBloodPowerLearning = 12;
            break;
          case 20:
            classAttack = 38;
            classDefense = 37;
            classInitiative = 20;
            classHealth = 200;
            classBloodPowerLearning = 12;
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
            classArcana = 20;
            classChannel = 5;
            classCAT = 2;
            break;
          case 2:
            classAttack = 9;
            classDefense = 10;
            classInitiative = 1;
            classHealth = 20;
            classArcana = 90;
            classChannel = 8;
            classCAT = 2;
            break;
          case 3:
            classAttack = 11;
            classDefense = 11;
            classInitiative = 1;
            classHealth = 30;
            classArcana = 160;
            classChannel = 10;
            classCAT = 2;
            break;
          case 4:
            classAttack = 12;
            classDefense = 13;
            classInitiative = 2;
            classHealth = 40;
            classArcana = 230;
            classChannel = 11;
            classCAT = 3;
            break;
          case 5:
            classAttack = 14;
            classDefense = 14;
            classInitiative = 2;
            classHealth = 50;
            classArcana = 300;
            classChannel = 12;
            classCAT = 4;
            break;
          case 6:
            classAttack = 15;
            classDefense = 16;
            classInitiative = 3;
            classHealth = 60;
            classArcana = 370;
            classChannel = 14;
            classCAT = 4;
            break;
          case 7:
            classAttack = 17;
            classDefense = 17;
            classInitiative = 3;
            classHealth = 70;
            classArcana = 390;
            classChannel = 15;
            classCAT = 4;
            break;
          case 8:
            classAttack = 18;
            classDefense = 19;
            classInitiative = 4;
            classHealth = 80;
            classArcana = 410;
            classChannel = 16;
            classCAT = 4;
            break;
          case 9:
            classAttack = 20;
            classDefense = 20;
            classInitiative = 4;
            classHealth = 90;
            classArcana = 480;
            classChannel = 17;
            classCAT = 5;
            break;
          case 10:
            classAttack = 21;
            classDefense = 22;
            classInitiative = 5;
            classHealth = 100;
            classArcana = 600;
            classChannel = 20;
            classCAT = 5;
            break;
          case 11:
            classAttack = 23;
            classDefense = 23;
            classInitiative = 5;
            classHealth = 110;
            classArcana = 620;
            classChannel = 22;
            classCAT = 5;
            break;
          case 12:
            classAttack = 24;
            classDefense = 25;
            classInitiative = 6;
            classHealth = 120;
            classArcana = 690;
            classChannel = 25;
            classCAT = 5;
            break;
          case 13:
            classAttack = 26;
            classDefense = 26;
            classInitiative = 6;
            classHealth = 130;
            classArcana = 710;
            classChannel = 26;
            classCAT = 5;
            break;
          case 14:
            classAttack = 27;
            classDefense = 28;
            classInitiative = 7;
            classHealth = 140;
            classArcana = 780;
            classChannel = 27;
            classCAT = 6;
            break;
          case 15:
            classAttack = 29;
            classDefense = 29;
            classInitiative = 7;
            classHealth = 150;
            classArcana = 800;
            classChannel = 29;
            classCAT = 6;
            break;
          case 16:
            classAttack = 30;
            classDefense = 31;
            classInitiative = 8;
            classHealth = 160;
            classArcana = 920;
            classChannel = 32;
            classCAT = 6;
            break;
          case 17:
            classAttack = 32;
            classDefense = 32;
            classInitiative = 8;
            classHealth = 170;
            classArcana = 940;
            classChannel = 34;
            classCAT = 7;
            break;
          case 18:
            classAttack = 33;
            classDefense = 34;
            classInitiative = 9;
            classHealth = 180;
            classArcana = 960;
            classChannel = 34;
            classCAT = 7;
            break;
          case 19:
            classAttack = 35;
            classDefense = 35;
            classInitiative = 9;
            classHealth = 190;
            classArcana = 1030;
            classChannel = 35;
            classCAT = 7;
            break;
          case 20:
            classAttack = 36;
            classDefense = 37;
            classInitiative = 10;
            classHealth = 200;
            classArcana = 1150;
            classChannel = 38;
            classCAT = 7;
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
    ki.class = classKi;
    kiLearning.class = classKiLearning;
    arcana.class = classArcana;
    channel.class = classChannel;
    cat.multipliers = classCAT;
    invocation.class = classInvocation;
    talisman.class = classTalisman;
    bloodPowerLearning.class = classBloodPowerLearning;

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
      talisman.others

    bloodPower.max =
      bloodPower.base +
      bloodPower.others

    bloodPowerLearning.max =
      bloodPowerLearning.class +
      bloodPowerLearning.others

    if (abilities.con.value <= 14 && systemData.regeneration.sobrenatural == false) {
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
          if (regeneration.value > health.max) regeneration.value = health.max
          break
        case 2:
          regeneration.value = 250 + regeneration.others
          if (regeneration.value > health.max) regeneration.value = health.max
          break
        case 3:
          regeneration.value = 500 + regeneration.others
          if (regeneration.value > health.max) regeneration.value = health.max
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
