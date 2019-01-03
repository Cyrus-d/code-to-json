import { SerializedSymbol, WalkerOutput, WalkerOutputData } from '@code-to-json/core';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import formatSourceFile from '../../src/formatters/source-file';
import formatSymbol, { FormattedSymbol } from '../../src/formatters/symbol';

@suite
class SymbolFormatterTests {
  @test
  public async basic() {
    const sym: SerializedSymbol = {
      id: '1234',
      name: 'foo',
      entity: 'symbol',
    };
    const wo: WalkerOutputData = {
      symbol: {
        '1234': sym,
      },
      type: {},
      node: {},
      declaration: {},
      sourceFile: {},
    };
    expect(formatSymbol(wo, sym)).to.deep.eq({
      name: 'foo',
    });
  }

  @test
  public async 'with flags'() {
    const sym: SerializedSymbol = {
      id: '1234',
      flags: ['Interface'],
      name: 'foo',
      entity: 'symbol',
    };
    const wo: WalkerOutputData = {
      symbol: {
        '1234': sym,
      },
      type: {},
      node: {},
      declaration: {},
      sourceFile: {},
    };
    expect(formatSymbol(wo, sym)).to.deep.eq({
      name: 'foo',
      flags: ['interface'],
    });
  }

  @test
  public async 'with exports'() {
    const sym: SerializedSymbol = {
      id: '1234',
      exports: [['symbol', '3456'] as any],
      name: 'foo',
      entity: 'symbol',
    };
    const wo: WalkerOutputData = {
      symbol: {
        '1234': sym,
        '3456': {
          id: '3456',
          name: 'somethingExported',
          entity: 'symbol',
        },
      },
      type: {},
      node: {},
      declaration: {},
      sourceFile: {},
    };
    expect(formatSymbol(wo, sym)).to.deep.eq({
      name: 'foo',
      exports: [
        {
          name: 'somethingExported',
        },
      ],
    });
  }

  @test
  public async 'with empty exports'() {
    const sym: SerializedSymbol = {
      id: '1234',
      exports: [],
      name: 'foo',
      entity: 'symbol',
    };
    const wo: WalkerOutputData = {
      symbol: {
        '1234': sym,
      },
      type: {},
      node: {},
      declaration: {},
      sourceFile: {},
    };
    expect(formatSymbol(wo, sym)).to.deep.eq({
      name: 'foo',
    });
  }

  @test
  public async 'with members'() {
    const sym: SerializedSymbol = {
      id: '1234',
      members: [['symbol', '3456'] as any],
      name: 'foo',
      entity: 'symbol',
    };
    const wo: WalkerOutputData = {
      symbol: {
        '1234': sym,
        '3456': {
          id: '3456',
          name: 'somethingExported',
          entity: 'symbol',
        },
      },
      type: {},
      node: {},
      declaration: {},
      sourceFile: {},
    };
    expect(formatSymbol(wo, sym)).to.deep.eq({
      name: 'foo',
      members: [
        {
          name: 'somethingExported',
        },
      ],
    });
  }

  @test
  public async 'with bad member reference'() {
    const sym: SerializedSymbol = {
      id: '1234',
      members: [['symbol', '3'] as any],
      name: 'foo',
      entity: 'symbol',
    };
    const wo: WalkerOutputData = {
      symbol: {
        '1234': sym,
      },
      type: {},
      node: {},
      declaration: {},
      sourceFile: {},
    };
    expect(formatSymbol(wo, sym)).to.deep.eq({
      name: 'foo',
      members: [],
    });
  }

  @test
  public async 'with empty members'() {
    const sym: SerializedSymbol = {
      id: '1234',
      members: [],
      name: 'foo',
      entity: 'symbol',
    };
    const wo: WalkerOutputData = {
      symbol: {
        '1234': sym,
      },
      type: {},
      node: {},
      declaration: {},
      sourceFile: {},
    };
    expect(formatSymbol(wo, sym)).to.deep.eq({
      name: 'foo',
    });
  }

  @test
  public async 'with bad export reference'() {
    const sym: SerializedSymbol = {
      id: '1234',
      exports: [['symbol', '3'] as any],
      name: 'foo',
      entity: 'symbol',
    };
    const wo: WalkerOutputData = {
      symbol: {
        '1234': sym,
      },
      type: {},
      node: {},
      declaration: {},
      sourceFile: {},
    };
    expect(formatSymbol(wo, sym)).to.deep.eq({
      name: 'foo',
      exports: [],
    });
  }

  @test
  public async 'with call and constructor signatures'() {
    const sym: SerializedSymbol = {
      id: '1234',
      callSignatures: [['symbol', '3'] as any],
      constructorSignatures: [['symbol', '3'] as any],
      name: 'foo',
      entity: 'symbol',
    };
    const wo: WalkerOutputData = {
      symbol: {
        '1234': sym,
      },
      type: {},
      node: {},
      declaration: {},
      sourceFile: {},
    };
    expect(formatSymbol(wo, sym)).to.deep.eq({
      name: 'foo',
      callSignatures: [
        {
          parameters: undefined,
        },
      ],
      constructorSignatures: [
        {
          parameters: undefined,
        },
      ],
    });
  }
}