export default class SpoonMeterController {
    constructor(maxSpoons = 10) {
        this.maxSpoons = maxSpoons;
        this.spoons = this.maxSpoons;
    }

    increase(amount) {
        this.spoons += amount;
    }

    decrease(amount) {
        this.spoons -= amount;
    }
}