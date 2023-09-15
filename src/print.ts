/* eslint-disable @eslint-community/mysticatea/eslint-comments/disable-enable-pair, @eslint-community/mysticatea/ts/no-unsafe-return, @eslint-community/mysticatea/ts/no-unsafe-call */
import type {
    Alternative,
    Assertion,
    AtomicGroup,
    Backreference,
    CapturingGroup,
    Character,
    CharacterClass,
    CharacterClassRange,
    CharacterSet,
    ClassRangesCharacterClassElement,
    ClassStringDisjunction,
    Element,
    EscapeCharacterSet,
    Pattern,
    StringAlternative,
    UnicodePropertyCharacterSet,
    UnicodeSetsCharacterClassElement,
} from "./ast"

export const printPattern = (pattern: Pattern): string =>
    printAlternatives(pattern.alternatives)

export const printAlternatives = (alternatives: Alternative[]): string =>
    alternatives.map((alternative) => printAlternative(alternative)).join("|")

export const printAlternative = (alternative: Alternative): string =>
    alternative.elements.map((element) => printElement(element)).join("")

// eslint-disable-next-line consistent-return
export function printElement(element: Element): string {
    // eslint-disable-next-line default-case
    switch (element.type) {
        case "Assertion":
            return printAssertion(element)

        case "AtomicGroup":
            return printAtomicGroup(element)

        case "Backreference":
            return printBackreference(element)

        case "CapturingGroup":
            return printCapturingGroup(element)

        case "Character":
            return printCharacter(element)

        case "CharacterClass":
            return printCharacterClass(element)

        case "CharacterSet":
            return printCharacterSet(element)

        case "ExpressionCharacterClass":
            return printExpressionCharacterClass(element)

        case "Group":
            return printGroup(element)

        case "Quantifier":
            return printQuantifier(element)
    }
}

// eslint-disable-next-line consistent-return
export function printAssertion(assertion: Assertion): string {
    // eslint-disable-next-line default-case
    switch (assertion.kind) {
        case "end":
            return printEndAssertion(assertion)

        case "lookahead":
            return printLookaheadAssertion(assertion)

        case "lookbehind":
            return printLookbehindAssertion(assertion)

        case "start":
            return printStartAssertion(assertion)

        case "word":
            return printWordAssertion(assertion)
    }
}

export const printAtomicGroup = (atomicGroup: AtomicGroup): string =>
    `(?>${printAlternatives(atomicGroup.alternatives)})`

export const printBackreference = (backreference: Backreference): string =>
    `\\${backreference.ref}`

export const printCapturingGroup = (capturingGroup: CapturingGroup): string =>
    capturingGroup.name
        ? `(?<${capturingGroup.name}>${printAlternatives(
              capturingGroup.alternatives,
          )})`
        : `(${printAlternatives(capturingGroup.alternatives)})`

export const printCharacter = (character: Character): string =>
    String.fromCharCode(character.value)

export const printCharacterClass = (characterClass: CharacterClass): string =>
    `[${
        characterClass.negate ? "^" : ""
    }${printClassRangesCharacterClassElements(characterClass.elements)}]`

export const printClassRangesCharacterClassElements = (
    classRangesCharacterClassElements: ClassRangesCharacterClassElement[],
): string =>
    classRangesCharacterClassElements
        // eslint-disable-next-line array-callback-return, consistent-return
        .map((element): string => {
            // eslint-disable-next-line default-case
            switch (element.type) {
                case "Character":
                    return printCharacter(element)

                case "CharacterClassRange":
                    return printCharacterClassRange(element)

                case "CharacterSet":
                    return printCharacterSet(element)
            }
        })
        .join("")

export const printCharacterClassRange = (
    characterClassRange: CharacterClassRange,
): string =>
    `${printCharacter(characterClassRange.min)}-${printCharacter(
        characterClassRange.max,
    )}`

export function printCharacterSet(characterSet: CharacterSet): string {
    switch (characterSet.kind) {
        case "any":
            return "."

        case "property":
            return printUnicodePropertyCharacterSet(characterSet)

        default:
            return printEscapeCharacterSet(characterSet)
    }
}

export const printEscapeCharacterSet = (
    escapeCharacterSet: EscapeCharacterSet,
): string =>
    escapeCharacterSet.negate
        ? { digit: "\\D", space: "\\S", word: "\\W" }[escapeCharacterSet.kind]
        : { digit: "\\d", space: "\\s", word: "\\w" }[escapeCharacterSet.kind]

export const printUnicodePropertyCharacterSet = (
    unicodePropertyCharacterSet: UnicodePropertyCharacterSet,
): string =>
    `\\${unicodePropertyCharacterSet.negate ? "P" : "p"}{${
        unicodePropertyCharacterSet.key
    }${
        unicodePropertyCharacterSet.value
            ? `=${unicodePropertyCharacterSet.value}`
            : ""
    }}`

export const printUnicodeSetsCharacterClassElements = (
    elements: UnicodeSetsCharacterClassElement[],
): string =>
    elements
        // eslint-disable-next-line array-callback-return, consistent-return
        .map((element) => {
            // eslint-disable-next-line default-case
            switch (element.type) {
                case "Character":
                    return printCharacter(element)

                case "CharacterClass":
                    return printCharacterClass(element)

                case "CharacterClassRange":
                    return printCharacterClassRange(element)

                case "CharacterSet":
                    return printCharacterSet(element)

                case "ClassStringDisjunction":
                    return printClassStringDisjunction(element)

                case "ExpressionCharacterClass":
                    return printExpressionCharacterClass(element)
            }
        })
        .join("")

export const printClassStringDisjunction(disjunction: ClassStringDisjunction): string =>
    `\\q{${printAlternatives(disjunction.alternatives)}}`

export const printStringAlternatives = (alternatives: StringAlternative[]): string =>
        alternatives.map(alternative => {

        }).join("|")
