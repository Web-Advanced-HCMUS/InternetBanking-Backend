/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Tạo Tài khoản, sau khi gửi thông tin đi sẽ nhận được Email OTP (Step 1)
 *     tags:
 *       - User Info
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
 *           "role": "CLIENT",
 *           "gender": "male/female/else",
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
 * /user/verify-account:
 *   get:
 *     summary: Xác thực tài khoản bàng OTP nhận qua Email (Step 2)
 *     tags:
 *       - User Info
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         description: Id Account người dùng
 *         type: MongoId
 *       - name: otp
 *         in: query
 *         required: true
 *         description: Mã OTP nhận được từ Email
 *         type: String
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
 * /user/login:
 *   post:
 *     summary: Đăng nhập
 *     tags:
 *       - User Info
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           username:
 *             type: String
 *           password:
 *             type: String
 *         example: {
 *           "username": "Huynh",
 *           "password": "hashed password"
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
 * /user/get-user-info-by-token:
 *   get:
 *     summary: Lấy thông tin người dùng bằng token ở header
 *     tags:
 *       - User Info
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
 * /user/get-list-user:
 *   get:
 *     summary: Lấy danh sách người dùng (Admin)
 *     tags:
 *       - User Info
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
 * /user/send-mail-forgot-pass/{username}:
 *   post:
 *     summary: Gửi Mail lấy OTP reset Password
 *     tags:
 *       - User Info
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         type: string
 *         description: Tên đăng nhập của người cần reset pass
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
 * /user/forgot-pass:
 *   post:
 *     summary: Phục hồi quên pass
 *     tags:
 *       - User Info
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           username:
 *             type: String
 *           otp:
 *             type: String
 *           newPass:
 *             type: String
 *         example: {
 *           "username": "Huynh",
 *           "otp": "6 digits code",
 *           "newPass": "hashed password"
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
 * /user/change-pass:
 *   put:
 *     summary: Thay đổi mật khẩu
 *     tags:
 *       - User Info
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *           oldPass:
 *             type: String
 *           newPass:
 *             type: String
 *         example: {
 *           "oldPass": "hashed old password",
 *           "newPass": "hashed new password"
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
 * /user/get-user-by-account-number/{accountNumber}:
 *   get:
 *     summary: Lấy thông tin người dùng từ số tài khoản
 *     tags:
 *       - User Info
 *     parameters:
 *       - name: accountNumber
 *         in: path
 *         required: true
 *         type: string
 *         description: Số Tài Khoảng
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
