declare namespace JUnitReportBuilder {}

declare module 'junit-report-builder' {
  export class TestCase {
    className(className: string): TestCase;
    name(name: string): TestCase;
    time(timeInSeconds: number): TestCase;
    failure(message: string): TestCase;
    error(message: string): TestCase;
    stacktrace(stacktrace: string): TestCase;
    skipped(): TestCase;
    standardOutput(log: string): TestCase;
    standardError(log: string): TestCase;
    getFailureCount(): number;
    getErrorCount(): number;
    getSkippedCount(): number;
    errorAttachment(path: string): TestCase;
    build(xml: any): void;
  }

  export class TestSuite {
    name(name: string): TestSuite;
    time(timeInSeconds: number): TestSuite;
    timestamp(timestamp: string): TestSuite;
    property(name: string, value: any): TestSuite;
    testCase(): TestCase;
    getFailureCount(): number;
    getErrorCount(): number;
    getSkippedCount(): number;
    build(xml: any): void;
  }

  export class Builder {
    writeTo(reportPath: string): void;
    testSuite(): TestSuite;
    testCase(): TestCase;
    newBuilder: Builder;
    _testSuitesAndCases: (TestSuite | TestCase)[];
  }

  export function newBuilder(): Builder;
}
