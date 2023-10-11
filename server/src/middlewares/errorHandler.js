import serverMessage from '../constants/serverMessage.js'

const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.status || 500
    ctx.body = {
      error: {
        status: ctx.status,
        message: error.message || serverMessage.ITERNAL_SERVER_ERROR,
      },
    }
  }
}

export default errorHandler
