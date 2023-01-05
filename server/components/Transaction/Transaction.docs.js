/**
 * @swagger
 * tags:
 *  - name: Transaction
 *    description: Everything about Transaction and Transfer
 */

/**
 * @swagger
 * definitions:
 *  Transaction:
 *      type: object
 *      required:
 *          - _id
 *      properties:
 *          _id:
 *              type: string
 *              description: The id of record
 *          fromAccountNumber:
 *              type: string
 *              description: The account number of sender
 *          fromAccountOwnerName:
 *              type: string
 *              description: The name of account belong to sender
 *          toAccountNumber:
 *              type: string
 *              description: The account number of receiver
 *          toAccountOwnerName:
 *              type: string
 *              description: The name of account belong to receiver
 *          bank:
 *              type: number
 *              description: Bank code of bank which operate transaction
 *              example: TIMO
 *          transactionType:
 *              type: string
 *              description: Type of transaction
 *              enum: ["deposit", "internal-transfer", "interbank-transfer", "pay-debt"]
 *          feePaymentMethod:
 *              type: string
 *              description: Type of fee payment
 *              enum: ["paid sender", "paid receiver"]
 *          amount:
 *              type: number
 *              description: Amount of transaction
 *          fee:
 *              type: number
 *              description: Fee of transaction
 *          content:
 *              type: number
 *              description: Content of transaction
 *          status:
 *              type: number
 *              description: Amount of transaction
 *          time:
 *              type: string
 *              description: The time which transaction is operated
 *          signature:
 *              type: number
 *              description: Signature to verify identity of bank (use in interbank transaction)
 *      example:
 *          _id: 63b67aeaffc97269d1428222
 *          fromAccountNumber: 9021762999999
 *          fromAccountOwnerName: Messi
 *          toAccountNumber: 9021762797979
 *          toAccountOwnerName: Ronaldo
 *          bank: FB88NCCA
 *          transactionType: interbank-transfer
 *          feePaymentMethod: paid sender
 *          amount: 999999
 *          fee: 999
 *          content: chuyển tiền
 *          status: success
 *          time: 2022-12-28T16:19:44.085+00:00
 *          signature: jBFLfUOrO6cwwpb6+fbO3SJL2NtnwE/caVYG9VE02zSNrmIKIGL2f0FCGYxuu/+iU9F6Wu771d2WCFp/FDdOPLR1efNb+GNSpA6+17faMdeWErPrwTBfjA+L1dDkrH63HxhYeZmydDI7XRJ6XTtDrBmcmR6iURfD2JQqUbFAk5p1E9rLKzH7QeP9PGfKpfHGfKFrWUiygOSmCc263FsqHjvwn5SWVH0lePvYnHICEUuH9qwVMyZITBua0Zld4iu1wf92ouPQA6MCen6DrtFrL2D3UDGc3h50Fg1kFCgyqfGEqE54iOfMIqYVj/1p2CpckbNeHgTVqgtcNvA+FuYBZw==
 *
 *  InternalTransaction:
 *      type: object
 *      required:
 *          - _id
 *      properties:
 *          _id:
 *              type: string
 *              description: The id of record
 *          fromAccountNumber:
 *              type: string
 *              description: The account number of sender
 *          fromAccountOwnerName:
 *              type: string
 *              description: The name of account belong to sender
 *          toAccountNumber:
 *              type: string
 *              description: The account number of receiver
 *          toAccountOwnerName:
 *              type: string
 *              description: The name of account belong to receiver
 *          bank:
 *              type: number
 *              description: Bank code of bank which operate transaction
 *              example: TIMO
 *          transactionType:
 *              type: string
 *              description: Type of transaction
 *              enum: ["deposit", "internal-transfer", "interbank-transfer", "pay-debt"]
 *          feePaymentMethod:
 *              type: string
 *              description: Type of fee payment
 *              enum: ["paid sender", "paid receiver"]
 *          amount:
 *              type: number
 *              description: Amount of transaction
 *          fee:
 *              type: number
 *              description: Fee of transaction
 *          content:
 *              type: number
 *              description: Content of transaction
 *          status:
 *              type: string
 *              description: Status of transaction
 *          time:
 *              type: string
 *              description: The time which transaction is operated
 *      example:
 *          _id: 63b67aeaffc97269d1428222
 *          fromAccountNumber: 9021762999999
 *          fromAccountOwnerName: Messi
 *          toAccountNumber: 9021762797979
 *          toAccountOwnerName: Ronaldo
 *          bank: TIMO
 *          transactionType: internal-transfer
 *          feePaymentMethod: paid sender
 *          amount: 999999
 *          fee: 999
 *          content: chuyển tiền
 *          status: success
 *          time: 2022-12-28T16:19:44.085+00:00
 *
 *  CreateInternalTransaction:
 *      type: object
 *      required:
 *          - userId
 *          - otp
 *          - feePaymentMethod
 *          - fromAccountNumber
 *          - toAccountNumber
 *          - transactionType
 *          - amount
 *          - fee
 *          - content
 *      properties:
 *          userId:
 *              type: string
 *              description: User which operate transaction, use in generate OTP
 *          otp:
 *              type: string
 *              description: OTP use in verify user operate transaction
 *          feePaymentMethod:
 *              type: string
 *              description: Type of fee payment
 *              enum: ["paid sender", "paid receiver"]
 *          fromAccountNumber:
 *              type: string
 *              description: The account number of sender
 *          toAccountNumber:
 *              type: string
 *              description: The account number of receiver
 *          amount:
 *              type: number
 *              description: Amount of transaction
 *          fee:
 *              type: number
 *              description: Fee of transaction
 *          content:
 *              type: string
 *              description: Content of transaction
 *      example:
 *          userId: 63a1e50b1b88dd229b4d2eb5
 *          otp: "851843"
 *          feePaymentMethod: paid sender
 *          fromAccountNumber: "9021762999999"
 *          toAccountNumber: "9021762797979"
 *          amount: 100000
 *          fee: 5000
 *          content: chuyển tiền
 *
 *  ErrorItem:
 *      type: object
 *      properties:
 *          success:
 *              type: boolean
 *              description: status of api call
 *          error:
 *              type: object
 *              description: Error
 *              properties:
 *                  code:
 *                      type: number
 *                      description: Error code
 *                  message:
 *                      type: string
 *                      description: describe error
 */

