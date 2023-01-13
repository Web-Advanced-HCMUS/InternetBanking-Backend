/**
 * @swagger
 * tags:
 *   - name: Employee
 *     description: API about Employee's function(Admin can use these)
 */

/**
 * @swagger
 * definitions:
 *   Employee:
 *     type: object
 *     properties:
 *       role:
 *         type: string
 *         description: Value to check Employee Role (Admin or Employee)
 *       empId:
 *         type: string
 *         description: Auto generated Employee Id
 *       fullName:
 *         type: string
 *         description: Full name of user
 *       gender:
 *         type: string
 *         description: Gender of user
 *       phone:
 *         type: string
 *         description: User's phone number
 *       identityCard:
 *         type: string
 *         description: The location of value
 *       dateOfBirth:
 *         type: string
 *         description: User's Date of Birth
 *       email:
 *         type: string
 *         description: User's email
 *       address:
 *         type: string
 *         description: User's living address
 *       createDate:
 *         type: date
 *         description: Infomation created Date
 *       lastUpdate:
 *         type: date
 *         description: User infomation last update time
 */

/**
 * @swagger
 * /emp/create:
 *   post:
 *     summary: Tạo Tài khoản, sau khi gửi thông tin đi sẽ nhận được Email OTP (Step 1)
 *     tags:
 *       - Employee
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
 *           "address": "221B, Baker street",
 *           "accountType": "PAYMENT/SAVING"
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
 *                "userId": "63c0f6a0c07193302c3a622d - UserInfo MongoId",
 *                "accountNumber": "087648313 - Auto generate 1 default Payment Account"
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
 * /emp/customer-recharge:
 *   post:
 *     summary: Nạp tiền vào tài khoản, tìm theo số tài khoản hoặc tên đăng nhập
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           userInfo:
 *             type: String
 *           amount:
 *             type: Number
 *         example: {
 *           "userInfo": "STK hoặc Username",
 *           "amount": 9000000
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
 * /emp/single-transfer-history/{type}/{order}:
 *   post:
 *     summary: Lấy thông tin giao dịch của một User theo Account Number
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: type
 *         in: path
 *         type: String
 *         enum: [SEND,RECEIVE,DEBT]
 *         description: Loại danh sách muốn lấy
 *       - name: order
 *         in: path
 *         type: String
 *         enum: [asc,desc]
 *         description: Thứ tự sắp xếp của ngày
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           accountNumber:
 *             type: String
 *           fromDate:
 *             type: Date
 *           toDate:
 *             type: Date
 *         example: {
 *           "accountNumber": "9021762999999",
 *           "fromDate": "YYYY-MM-DD",
 *           "toDate": "YYYY-MM-DD default là ngày hiện tại"
 *         }
 *     responses:
 *       200:
 *         name: body
 *         in: body
 *         required: true
 *         description: data report
 *         schema:
 *           type: object
 *           example:
 *              success: true
 *              payload:
 *                type: array
 *                description: Mảng danh sách các giao dịch của Số tài khoản đã chọn
 *                example: [
 *                    {
 *                      "_id": "63b5c63b82b80932bbd69879",
 *                      "fromAccountNumber": "9021762999999",
 *                      "fromAccountOwnerName": "Messi",
 *                      "toAccountOwnerName": "Ronaldo",
 *                      "toAccountNumber": "9021762797979",
 *                      "bank": "TIMO",
 *                      "transactionType": "internal-transfer",
 *                      "feePaymentMethod": "paid sender",
 *                      "amount": 10000,
 *                      "fee": 2000,
 *                      "content": "chuyển tiền",
 *                      "status": "success",
 *                      "time": "2022-12-28T16:19:44.085Z"
 *                    },
 *                    {
 *                      "_id": "63b5ce3791b962439c08d1c8",
 *                      "fromAccountNumber": "9021762999999",
 *                      "fromAccountOwnerName": "Messi",
 *                      "toAccountOwnerName": "Ronaldo",
 *                      "toAccountNumber": "9021762797979",
 *                      "transactionType": "interbank-transfer",
 *                      "feePaymentMethod": "paid receiver",
 *                      "amount": 10000,
 *                      "fee": 999,
 *                      "content": "chuyển tiền",
 *                      "status": "success",
 *                      "signature": "eGAV5PVIoT3DZ1SB9XGLK8VGz/2lizR89Aaxmtt53J2AZLi5onjEsy2WFBSPtruCydwoBeL4qq1rGnWdibguVYkwRLHXYvKNQloblb+Iy/0NFcofSDFJNCrpGwwb045nmFSA/iaEEqJG2n0qYi8Lq2JCEFIPyuUeqeNHWBJqHaCw1FgJ1qo8ROgEtDRX2ZUp1CbbYkeU3lwddPItjcZvEWCucJpNzJxSwM/koZiLq0ODL5YVMAKx2ZkISCW9okMOpNPAPlEnl1QiSNUS340vqVvhFthfJYtFWMyaq7MF8JWWK9QDiZlZquB0cYXIEW+xBFI75YZG0a/SVccz0STtMw==",
 *                      "time": "2022-12-28T16:19:44.085Z"
 *                    },
 *                    {
 *                      "_id": "63b5ce962b390c5f927b465a",
 *                      "fromAccountNumber": "9021762999999",
 *                      "fromAccountOwnerName": "Messi",
 *                      "toAccountOwnerName": "Ronaldo",
 *                      "toAccountNumber": "9021762797979",
 *                      "transactionType": "interbank-transfer",
 *                      "feePaymentMethod": "paid receiver",
 *                      "amount": 10000,
 *                      "fee": 999,
 *                      "content": "chuyển tiền",
 *                      "status": "success",
 *                      "signature": "eGAV5PVIoT3DZ1SB9XGLK8VGz/2lizR89Aaxmtt53J2AZLi5onjEsy2WFBSPtruCydwoBeL4qq1rGnWdibguVYkwRLHXYvKNQloblb+Iy/0NFcofSDFJNCrpGwwb045nmFSA/iaEEqJG2n0qYi8Lq2JCEFIPyuUeqeNHWBJqHaCw1FgJ1qo8ROgEtDRX2ZUp1CbbYkeU3lwddPItjcZvEWCucJpNzJxSwM/koZiLq0ODL5YVMAKx2ZkISCW9okMOpNPAPlEnl1QiSNUS340vqVvhFthfJYtFWMyaq7MF8JWWK9QDiZlZquB0cYXIEW+xBFI75YZG0a/SVccz0STtMw==",
 *                      "time": "2022-12-28T16:19:44.085Z"
 *                    }
 *                ]
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
