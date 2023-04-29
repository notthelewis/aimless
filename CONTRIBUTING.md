# Contributing to Aimless

# Tools
 - Docker 
 - NodeJS & npm for the configure script to build DB 
 - A good IDE (VSCode, Sublime, emacs, vim etc)
 - Git client (cmd line is fine)


# Conventions
## Git workflow

`main` will always contain ONLY working code. Before merging into main, all test suites must be ran. This means that 
at any given time, main can always be forked for a clean branch. 

Every new feature, bugfix or chore is to be added as a new branch and merged back into main when complete. All pull 
requests need at least 1 reviewer to approve the PR in GitHub before merge.

In the future, when we decide to pay for GitHub, I will setup a proper pipeline that adheres to [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
standards and does most of this automagically. For now, though, this will have to do.


## Branch naming conventions

`feature/feature-name` Is the convention for writing new feature branches
`fix/bug-title` for when you're fixing a bug
`chore/task-name` for when you're making menial, none-breaking changes like reordering imports or removing dead code


## Adding a new service to Docker

When adding a new service to the backend, it's important to ensure that the configure script knows about its existence.
In order to do this, you must:
 - Create a new directory in the root, with the name of the service you want to add titled: "aimless<servicename>". If, for
   example, you wanted to add a service called: 'healthcheck', the folder would be called: 'aimlesshealthcheck'
 - Inside the directory, add the `Dockerfile` and any code or anything relating to the service in question.

The reason for the aimless<servicename> convention is so that if we want to use a 3rd party service at any point in time,
we can easily differentiate between aimless services and external services.


