// @ts-ignore
export const errorHandler = (err, req, res, next) => {
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}