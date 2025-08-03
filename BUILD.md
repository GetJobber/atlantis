# Building Atlantis

This project uses pnpm for package management and building.

## Initial Setup

After cloning the repository:

```bash
# Install dependencies
pnpm install

# Build all packages (optional - only needed if you're working on the packages)
pnpm run bootstrap
```

## Available Scripts

### Package Building

- `pnpm run bootstrap` - Clean and build all workspace packages (runs bootstrap
  in each package)
- `pnpm run build:packages` - Build all packages except the site
- `pnpm run build:hooksIndex` - Generate the hooks index file

### Development

- `pnpm run start` - Start the Storybook development server
- `pnpm run storybook` - Same as start

### Full Build

- `pnpm run build` - Build everything (storybook, site, generate sitemap)
- `pnpm run build:all` - Build storybook and site, merge dist
- `pnpm run site:build` - Build just the site

### Linting & Testing

- `pnpm run lint` - Run all linters
- `pnpm run lint:fix` - Fix all auto-fixable lint issues
- `pnpm run test` - Run tests

### Cleaning

- `pnpm run clean` - Clean all node_modules and build artifacts

## Notes

- The old `postinstall` script that ran bootstrap automatically has been removed
- You only need to run `pnpm run bootstrap` if you're actively developing the
  packages
- For most development (working on Storybook stories), just `pnpm install` is
  sufficient
