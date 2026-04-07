# Claude Guidelines

## Git workflow

- **Never push directly to `main`**. Always create a branch, open a PR, and merge it.
- Always squash merge PRs.
- PR titles must follow the [conventional commit](https://www.conventionalcommits.org/) format (e.g. `feat: add button`, `fix!: breaking change`). This is enforced by CI.
- Do not commit or push to GitHub without explicit confirmation from the user.
