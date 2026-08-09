# Current production website

The `production-dist/` directory is the exact recovered build currently deployed at https://www.peechurch.org. It includes the bilingual site, Cognito admin login, role-based admin permissions, and SuperAdmin-only image management.

The historical `src/` directory predates these production changes and must not be deployed over `production-dist/` until the maintainable React source has been fully synchronized.

For a manual S3 deployment, upload the contents of `production-dist/` to the website bucket and invalidate CloudFront with `/*`.
