// tslint:disable no-duplicate-string

import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import { parseCommentString } from '../src/index';

@suite
class JSDocCommentsTests {
  @test
  public 'simple comment with no tags'(): void {
    expect(parseCommentString('/** hello world */')).to.deep.eq(
      {
        summary: 'hello world',
      },
      'single-line comment',
    );
    expect(
      parseCommentString(`/**
hello world
this is a second line
*/`),
    ).to.deep.eq(
      {
        summary: 'hello world\nthis is a second line',
      },
      'multi-line comment',
    );

    expect(
      parseCommentString(`/**
hello world


this is a second line
*/`),
    ).to.deep.eq(
      {
        summary: 'hello world\n\n\nthis is a second line',
      },
      'multi-line comment with blank lines',
    );
  }

  @test
  public '@param tags (TS style)'(): void {
    expect(
      parseCommentString(`
/**
 * Add two numbers together
 *
 *
 * @param x first number
 * @param y second number
 */`),
    ).to.deep.eq(
      {
        summary: 'Add two numbers together',
        params: [
          { tagName: '@param', name: 'x', content: 'first number' },
          {
            tagName: '@param',
            name: 'y',
            content: 'second number',
          },
        ],
      },
      'single-line comment',
    );
  }

  @test
  public '@param tags (JS style)'(): void {
    expect(
      parseCommentString(`
/**
 * Add two numbers together
 *
 *
 * @param x {string} first number
 * @param y {string} second number
 */`),
    ).to.deep.eq(
      {
        summary: 'Add two numbers together',
        params: [
          {
            tagName: '@param',
            name: 'x',
            type: 'string',
            content: 'first number',
          },
          {
            tagName: '@param',
            name: 'y',
            type: 'string',
            content: 'second number',
          },
        ],
      },
      'single-line comment',
    );
  }

  @test
  public '@param tags (TSDoc style)'(): void {
    expect(
      parseCommentString(`
/**
 * Add two numbers together
 *
 *
 * @param x - first number
 * @param y - second number
 */`),
    ).to.deep.eq(
      {
        summary: 'Add two numbers together',
        params: [
          {
            tagName: '@param',
            name: 'x',
            content: 'first number',
          },
          {
            tagName: '@param',
            name: 'y',
            content: 'second number',
          },
        ],
      },
      'single-line comment',
    );
  }
}