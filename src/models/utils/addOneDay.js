export default function addOneDay(unix) {
    let dateObject = new Date(unix * 1000);
    dateObject = new Date(dateObject.getTime() + (24 * 60 * 60 * 1000));
    return Math.floor(dateObject.getTime() / 1000);
}