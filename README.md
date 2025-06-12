# Test Suite

## Overview

This repository contains automated tests for the EasyFleet management system using Playwright. The test suite covers various aspects of fleet management functionality, including unit management and filtering capabilities.

## Prerequisites

- Node.js (latest LTS version recommended)
- npm (Node Package Manager)
- Modern web browser (Chrome recommended)

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd EF-Play
```

2. Install dependencies:

```bash
npm install
```

```bash
npm install -D @playwright/test@latest
```

# Also download new browser binaries and their dependencies:

```bash
npx playwright install --with-deps
```

## Running Tests

### Open Playwright Test Runner

```bash
npx playwright test --ui
```

### Run Tests Headlessly

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test landing-page.spec.ts
```

## Test Categories

### Unit Management Tests

- Filter functionality
- Unit creation and modification
- Data validation
- Search capabilities

## Best Practices

- Each test file follows the AAA pattern (Arrange, Act, Assert)
- Tests are independent and can run in isolation
- Meaningful test descriptions using proper naming conventions
- Proper use of beforeEach and afterEach hooks for test setup and cleanup

## Contributing

1. Create a new branch for your feature
2. Write or update tests
3. Ensure all tests pass
4. Submit a pull request

## Troubleshooting

If you encounter any issues:

1.Make sure all dependencies are installed
2.Clear Playwright cache: `npx playwright install --force`
3.Delete node_modules and reinstall dependencies
4.Check for any browser console errors

## Support

For any questions or issues, please create an issue in the repository.
