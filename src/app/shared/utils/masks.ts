export class Masks {
    // private props
    public maskDateSlash = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    public maskDateDash = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskHour = [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/];
    public maskDateHour = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/];
    public maskMobileNo = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    public maskTeleNo = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskTeleArea = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskTeleUS = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    public maskIP = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/];
    public maskIPV4 = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
    public maskIPV6 = [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ':',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ':',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ':',
      /\d/,
      ':',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ':',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ':',
      /\d/,
      /\d/,
      /\d/
    ];
}