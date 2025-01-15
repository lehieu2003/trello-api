import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  /**
   * Note: Mặc định chúng ta không cần phải custom message ở phía BE làm gì vì để cho FE tự validate
   * và custom message ở phía FE cho đẹp
   * BE chỉ cần validate Đảm bảo dữ liệu chuẩn xác và trả về mesage mặc định thư viện là được
   * Quan trọng: Việc Validate data bắt buộc phải có ở phía BE vì đây là điểm cuối để lưu vào DB
   * và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate data ở cả 2 phía FE và BE
    */

  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title must be at most 50 characters',
      'any.required': 'Title is required'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict().messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 3 characters',
      'string.max': 'Description must be at most 255 characters',
      'any.required': 'Description is required'
    })
  })

  try {
    console.log('req.body: ', req.body)

    // abortEarly: false de hien thi tat ca loi, khong dung lai o loi dau tien
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.CREATED).json({
      message: 'POST from validation: API create new board'
    })
  } catch (error) {
    console.error('Error on createNew board: ', error)
    // console.log(new Error(error).message)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}