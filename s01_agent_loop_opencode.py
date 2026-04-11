#!/usr/bin/env python3
# Harness: the loop -- keep feeding real tool results back into opencode.
"""
s01_agent_loop_opencode.py - The Agent Loop for opencode
This file teaches how to interact with opencode instead of using Claude API directly.
opencode handles the agent loop internally - you just give it commands and it manages the workflow.
"""

import subprocess
import os

def run_opencode_command(command: str) -> str:
    """Run an opencode command"""
    try:
        result = subprocess.run(
            ["opencode", command],
            capture_output=True,
            text=True,
            timeout=60,
        )
        return result.stdout + result.stderr
    except Exception as e:
        return f"Error running opencode: {e}"

def main():
    print("opencode Agent Loop")
    print("===================")
    print("Commands:")
    print("  ask <question> - Ask opencode a question")
    print("  bash <command> - Run a bash command through opencode")
    print("  read <file> - Read a file with opencode")
    print("  edit <file> - Edit a file with opencode")
    print("  glob <pattern> - Find files with opencode")
    print("  grep <pattern> - Search code with opencode")
    print()
    print("Examples:")
    print("  ask 'What files are in this directory?'")
    print("  bash 'ls -la'")
    print("  read 'README.md'")
    print()

    while True:
        try:
            user_input = input("\033[36mopencode >> \033[0m").strip()
            if not user_input or user_input.lower() in ("q", "exit"):
                break

            # Parse command
            parts = user_input.split(maxsplit=1)
            cmd = parts[0]
            arg = parts[1] if len(parts) > 1 else ""

            if cmd == "ask":
                output = run_opencode_command(f"ask \"{arg}\"")
            elif cmd == "bash":
                output = run_opencode_command(f"bash \"{arg}\"")
            elif cmd == "read":
                output = run_opencode_command(f"read \"{arg}\"")
            elif cmd == "edit":
                output = run_opencode_command(f"edit \"{arg}\"")
            elif cmd == "glob":
                output = run_opencode_command(f"glob \"{arg}\"")
            elif cmd == "grep":
                output = run_opencode_command(f"grep \"{arg}\"")
            else:
                print(f"Unknown command: {cmd}")
                continue

            print(output[:2000])  # Limit output length

        except (EOFError, KeyboardInterrupt):
            break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()