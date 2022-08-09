# SETUP AND RUN
### Recommended Node version: Node 12.x, Node 14.x
## A. Setup
1. Create `.env` file from `.env.sample` file

2. Install dependencies
```bash
npm install --save
```

3. (Optional) Install `Rest Client` plugin in Visual Studio Code

## B. Run Application
```bash
npm start
```

## C. Run Eslint
```bash
npm run check
```

## D. Run unit test
```bash
npm run test
```

# PROJECT STRUCTURE
- .env : Setting enviroment
- .eslintrc : Setting eslint
- .prettierrc : Setting format code
- .eslintignore : Setting ignore cho eslint
- __src__
  - index.ts
  - ApiServer.ts : Setup server như Controller, Entities, CORS, Cron job,...
  - __bo__ : Bussiness Object
    - __entities__ : Chứa các class Entity
    - __models__ : Chứa các class / interface khác (như Request, Response interface)
  - __consts__ : Chứa các file khai báo kiểu Const hoặc Enum
  - __controllers__ : Chứa các controller
      - index.ts : export tất cả các controller
  - __exceptions__ : Định nghĩa các loại exception
      - AppException.ts : Exception của app, HttpStatusCode = 400
      - HttpException.ts : Các exception khác, HttpStatusCode mặc định là 500
  - __middleware__ : Khai báo các middleware
      - checkJwt.middleware.ts : Check xem request có gửi token hợp lệ lên không, nếu không trả về HttpStatusCode=401
      - checkRole.middleware.ts : Check xem request có quyền truy cập hay không, nếu không trả về HttpStatusCode=401
  - __repositories__ : Khai báo các repository
  - __services__ : Khai báo các service
  - __utils__ : Khai báo các class được sử dụng thường xuyên
      - Log.ts : Log util

sudo kill -9 $(lsof -ti:3002)