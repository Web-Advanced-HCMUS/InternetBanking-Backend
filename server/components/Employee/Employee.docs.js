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
 *           "accountType": "USER/EMPLOYEE"
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
 *              success: true
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
 * /emp/add-payment-account:
 *   post:
 *     summary: Thêm tài khoản cho một User có sẵn
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           identityCard:
 *             type: String
 *           accountType:
 *             type: String
 *         example: {
 *           "identityCard": "3874295817",
 *           "accountType": "PAYMENT | SAVING"
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
 *              success: true
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
 *              success: true
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
 *           "fromDate": "2023-01-04T08:48:42.400+00:00",
 *           "toDate": "2023-01-14T08:48:42.400+00:00"
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
 *              success: true
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
