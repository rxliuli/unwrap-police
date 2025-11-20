# Unwrap Police

> "thread fl2_worker_thread panicked: called Result::unwrap() on an Err value"
>
> — Cloudflare, November 18, 2025

A VS Code extension that highlights every `.unwrap()` call in your Rust code with aggressive red styling. Because sometimes the best way to prevent production incidents is to make dangerous operations impossible to ignore.

![Screenshot](https://github.com/user-attachments/assets/bcbaa214-3ce2-4602-97a8-d6c9600ee90f)

## Background

On November 18, 2025, Cloudflare experienced a major outage affecting their core CDN and security services. The root cause? A single `unwrap()` call in their FL2 proxy's Rust implementation that panicked when it encountered an unexpectedly large configuration file.

The incident lasted nearly 6 hours and impacted multiple critical services including Workers KV, Access authentication, and their main dashboard. All because one `Result::unwrap()` wasn't replaced with proper error handling.

This extension exists as a gentle reminder that `unwrap()` in production code is a time bomb waiting for the right conditions to detonate.

## Features

- **Aggressive Visual Highlighting**: Every `.unwrap()` gets a red background and red text
- **Smart Detection**: Ignores `.unwrap()` in comments (unlike production systems that ignore error handling)
- **Real-time Counting**: Status bar shows the exact number of potential panic points in your file
- **Hover Warnings**: Mouse over any `.unwrap()` to see a friendly reminder about what happened to Cloudflare
- **Zero Configuration**: Works out of the box, because sometimes the best config is no config

## Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS) to open Extensions
3. Search for "Unwrap Police"
4. Click Install

Or install directly from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=rxliuli.unwrap-police).

### From Command Line

```bash
code --install-extension rxliuli.unwrap-police
```

### From Source

```bash
git clone https://github.com/rxliuli/unwrap-police.git
cd unwrap-police
pnpm install
pnpm build
```

Then press `F5` in VS Code to launch the extension in debug mode.

## Usage

1. Open any Rust file (`.rs`)
2. Watch in horror as your `.unwrap()` calls light up like a Christmas tree
3. Consider using `?`, `unwrap_or()`, `unwrap_or_else()`, or `expect()` with meaningful error messages
4. Sleep better at night knowing your code won't take down your infrastructure

## What This Extension Does NOT Do

- It won't fix your code
- It won't prevent you from deploying unwraps
- It won't save you from configuration errors
- It won't implement proper error handling for you

Those are your job.

## Technical Details

- **Language Support**: Rust only (where unwrap actually matters)
- **Activation**: Automatically activates when you open a Rust file
- **Performance**: Line-by-line scanning, ignores comments
- **False Positives**: None, unless you put `.unwrap()` in a string literal (don't do that)

## The Cloudflare Incident (TL;DR)

1. Database permissions change caused duplicate metadata
2. Bot management config file doubled in size
3. Oversized file exceeded 200-feature memory limit
4. Rust proxy panicked on `unwrap()`
5. HTTP 5xx errors across the network
6. 6 hours to full recovery

Read the full post-mortem: [18 November 2025 Outage](https://blog.cloudflare.com/18-november-2025-outage/)

## Philosophy

Rust's type system gives you `Result` and `Option` for a reason. `unwrap()` is appropriate for prototypes, examples, and tests. In production code, it's a deferred panic waiting for Murphy's Law to kick in.

This extension won't make you a better programmer, but it will make those unwraps harder to ignore when you're reviewing your own code at 2 AM before a deploy.

## Contributing

Found a bug? Want to add support for `expect()` highlighting? PRs welcome.

Just remember: the goal isn't to eliminate all unwraps from existence. It's to make you think twice before using them.

## License

GPL-3.0-only

Because free software should be free, and your production systems should be panic-free.

## Disclaimer

This extension is satire, but the problem is real. The Cloudflare incident was a complex systems failure involving database changes, configuration management, and error handling. This extension focuses on the `unwrap()` aspect because it's a concrete, actionable lesson for Rust developers.

No disrespect intended to Cloudflare's engineers, who responded professionally and published a detailed post-mortem. We all write unwraps we shouldn't. This extension just makes them more visible.