/**
 * @swagger
 *  /api/transaction/get-transactions/{accountNumber}:
 *      get:
 *          tags:
 *              - Transaction
 *          summary: Lấy danh sách các transactions cùa một acccount
 *          parameters:
 *              - name: accountNumber
 *                in: path
 *                required: true
 *                type: string
 *                description: The account number of user which you want to get list
 *                example:
 *                  accountNumber: 9021762797979
 *              - name: type
 *                in: query
 *                require: true
 *                schema:
 *                  type: string
 *                description: The of transaction you want to get | enum ["receive", "spend", "all"]
 *                example:
 *                  type: receive
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/definitions/Transaction'
 *
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      type: object
 *                      properties:
 *                          $ref: '#/definitions/ErrorItem'
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 400
 *                              message: Error here
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: object
 *                      properties:
 *                          $ref: '#/definitions/ErrorItem'
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 500
 *                              message: Internal server error
 */

/**
 * @swagger
 *   /api/transaction/internal-transfer:
 *      post:
 *          tags:
 *              - Transaction
 *          summary: Thực hiện giao dịch chuyển khoản nội bộ
 *          description: Trước khi thực hiện API cần phải thực hiện call API OTP để lấy OTP trước, xem phần OTP .../get-transaction-otp
 *          parameters:
 *              - name: body
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: '#/definitions/CreateInternalTransaction'
 *          responses:
 *              '201':
 *                  description: Successfully create a transaction
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *                              example: true
 *                          payload:
 *                              $ref: '#/definitions/InternalTransaction'
 *
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      type: object
 *                      properties:
 *                          $ref: '#/definitions/ErrorItem'
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 400
 *                              message: Error here
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: object
 *                      properties:
 *                          $ref: '#/definitions/ErrorItem'
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 500
 *                              message: Internal server error
 */
