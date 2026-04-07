# Claude Guidelines

## Git workflow

- **Never push directly to `main`**. Always create a branch, open a PR, and merge it.
- Do not squash merge automatically. Only squash merge if explicitly asked.
- PR titles must follow the [conventional commit](https://www.conventionalcommits.org/) format (e.g. `feat: add button`, `fix!: breaking change`). This is enforced by CI.
