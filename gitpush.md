git init
git remote add origin https://github.com/ShiroRinS/Blockchain-Account-Dealing.git
git remote remove origin
git remote -v

# Check current branches 

git branch

# Create and switch to a new branch
git checkout -b {name}-branch

# Stage changes
git add .

# Commit changes
git commit -m "unbox truffle"

# Push the new branch to GitHub
git push -u origin {name}-branch

# Switch back to the main branch
git checkout main