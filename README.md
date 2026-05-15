# Body Load HUD for SillyTavern

A first-pass UI extension that:
- Adds a floating BODY LOAD STATUS panel.
- Updates the panel after each message using simple keyword rules.
- Stores state per chat using SillyTavern chat metadata.
- Injects the current HUD into the generation context using a prompt interceptor, so the AI can see the current state.

## Install

Extract this folder as:

`public/scripts/extensions/third-party/body-load-hud`

Then reload SillyTavern and enable the extension.

Some setups also support user extensions under:

`data/<user-handle>/extensions/body-load-hud`

## Notes

This is a starter version. It uses simple keyword detection, not a full AI state updater.
A stronger v2 would use SillyTavern `generateQuietPrompt()` with JSON schema to update the HUD more intelligently every turn.
