/**
 * @swagger
 * tags:
 *  - name: Interbank
 *    description: Everything about Transaction and Transfer
 */

/**
 * @swagger
 * definitions:
 *  InterbankTransaction:
 *      type: object
 *      properties:
 *          fromAccountNumber:
 *              type: string
 *              description: The account number of sender
 *          fromAccountOwnerName:
 *              type: string
 *              description: The account name of sender
 *          bank:
 *              type: string
 *              description: Bank code of linked bank
 *          toAccountNumber:
 *              type: string
 *              description: The account number of receiver
 *          toAccountOwnerName:
 *              type: string
 *              description: The account name of receiver
 *          transactionType:
 *              type: string
 *              description: The type of transaction
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
 *              type: string
 *              description: Content of transaction
 *          status:
 *              type: string
 *              description: Status of transaction
 *          time:
 *              type: string
 *              description: The time which transaction is operated
 *          signature:
 *              type: string
 *              description: Your bank's signature use to verify transaction
 *      example:
 *          fromAccountNumber: "9021762999999"
 *          fromAccountOwnerName: Messi
 *          bank: FB88NCCA
 *          toAccountNumber: "9021762797979"
 *          toAccountOwnerName: Ronaldo
 *          transactionType: interbank-transfer
 *          feePaymentMethod: paid receiver
 *          amount: 10000
 *          fee: 999
 *          content: chuyển tiền
 *          status: success
 *          signature: "dNUNrm11plLe3HlXp73siEzDMSHQuA4bHwZGR09ay4Ilo7o4rfczy6EIc3YhIpuwFJOniJaAJnfWwNChew5xIhFmQALMJd0UeivavHva02VPg8V2Rku3Ohrdm/qLamKA27U6bp5FcnId30MyRR45TurssWovPQUlBlDlBMVEiwbhzbzlTtCF9aufx22/p8peXP8ykTa4W9VPlk501hmF7Md2J/fgiXXXJxXlLqwgNFtJvFPd8pItBnKn6XqjU9EBl2Y2SGyIhyy+bLh5VYMaWZjU59z/p9OJFHPNBAEuuQQvdBM9QDqT6gTMmn28aPrEOUopEoJwKvyi7ucqIGzBwA=="
 *          time: 2023-01-05T10:59:47.359Z
 *          _id: 63b6ada68c53dae7211a339b
 *
 *  ResponseInterbankTransaction:
 *      type: object
 *      properties:
 *          data:
 *              $ref: '#/definitions/InterbankTransaction'
 *          signature:
 *              type: string
 *              description: Our bank's signature use to verify transaction
 *              example: "dNUNrm11plLe3HlXp73siEzDMSHQuA4bHwZGR09ay4Ilo7o4rfczy6EIc3YhIpuwFJOniJaAJnfWwNChew5xIhFmQALMJd0UeivavHva02VPg8V2Rku3Ohrdm/qLamKA27U6bp5FcnId30MyRR45TurssWovPQUlBlDlBMVEiwbhzbzlTtCF9aufx22/p8peXP8ykTa4W9VPlk501hmF7Md2J/fgiXXXJxXlLqwgNFtJvFPd8pItBnKn6XqjU9EBl2Y2SGyIhyy+bLh5VYMaWZjU59z/p9OJFHPNBAEuuQQvdBM9QDqT6gTMmn28aPrEOUopEoJwKvyi7ucqIGzBwA=="
 *          publicKey:
 *              type: string
 *              description: Our bank's public key use to verify signature
 *              example: "-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAvdXEiU3vWemBfpWqyaLE7f5YSvB/cbkXpv5LRo8mWXea4qVdCa0e\na2uUyZcNLgWJzOGzbLrGk1r4wBbPHuR+mIz2tHEYRCcUleHH60RhivDYeL8ZlC7B\n1emvYGJ5DtLK+icO7XwVKdwO77mm6VepPXih8Rh7YzYFSQkZXUkjJRJu81ARPUWF\nNR5x6Fy0oMJ3BN80vQJth+IZ8erfvr2IKsl66MmjBOV5Iesz6NprezFRSwoi2ZqW\nWd7n68nY8oS9H65v3RWID/rnl8a4psupdxAdHbQVwNzquVZN/WBSCvlZgqsrdTDe\n/SMouMVxJf6/399fGPoyWf3Kv5HE9cwVTQIDAQAB\n-----END RSA PUBLIC KEY-----\n"
 *
 *  CreateInterbankTransaction:
 *      type: object
 *      required:
 *          - data
 *          - signature
 *          - publicKey
 *      properties:
 *          data:
 *              type: object
 *              properties:
 *                  fromAccountNumber:
 *                      type: string
 *                      description: The account number of sender
 *                  fromAccountOwnerName:
 *                      type: string
 *                      description: The account name of sender
 *                  bankCode:
 *                      type: string
 *                      description: Bank code of linked bank
 *                  toAccountNumber:
 *                      type: string
 *                      description: The account number of receiver
 *                  toAccountOwnerName:
 *                      type: string
 *                      description: The account name of receiver
 *                  amount:
 *                      type: number
 *                      description: Amount of transaction
 *                  fee:
 *                      type: number
 *                      description: Fee of transaction
 *                  content:
 *                      type: string
 *                      description: Content of transaction
 *          signature:
 *              type: string
 *              description: Your bank's signature is to verify transaction
 *          publicKey:
 *              type: string
 *              description: Your bank's public key is to verify signature
 *      example:
 *          data:
 *              fromAccountNumber: "9021762999999"
 *              fromAccountOwnerName: Messi
 *              bankCode: FB88NCCA
 *              toAccountNumber: "9021762797979"
 *              toAccountOwnerName: Ronaldo
 *              amount: 10000
 *              fee: 999
 *              content: chuyển tiền
 *          signature: "dNUNrm11plLe3HlXp73siEzDMSHQuA4bHwZGR09ay4Ilo7o4rfczy6EIc3YhIpuwFJOniJaAJnfWwNChew5xIhFmQALMJd0UeivavHva02VPg8V2Rku3Ohrdm/qLamKA27U6bp5FcnId30MyRR45TurssWovPQUlBlDlBMVEiwbhzbzlTtCF9aufx22/p8peXP8ykTa4W9VPlk501hmF7Md2J/fgiXXXJxXlLqwgNFtJvFPd8pItBnKn6XqjU9EBl2Y2SGyIhyy+bLh5VYMaWZjU59z/p9OJFHPNBAEuuQQvdBM9QDqT6gTMmn28aPrEOUopEoJwKvyi7ucqIGzBwA=="
 *          publicKey: "-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAvdXEiU3vWemBfpWqyaLE7f5YSvB/cbkXpv5LRo8mWXea4qVdCa0e\na2uUyZcNLgWJzOGzbLrGk1r4wBbPHuR+mIz2tHEYRCcUleHH60RhivDYeL8ZlC7B\n1emvYGJ5DtLK+icO7XwVKdwO77mm6VepPXih8Rh7YzYFSQkZXUkjJRJu81ARPUWF\nNR5x6Fy0oMJ3BN80vQJth+IZ8erfvr2IKsl66MmjBOV5Iesz6NprezFRSwoi2ZqW\nWd7n68nY8oS9H65v3RWID/rnl8a4psupdxAdHbQVwNzquVZN/WBSCvlZgqsrdTDe\n/SMouMVxJf6/399fGPoyWf3Kv5HE9cwVTQIDAQAB\n-----END RSA PUBLIC KEY-----\n"
 *
 */

