export default class Todo {
    constructor({text, description='', date=new Date(), cost=1, repeat=false, completed=false, replenish=false}) {
        const errors = this.validate({text, date, cost, repeat, completed, replenish});
        if (errors.length > 0) {
            throw new Error(errors[0]);
        };
        this.text = text;
        this.description = description;
        this.date = date;
        this.cost = cost;
        this.completed = completed;
        this.repeat = repeat;
        this.replenish = replenish;
    }

    validate({text, date, cost, repeat, completed, replenish}) {
        const errors = [];
        if(!text) errors.push(new Error('Cannot create todo, you must add text.'));
        if(date instanceof Date == false) errors.push(new Error('Please provide a valid date.'));
        if(isNaN(cost) || cost == 0) errors.push(new Error('You must provide a number for the cost!'));
        if(typeof repeat != 'boolean') errors.push(new Error('Repeat must be of type boolean.'));
        if(typeof completed != 'boolean') errors.push(new Error('Completed must be of type boolean.'));
        if(typeof replenish != 'boolean') errors.push(new Error('Replenish must be of type boolean.'));
        return errors;
    }

    update({text, date, cost, repeat, completed, description}) {
        // Temporary new version to validate before applying changes.
        const newVersion = {
            text: text !== undefined ? text : this.text,
            description: description !== undefined ? description : this.description,
            date: date !== undefined ? date : this.date,
            cost: cost !== undefined ? cost : this.cost,
            repeat: repeat !== undefined ? repeat : this.repeat,
            replenish: replenish !== undefined ? replenish : this.replenish,
            completed: completed !== undefined ? completed : this.completed,
        };
    
        // Validate potential new version without altering current state.
        const errors = this.validate(newVersion);
        if (errors.length > 0) {
            return {message: "Failed to update due to validation errors.", errors};
        }
    
        // Apply new values only after validation.
        Object.assign(this, newVersion);
        return {message: `Successfully updated ${this.id}`};
    }
}