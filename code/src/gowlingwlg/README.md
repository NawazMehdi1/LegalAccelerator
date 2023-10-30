# Gowling Front-end application

## DEV frontend setup instructions

1. open folder C:\Projects\GowlingWLG\src\gowlingwlg with Visual Studio Code
2. run `npm i`
3. in this root folder folder C:\Projects\GowlingWLG\src\gowlingwlg add local environment config file `.env.local` (location of file in docs TBD)
4. to start project on local environment run command `npm run start:connected`
5. navigate to http://localhost:3000/

## Branch naming convention

- Feature branch naming - feature/NAGW23032-%TASK_BUMBER%-%JIRATASK_NAME_WITH_HYPHENS_INSTEAD_OF_SPACES%
- Bugfix branch naming - bugfix/NAGW23032-%TASK_BUMBER%-%JIRATASK_NAME_WITH_HYPHENS_INSTEAD_OF_SPACES%
- Hotfix branch naming - hotfix/NAGW23032-%TASK_BUMBER%-%JIRATASK_NAME_WITH_HYPHENS_INSTEAD_OF_SPACES%

- PR naming - NAGW23032-%TASK_BUMBER%-%JIRATASK_NAME_WITH_HYPHENS_INSTEAD_OF_SPACES%

## Testing

TBD

## Documentation

- coding guidelines: https://edynamics.sharepoint.com/:w:/s/GOWLINGWLGDiscovery-GowlingWLGImplementation-Internal/EdILApQ5BmtLmMGhRNGLZBEB5Sd2tMktR7z5be08ivmOnA?e=q7NXCI
- [Documentation (XM Cloud)](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-javascript-rendering-sdk--jss--for-next-js.html)
- [Documentation (Experience Platform)](https://doc.sitecore.com/xp/en/developers/hd/211/sitecore-headless-development/sitecore-javascript-rendering-sdk--jss--for-next-js.html)

## How to run Vercel locally

This need to be done in the project folder, first, so get aout of FE folder

- install vercel cli: npm i -g vercel
- vercel login (need to login using altudo account that has access to gowling project)
- vercel build (here it will start ask about linking to existing project and we should continue)
