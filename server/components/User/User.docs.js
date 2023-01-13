/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API about User management (include Employee)
 */

/**
 * @swagger
 * definitions:
 *   UserInfo:
 *     type: object
 *     properties:
 *       isActivated:
 *         type: boolean
 *         description: Value to check if account is activated or not
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
 * definitions:
 *   UserLogin:
 *     description: User sign-in infomation (include Employee login)
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *         description: Username of user
 *       password:
 *         type: string
 *         description: Password of user
 *       refreshToken:
 *         type: string
 *         description: Refresh token auto generate when login success, use for refresh accessToken
 *       createDate:
 *         type: date
 *         description: Create login account date
 *       userId:
 *         type: mongoId
 *         description: Mongo Id of User(Employee) infomation, reference from userInfoModel
 *       userInfoModel:
 *         type: string
 *         description: Name of the collection that userId ref to
 */

/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     summary: Refresh Token khi Access Token hết hạn
 *     tags:
 *       - User
 *     parameters:
 *       - name: userId
 *         in: query
 *         type: Mongo Id
 *         description: Id của người dùng
 *       - name: refreshToken
 *         in: query
 *         type: String
 *         description: refresh token
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
 *              payload: "Access Token mới được generate"
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
 *       - User
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
 *              success: true,
 *              payload: {
 *                    "accessToken": "Access token của User, hết hạn sau 7 ngày",
 *                    "refreshToken": "Refresh token sẽ được lưu vào db, dùng khi AccessToken hết hạn",
 *                    "_id": "Mongo Id của UserInfo",
 *                    "username": "Username vừa login",
 *                    "role": "Role của user"
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

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Đăng xuất và xóa refreshToken trong DB
 *     tags:
 *       - User
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
 *              payload: "Trả về giá trị đang Boolean: true là thành công"
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
 *     summary: Lấy thông tin người dùng bằng accessToken ở header
 *     tags:
 *       - User
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
 *                    "_id": "MongoId của UserInfo",
 *                    "role": "Role của người dùng (USER không có field này)",
 *                    "empId": "Id của nhân viên (USER không có field này)",
 *                    "isActivated": "Kiểm tra trạng thái của người dùng, đã kích hoạt hay chưa - Boolean (EMPLOYEE không có field này)",
 *                    "fullName": "Hô tên đầy đủ của người dùng",
 *                    "gender": "Giới tính của người dùng",
 *                    "phone": "Số điện thoại của người dùng",
 *                    "identityCard": "CMND hoặc CCCD của người dùng",
 *                    "dateOfBirth": "Ngày sinh của người dùng",
 *                    "email": "Email của người dùng",
 *                    "address": "Địa chỉ cảu người dùng",
 *                    "createDate": "Ngày tạo - ISOString",
 *                    "lastUpdate": "Ngày cập nhật thông tin - ISOString",
 *                    "accounts": "Array STK của người dùng (EMPLOYEE không có field này)"
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

/**
 * @swagger
 * /user/get-list-user:
 *   get:
 *     summary: Lấy danh sách người dùng (Employee)
 *     tags:
 *       - User
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
 *           example:
 *            success:
 *              type: boolean
 *              example: true
 *            totalPage:
 *              type: integer
 *              format: int32
 *              example: 5
 *            totalItem:
 *              type: integer
 *              format: int32
 *              example: 13
 *            page:
 *              type: integer
 *              format: int32
 *              example: 1
 *            item:
 *              type: integer
 *              format: int32
 *              example: 3
 *            payload:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    example: 63a1e5e01b88dd229b4d2ebb
 *                  userId:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                        example: 63a1e50b1b88dd229b4d2eb5
 *                      isActived:
 *                        type: boolean
 *                      fullName:
 *                        type: string
 *                        example: Messi
 *                      gender:
 *                        type: string
 *                        example: male
 *                      phone:
 *                        type: string
 *                        example: 0989283236
 *                      identityCard:
 *                        type: string
 *                        example: 3874340017
 *                      dateOfBirth:
 *                        type: string
 *                        example: 1988/01/20
 *                      email:
 *                        type: string
 *                        example: minhtoan2820012@gmail.com
 *                      address:
 *                        type: string
 *                        example: 221B Baker street
 *                      createDate:
 *                        type: string
 *                        example: 2022-12-11T11:53:39.695Z
 *                      lastUpdate:
 *                        type: string
 *                        format: nullable
 *                  currentBalance:
 *                    type: integer
 *                    format: int32
 *                    example: 1000
 *                  openingDate:
 *                    type: string
 *                    example: 2022-12-11T11:53:39.695Z
 *                  accountNumber:
 *                    type: string
 *                    example: 9021762999999
 *                  accountType:
 *                    type: string
 *                    example: payment
 *                  accountOwnerName:
 *                    type: string
 *                    example: Messi
 *                  isClosed:
 *                    type: boolean
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
 *       - User
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
 *       - User
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
 *       - User
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
 *       - User
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

/**
 * @swagger
 * /user/close-account/{accountNumber}:
 *   post:
 *     summary: Khóa tài khoảng thanh toán, dùng cho cả User và Employee
 *     tags:
 *       - User
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
