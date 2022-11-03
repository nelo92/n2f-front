export class Util {
  public static stringToNumber(value: any): number {
    return parseFloat(this.numberFormat(value, 2));
  }
  private static numberFormat(val, dec) {
    var multiplier = Math.pow(10, dec);
    return (Math.round(val * multiplier) / multiplier).toFixed(dec);
  }
}
