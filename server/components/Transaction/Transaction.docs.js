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
 *          - accountNumber
 *          - time
 *          - amount
 *          - fee
 *          - status
 *          - transactionType
 *      properties:
 *          _id:
 *              type: string
 *              description: The id of record
 *          accountNumber:
 *              type: string
 *              description: The account number of user
 *          time:
 *              type: string
 *              description: The time which transaction is operated
 *          transactionType:
 *              type: string
 *              description: Type of transaction
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
 *          targetAccountOwnerName:
 *              type: string
 *              description: Account's owner name which is sender or receiver
 *          targetAccountNumber:
 *              type: number
 *              description: Account number of which is sender or receiver
 *          bankCode:
 *              type: number
 *              description: Bank code of bank which operate transaction
 *          signature:
 *              type: number
 *              description: Signature to verify identity of bank (use in interbank transaction)
 *      example:
 *          _id: 63a21149e08cd286c89ff451
 *          accountNumber: 9021762797979
 *          time: 2022-12-28T16:19:44.085+00:00
 *          transactionType: interbank-deposit
 *          amount: 999999
 *          fee: 999
 *          content: chuyển tiền
 *          status: success
 *          targetAccountOwnerName: Ronaldo
 *          targetAccountNumber: 9021762999999
 *          bankCode: FB88NCCA
 *          signature: jBFLfUOrO6cwwpb6+fbO3SJL2NtnwE/caVYG9VE02zSNrmIKIGL2f0FCGYxuu/+iU9F6Wu771d2WCFp/FDdOPLR1efNb+GNSpA6+17faMdeWErPrwTBfjA+L1dDkrH63HxhYeZmydDI7XRJ6XTtDrBmcmR6iURfD2JQqUbFAk5p1E9rLKzH7QeP9PGfKpfHGfKFrWUiygOSmCc263FsqHjvwn5SWVH0lePvYnHICEUuH9qwVMyZITBua0Zld4iu1wf92ouPQA6MCen6DrtFrL2D3UDGc3h50Fg1kFCgyqfGEqE54iOfMIqYVj/1p2CpckbNeHgTVqgtcNvA+FuYBZw==
 *
 *  CreateInternalTransaction:
 *      type: object
 *      required:
 *          - accountNumber
 *          - time
 *          - amount
 *          - fee
 *          - status
 *          - transactionType
 *      properties:
 *          accountNumber:
 *              type: string
 *              description: The account number of user
 *          time:
 *              type: string
 *              description: The time which transaction is operated
 *          transactionType:
 *              type: string
 *              description: Type of transaction
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
 *          targetAccountOwnerName:
 *              type: string
 *              description: Account's owner name which is sender or receiver
 *          targetAccountNumber:
 *              type: number
 *              description: Account number of which is sender or receiver
 *          bankCode:
 *              type: number
 *              description: Bank code of bank which operate transaction
 *          signature:
 *              type: number
 *              description: Signature to verify identity of bank (use in interbank transaction)
 *      example:
 *          accountNumber: 9021762797979
 *          time: 2022-12-28T16:19:44.085+00:00
 *          transactionType: interbank-deposit
 *          amount: 999999
 *          fee: 999
 *          content: chuyển tiền
 *          status: success
 *          targetAccountOwnerName: Ronaldo
 *          targetAccountNumber: 9021762999999
 *          bankCode: FB88NCCA
 *          signature: jBFLfUOrO6cwwpb6+fbO3SJL2NtnwE/caVYG9VE02zSNrmIKIGL2f0FCGYxuu/+iU9F6Wu771d2WCFp/FDdOPLR1efNb+GNSpA6+17faMdeWErPrwTBfjA+L1dDkrH63HxhYeZmydDI7XRJ6XTtDrBmcmR6iURfD2JQqUbFAk5p1E9rLKzH7QeP9PGfKpfHGfKFrWUiygOSmCc263FsqHjvwn5SWVH0lePvYnHICEUuH9qwVMyZITBua0Zld4iu1wf92ouPQA6MCen6DrtFrL2D3UDGc3h50Fg1kFCgyqfGEqE54iOfMIqYVj/1p2CpckbNeHgTVqgtcNvA+FuYBZw==
 *
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
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              $ref: '#/definitions/ValidatorErrorItem'
 *                      example:
 *                          success: false
 *                          error:
 *                              code: 400
 *                              message: Account number doesn't exist
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
 *                properties:
 *                  userId:
 *                      type: string
 *                  otp:
 *                      type: string
 *                  feePaymentMethod:
 *                      type: string
 *                  fromAccountNumber:
 *                      type: string
 *                  fromAccountOwnerName:
 *                      type: string
 *                  bankCode:
 *                      type: string
 *                  transactionType:
 *                      type: string
 *                  toAccountNumber:
 *                      type: number
 *                  toAccountOwnerName:
 *                      type: string
 *                  amount:
 *                      type: number
 *                  fee:
 *                      type: number
 *                  content:
 *                      type: number
 *                  time:
 *                      type: string
 *                example:
 *                  userId: 63a1e50b1b88dd229b4d2eb5
 *                  otp: 851843
 *                  feePaymentMethod: paid sender
 *                  fromAccountNumber: 9021762999999
 *                  fromAccountOwnerName: Ronaldo
 *                  bankCode: TIMO
 *                  transactionType: spend-transfer
 *                  toAccountNumber: 9021762797979
 *                  toAccountOwnerName: Ronaldo
 *                  amount: 100000
 *                  fee: 5000
 *                  content: chuyển tiền
 *                  time: 1672244384085
 *          responses:
 *              '201':
 *                  description: Successfully insert a users
 *                  schema:
 *                      type: object
 *                      items:
 *                          $ref: '#/definitions/Transaction'
 *                      example:
 *                          success: true
 *                          payload:
 *                              _id: 63b45d4e40599bf643e5e332
 *                              accountNumber: 9021762797979
 *                              time: 2022-12-28T16:19:44.085+00:00
 *                              transactionType: spend-transfer
 *                              amount: 999999
 *                              fee: 999
 *                              content: chuyển tiền
 *                              status: success
 *                              targetAccountOwnerName: Ronaldo
 *                              targetAccountNumber: 9021762999999
 *                              bankCode: TIMO
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
 *                              message: Error occur
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
