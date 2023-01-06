/**
 * @swagger
 * tags:
 *  - name: Debt
 *    description: Everything about Debt Management
 */

/**
 * @swagger
 * definitions:
 *  Debt:
 *      type: object
 *      required:
 *          - _id
 *      properties:
 *          _id:
 *              type: string
 *              description: The id of record
 *          creditorAccountNumber:
 *              type: string
 *              description: The account number of creditor
 *          debtorAccountNumber:
 *              type: string
 *              description: The account number of debtor
 *          amountOwed:
 *              type: string
 *              description: Amount of debt
 *          content:
 *              type: number
 *              description: Content of debt
 *          status:
 *              type: number
 *              description: Status of debt
 *              enum: ["complete", "incomplete", "cancel"]
 *          startDate:
 *              type: string
 *              description: Date start debt
 *          endDate:
 *              type: string
 *              description: Date end debt
 *      example:
 *          _id: 63b8432e6637287acb808721
 *          creditorAccountNumber: "9021762999999"
 *          debtorAccountNumber: "9021762797979"
 *          amountOwed: 500000
 *          content: Bạn nợ tiền ăn tôi nhé
 *          status: incomplete
 *          startDate: 2022-12-28T16:19:44.085+00:00
 *          endDate: 2023-01-04T16:19:44.085+00:00
 *
 *  CreateDebt:
 *      type: object
 *      required:
 *          - creditorAccountNumber
 *          - debtorAccountNumber
 *          - amountOwed
 *          - content
 *          - startDate
 *          - endDate
 *      properties:
 *          creditorAccountNumber:
 *              type: string
 *              description: The account number of creditor
 *          debtorAccountNumber:
 *              type: string
 *              description: The account number of debtor
 *          amountOwed:
 *              type: number
 *              description: Amount of debt
 *          content:
 *              type: string
 *              description: Content of debt
 *          startDate:
 *              type: string
 *              description: Date start debt
 *          endDate:
 *              type: string
 *              description: Date end debt
 *      example:
 *          creditorAccountNumber: "9021762999999"
 *          debtorAccountNumber: "9021762797979"
 *          amountOwed: 500000
 *          content: Bạn nợ tiền ăn tôi nhé
 *          startDate: 2022-12-28T16:19:44.085+00:00
 *          endDate: 2023-01-04T16:19:44.085+00:00
 *
 *  PayDebt:
 *      type: object
 *      required:
 *          - creditorAccountNumber
 *          - debtorAccountNumber
 *          - amountOwed
 *          - content
 *          - startDate
 *          - endDate
 *      properties:
 *          fromAccountNumber:
 *              type: string
 *              description: The account number of debtor
 *          content:
 *              type: string
 *              description: Content of debt
 *          userId:
 *              type: string
 *              description: Id of debtor user info
 *          otp:
 *              type: string
 *              description: OTP to verify user
 *      example:
 *          fromAccountNumber: "9021762797979"
 *          content: Bạn nợ tiền ăn tôi nhé
 *          userId: 63a1e6dc1b88dd229b4d2ec9
 *          otp: "11111"
 */

/**
 * @swagger
 *  /api/debt/debt-list/{accountNumber}:
 *      get:
 *          tags:
 *              - Debt
 *          summary: Lấy danh sách các nợ cùa một acccount
 *          parameters:
 *              - name: accountNumber
 *                in: path
 *                required: true
 *                type: string
 *                description: The account number of user which you want to get list
 *                example:
 *                  accountNumber: 9021762797979
 *              - name: debtType
 *                in: query
 *                type: string
 *                description: The type of debts you want to get ["creditor", "debtor", "all"]
 *                example:
 *                  debtType: creditor
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: bool
 *                              example: true
 *                          payload:
 *                              type: array
 *                              items:
 *                                  $ref: '#/definitions/Debt'
 *
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      example:
 *                          success: false
 *                          error:
 *                              code: 400
 *                              message: Account number doesn't exist
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 500
 *                              message: Internal server error
 *
 */

/**
 * @swagger
 *  /api/debt/create-debt:
 *      post:
 *          tags:
 *              - Debt
 *          summary: Tạo nhắc nợ đến một account
 *          parameters:
 *              - name: body
 *                in: body
 *                required: true
 *                type: object
 *                description: The account number of user which you want to get list
 *                schema:
 *                  $ref: '#/definitions/CreateDebt'
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: bool
 *                              example: true
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      $ref: '#/definitions/Debt'
 *
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      example:
 *                          success: false
 *                          error:
 *                              code: 400
 *                              message: Account number doesn't exist
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 500
 *                              message: Internal server error
 */

/**
 * @swagger
 *  /api/debt/request-cancel-debt/{debtId}:
 *      put:
 *          tags:
 *              - Debt
 *          summary: Tạo yêu cầu hủy nợ với mã nợ là $debtID đến một account
 *          parameters:
 *              - name: debtId
 *                in: path
 *                required: true
 *                type: string
 *                description: The id of debt you want to request canceling
 *                example:
 *                  debtId: 63b58d5c1898d0fd3845125b
 *              - name: body
 *                in: body
 *                required: true
 *                type: object
 *                description: The account number of user which you want to get list
 *                properties:
 *                  fromAccountNumber:
 *                      type: string
 *                      example: 9021762797979
 *                  content:
 *                      type: string
 *                      example: Hủy nợ cho bạn nhé
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: bool
 *                              example: true
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  fromAccountNumber:
 *                                      type: string
 *                                      example: 9021762797979
 *                                  content:
 *                                      type: string
 *                                      example: Hủy nợ cho bạn nhé
 *                                  data:
 *                                      $ref: '#/definitions/Debt'
 *
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      example:
 *                          success: false
 *                          error:
 *                              code: 400
 *                              message: Account number doesn't exist
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 500
 *                              message: Internal server error
 */

/**
 * @swagger
 *  /api/debt/pay-debt/{debtId}:
 *      post:
 *          tags:
 *              - Debt
 *          summary: Tạo yêu cầu thanh toán nợ với mã nợ là $debtID đến một account
 *          parameters:
 *              - name: debtId
 *                in: path
 *                required: true
 *                type: string
 *                description: The id of debt you want to request canceling
 *                example:
 *                  debtId: 63b58d5c1898d0fd3845125b
 *              - name: body
 *                in: body
 *                required: true
 *                type: object
 *                description: The account number of user which you want to get list
 *                schema:
 *                  $ref: '#/definitions/PayDebt'
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: bool
 *                              example: true
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  fromAccountNumber:
 *                                      type: string
 *                                      example: 9021762797979
 *                                  content:
 *                                      type: string
 *                                      example: Hủy nợ cho bạn nhé
 *                                  data:
 *                                      $ref: '#/definitions/Debt'
 *
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      example:
 *                          success: false
 *                          error:
 *                              code: 400
 *                              message: Account number doesn't exist
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 500
 *                              message: Internal server error
 */
