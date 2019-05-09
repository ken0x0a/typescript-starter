import { BaseMiddleware } from './base.middleware';

describe('BaseMiddleware', () => {
  it('should be defined', () => {
    expect(new BaseMiddleware()).toBeDefined();
  });
});
