/**
 * @swagger
 * tags:
 *  - name: OTP
 *    description: Everything about OTP
 */

/**
 * @swagger
 * definitions:
 *  OTP:
 *      type: object
 *      required:
 *          - userId
 *      properties:
 *          _id:
 *              type: string
 *              description: The auto-generated id of record
 *          userId:
 *              type: string
 *              description: The id of user which request generate otp
 *          otp:
 *              type: string
 *              description: OTP token
 *          status:
 *              type: string
 *              description: The status of OTP
 *          expiredTime:
 *              type: string
 *              description: The expired time of OTP
 *      example:
 *          _id: 6395aba603c3f5e85cb44cd5
 *          userId: 63a1e50b1b88dd229b4d2eb5
 *          otp: 166344
 *          status: pending
 *          expiredTime: 2022-12-29T19:55:59.009+00:00
 */

/**
 * @swagger
 *  /api/otp/get-transaction-otp:
 *      post:
 *          tags:
 *              - OTP
 *          summary: Lấy otp để thực hiện một giao dịch chuyển khoản
 *          description: OTP được gửi qua email mà user đăng kí với hệ thống, sau khi call API vui lòng kiểm tra email để lấy OTP
 *          parameters:
 *              - name: body
 *                in: body
 *                required: true
 *                properties:
 *                  userId:
 *                      type: string
 *                  amount:
 *                      type: number
 *                example:
 *                  userId: 63a1e50b1b88dd229b4d2eb5
 *                  amount: 10000
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: true
 *                          payload:
 *                              - message: OTP sent successfully
 *
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              $ref: '#/definitions/ValidatorErrorItem'
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 400
 *                              message: Can't find user
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: string
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 500
 *                              message: Internal server error
 */
