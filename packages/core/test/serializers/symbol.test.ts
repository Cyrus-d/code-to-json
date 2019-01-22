import { createRef } from '@code-to-json/utils';
import { generateId } from '@code-to-json/utils-ts';
import { expect } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as ts from 'typescript';
import { RefRegistry, SourceFileRef } from '../../src';
import serializeSourceFile from '../../src/serializers/source-file';
import { setupScenario } from './helpers';

@suite
export class SymbolSerializtionTests {
  @test
  public async 'Function signature'(): Promise<void> {
    const { checker, sf, collector } = setupScenario(
      'function add(a: number, b: number): number { return a + b; }',
    );
    const [fnSym] = checker.getSymbolsInScope(sf, ts.SymbolFlags.Function);
    if (!fnSym) {
      throw new Error('Function has no symbol');
    }
    const [fnDecl] = fnSym.declarations;
    expect(fnDecl.getText()).to.eql('function add(a: number, b: number): number { return a + b; }');

    const sfRef: SourceFileRef = createRef<RefRegistry, 'sourceFile'>('sourceFile', generateId(sf));
    const serialized = serializeSourceFile(sf, checker, sfRef, collector);
    expect(serialized).to.deep.eq({
      entity: 'sourceFile',
      extension: 'ts',
      id: '01m4wlvb4v71',
      isDeclarationFile: false,
      moduleName: 'temp-project/module',
      originalFileName: 'module.ts',
      pathInPackage: 'module',
    });
  }
}
