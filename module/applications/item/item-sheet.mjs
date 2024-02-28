export default class itemSheetShinobi extends ItemSheet {
    get template() {
        return `systems/shinobi/templates/${this.item.type}.hbs`;
    }

    getData(options) {

        // Retrieve base data structure.
        const context = super.getData();

        // Use a safe clone of the item data for further operations.
        const itemData = context.data;

        // Add the item's data to context.data for easier access, as well as flags.
        context.system = itemData.system;
        context.flags = itemData.flags;

        data.config = CONFIG.shinobi;

        return context;
    }
}