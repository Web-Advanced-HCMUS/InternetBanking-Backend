/**
 * @swagger
 * /admin/create-emp-account:
 *   post:
 *     summary: Tạo Tài khoản nhân viên
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           username:
 *             type: String
 *           password:
 *             type: String
 *           fullName:
 *             type: String
 *           role:
 *             type: String
 *           gender:
 *             type: String
 *           phone:
 *             type: String
 *           dateOfBirth:
 *             type: String
 *           email:
 *             type: String
 *           identityCard:
 *             type: String
 *           address:
 *             type: String
 *         example: {
 *           "username": "Huynh",
 *           "password": "hashed password",
 *           "fullName": "A Full Name",
 *           "role": "CLIENT/ADMIN/EMPLOYEE",
 *           "gender": "MALE/FEMALE/ELSE",
 *           "phone": "0989283746",
 *           "dateOfBirth": "1988/01/20",
 *           "email": "duahde@gmail.com",
 *           "identityCard": "3874295817",
 *           "address": "221B, Baker street"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           example: {
 *              "success": true,
 *              "payload": {
 *                "userId": "63c0f4e9c17bb4134b4c7a7a - MongoId of Employee Table",
 *                "empId": "359941"
 *              }
 *            }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/get-emp-list:
 *   get:
 *     summary: Lấy danh sách Nhân viên
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: page
 *         in: query
 *         type: number
 *         description: Số trang
 *       - name: limit
 *         in: query
 *         type: number
 *         description: Số lượng item trong 1 trang
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           example: {
 *              "success": true,
 *              "totalPage": 1,
 *              "totalItem": 3,
 *              "page": 1,
 *              "item": 3,
 *              "payload": [
 *                {
 *                  "_id": "63baa2931ac8424b927a4240",
 *                  "username": "admin01",
 *                  "password": "$2a$10$I4HOi2g1H1WxkyDaPN4W5.eOpw5CNO1oj.hKktyUkQ8why8q.ZINq",
 *                  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JhOWQxMTFhYzg0MjRiOTI3YTQyM2UiLCJ1c2VybmFtZSI6ImFkbWluMDEiLCJpYXQiOjE2NzM1ODM3MDZ9.emuVWpfxSUYnZOPsrBwFkF_lG_L_ppPI17y9G2UV6L8",
 *                  "createDate": "2023-01-08T17:00:00.000Z",
 *                  "userId": {
 *                    "_id": "63ba9d111ac8424b927a423e",
 *                    "role": "ADMIN",
 *                    "empId": "781684",
 *                    "fullName": "Clark Kent",
 *                    "gender": "male",
 *                    "phone": "0989283746",
 *                    "identityCard": "3874295817",
 *                    "dateOfBirth": "1988/01/20",
 *                    "email": "hdle18@clc.fitus.edu.vn",
 *                    "address": "221B, Baker street",
 *                    "createDate": "2023-01-08T17:00:00.000Z",
 *                    "lastUpdate": "2023-01-08T16:23:45.678Z"
 *                  },
 *                  "userInfoModel": "Employee"
 *                },
 *                {
 *                  "_id": "63bc419bde4f78ee7f08f393",
 *                  "username": "emp01",
 *                  "password": "$2a$10$U2OH8v5/2ZmzwQgyd6Jhw.T0KTdDSbcVIzoqCoQvU8IBgIVXj7Fli",
 *                  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JjNDE5YmRlNGY3OGVlN2YwOGYzOTEiLCJ1c2VybmFtZSI6ImVtcDAxIiwiaWF0IjoxNjczNTg5NTIxfQ.R5dE4v3Ble8kxOH2vqtUVlpV97a99-NF9dulfJhxUr0",
 *                  "createDate": "Mon Jan 09 2023 23:32:13 GMT+0700 (Indochina Time)",
 *                  "userId": {
 *                    "_id": "63bc419bde4f78ee7f08f391",
 *                    "role": "EMPLOYEE",
 *                    "empId": "539518",
 *                    "fullName": "My Name Is Chiky",
 *                    "gender": "female",
 *                    "phone": "0989267786",
 *                    "identityCard": "3870005817",
 *                    "dateOfBirth": "1988/01/20",
 *                    "email": "lehuynhduc74@gmail.com",
 *                    "address": "221B, Baker street",
 *                    "createDate": "2023-01-09T16:32:13.588Z",
 *                    "lastUpdate": "2023-01-09T16:32:13.588Z"
 *                  },
 *                  "userInfoModel": "Employee"
 *                },
 *                {
 *                  "_id": "63c0f4e9c17bb4134b4c7a7c",
 *                  "username": "admin02",
 *                  "password": "$2a$10$X64mmzWV.nvf57iPzTZPc.ou4TUqtZsTxqjKllaJt2MpRCtgFh.Xi",
 *                  "refreshToken": null,
 *                  "createDate": "Fri Jan 13 2023 13:05:36 GMT+0700 (Indochina Time)",
 *                  "userId": {
 *                    "_id": "63c0f4e9c17bb4134b4c7a7a",
 *                    "role": "ADMIN",
 *                    "empId": "359941",
 *                    "fullName": "Quynh Nhu",
 *                    "gender": "female",
 *                    "phone": "0989281111",
 *                    "identityCard": "3874255817",
 *                    "dateOfBirth": "2000/03/20",
 *                    "email": "tranthiquynhnhu2003@gmail.com",
 *                    "address": "221B, Baker street",
 *                    "createDate": "2023-01-13T06:05:36.483Z",
 *                    "lastUpdate": "2023-01-13T06:05:36.483Z"
 *                  },
 *                  "userInfoModel": "Employee"
 *                }
 *              ]
 *            }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/update-emp/{empId}:
 *   put:
 *     summary: Cập nhật Tài khoản nhân viên, field nào không đổi thì không cần truyền vào
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: empId
 *         in: path
 *         type: String
 *         description: Mã Nhân viên
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           fullName:
 *             type: String
 *           role:
 *             type: String
 *           gender:
 *             type: String
 *           phone:
 *             type: String
 *           dateOfBirth:
 *             type: String
 *           email:
 *             type: String
 *           identityCard:
 *             type: String
 *           address:
 *             type: String
 *         example: {
 *           "fullName": "A Full Name",
 *           "role": "ADMIN/EMPLOYEE",
 *           "gender": "MALE/FEMALE/ELSE",
 *           "phone": "0989283746",
 *           "dateOfBirth": "1988/01/20",
 *           "email": "duahde@gmail.com",
 *           "identityCard": "3874295817",
 *           "address": "221B, Baker street"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/dashboard'
 *           example: {
 *              success: true,
 *              payload: true
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/delete-emp/{empId}:
 *   delete:
 *     summary: Xóa một Tài khoản nhân viên
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: empId
 *         in: path
 *         type: String
 *         description: Mã Nhân viên
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/dashboard'
 *           example: {
 *              success: true,
 *              payload: true
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/for-control-filter-helper/{index}:
 *   post:
 *     summary: Lấy data cho filter Đối soát
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: index
 *         in: path
 *         required: true
 *         enum: [bank]
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           bank:
 *             type: Array
 *         example: {
 *           "bank": []
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/dashboard'
 *           example: {
 *              success: true,
 *              payload: "Array tên các ngân hàng đã liên kết có giao dịch"
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/for-control:
 *   post:
 *     summary: Lấy danh sách Đối soát
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           fromDate:
 *             type: String
 *           toDate:
 *             type: String
 *         example: {
 *           "fromDate": "YYYY-MM-DD Date String",
 *           "toDate": "YYYY-MM-DD Date String"
 *         }
 *     responses:
 *       200:
 *         description: data return
 *         schema:
 *           example: {
 *              success: true,
 *              payload: {
 *                 "sendPayload": "List các Transaction gửi tiền liên ngân hàng",
 *                 "receivePayload": "List các Transaction nhận tiền liên ngân hàng"
 *                }
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */

/**
 * @swagger
 * /admin/for-control-total-amount:
 *   post:
 *     summary: Thống kê tổng số tiền đã giao dịch
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           fromDate:
 *             type: String
 *           toDate:
 *             type: String
 *           bank:
 *             type: Array
 *         example: {
 *           "fromDate": "YYYY-MM-DD Date String",
 *           "toDate": "YYYY-MM-DD Date String",
 *           "bank": []
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           properties:
 *             $ref: '#/definitions/dashboard'
 *           example: {
 *              success: true,
 *              payload: {
 *                "sendPayload": {
 *                    "arrayBank": "Array các ngân hàng và tổng tiền gửi theo từng ngân hàng",
 *                    "totalAmount": "Tổng tiền gửi",
 *                    "totalFee": "Tổng phí chuyển tiền"
 *                },
 *                "receivePayload": {
 *                    "arrayBank": "Array các ngân hàng và tổng tiền nhận theo từng ngân hàng",
 *                    "totalAmount": "Tổng tiền gửi",
 *                    "totalFee": "Tổng phí chuyển tiền"
 *                }
 *              }
 *           }
 *       404:
 *         description: When data cannot be process
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: {
 *                 "param": "EXISTS",
 *               }
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
