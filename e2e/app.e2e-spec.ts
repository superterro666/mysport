import { MysportPage } from './app.po';

describe('mysport App', () => {
  let page: MysportPage;

  beforeEach(() => {
    page = new MysportPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
