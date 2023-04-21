// remove given properties from object
function filterObject(obj: any, args: string[]): any {
    const props = Object.getOwnPropertyNames(obj._doc || obj);
    props.forEach((property) => {
        if (args.includes(property)) {
            obj[property] = undefined;
        }
    });
    return obj;
}
// remove given properties from object array
function filterObjectArray(obj: any[], args: string[]): any[] {
    for (let i = 0; i < obj.length; i++) {
        obj[i] = filterObject(obj[i], args);
    }
    return obj;
}

export { filterObject, filterObjectArray };
