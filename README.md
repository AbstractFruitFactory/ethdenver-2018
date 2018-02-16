# ETHDenver team

Clone the repository to your local machine and cd into the project folder.

```git clone https://github.com/alexmedkex/ethdenver-2018.git```
```cd ethdenver-2018```

When you want to implement something, you create a new branch using

``` git checkout -b <my-new-branch>```.

The checkout command changes branch, and the -b option creates a new branch.

Make your changes in this branch. While working, commit your changes after implementing a part that works and has been tested.

List changed files:
``` git status ```

Add all files for staging (changes to be pushed to branch).

``` git add * ```

If you dont want to add all files, you have to input the files seperately instead of using *.

``` git commit -m "Descriptive message about what has been implemented." ```.
``` git push ```

After your feature has been fully implemented, after several commits to your branch, you want to get those changes to the master branch. The way to do that is to pull the branch into the master branch.

``` git checkout master ```
``` git pull origin <my-new-branch> ```

The master branch has now been updated with the new code. 

If the code conflicts with some code that is already on the master branch before pulling, you have a merge conflict. Open the files where there is a conflict, and fix it by deciding which part of the code should stay. Then, do a merge.

```git merge <my-new-branch> ```


