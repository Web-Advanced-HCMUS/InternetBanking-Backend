/**
 * @swagger
 * tags:
 *  - name: Account
 *    description: Everything about Account
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
 *  /api/account/get-one/{accountNumber}:
 *      get:
 *          tags:
 *              - Account
 *          summary: Lấy thông tin của một account trong nội bộ ngân hàng
 *          parameters:
 *              - name: accountNumber
 *                in: path
 *                required: true
 *                type: string
 *                description: The account number which you want to get information
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: true
 *                          payload:
 *                              - accountNumber: 9021762999999
 *                                accountOwnerName: Messi
 *                                bankCode: TIMO
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 400
 *                              message: Account is not exist in system
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
