# initializing application

- added all required dependencies
- installed shadCN ui lib created on top of radix-ui

# new learning

- new to know what is organizational folders these are the folders that in created as (folder name) it is very use full

# started creating Landing page

- styled landing page
- created heading component and styled it
- created heading cmp, hero cmp, footer cmp
- created landing fully responsive

# Creating nav bar

- nav bar cmp created in \_cmps inside (marketing)
- created layout.tsx for marketing route and added children props to it and added navbar cmp also
- added DARK MODE in nav bar- used shadcn docs to add dark mode to webpage and in dark mode we just toggle styles like below---->
  <Image src="/logo.svg" height="40" width="40" alt="logo" className="dark:hidden"/>
  <Image src="/logo-dark.svg" height="40" width="40" alt="logo" className="hidden dark:block"/>

# implemented authentication

- used convex db and cleark provider to authenticate
- added spinnner cmp and it is created usng cva and cn lib refer cmp>spinner.tsx
- added UserButton from cleark it will give an avatar
  <UserButton afterSignOutUrl="/"></UserButton>
  and ss
  ![alt text](https://file%2B.vscode-resource.vscode-cdn.net/Users/danishsheikh/Desktop/next-projects/notion-clone/Screenshot%202024-07-11%20at%2011.11.06%20PM.png?version%3D1720719738575)
- added logic to heading button
