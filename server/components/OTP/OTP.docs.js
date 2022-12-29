// /**
//  * @swagger
//  * tags:
//  *  - name: Beneficiary
//  *    description: Everything about Beneficiary
//  */
//
// /**
//  * @swagger
//  * definitions:
//  *  Beneficiary:
//  *      type: object
//  *      required:
//  *          - username
//  *      properties:
//  *          _id:
//  *              type: string
//  *              description: The auto-generated id of record
//  *          username:
//  *              type: number
//  *              description: The username which beneficiary belongs to
//  *          remindedName:
//  *              type: string
//  *              description: Name of beneficiary
//  *          accountNumber:
//  *              type: string
//  *              description: Account number of beneficiary
//  *      example:
//  *          _id: 6395aba603c3f5e85cb44cd5
//  *          username: pmtoan
//  *          remindedName: Lelele
//  *          accountNumber: 20060214213433000
//  *
//  *  CreateBeneficiary:
//  *      type: object
//  *      required:
//  *          - username
//  *          - accountNumber
//  *      properties:
//  *          username:
//  *              type: number
//  *              description: The username which beneficiary belongs to
//  *          remindedName:
//  *              type: string
//  *              description: Name of beneficiary
//  *          accountNumber:
//  *              type: string
//  *              description: Account number of beneficiary
//  *      example:
//  *          username: pmtoan
//  *          remindedName: c
//  *          accountNumber: 20060214213433000
//  */
//
// /**
//  * @swagger
//  *  /api/beneficiary/get-list/{username}:
//  *      get:
//  *          tags:
//  *              - Beneficiary
//  *          summary: Lấy danh sách người thụ hưởng của 1 user
//  *          parameters:
//  *              - name: username
//  *                in: path
//  *                required: true
//  *                type: string
//  *                description: The username which beneficiary belongs to
//  *          responses:
//  *              200:
//  *                  description: Successful API
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/definitions/Beneficiary'
//  *                      example:
//  *                          success: true
//  *                          payload:
//  *                              -
//  *                                  _id: 6395aba603c3f5e85cb44cd6
//  *                                  username: pmtoan
//  *                                  remindedName: Lelele
//  *                                  accountNumber: 20060214213433000
//  *
//  *              404:
//  *                  description: When data cannot be process
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          type: object
//  *                          properties:
//  *                              $ref: '#/definitions/ValidatorErrorItem'
//  *                      example:
//  *                          success: false
//  *                          errors:
//  *                              param: {}
//  *              500:
//  *                  description: When got server exception
//  *                  schema:
//  *                      type: string
//  *                      example: "Internal server error"
//  */
//
// /**
//  * @swagger
//  *  /api/beneficiary/insert-one:
//  *      post:
//  *          tags:
//  *              - Beneficiary
//  *          summary: Thêm 1 người thụ hưởng vào danh sách
//  *          parameters:
//  *              - name: body
//  *                in: body
//  *                required: true
//  *                properties:
//  *                  username:
//  *                      type: string
//  *                  remindedName:
//  *                      type: string
//  *                  accountNumber:
//  *                      type: string
//  *                example:
//  *                  username: pmtoan
//  *                  remindedName: Lelele
//  *                  accountNumber: 20060214213433000
//  *          responses:
//  *              '201':
//  *                  description: Successfully insert a users
//  *                  schema:
//  *                      type: object
//  *                      items:
//  *                          $ref: '#/definitions/CreateBeneficiary'
//  *                      example:
//  *                          success: true
//  *                          payload:
//  *                              _id: 6395aba603c3f5e85cb44cd6
//  *                              username: pmtoan
//  *                              remindedName: Lelele
//  *                              accountNumber: 20060214213433000
//  *              404:
//  *                  description: When data cannot be process
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          type: object
//  *                          properties:
//  *                              $ref: '#/definitions/ValidatorErrorItem'
//  *                      example:
//  *                          success: false
//  *                          errors:
//  *                              param: {}
//  *              500:
//  *                  description: When got server exception
//  *                  schema:
//  *                      type: string
//  *                      example: "Internal server error"
//  */
//
// /**
//  * @swagger
//  *  /api/beneficiary/update-one/{_id}:
//  *      put:
//  *          tags:
//  *              - Beneficiary
//  *          summary: Cập nhật thông tin 1 người thụ hưởng trong danh sách
//  *          parameters:
//  *              - name: _id
//  *                in: path
//  *                required: true
//  *                type: string
//  *                description: _id of beneficiary
//  *              - name: body
//  *                in: body
//  *                required: true
//  *                properties:
//  *                  username:
//  *                      type: string
//  *                  remindedName:
//  *                      type: string
//  *                  accountNumber:
//  *                      type: string
//  *                example:
//  *                  username: pmtoan
//  *                  remindedName: Lelele
//  *                  accountNumber: 20060214213433000
//  *          responses:
//  *              '201':
//  *                  description: Successfully insert a users
//  *                  schema:
//  *                      type: object
//  *                      example:
//  *                          success: true
//  *                          payload:
//  *                              modifiedCount: 1
//  *              404:
//  *                  description: When data cannot be process
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          type: object
//  *                          properties:
//  *                              $ref: '#/definitions/ValidatorErrorItem'
//  *                      example:
//  *                          success: false
//  *                          errors:
//  *                              param: {}
//  *              500:
//  *                  description: When got server exception
//  *                  schema:
//  *                      type: string
//  *                      example: "Internal server error"
//  */
//
// /**
//  * @swagger
//  *  /api/beneficiary/delete-one/{_id}:
//  *      delete:
//  *          tags:
//  *              - Beneficiary
//  *          summary: Xóa thông tin 1 người thụ hưởng trong danh sách
//  *          parameters:
//  *              - name: _id
//  *                in: path
//  *                required: true
//  *                type: string
//  *                description: _id of beneficiary
//  *          responses:
//  *              '201':
//  *                  description: Successfully insert a users
//  *                  schema:
//  *                      type: object
//  *                      example:
//  *                          success: true
//  *                          payload:
//  *                              deletedCount: 1
//  *              404:
//  *                  description: When data cannot be process
//  *                  schema:
//  *                      type: array
//  *                      items:
//  *                          type: object
//  *                          properties:
//  *                              $ref: '#/definitions/ValidatorErrorItem'
//  *                      example:
//  *                          success: false
//  *                          errors:
//  *                              param: {}
//  *              500:
//  *                  description: When got server exception
//  *                  schema:
//  *                      type: string
//  *                      example: "Internal server error"
//  */
