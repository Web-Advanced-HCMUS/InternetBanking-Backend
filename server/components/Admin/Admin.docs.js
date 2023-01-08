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
 * /admin/update-emp/{empId}:
 *   put:
 *     summary: Cập nhật Tài khoản nhân viên
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
 * /admin/for-control:
 *   post:
 *     summary: Lấy danh sách Đối soát
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
 *           "fromDate": "ISODate String",
 *           "toDate": "ISODate String",
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
 *           "fromDate": "ISODate String",
 *           "toDate": "ISODate String",
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
