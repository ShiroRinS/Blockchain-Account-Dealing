# To resolve SimpleStorage.json is missing.
```
WARNING in ./src/contexts/EthContext/EthProvider.jsx 40:25-70
Module not found: Error: Can't resolve '../../contracts/SimpleStorage.json' in 'C:\Blockchain-Account-Dealing\client\src\contexts\EthContext'
```

# truffle compile: Could not find suitable configuration file.
```
truffle init
```

# You should run truffle compile in the root directory. This is typically the folder where the truffle-config.js file is located.
At root directory, run:
```
truffle compile
```

You are good, if you see this:
```
Compiling your contracts...
===========================
✓ Fetching solc version list from solc-bin. Attempt #1
✓ Downloading compiler. Attempt #1.
> Everything is up to date, there is nothing to compile.
```

Else, watch other topic


# [Important] If PowerShell execution policy restricts the running of scripts.
Like this:
```
truffle : File C:\Users\{user}\AppData\Roaming\npm\truffle.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see 
about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ truffle compile
+ ~~~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

The error occurs because the system's PowerShell execution policy restricts the running of scripts, including the Truffle CLI. Here's how you can fix it:

1. You can temporarily bypass the restriction for the current PowerShell session by running:
```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

2. Run the Truffle Command Again:
```
truffle compile
```

(+ Optional) If you want a Permanent Change.
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```