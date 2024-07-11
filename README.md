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
