export class ObjectUtils {
    static copy = (obj: any) => JSON.parse(JSON.stringify(obj));
}