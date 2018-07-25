import { MyOwnCustomFontAwesomeModule } from './my-own-custom-font-awesome.module';

describe('MyOwnCustomFontAwesomeModule', () => {
  let myOwnCustomFontAwesomeModule: MyOwnCustomFontAwesomeModule;

  beforeEach(() => {
    myOwnCustomFontAwesomeModule = new MyOwnCustomFontAwesomeModule();
  });

  it('should create an instance', () => {
    expect(myOwnCustomFontAwesomeModule).toBeTruthy();
  });
});
