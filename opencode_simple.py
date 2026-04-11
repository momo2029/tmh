#!/usr/bin/env python3
"""
Simple script to demonstrate using opencode commands directly.
This shows how to interact with opencode instead of calling Claude API.
"""

import subprocess

def run_opencode(cmd):
    """Run an opencode command"""
    try:
        result = subprocess.run(["opencode", cmd], capture_output=True, text=True)
        return result.stdout + result.stderr
    except Exception as e:
        return f"Error: {e}"

if __name__ == "__main__":
    print("opencode Command Examples")
    print("========================")

    # Example commands - uncomment to try them
    """
    # Ask a question
    print(run_opencode('ask "What files are in this directory?"'))

    # Run bash commands
    print(run_opencode('bash "ls -la"'))

    # Read files
    print(run_opencode('read "s01_agent_loop.py"'))

    # Search code
    print(run_opencode('grep "import" s01_agent_loop.py'))
    """