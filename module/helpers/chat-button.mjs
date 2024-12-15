// Chat button handler
/**
 * Execute  chat button click event and return the result.
 */
export async function chatButton(chatMessage, buttonType) {
    const actorId = chatMessage.speaker.actor;
    const actor = game.actors.get(actorId);

    if (buttonType == "chatButtonFumble") {
        const table = await fromUuid("Compendium.shinobi.rolltables.RollTable.YJa6KsWMNTC859HM");
        await table.draw({ roll: true, displayChat: true });
    }

    if (buttonType == "chatButtonDefense") {
        const activeTokens = canvas.tokens.controlled;
        if (activeTokens.length < 1) {
            ui.notifications.warn(game.i18n.localize("No token selected."));
            return;
        } else if (activeTokens.length > 1) {
            ui.notifications.warn(game.i18n.localize("Multiple tokens selected."));
            return;
        }
        const targetActors = [];
        activeTokens.forEach((token) => {
            targetActors.push(token.actor);
        });
        const targetActor = targetActors[0];

        let armor = 0;

        let confirmed = false;

        // Add armor for a Defense roll
        await Dialog.wait({
            title: game.i18n.localize("Indicate your Armor Value"),
            content: await renderTemplate("systems/shinobi/templates/roll/parts/armor-dialog.hbs", { defense: targetActor.system.combat.defense }),
            buttons: {
                one: {
                    icon: '<i class="fas fa-check"></i>',
                    label: game.i18n.localize("OK"),
                    callback: () => confirmed = true
                },
                two: {
                    icon: '<i class="fas fa-times"></i>',
                    label: game.i18n.localize("Cancel"),
                    callback: () => confirmed = false
                }
            },
            default: "Cancel",
            close: e => {
                if (confirmed) {
                    armor = document.getElementById("dialogArmorValue").value;
                    if (!armor) {
                        armor = 0;
                    }
                }
            }
        })


        // Construct the Defense Roll instance

        //TODO Work on the damage calculation when the add is lower than 0 (Counter attacks)
        if (confirmed) {

            let totalDefenseRoll = new Roll("1d10x10 + @defense + @armor", { defense: targetActor.system.combat.defense, armor: armor });

            // Execute the roll
            await totalDefenseRoll.evaluate();

            let chatData = {
                speaker: ChatMessage.getSpeaker({ actor: targetActor }),
                flavor: game.i18n.localize("Check of") + " " + game.i18n.localize("Defense Capacity"),
                rollMode: game.settings.get("core", "rollMode"),
            };

            let template = "systems/shinobi/templates/roll/roll.hbs";

            let chatCritical = null;
            let chatFumble = null;
            if (totalDefenseRoll.terms[0].total >= 10) chatCritical = 1;
            if (totalDefenseRoll.terms[0].total == 1) chatFumble = 1;


            chatData.content = await renderTemplate(
                template,
                {
                    formula: totalDefenseRoll.formula,
                    tooltip: await totalDefenseRoll.getTooltip(),
                    critical: chatCritical,
                    fumble: chatFumble,
                    total: totalDefenseRoll.total,
                    rolls: [totalDefenseRoll],
                }
            );

            await totalDefenseRoll.toMessage(chatData)

            let totalDefense = totalDefenseRoll.total;


            let differenceValue = 0;

            let totalAttack = chatMessage.flags.total;


            differenceValue = totalAttack - totalDefense;

            let combatResult = 0

            switch (true) {
                case differenceValue < 4:
                    combatResult = 0
                    break
                case differenceValue >= 4 && differenceValue < 6:
                    combatResult = 25
                    break
                case differenceValue >= 6 && differenceValue < 9:
                    combatResult = 50
                    break
                case differenceValue >= 9 && differenceValue < 11:
                    combatResult = 75
                    break
                case differenceValue >= 11 && differenceValue < 14:
                    combatResult = 100
                    break
                case differenceValue >= 14 && differenceValue < 19:
                    combatResult = 150
                    break
                case differenceValue >= 19 && differenceValue < 24:
                    combatResult = 200
                    break
                case differenceValue >= 24 && differenceValue < 30:
                    combatResult = 300
                    break
                case differenceValue >= 30 && differenceValue < 37:
                    combatResult = 400
                    break
                case differenceValue >= 37:
                    combatResult = 600
                    break
            }

            const speaker = ChatMessage.getSpeaker({ actor: actor });
            const rollMode = game.settings.get("core", "rollMode");
            let label = `${chatMessage.flavor}`;


            let chatData2 = {
                speaker: speaker,
                flavor: game.i18n.localize("Damage Calculation"),
                rollMode: rollMode,
            };


            chatData2.content = await renderTemplate(
                "systems/shinobi/templates/roll/roll-apply.hbs",
                {
                    differenceValue: differenceValue,
                    value: combatResult,
                    target: targetActor.name,
                    type: buttonType,
                }
            );

            ChatMessage.create(chatData2);
        }
    }
}