import { Flags, flagsToString } from '@code-to-json/utils';
import { isNamedDeclaration } from '@code-to-json/utils/lib/guards';
import * as ts from 'typescript';
import { ProcessingQueue } from '../processing-queue';
import { DeclarationRef, NodeRef, TypeRef } from '../processing-queue/ref';

export interface SerializedNode {
  thing: 'node';
  id: string;
  flags?: Flags;
  text: string;
  kind: string;
  name?: string;
  decorators?: string[];
  modifiers?: string[];
  type?: TypeRef;
}

export default function serializeNode(
  n: ts.Node,
  checker: ts.TypeChecker,
  ref: NodeRef | DeclarationRef,
  _queue: ProcessingQueue
): SerializedNode {
  const { flags, kind, decorators, modifiers } = n;
  const details: SerializedNode = {
    id: ref.id,
    thing: 'node',
    kind: ts.SyntaxKind[kind],
    flags: flagsToString(flags, 'node'),
    text: n.getText()
  };
  if (decorators && decorators.length) {
    details.decorators = decorators.map((d) => ts.SyntaxKind[d.kind]);
  }
  if (modifiers && modifiers.length) {
    details.modifiers = modifiers.map((d) => ts.SyntaxKind[d.kind]);
  }
  const name = isNamedDeclaration(n) && n.name;
  let typ: ts.Type | undefined;
  const sym = checker.getSymbolAtLocation(name || n);
  if (sym && name) {
    details.name = name.getText();
    typ = checker.getTypeOfSymbolAtLocation(sym, name);
  }
  if (typ) {
    details.type = _queue.queue(typ, 'type', checker);
  }
  return details;
}
