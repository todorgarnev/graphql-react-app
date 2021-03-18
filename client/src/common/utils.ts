export default class Utils {
  public static isArrayNotEmpty = (array: any[]): boolean => {
    return array !== undefined && array !== null && array.length > 0;
  }

  public static isNotNull = (val: any): boolean => {
    return val !== undefined && val !== null;
  }
}