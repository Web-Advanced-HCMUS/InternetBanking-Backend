/**
 * @swagger
 * tags:
 *  - name: Account
 *    description: Everything about Account
 */

/**
 * @swagger
 * definitions:
 *  Account:
 *      type: object
 *      required:
 *          - userId
 *      properties:
 *          _id:
 *              type: string
 *              description: The auto-generated id of record
 *          userId:
 *              type: string
 *              description: The id of user
 *          openingDate:
 *              type: string
 *              description: The date account is opened
 *          currentBalance:
 *              type: string
 *              description: The current balance of account
 *          accountOwnerName:
 *              type: string
 *              description: The owner name of account
 *          accountNumber:
 *              type: string
 *              description: The account number
 *          accountType:
 *              type: string
 *              description: The type of account
 *          isClosed:
 *              type: string
 *              description: The status of account
 *      example:
 *          _id: "63bb1232dfaed1f8c870f43e"
 *          userId: "63bb1232dfaed1f8c870f43b"
 *          openingDate: "2023-01-08T18:57:47.139Z"
 *          currentBalance: 1000008000
 *          accountOwnerName: "Thao Nguyen"
 *          accountNumber: "087527829"
 *          accountType: "payment"
 *          isClosed: false
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

/**
 * @swagger
 *  /api/account/get-list/{userId}:
 *      get:
 *          tags:
 *              - Account
 *          summary: Lấy danh sách thông tin của một account trong nội bộ ngân hàng
 *          parameters:
 *              - name: userId
 *                in: path
 *                required: true
 *                type: string
 *                description: The userid of user which you want to get information
 *                example: 63bb1232dfaed1f8c870f43b
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *                              example: true
 *                          payload:
 *                              type: array
 *                              items:
 *                                  $ref: '#/definitions/Account'
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

/**
 * @swagger
 *  /api/account/get-payment/{userId}:
 *      get:
 *          tags:
 *              - Account
 *          summary: Lấy thông tin của tài khoản thanh toán của user
 *          parameters:
 *              - name: userId
 *                in: path
 *                required: true
 *                type: string
 *                description: The userid of user which you want to get information
 *                example: 63bb1232dfaed1f8c870f43b
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *                              example: true
 *                          payload:
 *                              $ref: '#/definitions/Account'
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
