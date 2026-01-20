# AI Coding Agent Instructions

## Project Overview
**btasaki9.github.io** is a GitHub Pages personal website project hosted as a static web repository. The codebase is minimal and serves as a portfolio/profile page.

## Project Structure
- **index.html** - Main entry point; currently contains a simple test page (`<h1>This is a test!</h1>`)
- **README.md** - Sparse project description
- **.devcontainer/devcontainer.json** - Dev environment configuration (Ubuntu 24.04.3 LTS)

## Development Environment
The project uses a dev container setup with automatic HTTP server startup:
- **Dev Container Image**: `mcr.microsoft.com/devcontainers/universal:2`
- **Post-Attach Command**: `npx http-server -p 8000` (auto-starts local web server)
- **Preview**: Access the site at `http://localhost:8000` while dev container is active

## Key Patterns & Conventions

### Static HTML Site
- Pure HTML/CSS/JavaScript (no build process, no package.json)
- Direct file modification approach - edit HTML files and refresh browser
- Files are served as-is; no transpilation or bundling needed

### GitHub Pages Hosting
- Main branch is the default and deployment source
- Repository follows GitHub Pages naming convention: `{username}.github.io`
- Any changes to `index.html` and supporting assets are immediately published

## Common Workflows
1. **Local Development**: Dev container auto-starts `http-server` on port 8000
2. **Testing Changes**: Edit files, refresh browser to see live changes
3. **Deployment**: Push commits to main branch - GitHub Pages auto-deploys

## Integration Points
- **GitHub Pages**: Static hosting (no build step required)
- **Dev Container**: Enables consistent development environment across machines
- **HTTP Server**: npx http-server provides local preview (Ubuntu 24.04 LTS with Node.js via universal image)

## Notes for AI Agents
- Keep modifications minimal and HTML-focused
- Avoid introducing build processes or complex dependencies unless explicitly required
- Remember to refresh browser during local development to see changes
- Preserve the `.devcontainer` configuration for developer experience consistency
