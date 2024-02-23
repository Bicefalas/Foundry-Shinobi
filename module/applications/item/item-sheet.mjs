export default class itemSheetShinobi extends ItemSheet {
    get template() {
        return `systems/shinobi/templates/${this.item.type}.html`;
    }

}