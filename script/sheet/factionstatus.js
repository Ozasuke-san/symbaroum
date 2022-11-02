export class SymbaroumFactionStatusSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["symbaroum", "sheet", "actor", "factions"],
            template: "systems/symbaroum/template/sheet/factionstatus.html",
            width: 900,
            height: 800,
            resizable: true,
            dragDrop: [
                { dropSelector: '.factionstatus' }
            ]
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        // html.find('.factionstatus').drop(async (ev) => { console.log('listenerDrop',ev); });
    }    

    async getData(options)
    {
        // game.symbaroum.log("actor-getData(..)",options);
        let data = {
            id: this.actor.id,
            actor: foundry.utils.deepClone(this.actor),
            system: foundry.utils.deepClone(this.actor.system),
            options: options      
        }
        data.cssClass = this.isEditable ? "editable" : "locked";
        data.editable = this.isEditable;

        data.symbaroumOptions = {
            isGM: game.user.isGM,
        };
        let enrichedFields = [ ];
        if(hasProperty(data,"system.factions")) {
            for(let key in data.system.factions) {
                enrichedFields.push(`system.factions.${key}.name`);
                enrichedFields.push(`system.factions.${key}.leader`);
                enrichedFields.push(`system.factions.${key}.likes`);
                enrichedFields.push(`system.factions.${key}.dislikes`);
            }
        }
        await this._enrichTextFields(data,enrichedFields);
        return data;
    }

    _handleDrop(event) {
        console.log('_handleDrop',event);
        return this.callback(event, "drop");
    }    

    /** @override */
    _onPreventDrop(event) {
        // dont call super
        console.log('_onPreventDrop',event);
    }

    /** @override */
    _canDragDrop(event) {
        console.log('_canDragDrop',event);
    }

    /** @override */
	_onDrop(event) {
        let evtData = JSON.parse(event.dataTransfer.getData("text/plain"));
        console.log('_onDrop',evtData);
        if(evtData.type === 'Actor') {
            event.preventDefault();
            this._onDropActor(event, evtData);            
        }

        // console.log('_onDrop',event, event.dataTransfer.getData("text/plain"));   
	}

    /** @override */
    async _onDropActor(event, data) {
        console.log('_onDropActor', event, data);
        if ( !this.actor.isOwner ) return false;
    }
}

