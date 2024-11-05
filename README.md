# Tauri Checkers

Checkers made with tauri and sveltekit (Svelte 5) using the new runes with typescript <br />
Project is split up into multiple reusable parts and types for better understanding of the project

## TODO:

- Win condition when the enemy player can't move
- Ability to take down 2 enemy pieces when possible

> [!NOTE]
> To bundle successfully
>
> ```bash
> NO_STRIP=true pnpm tauri build
> ```
>
> When building the app, it's needed for appimage to work, but will result in a huge file
