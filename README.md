

# MARIADB
npm install --save @nestjs/typeorm@7.1.5 typeorm mysql2


# PASSWORD
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local


# COOKIE
npm i cookie-parser
npm i -D @types/cookie-parser 


# VALIDATORS && TRANSFORMER
npm i --save class-validator class-transformer

# CRYPTO
npm i bcrypt
npm i -D @types/bcrypt

# JWT
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

# Image
npm i sharp


# Heroku

.env
DATABASE_URL=postgres://postgres:1234@localhost:5432/postgres

DATABASE_URL=postgres://ppxjgtuvpitxjk:b37e387cc07305849d91b2bc7891bd2573f99103f0c6a629a3d8cb46a90fc73c@ec2-34-225-66-116.compute-1.amazonaws.com:5432/d29msvmr088dfp

in production active ssl=true

npm run build
git push heroku master

