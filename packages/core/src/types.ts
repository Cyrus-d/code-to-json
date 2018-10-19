import * as ts from 'typescript';

export interface EntityMap {
  declaration: ts.Declaration;
  symbol: ts.Symbol;
  type: ts.Type;
}
