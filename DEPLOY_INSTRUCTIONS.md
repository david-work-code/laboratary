# Deployment Instructions

Since I cannot run `git` commands directly in this environment, please follow these steps to upload your game to GitHub.

## Step 1: Open Terminal
Open your terminal or command prompt.

## Step 2: Clone Your Repository
Run this command to download your repository:
```bash
git clone https://github.com/david-work-code/laboratary.git
```

## Step 3: Copy Game Files
Copy all files from the `galaxy_invader` folder into the `laboratary` folder.

**Windows (PowerShell):**
```powershell
Copy-Item -Path "C:\Users\A2120030\.gemini\antigravity\scratch\galaxy_invader\*" -Destination ".\laboratary" -Recurse
```

**Mac/Linux:**
```bash
cp -r galaxy_invader/* laboratary/
```

## Step 4: Push to GitHub
Navigate to the repository and push the changes:
```bash
cd laboratary
git add .
git commit -m "Add Galaxy Invader game"
git push
```

## Step 5: Verify
Go to https://github.com/david-work-code/laboratary and check if the files are there!
