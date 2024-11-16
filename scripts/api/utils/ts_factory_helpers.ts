import ts from "typescript";

export function questionToken(value?: boolean) {
  return value
    ? undefined
    : ts.factory.createToken(ts.SyntaxKind.QuestionToken);
}

export function createReference(value: string) {
  return ts.factory.createTypeReferenceNode(value);
}