/**
 * @swagger
 *  /api/interbank/get-account/{accountNumber}:
 *      get:
 *          tags:
 *              - Interbank
 *          summary: Lấy thông tin cùa một account
 *          parameters:
 *              - name: accountNumber
 *                in: path
 *                required: true
 *                type: string
 *                description: The account number of user which you want to get list
 *                example:
 *                  accountNumber: 9021762797979
 *              - name: hmac
 *                in: query
 *                required: true
 *                type: string
 *                description: "The hmac to verify client, format: md5(data) | data: bankCode=$bankCode&time=$time&secretKey=$SECRET_KEY"
 *                example:
 *                  hmac: 54ab740e663474f2fea8e2bd41d0b206
 *              - name: time
 *                in: query
 *                required: true
 *                type: string
 *                description: The time inter bank request api in timestamp format
 *                example:
 *                  time: 1672912368433
 *              - name: bankCode
 *                in: query
 *                required: true
 *                type: string
 *                description: The bank code of linked bank
 *                example:
 *                  bankCode: FB88NCCA
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: true
 *                          payload:
 *                              accountNumber: "9021762999999"
 *                              accountOwnerName: Messi
 *                              bankCode: TIMO_CLONE
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      type: object
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
 *   /api/interbank/rsa-deposit:
 *      post:
 *          tags:
 *              - Interbank
 *          summary: Thực hiện giao dịch nộp tiền vào tài khoản từ ngân hàng đã liên kết
 *          description: Trước khi thực hiện API cần phải thực hiện call API OTP để lấy OTP trước, xem phần OTP .../get-transaction-otp
 *          parameters:
 *              - name: hmac
 *                in: query
 *                required: true
 *                type: string
 *                description: "The hmac to verify client, format: md5(data) | data: bankCode=$bankCode&time=$time&secretKey=$SECRET_KEY"
 *                example:
 *                  hmac: 54ab740e663474f2fea8e2bd41d0b206
 *              - name: time
 *                in: query
 *                required: true
 *                type: string
 *                description: The time inter bank request api in timestamp format
 *                example:
 *                  time: 1672912368433
 *              - name: bankCode
 *                in: query
 *                required: true
 *                type: string
 *                description: The bank code of linked bank
 *                example:
 *                  bankCode: FB88NCCA
 *              - name: body
 *                in: body
 *                required: true
 *                schema:
 *                  $ref: '#/definitions/CreateInterbankTransaction'
 *          responses:
 *              '201':
 *                  description: Successfully create interbank transfer
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *                              example: true
 *                          payload:
 *                              $ref: '#/definitions/ResponseInterbankTransaction'
 *              401:
 *                  description: When data cannot be process
 *                  schema:
 *                      type: array
 *                      example:
 *                          success: false
 *                          errors:
 *                              code: 400
 *                              message: Error occur
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: false
 *                          error:
 *                              code: 500
 *                              message: Internal server error
 */
