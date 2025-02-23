#!/bin/bash

# Set correct permissions for executable files
chmod +x run.py
chmod +x install.sh
chmod +x set_permissions.sh

# Ensure all Python files are readable
chmod 644 *.py
chmod 644 __init__.py
chmod 644 requirements.txt
chmod 644 MANIFEST

echo "Permissions set successfully"
