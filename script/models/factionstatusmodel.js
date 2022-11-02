/*import DataModel from "/common/data/fields.mjs";
import * as fields from "/common/data/fields.mjs";
*/
const fields = foundry.data.fields;

export class FactionStatusListModel extends foundry.abstract.DataModel {
    static defineSchema() {
        return {
            year: new fields.NumberField({required: true, nullable: false, integer: true, positive: false}),
            month: new fields.StringField({required: false, blank: true}),
            factions:  new fields.ArrayField(new fields.SchemaField({
                name: new fields.StringField({required: false, blank: true}),
                generalStatus: new fields.StringField({required: false, blank: true}),
                leader: new fields.StringField({required: false, blank: true}),
                impressedBy: new fields.StringField({required: false, blank: true}),
                likes: new fields.StringField({required: false, blank: true}),            
                dislikes: new fields.StringField({required: false, blank: true}),            
                factionhistory: new fields.ArrayField(new fields.SchemaField({
                    player: new fields.StringField({required: false, blank: true}),
                    events: new fields.ArrayField(new fields.StringField()),
                    status: new fields.NumberField({required: false, nullable: false, integer: true})          
                }) )
            }))
        }
    }
}