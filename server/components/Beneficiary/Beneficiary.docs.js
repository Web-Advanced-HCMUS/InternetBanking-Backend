/**
 * @swagger
 * tags:
 *  - name: Beneficiary
 *    description: Everything about Beneficiary
 */

/**
 * @swagger
 * definitions:
 *  Beneficiary:
 *      type: object
 *      required:
 *          - username
 *      properties:
 *          _id:
 *              type: string
 *              description: The auto-generated id of record
 *          userId:
 *              type: number
 *              description: The username which beneficiary belongs to
 *          remindedName:
 *              type: string
 *              description: Name of beneficiary
 *          accountNumber:
 *              type: string
 *              description: Account number of beneficiary
 *          type:
 *              type: string
 *              description: Type of transaction
 *      example:
 *          _id: 6395aba603c3f5e85cb44cd5
 *          userId: 6395c4ea26eb1ecbf4c629c4
 *          remindedName: Antoine Griezmann
 *          accountNumber: 20060214213433000
 *          type: internal
 *
 *  CreateBeneficiary:
 *      type: object
 *      required:
 *          - userId
 *          - accountNumber
 *      properties:
 *          userId:
 *              type: string
 *              description: The _id of user which beneficiary belongs to
 *          remindedName:
 *              type: string
 *              description: Name of beneficiary
 *          accountNumber:
 *              type: string
 *              description: Account number of beneficiary
 *          type:
 *              type: string
 *              description: Type of transaction
 *      example:
 *          userId: 6395c4ea26eb1ecbf4c629c4
 *          remindedName: Antoine Griezmann
 *          accountNumber: 20060214213433000
 *          type: internal
 */

/**
 * @swagger
 *  /api/beneficiary/get-list/{_id}:
 *      get:
 *          tags:
 *              - Beneficiary
 *          summary: Lấy danh sách người thụ hưởng của 1 user
 *          parameters:
 *              - name: _id
 *                in: path
 *                required: true
 *                type: string
 *                description: The _id of user which beneficiary belongs to
 *                example:
 *                  _id: 6395aba603c3f5e85cb44cd6
 *          responses:
 *              200:
 *                  description: Successful API
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/definitions/Beneficiary'
 *                      example:
 *                          success: true
 *                          payload:
 *                              - _id: 6395aba603c3f5e85cb44cd5
 *                                userId: 6395c4ea26eb1ecbf4c629c4
 *                                remindedName: Antoine Griezmann
 *                                accountNumber: 20060214213433000
 *                                type: internal
 *                              - _id: 6395aba603c3f5e85cb44c3dd
 *                                userId: 6395c4ea26eb1ecbf4c629c4
 *                                remindedName: Paulo Dybala
 *                                accountNumber: 2006024772822022
 *                                type: interbank
 *                                interBank: 6395aba603c3f5e834d4c3dd
 *              404:
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
 *                              param: {}
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: string
 *                      example: "Internal server error"
 */

/**
 * @swagger
 *  /api/beneficiary/insert-one:
 *      post:
 *          tags:
 *              - Beneficiary
 *          summary: Thêm 1 người thụ hưởng vào danh sách
 *          parameters:
 *              - name: body
 *                in: body
 *                required: true
 *                properties:
 *                  schema:
 *                      type: object
 *                example:
 *                  userId: 6395c4ea26eb1ecbf4c629c4
 *                  remindedName: Antoine Griezmann
 *                  accountNumber: 20060214213433000
 *                  type: internal
 *          responses:
 *              '201':
 *                  description: Successfully insert a users
 *                  schema:
 *                      type: object
 *                      item:
 *                          $ref: '#/definitions/CreateBeneficiary'
 *                      example:
 *                          success: true
 *                          payload:
 *                              _id: 6395aba603c3f5e85cb44cd6
 *                              userId: 6395c4ea26eb1ecbf4c629c4
 *                              remindedName: Antoine Griezmann
 *                              accountNumber: 20060214213433000
 *                              type: internal
 *              404:
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
 *                              param: {}
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: string
 *                      example: "Internal server error"
 */

/**
 * @swagger
 *  /api/beneficiary/update-one/{_id}:
 *      put:
 *          tags:
 *              - Beneficiary
 *          summary: Cập nhật thông tin 1 người thụ hưởng trong danh sách
 *          parameters:
 *              - name: _id
 *                in: path
 *                required: true
 *                type: string
 *                description: _id of beneficiary
 *              - name: body
 *                in: body
 *                required: true
 *                properties:
 *                  username:
 *                      type: string
 *                  remindedName:
 *                      type: string
 *                  accountNumber:
 *                      type: string
 *                example:
 *                  remindedName: Paulo Dybala
 *                  accountNumber: 20060214213433000
 *                  type: 'internal'
 *          responses:
 *              '201':
 *                  description: Successfully insert a users
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: true
 *                          payload:
 *                              modifiedCount: 1
 *              404:
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
 *                              param: {}
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: string
 *                      example: "Internal server error"
 */

/**
 * @swagger
 *  /api/beneficiary/delete-one/{_id}:
 *      delete:
 *          tags:
 *              - Beneficiary
 *          summary: Xóa thông tin 1 người thụ hưởng trong danh sách
 *          parameters:
 *              - name: _id
 *                in: path
 *                required: true
 *                type: string
 *                description: _id of beneficiary
 *          responses:
 *              '201':
 *                  description: Successfully insert a users
 *                  schema:
 *                      type: object
 *                      example:
 *                          success: true
 *                          payload:
 *                              deletedCount: 1
 *              404:
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
 *                              param: {}
 *              500:
 *                  description: When got server exception
 *                  schema:
 *                      type: string
 *                      example: "Internal server error"
 */
