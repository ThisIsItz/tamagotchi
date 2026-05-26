# Virtual Pet

A browser-based virtual pet game inspired by the classic Tamagotchi, built as a personal project to explore state management, game loop design, and component architecture in React.

## Demo

**Hatching and naming**

<video src="https://github.com/user-attachments/assets/0416ea7f-2035-4989-b61b-5240ab599b41" controls width="160" style="max-height:400px"></video>

**Caring for your pet**

<video src="https://github.com/user-attachments/assets/b07ab0af-8729-4353-98cf-ff71bf894e7f" controls width="160" style="max-height:400px"></video>

**Mini-game**

<video src="https://github.com/user-attachments/assets/77b8029c-a5a7-4045-bf0a-4aae76cd3c15" controls width="160" style="max-height:400px"></video>

## What it is

You hatch a creature from an egg, give it a name, and keep it alive by feeding it, playing with it, letting it sleep, and keeping it clean. Stats decay in real time — neglect your pet long enough and it will get sick or die. The goal is to balance five stats (hunger, happiness, energy, hygiene, and health) across the creature's lifetime.

## How the game works

The simulation runs on a tick system. Every 60 seconds a tick fires, and each stat decays by a fixed amount per tick. The decay values are tuned so that no single stat is critical on its own, but letting several fall at once accelerates health loss.

**Stats and decay (per tick)**

| Stat      | Decay                                    |
| --------- | ---------------------------------------- |
| Hunger    | -3                                       |
| Energy    | -2                                       |
| Happiness | -2 (plus penalty if other stats are low) |
| Hygiene   | -1.5                                     |

**Health** does not decay on its own. It only starts dropping after a stat has been below the critical threshold for at least one tick, and recovers slowly once all stats are back above the recovery threshold.

**Mood** is derived deterministically from the current stats on every render. There are seven possible moods: ecstatic, happy, neutral, sad, angry, sick, and sleeping. The sprite displayed is driven by this derived value.

**Actions** the player can take:

| Action   | Effect summary                                          |
| -------- | ------------------------------------------------------- |
| Feed     | +hunger, small +happiness, small -hygiene               |
| Play     | +happiness, -hunger, -energy, -hygiene                  |
| Sleep    | +energy, small +health; ticks are paused while sleeping |
| Clean    | +hygiene, small +happiness                              |
| Pet      | +happiness                                              |
| Medicine | restores health to full (available when sick)           |

**Offline progress**: When the app is re-opened after being closed, it calculates how many ticks were missed and applies up to 30 catch-up ticks so the pet ages realistically without punishing the player for long absences beyond a reasonable cap.

**Mini-game**: A 30-second arcade-style catch-game where the player moves the creature left and right with arrow keys to catch falling treats. The final score is converted into a happiness boost applied to the pet's stats.

**Memory log**: Each action generates a short flavour-text entry stored in the pet's memory, shown on the profile screen.

## Technical decisions worth noting

- **Zustand with `persist` middleware** handles all game state. The entire pet object is serialised to `localStorage` on every state change, so the session survives page reloads without a backend.
- **Derived state is never stored**. Mood is computed from stats at render time in a pure function (`deriveMood`) rather than stored alongside them, avoiding the class of bugs that come from stale derived values.
- **The tick hook is decoupled from the store**. `usePetTick` is a custom hook that owns the `setInterval` and calls the store's `tick` action. The store has no side effects and remains a plain synchronous state machine, which makes the logic easy to test in isolation.
- **The game loop in CatchTreats uses `requestAnimationFrame`** rather than `setInterval` for smooth rendering, with refs tracking game state to avoid stale closures inside the loop.
- **Framer Motion** is used for sprite transitions and screen transitions to keep interactions feel responsive.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand.docs.pmnd.rs/) (with `persist` middleware)

## Getting Started

```bash
npm install
npm run dev
```

## Credits

- Virtual pet sprites by [gpessoa](https://gpessoa.itch.io/)
- Egg sprites by [onocentaur](https://onocentaur.itch.io/)
- Icons from [Pixel Icon Library](https://github.com/hackernoon/pixel-icon-library) by HackerNoon
